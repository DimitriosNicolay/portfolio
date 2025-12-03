# Privacy Policy Page

This directory contains the privacy policy (Datenschutzerklärung) page for the portfolio website.

## Requirements

German websites require a comprehensive privacy policy (Datenschutzerklärung) under GDPR/DSGVO regulations.

## Implementation

Create a `page.tsx` file in this directory with your privacy policy content. The policy should include:

- Data collection and processing information
- Hosting provider details
- Cookie usage (if any)
- Analytics tracking (if any)
- Third-party services
- User rights under GDPR
- Contact information for data protection inquiries

## Example Structure

```tsx
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>
        {/* Your privacy policy content */}
      </div>
    </div>
  );
}
```

## Resources

- [GDPR Official Site](https://gdpr.eu/)
- [e-recht24.de](https://www.e-recht24.de/) - German legal compliance generator
