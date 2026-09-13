export type AddressSuggestion = {
  postcode: string;
  city: string;
  street: string;
};

export async function searchAddress(
  postcode: string,
  street: string,
  signal: AbortSignal,
): Promise<AddressSuggestion[]> {
  const key = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  if (!key || !/^\d{5}$/.test(postcode)) return [];
  const params = new URLSearchParams({
    text: street.trim() ? `${postcode} ${street.trim()}` : postcode,
    type: street.trim() ? "street" : "postcode",
    filter: "countrycode:de",
    lang: "de",
    format: "json",
    limit: "8",
    apiKey: key,
  });
  const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?${params}`, {
    signal, credentials: "omit", referrerPolicy: "origin",
  });
  if (!response.ok) throw new Error("Address search unavailable");
  const data: unknown = await response.json();
  if (!data || typeof data !== "object" || !("results" in data) || !Array.isArray(data.results)) return [];
  const seen = new Set<string>();
  return data.results.flatMap((item: unknown) => {
    if (!item || typeof item !== "object") return [];
    const row = item as Record<string, unknown>;
    if (row.country_code !== "de" || row.postcode !== postcode) return [];
    const city = typeof row.city === "string" ? row.city : typeof row.town === "string" ? row.town : typeof row.village === "string" ? row.village : "";
    const road = typeof row.street === "string" ? row.street : "";
    if (!city || (street.trim() && !road)) return [];
    const id = `${postcode}|${city}|${road}`;
    if (seen.has(id)) return [];
    seen.add(id);
    return [{ postcode, city, street: road }];
  });
}
