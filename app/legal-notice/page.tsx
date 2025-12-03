export default function LegalNoticePage() {
  return (
    <div className="min-h-screen px-8 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <a
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Home
          </a>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="text-gray-900 dark:text-white space-y-8">
            <h1 className="text-4xl font-light mb-8">Legal Notice</h1>

            <section>
              <h2 className="text-2xl font-light mt-8 mb-4">Information pursuant to § 5 TMG</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Dimitrios Nicolay<br />
                Humboldtstraße 46<br />
                40723 Hilden<br />
                Germany
              </p>

              <h2 className="text-2xl font-light mt-12 mb-4">Contact</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Phone: +49 174 3078393<br />
                Email:{' '}
                <a
                  href="mailto:mail@dnicolay.de"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  mail@dnicolay.de
                </a>
              </p>

              <h2 className="text-2xl font-light mt-12 mb-4">Responsible for Content</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Responsible for content according to § 55 Abs. 2 RStV:<br />
                Dimitrios Nicolay
              </p>
            </section>

            <p className="text-sm text-gray-500 dark:text-gray-600 mt-16">
              Source:{' '}
              <a
                href="https://www.e-recht24.de"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                e-recht24.de
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
