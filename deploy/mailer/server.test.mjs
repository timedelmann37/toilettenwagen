import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createMailer } from './server.mjs';

const payload = {
  name: 'Test Person', email: 'visitor@example.com', phone: '0123456789',
  location: 'Testort', company: '', billingAddress: '', billingSameAsLocation: true,
  deliveryDate: '2026-10-01', startDate: '2026-10-02', endDate: '',
  model: 's', customerType: 'private', occasion: 'Hochzeit', occasionOther: '',
  message: 'Nur ein lokaler Test', website: '', privacyAccepted: true,
};

test('includes self-pickup and pickup date in mail but rejects model L', async t => {
  const calls = [];
  const post = await setup(t, async (_url, options) => {
    calls.push(JSON.parse(options.body));
    return Response.json({ id: 'test-pickup' });
  });
  assert.equal((await post({ ...payload, collectionMethod: 'self-pickup' })).status, 200);
  assert.match(calls[0].text, /Lieferung \/ Selbstabholung: Selbstabholung/);
  assert.match(calls[0].text, /Abholtag: 2026-10-01/);
  assert.equal((await post({ ...payload, model: 'l', collectionMethod: 'self-pickup' })).status, 400);
  assert.equal(calls.length, 1);
});

async function setup(t, fetchImpl) {
  const server = createMailer({ apiKey: 'test-key', from: 'Test <test@example.com>', to: 'inbox@example.com', origin: 'https://tw.daheim.uk', fetchImpl });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => { server.closeAllConnections(); server.close(); });
  return (data = payload, headers = {}) => fetch(`http://127.0.0.1:${server.address().port}/api/anfrage`, {
    method: 'POST', headers: { Origin: 'https://tw.daheim.uk', 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(data),
  });
}

test('forwards validated content to fixed recipient, sets reply-to and deduplicates', async t => {
  const calls = [];
  const post = await setup(t, async (url, options) => {
    calls.push({ url, ...options });
    return Response.json({ id: 'test-id' });
  });
  assert.deepEqual(await (await post({ ...payload, to: 'attacker@example.com' })).json(), { ok: true });
  assert.deepEqual(await (await post()).json(), { ok: true });
  assert.equal(calls.length, 1);
  const mail = JSON.parse(calls[0].body);
  assert.deepEqual(mail.to, ['inbox@example.com']);
  assert.equal(mail.reply_to, payload.email);
  assert.match(mail.text, /Rechnungsanschrift: Testort/);
  assert.equal(calls[0].headers.Authorization, 'Bearer test-key');
});

test('invalid data, consent, dates, honeypot and foreign origins never send', async t => {
  const post = await setup(t, () => { throw new Error('must not send'); });
  for (const change of [{ email: 'a\nb@example.com' }, { privacyAccepted: false }, { startDate: '2026-02-30' }, { startDate: '2026-09-01' }, { customerType: 'business' }, { model: 'xl' }, { website: 'bot' }, { message: 'x'.repeat(5001) }]) {
    assert.equal((await post({ ...payload, ...change })).status, 400);
  }
  assert.equal((await post(payload, { Origin: 'https://other.example' })).status, 403);
  assert.equal((await post(payload, { 'Content-Type': 'text/plain' })).status, 415);
  assert.equal((await post({ ...payload, message: 'x'.repeat(17000) })).status, 413);
});

test('provider failure stays an error; retry keeps idempotency key', async t => {
  const keys = [];
  const post = await setup(t, async (_, options) => {
    keys.push(options.headers['Idempotency-Key']);
    return keys.length === 1 ? Response.json({ error: 'failed' }, { status: 500 }) : Response.json({ id: 'accepted' });
  });
  assert.equal((await post()).status, 502);
  assert.equal((await post()).status, 200);
  assert.equal(keys[0], keys[1]);
});

test('limits repeated attempts even when provider fails', async t => {
  let calls = 0;
  const post = await setup(t, async () => { calls++; throw new Error('offline'); });
  for (let n = 0; n < 5; n++) assert.equal((await post()).status, 502);
  assert.equal((await post()).status, 429);
  assert.equal(calls, 5);
});
