# Legal Notice Page

This directory contains the legal notice (Impressum) page for the portfolio website.

## Requirements

German websites require a legal notice (Impressum) under German law (§5 TMG).

## Implementation

Create a `page.tsx` file in this directory with your legal notice content. The notice should include:

- Full name
- Address
- Contact information (email, phone)
- VAT ID (if applicable for businesses)
- Professional association (if applicable)
- Responsible for content (Verantwortlich für den Inhalt)

## Example Structure

```tsx
export default function LegalNotice() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Impressum</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
            {/* Your legal information */}
          </section>
        </div>
      </div>
    </div>
  );
}
```

## Resources

- [§5 TMG - Impressumspflicht](https://www.gesetze-im-internet.de/tmg/__5.html)
- [e-recht24.de](https://www.e-recht24.de/) - German legal compliance generator
