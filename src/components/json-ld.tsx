// Escapes "<" so a string value can never close the script tag early.
const LESS_THAN = /</g;
const ESCAPED_LESS_THAN = String.raw`<`;

/** Renders schema.org data for search engines. The payload is our own static object, never user input. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(LESS_THAN, ESCAPED_LESS_THAN),
      }}
    />
  );
}
