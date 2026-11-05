// Prefix internal links and assets with Astro's base path. This keeps the
// same build working at / locally and at /repository-name/ on GitHub Pages.
export function withBase(path: string): string {
  if (/^(?:[a-z]+:|#)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const suffix = `/${path.replace(/^\//, "")}`;
  return `${base}${suffix}` || "/";
}
