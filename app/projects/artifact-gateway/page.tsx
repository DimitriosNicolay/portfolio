import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Artifact Gateway: Artefakte prüfen mit S3, Lambda und DynamoDB | Dimitrios Nicolay',
  description: 'Mein AWS-Lernprojekt mit CDK und TypeScript: Uploads prüfen, Ergebnisse speichern und Fehlerpfade nachvollziehen. Mit Architektur, Tests und offenen Grenzen.',
  openGraph: {
    locale: 'de_DE',
    type: 'article',
    title: 'Artifact Gateway: Was nach dem Upload passiert',
    description: 'Ein kleines AWS-Lernprojekt mit S3, Lambda, DynamoDB und nachvollziehbaren Grenzen.',
  },
};

export default function ArtifactGatewayProject() {
  return (
    <main lang="de" className="project-main">
      <ThemeToggle />
      <div className="project-container">
        <header className="project-header max-w-3xl mx-auto">
          <Link href="/#projects" className="project-back-link">← Zurück zu den Projekten</Link>
          <p className="text-sm tracking-wide text-gray-600 dark:text-gray-400 mb-4">AWS · Lernprojekt</p>
          <h1 className="project-title">Artifact Gateway: Was nach dem Upload passiert</h1>
          <p className="project-text max-w-3xl text-lg mb-8">
            Mit S3, Lambda und DynamoDB prüfe ich, ob eine hochgeladene Datei zu ihrem Manifest passt.
            Der interessante Teil liegt zwischen dem Upload und einem verlässlich nachvollziehbaren Ergebnis.
          </p>
          <div className="project-tags">
            {['AWS CDK', 'TypeScript', 'S3', 'Lambda', 'DynamoDB'].map(tag => <span key={tag} className="project-tag">{tag}</span>)}
          </div>
          <div className="project-divider" />
        </header>

        <article className="project-article max-w-3xl mx-auto">
          <section className="project-section" aria-labelledby="anlass">
            <h2 id="anlass" className="project-heading">Von AWS-Theorie zu einem überschaubaren Ablauf</h2>
            <p className="project-text">
              Ich hatte theoretisches AWS-Wissen, aber wenig praktische Erfahrung. Mit diesem Projekt wollte ich
              nachvollziehen, wie einige Dienste zusammenspielen, von der Infrastrukturdefinition bis zum Prüfen
              eines vollständigen Ablaufs. Dafür habe ich den Umfang bewusst klein gehalten: eine Datei hochladen,
              sie prüfen und das Ergebnis festhalten.
            </p>
            <p className="project-text">
              Mein Artifact Gateway besteht aus einer Payload und einem JSON-Manifest. Das Manifest beschreibt
              Version, Commit, Build-Zeitpunkt und die erwartete SHA-256-Prüfsumme der Datei. Ein Upload allein
              sagt noch nichts darüber aus, ob beide zusammenpassen. Genau diese Prüfung übernimmt eine Lambda-Funktion.
              Im Repository heißt das Projekt <code>artifactIntakeGate</code>.
            </p>
          </section>

          <section className="project-section" aria-labelledby="architektur">
            <h2 id="architektur" className="project-heading">Ein Manifest als Startsignal</h2>
            <p className="project-text">
              Die Infrastruktur beschreibe ich mit AWS CDK in TypeScript. Der Stack legt einen S3-Bucket,
              eine DynamoDB-Registry, die Lambda-Funktion mit Node.js 24 und einen CloudWatch-Alarm an.
              S3 löst die Funktion bei neuen Objekten aus, deren Schlüssel auf <code>manifest.json</code> endet.
              Eine eigene HTTP-API braucht dieser Ablauf nicht.
            </p>
            <figure className="project-card max-w-xl mx-auto">
              <Image
                src="/images/projects/artifact-gateway/architecture.svg"
                alt="Upload in S3 löst Lambda aus. Lambda liest Manifest und Payload, schreibt das Ergebnis nach DynamoDB und löscht bei Ablehnung beide S3-Objekte. CloudWatch überwacht Lambda-Fehler."
                width={800} height={1240} className="w-full h-auto"
              />
              <figcaption className="project-card-caption project-card-caption-text text-gray-600 dark:text-gray-400">
                Aus dem CDK-Stack abgeleitet. CDK definiert die Ressourcen und Berechtigungen; es verarbeitet selbst keine Uploads.
              </figcaption>
            </figure>
            <p className="project-text">
              Die Reihenfolge ist wichtig: Zuerst lade ich <code>payload.txt</code> hoch, danach das Manifest
              im selben Verzeichnis. Die Dateinamen sind Teil der aktuellen Implementierung. Die Funktion leitet
              den Payload-Schlüssel durch Ersetzen von <code>manifest.json</code> durch <code>payload.txt</code> ab.
              Eine beliebige Datei unter einem anderen Namen wird dadurch noch nicht unterstützt.
            </p>
            <p className="project-text">
              Die Funktion darf im Bucket lesen und löschen sowie auf die Registry zugreifen. Den Tabellennamen
              übergibt CDK als Umgebungsvariable. So bleibt die Verbindung im Stack beschrieben, auch wenn sich
              der von CDK erzeugte physische Name ändert.
            </p>
          </section>

          <section className="project-section" aria-labelledby="pruefung">
            <h2 id="pruefung" className="project-heading">Was ich tatsächlich prüfe</h2>
            <p className="project-text">
              Nach dem Einlesen des Manifests prüft der Handler, ob die vier Felder <code>version</code>,
              <code>commitSha</code>, <code>checksum</code> und <code>buildTimestamp</code> Strings sind.
              Anschließend lädt er die Payload als Bytes, berechnet ihren SHA-256-Hash und vergleicht ihn
              mit dem Wert im Manifest. Der entscheidende Ausschnitt aus dem Handler:
            </p>
            <pre><code>{`const calculatedChecksum = createHash("sha256")
  .update(payloadBytes ?? new Uint8Array())
  .digest("hex");
const isChecksumValid = calculatedChecksum === manifest.checksum;`}</code></pre>
            <p className="project-text">
              Der Vergleich beantwortet eine konkrete Frage: Stimmen die geladenen Bytes mit der angegebenen
              Prüfsumme überein? Eine Signatur oder einen vertrauenswürdigen Ursprung bestätigt er nicht.
              Wer Datei und Manifest austauschen kann, kann auch eine neue passende Prüfsumme hinterlegen.
            </p>
            <p className="project-text">
              Ebenso ist die Metadatenprüfung bisher eine Typprüfung. Sie validiert weder das Format einer
              Commit-ID noch einen gültigen Zeitpunkt oder eine Versionskonvention. Auch leere Strings erfüllen
              diese Prüfung. Diese Grenze ist wichtig, wenn aus dem Lernprojekt später ein Eingang für echte
              Build-Artefakte werden soll.
            </p>
          </section>

          <section className="project-section" aria-labelledby="ergebnis">
            <h2 id="ergebnis" className="project-heading">Die Registry bleibt, die abgelehnten Dateien gehen</h2>
            <p className="project-text">
              Bei übereinstimmender Prüfsumme schreibe ich <code>approved</code> zusammen mit den Metadaten und
              dem Prüfzeitpunkt in DynamoDB. Die beiden S3-Objekte bleiben erhalten. Als Schlüssel verwende ich
              die S3-URI des Manifests, beispielsweise <code>s3://bucket/build42/manifest.json</code>.
              Ein erneuter Durchlauf für denselben Schlüssel ersetzt den Eintrag. Eine Versionshistorie entsteht so nicht.
            </p>
            <figure className="project-card max-w-xl mx-auto">
              <Image
                src="/images/projects/artifact-gateway/validation.svg"
                alt="Nach der Prüfung führt Zustimmung zum Registry-Eintrag approved mit erhaltenen Dateien. Ungültige Pflichtfelder oder eine falsche Prüfsumme führen zu rejected, danach zur Löschung von Manifest und Payload und schließlich zu einem geworfenen Fehler."
                width={800} height={1320} className="w-full h-auto"
              />
              <figcaption className="project-card-caption project-card-caption-text text-gray-600 dark:text-gray-400">
                Die Reihenfolge im Ablehnungspfad ist Teil des Codes: erst den Grund speichern, dann beide Objekte löschen, danach einen Fehler werfen.
              </figcaption>
            </figure>
            <p className="project-text">
              Fehlen Pflichtfelder oder stimmt die Prüfsumme nicht, speichert die Funktion <code>rejected</code>
              mit einem Grund. Erst danach löscht sie Manifest und Payload. Dadurch bleibt ein Registry-Eintrag
              zurück, obwohl die Dateien entfernt werden. Das ist jedoch keine Transaktion: Scheitert eine
              Löschung, kann bereits ein abgelehnter Eintrag existieren, während noch ein Objekt im Bucket liegt.
            </p>
            <p className="project-text">
              Nach einer vollständig ausgeführten Ablehnung wirft der Handler ebenfalls einen Fehler.
              Der CloudWatch-Alarm überwacht Lambda-Fehler mit Schwellenwert 1 und einer Auswertungsperiode.
              Damit können fachliche Ablehnungen und technische Ausfälle dieselbe Fehlermetrik erhöhen.
              Eine Alarm-Benachrichtigung, etwa über SNS, ist im Stack noch nicht eingerichtet.
            </p>
          </section>

          <section className="project-section" aria-labelledby="tests">
            <h2 id="tests" className="project-heading">Acht Tests und eine klare Grenze ihrer Aussage</h2>
            <p className="project-text">
              Für diesen Beitrag habe ich den aktuellen Quellstand in einer isolierten Arbeitskopie geprüft.
              Die TypeScript-Prüfung und alle acht vorhandenen Jest-Tests waren am 29. Oktober 2026 erfolgreich.
              Die Prüfung lief unter Node.js 26.8.2; die im Stack konfigurierte Lambda-Laufzeit ist Node.js 24.
              Die üblichen Projektbefehle sind:
            </p>
            <pre><code>{`npm run build
npm test -- --runInBand`}</code></pre>
            <p className="project-text">
              Fünf Tests prüfen das erzeugte Infrastruktur-Template: Bucket-Anzahl, Registry-Schlüssel,
              Alarmkonfiguration, Lambda-Laufzeit und die Referenz auf den Tabellennamen. Drei weitere Tests
              rufen den Handler mit gemockten AWS-SDK-Aufrufen auf. Sie prüfen die Freigabe einer passenden Payload,
              die Ablehnung einer falschen Prüfsumme und die Ablehnung eines Manifests ohne <code>commitSha</code>.
              Dazu gehören die Registry-Schreibaufrufe und die erwarteten Löschaufrufe an S3.
            </p>
            <p className="project-text">
              Damit sind diese Verzweigungen und die geprüften Template-Eigenschaften belegt. Die Tests weisen
              keinen erfolgreichen Upload über einen realen S3-Trigger und keine tatsächliche Speicherung in AWS nach.
              Für diesen Artikel habe ich weder einen Cloud-Stack ausgerollt noch einen vollständigen Emulatorlauf
              ausgeführt. Im Repository ist dafür ein lokaler Ablauf mit floci und Docker beschrieben.
            </p>
            <p className="project-text">
              Auch die Testumgebung hatte eine Grenze: Der erste Jest-Start scheiterte am nativen SWC-Modul und
              dessen Cache-Prüfung in der Sandbox, bevor Tests liefen. In der isolierten Kopie außerhalb dieser
              Sandbox liefen beide Suites erfolgreich. Das war ein Problem der lokalen Testausführung;
              am Validator war dafür keine Änderung nötig.
            </p>
          </section>

          <section className="project-section" aria-labelledby="grenzen">
            <h2 id="grenzen" className="project-heading">Wo der Ablauf noch robuster werden muss</h2>
            <p className="project-text">
              Der kleine Umfang macht die Zusammenhänge sichtbar, aber auch die offenen Stellen. Ein sinnvoller
              nächster Ausbau liegt deshalb im Fehler- und Ereignisverhalten:
            </p>
            <ul className="project-list">
              <li>
                <strong>Unlesbares Manifest oder fehlende Payload.</strong> Ungültiges JSON scheitert schon beim
                Parsen. Ein fehlendes S3-Objekt scheitert beim Lesen. Diese Fehler führen bisher nicht gezielt
                durch den dokumentierten Ablehnungspfad mit Registry-Eintrag und Bereinigung.
              </li>
              <li>
                <strong>Mehrere und wiederholte Ereignisse.</strong> Der Handler verarbeitet nur <code>Records[0]</code>.
                Eine Verarbeitung aller Records, ein ausdrücklicher Umgang mit Duplikaten und belastbare Retries
                sind noch offen. Gerade das Löschen vor dem geworfenen Fehler macht Wiederholungen interessant.
              </li>
              <li>
                <strong>Größe und Identität.</strong> Die Payload wird vollständig in den Arbeitsspeicher geladen.
                Streaming, Größenlimits und unveränderliche Upload-Identitäten wären für größere Artefakte
                beziehungsweise gleichzeitige Uploads unter demselben Schlüssel zu klären.
              </li>
              <li>
                <strong>Beobachtung und Aufbewahrung.</strong> Fachliche Ablehnung und Infrastrukturfehler brauchen
                getrennte Signale. Historie, Alarm-Actions und eine Aufbewahrungsstrategie sind mögliche nächste Schritte.
              </li>
            </ul>
            <p className="project-text">
              Ein weiterer Rahmen ist direkt im CDK-Code sichtbar: Bucket und Tabelle verwenden
              <code>RemovalPolicy.DESTROY</code>. Das passt zu einer wegwerfbaren Lernumgebung, ist aber eine
              bewusste Prüfaufgabe vor einer dauerhaften Nutzung. Der Bucket wird nicht automatisch geleert;
              vorhandene Objekte müssen beim Aufräumen berücksichtigt werden.
            </p>
          </section>

          <section className="project-section" aria-labelledby="fazit">
            <h2 id="fazit" className="project-heading">Ein nachvollziehbarer Einstieg in ereignisgesteuerte Infrastruktur</h2>
            <p className="project-text">
              An diesem Projekt kann ich den Weg vom Infrastrukturcode bis zur fachlichen Entscheidung an wenigen
              Dateien zeigen. S3 gibt den Anstoß, Lambda prüft die Daten und DynamoDB hält das Ergebnis fest.
              Der Ablauf macht deutlich, dass der erfolgreiche Pfad nur einen Teil der
              Verarbeitung erklärt: Ebenso wichtig sind die Reihenfolge der Seiteneffekte und der Zustand, der nach
              einem Fehler übrig bleibt.
            </p>
            <p className="project-text">
              Für die Weiterentwicklung würde ich zuerst die offenen Fehlerpfade und Wiederholungen mit gezielten
              Tests absichern. Darauf lässt sich eine vollständige Prüfung im lokalen Emulator aufbauen,
              bevor zusätzliche Funktionen wie eine Pipeline-Anbindung oder Dashboards dazukommen.
            </p>
          </section>

          <section aria-labelledby="quellen">
            <h2 id="quellen" className="project-heading">Code und weiterführende Quellen</h2>
            <ul className="project-list">
              <li><a href="https://github.com/DimitriosNicolay/artifactIntakeGate" target="_blank" rel="noopener noreferrer">Repository artifactIntakeGate</a> mit Quellcode, Fixtures und lokalem Ablauf.</li>
              <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html" target="_blank" rel="noopener noreferrer">S3 Event Notifications</a> für das Ereignismodell hinter dem Upload-Trigger.</li>
              <li><a href="https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-error-handling.html" target="_blank" rel="noopener noreferrer">Fehlerbehandlung asynchroner Lambda-Aufrufe</a> als Grundlage für den nächsten Ausbau der Retries.</li>
              <li><a href="https://docs.aws.amazon.com/cdk/v2/guide/testing.html" target="_blank" rel="noopener noreferrer">AWS CDK testen</a> zur Einordnung der Template-Assertions.</li>
            </ul>
          </section>
        </article>
      </div>
    </main>
  );
}
