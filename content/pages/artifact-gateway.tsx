import CodeBlock from '@/components/CodeBlock';
import { getContentTranslator } from '@/content/translate';
import { localizedPath, type Locale } from '@/lib/i18n/routing';
import Image from 'next/image';
import Link from 'next/link';


export default function ArtifactGatewayProject({ locale = "en" }: { locale?: Locale }) {
  const t = getContentTranslator(locale);
  return (
    <main lang={locale} className="project-main">
      <div className="project-container">
        <header className="project-header max-w-3xl mx-auto">
          <Link href={localizedPath("/#projects", locale)} className="project-back-link">{t("← Back to projects")}</Link>
          <p className="text-sm tracking-wide text-gray-600 dark:text-gray-400 mb-4">{t("AWS · Learning project")}</p>
          <h1 className="project-title">{t("Artifact Gateway: What happens after the upload")}</h1>
          <p className="project-text max-w-3xl text-lg mb-8">{t("Upload a file, check it, keep a record. A small enough idea to get started with AWS, with a few interesting questions hiding between those three steps.")}</p>
          <div className="project-tags">
            {['AWS CDK', 'TypeScript', 'S3', 'Lambda', 'DynamoDB'].map(tag => <span key={tag} className="project-tag">{tag}</span>)}
          </div>
          <div className="project-divider" />
        </header>

        <article className="project-article max-w-3xl mx-auto">
          <section className="project-section" aria-labelledby="starting-point">
            <h2 id="starting-point" className="project-heading">{t("Starting small, on purpose")}</h2>
            <p className="project-text">{t("I had some theoretical knowledge of AWS, but little hands-on experience. I wanted to connect a few services myself and follow a piece of data through them. So I kept the idea manageable: upload an artifact, check whether it matches its description, and record the result.")}</p>
            <p className="project-text">{t("In this project, an artifact is simply a file and a JSON manifest. The manifest carries a version, a commit ID, a build timestamp and the file’s expected SHA-256 checksum. S3 holds the files, Lambda checks them, and DynamoDB keeps the outcome. The repository is called")}{' '}<code>artifactIntakeGate</code>{t(". There is no separate HTTP API to build around it. The upload itself starts the process.")}</p>
          </section>

          <section className="project-section" aria-labelledby="architecture">
            <h2 id="architecture" className="project-heading">{t("The manifest is the starting signal")}</h2>
            <p className="project-text">{t("I describe the infrastructure with AWS CDK in TypeScript. The stack creates the bucket, the registry, a Lambda function running Node.js 24, and a CloudWatch alarm. It also connects them and grants the function permission to read and delete S3 objects and access the registry. The generated table name reaches the function through an environment variable.")}</p>
            <figure className="project-card max-w-xl mx-auto">
              <Image
                src="/images/projects/artifact-gateway/architecture.svg"
                alt={t("CDK defines the resources. A manifest upload to S3 triggers Lambda, which reads the files, writes a result to DynamoDB and deletes rejected files. CloudWatch monitors Lambda errors.")}
                width={800} height={1240} className="w-full h-auto"
              />
              <figcaption className="project-card-caption project-card-caption-text text-gray-600 dark:text-gray-400">{t("The flow defined in the project code. CDK sets up resources and permissions; it does not process the uploads.")}</figcaption>
            </figure>
            <p className="project-text">{t("There is one detail that matters before any validation can happen: upload")}{' '}<code>payload.txt</code>{' '}{t("first, then")}{' '}<code>manifest.json</code>{' '}{t("into the same folder. S3 triggers the function for object keys ending in")}{' '}<code>manifest.json</code>{t(", so the payload needs to be there already.")}</p>
            <p className="project-text">{t("Those names are part of the current implementation. The handler finds the payload by replacing")}{' '}<code>manifest.json</code>{' '}{t("with")}{' '}<code>payload.txt</code>{' '}{t("in the object key. That keeps the first version easy to follow, though supporting arbitrary filenames would need a different approach.")}</p>
          </section>

          <section className="project-section" aria-labelledby="validation">
            <h2 id="validation" className="project-heading">{t("A checksum answers one question")}</h2>
            <p className="project-text">{t("The handler first checks whether")}{' '}<code>version</code>, <code>commitSha</code>, <code>checksum</code>{' '}{t("and")}{' '}<code>buildTimestamp</code>{' '}{t("are strings. It then reads the payload as bytes, calculates its SHA-256 hash and compares the two values. This is the central part of the check:")}</p>
            <CodeBlock language="typescript">{`const calculatedChecksum = createHash("sha256")
  .update(payloadBytes ?? new Uint8Array())
  .digest("hex");
const isChecksumValid = calculatedChecksum === manifest.checksum;`}</CodeBlock>
            <p className="project-text">{t("Do these bytes match the checksum in the manifest? That is the question this code can answer. It cannot tell me who produced the file. Someone able to replace both files could also supply a matching checksum. Checking the origin would need something more, such as a trusted signature.")}</p>
            <p className="project-text">{t("The metadata check is small, too. A string passes even if it is empty, the commit ID has an unexpected format, or the timestamp is meaningless. Stronger validation is still on the list.")}</p>
          </section>

          <section className="project-section" aria-labelledby="outcomes">
            <h2 id="outcomes" className="project-heading">{t("Keep the result, remove the rejected files")}</h2>
            <p className="project-text">{t("When the checksums match, the function writes")}{' '}<code>approved</code>{' '}{t("to DynamoDB alongside the metadata and validation time. Both files stay in S3. The registry key is the manifest’s S3 URI, for example")}{' '}<code>s3://bucket/build42/manifest.json</code>{t(". Processing that same key again replaces the entry, so there is no history of previous results yet.")}</p>
            <figure className="project-card max-w-xl mx-auto">
              <Image
                src="/images/projects/artifact-gateway/validation.svg"
                alt={t("Valid fields and a matching checksum lead to an approved registry entry and retained files. Invalid fields or a checksum mismatch lead to a rejected entry, then deletion of both files, then a thrown error.")}
                width={800} height={1320} className="w-full h-auto"
              />
              <figcaption className="project-card-caption project-card-caption-text text-gray-600 dark:text-gray-400">{t("On rejection, the order matters: save the reason, delete both files, then throw an error.")}</figcaption>
            </figure>
            <p className="project-text">{t("Invalid required fields or a checksum mismatch take the other path. The function records")}{' '}<code>rejected</code>{' '}{t("with a reason before deleting the manifest and payload. That leaves something to look up after the files are gone. But these operations are not a transaction. If a deletion fails halfway through, the registry may already say rejected while a file is still in the bucket.")}</p>
            <p className="project-text">{t("Even a completed rejection ends with a thrown error. CloudWatch watches the Lambda error metric with a threshold of one and one evaluation period. As a result, a rejected artifact and a technical failure can both increase the same metric. The alarm has no notification action configured yet, so it does not send an email or an SNS message.")}</p>
          </section>

          <section className="project-section" aria-labelledby="tests">
            <h2 id="tests" className="project-heading">{t("What the tests tell me so far")}</h2>
            <p className="project-text">{t("The project has eight tests. Five check the generated infrastructure template, including the registry key, alarm settings, Lambda runtime and table reference. The other three call the handler with mocked AWS SDK requests: a valid artifact, a wrong checksum, and a manifest missing")}{' '}<code>commitSha</code>{t(". They check the registry writes and the expected S3 delete requests.")}</p>
            <CodeBlock language="bash">{`npm run build
npm test -- --runInBand`}</CodeBlock>
            <p className="project-text">{t("The TypeScript check and all eight tests pass. They check that the infrastructure is configured as expected and that the validator approves matching files and rejects invalid artifacts. The AWS requests are mocked, so checking the complete upload workflow requires a separate integration test.")}</p>
          </section>

          <section className="project-section" aria-labelledby="next">
            <h2 id="next" className="project-heading">{t("The next questions are mostly about failure")}</h2>
            <p className="project-text">{t("The successful path is short. The more interesting questions appear when a step does not finish, or an event arrives again. These are the parts I would tackle before adding more features:")}</p>
            <ul className="project-list">
              <li><strong>{t("Unreadable input.")}</strong>{' '}{t("Malformed JSON and missing S3 objects fail before reaching the rejection flow above. They still need deliberate handling and tests.")}</li>
              <li><strong>{t("Repeated and grouped events.")}</strong>{' '}{t("The handler only reads")}{' '}<code>Records[0]</code>{t(". Processing every record, handling duplicates and making retries safe are still open. Deleting files before throwing an error makes a repeat particularly worth examining.")}</li>
              <li><strong>{t("Larger or overlapping uploads.")}</strong>{' '}{t("The whole payload is loaded into memory. Streaming, size limits and stable upload identities would matter as the scope grows, especially when two uploads use the same keys.")}</li>
              <li><strong>{t("Keeping track of what happened.")}</strong>{' '}{t("Separate signals for validation failures and infrastructure errors, result history and alarm notifications would make the flow easier to operate.")}</li>
            </ul>
            <p className="project-text">{t("Cleanup belongs on that list as well. The bucket and table use")}{' '}<code>RemovalPolicy.DESTROY</code>{t(", which fits a disposable learning setup. The bucket is not emptied automatically, though, so existing objects need attention before removing the stack.")}</p>
          </section>

          <section className="project-section" aria-labelledby="closing">
            <h2 id="closing" className="project-heading">{t("A small project with room to keep going")}</h2>
            <p className="project-text">{t("This gives me a manageable place to work with AWS: a few services, one trigger, and a result I can trace back to an uploaded file. It also leaves concrete questions to work on. What remains after a failed deletion? What should a second delivery of the same event do? How do I distinguish a bad artifact from a broken validator?")}</p>
            <p className="project-text">{t("I would start with focused tests for those failure paths and retries, then check the complete flow in the local emulator. Pipeline uploads and dashboards can follow once that foundation is clearer.")}</p>
          </section>

          <section aria-labelledby="sources">
            <h2 id="sources" className="project-heading">{t("Code and further reading")}</h2>
            <ul className="project-list">
              <li><a href="https://github.com/DimitriosNicolay/artifactIntakeGate" target="_blank" rel="noopener noreferrer">{t("artifactIntakeGate on GitHub")}</a>{' '}{t("— source code, fixtures and the local setup.")}</li>
              <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html" target="_blank" rel="noopener noreferrer">{t("S3 Event Notifications")}</a>{' '}{t("— the event model behind the upload trigger.")}</li>
              <li><a href="https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-error-handling.html" target="_blank" rel="noopener noreferrer">{t("Asynchronous Lambda error handling")}</a>{' '}{t("— useful context for improving retries.")}</li>
              <li><a href="https://docs.aws.amazon.com/cdk/v2/guide/testing.html" target="_blank" rel="noopener noreferrer">{t("Testing AWS CDK applications")}</a>{' '}{t("— how the template assertions fit in.")}</li>
              <li><a href="https://aws.amazon.com/architecture/icons/" target="_blank" rel="noopener noreferrer">{t("AWS Architecture Icons")}</a>{' '}{t("— official service icons used in the diagrams.")}</li>
            </ul>
          </section>
        </article>
      </div>
    </main>
  );
}
