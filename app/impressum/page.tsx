export default function ImpressumPage() {
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
            <h1 className="text-4xl font-light mb-8">Impressum</h1>

            <section>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Dimitrios Nicolay<br />
                Humboldtstraße, 46<br />
                40723 Hilden
              </p>

              <h2 className="text-2xl font-light mt-12 mb-4">Kontakt</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Telefon: +49 174 3078393<br />
                E-Mail:{' '}
                <a
                  href="mailto:mail@dnicolay.de"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  mail@dnicolay.de
                </a>
              </p>
            </section>

            <p className="text-sm text-gray-500 dark:text-gray-600 mt-16">
              Quelle:{' '}
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
