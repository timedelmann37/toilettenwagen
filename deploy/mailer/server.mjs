import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const fields = {
  name: 160, email: 254, phone: 80, location: 500, company: 200,
  billingAddress: 500, deliveryDate: 10, startDate: 10, endDate: 10,
  model: 20, customerType: 20, occasion: 80, occasionOther: 300,
  message: 5000, website: 200,
};
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const dateValid = value => /^\d{4}-\d{2}-\d{2}$/.test(value)
  && Number.isFinite(Date.parse(value))
  && new Date(value).toISOString().slice(0, 10) === value;

export function validate(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const data = {};
  for (const [field, max] of Object.entries(fields)) {
    if (typeof input[field] !== 'string' || input[field].length > max) return null;
    data[field] = input[field].trim();
  }
  if (input.privacyAccepted !== true || typeof input.billingSameAsLocation !== 'boolean') return null;
  if (!data.name || !data.phone || !data.location || !emailPattern.test(data.email)) return null;
  if (!['private', 'business'].includes(data.customerType) || !['s', 'm', 'l', 'unknown'].includes(data.model)) return null;
  if (data.customerType === 'business' && !data.company) return null;
  if (input.billingSameAsLocation) data.billingAddress = data.location;
  if (!data.billingAddress || !dateValid(data.startDate) || !dateValid(data.deliveryDate)) return null;
  if (data.deliveryDate > data.startDate || (data.endDate && (!dateValid(data.endDate) || data.endDate < data.startDate))) return null;
  if (!['', 'Hochzeit', 'Private Feier', 'Festival oder Großveranstaltung', 'Firmenfeier', 'Markt', 'Sportveranstaltung', 'Gewerbliche Veranstaltung', 'Kommune oder öffentlicher Einsatz', 'Sonstiges'].includes(data.occasion)) return null;
  if (data.occasion === 'Sonstiges' && !data.occasionOther) return null;
  return data;
}

function message(data) {
  const labels = { name: 'Name', email: 'E-Mail', phone: 'Telefon', customerType: 'Kundentyp', company: 'Firma', location: 'Aufstellort', billingAddress: 'Rechnungsanschrift', deliveryDate: 'Liefertag', startDate: 'Nutzungsbeginn', endDate: 'Nutzungsende', model: 'Modell', occasion: 'Anlass', occasionOther: 'Sonstiger Anlass', message: 'Nachricht' };
  return Object.entries(labels).map(([key, label]) => `${label}: ${data[key] || '—'}`).join('\n\n');
}

export function createMailer({ apiKey, from, to, origin, fetchImpl = fetch, now = Date.now }) {
  if (!apiKey || !from || !emailPattern.test(to || '') || !origin || new URL(origin).origin !== origin) {
    throw new Error('Mailer configuration missing or invalid');
  }
  const attempts = [];
  const recent = new Map();
  const pending = new Set();
  return createServer(async (req, res) => {
    const reply = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      res.end(JSON.stringify(body));
    };
    if (req.url === '/health' && req.method === 'GET') return reply(200, { ok: true });
    if (req.url !== '/api/anfrage') return reply(404, { ok: false });
    if (req.method !== 'POST') return reply(405, { ok: false });
    if (req.headers.origin !== origin) return reply(403, { ok: false });
    if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) return reply(415, { ok: false });
    if (Number(req.headers['content-length']) > 16384) return reply(413, { ok: false });
    let input;
    try {
      const chunks = [];
      let length = 0;
      for await (const chunk of req) {
        length += chunk.length;
        if (length > 16384) { reply(413, { ok: false }); return; }
        chunks.push(chunk);
      }
      input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch { return reply(400, { ok: false }); }
    if (typeof input?.website === 'string' && input.website.trim()) return reply(400, { ok: false, code: 'spam' });
    const data = validate(input);
    if (!data) return reply(400, { ok: false });
    const time = now();
    while (attempts.length && attempts[0].time <= time - 3600000) attempts.shift();
    for (const [key, entry] of recent) if (entry.expires <= time) recent.delete(key);
    const fingerprint = createHash('sha256').update(JSON.stringify({ from, to, data })).digest('hex');
    if (recent.get(fingerprint)?.sent) return reply(200, { ok: true });
    if (pending.has(fingerprint)) return reply(409, { ok: false });
    const emailHash = createHash('sha256').update(data.email.toLowerCase()).digest('hex');
    if (attempts.length >= 30 || attempts.filter(x => x.email === emailHash && x.time > time - 900000).length >= 5) {
      return reply(429, { ok: false });
    }
    attempts.push({ time, email: emailHash });
    const entry = recent.get(fingerprint) || { expires: time + 600000, sent: false, key: `inquiry-${fingerprint}-${Math.floor(time / 600000)}` };
    recent.set(fingerprint, entry);
    pending.add(fingerprint);
    try {
      const response = await fetchImpl('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': entry.key },
        body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: 'Neue Toilettenwagen-Anfrage', text: message(data) }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || typeof result?.id !== 'string' || !result.id) return reply(502, { ok: false });
      entry.sent = true;
      return reply(200, { ok: true });
    } catch { return reply(502, { ok: false }); }
    finally { pending.delete(fingerprint); }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createMailer({ apiKey: process.env.RESEND_API_KEY, from: process.env.MAIL_FROM, to: process.env.MAIL_TO, origin: process.env.SITE_ORIGIN });
  server.requestTimeout = 20000;
  server.headersTimeout = 10000;
  server.listen(3001, '0.0.0.0', () => console.log('Mailer listening on port 3001'));
  process.on('SIGTERM', () => server.close());
}
