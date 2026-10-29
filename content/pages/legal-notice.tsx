import { getContentTranslator } from '@/content/translate';
import { localizedPath, type Locale } from '@/lib/i18n/routing';
import Link from "next/link";

export default function LegalNoticePage({ locale = "en" }: { locale?: Locale }) {
  const t = getContentTranslator(locale);
  return (
    <div className="min-h-screen px-8 py-24 [overflow-wrap:anywhere]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Link href={localizedPath("/", locale)}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >{t("← Back to Home")}</Link>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="text-gray-900 dark:text-white space-y-8">
            <h1 className="text-4xl font-light mb-8">{t("Legal Notice")}</h1>

            <section>
              <h2 className="text-2xl font-light mt-8 mb-4">{t("Information pursuant to § 5 TMG")}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Dimitrios Nicolay<br />
                Humboldtstraße 46<br />
                40723 Hilden<br />{t("Germany")}</p>

              <h2 className="text-2xl font-light mt-12 mb-4">{t("Contact")}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t("Phone: +49 174 3078393")}<br />{t("Email:")}{' '}
                <a
                  href="mailto:mail@dnicolay.de"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  mail@dnicolay.de
                </a>
              </p>

              <h2 className="text-2xl font-light mt-12 mb-4">{t("Responsible for Content")}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t("Responsible for content according to § 55 Abs. 2 RStV:")}<br />
                Dimitrios Nicolay
              </p>
            </section>

            <p className="text-sm text-gray-500 dark:text-gray-600 mt-16">{t("Source:")}{' '}
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
