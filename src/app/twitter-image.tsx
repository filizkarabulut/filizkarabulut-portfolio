// Twitter/X uses the same card as Open Graph. Re-export the OG image route so
// there is a single source of truth for the shared preview.
export { default, alt, size, contentType } from "./opengraph-image";
