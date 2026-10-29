import 'server-only';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import githubLight from 'shiki/themes/github-light.mjs';
import githubDark from 'shiki/themes/github-dark.mjs';
import typescript from 'shiki/langs/typescript.mjs';
import bash from 'shiki/langs/bash.mjs';
import nix from 'shiki/langs/nix.mjs';

type CodeLanguage = 'typescript' | 'bash' | 'nix';

// Shared by server renders; highlighting never needs a browser-side engine.
const highlighter = createHighlighterCore({
  themes: [githubLight, githubDark],
  langs: [typescript, bash, nix],
  engine: createJavaScriptRegexEngine(),
});

const labels: Record<CodeLanguage, string> = {
  typescript: 'TypeScript',
  bash: 'Shell',
  nix: 'Nix',
};

export default async function CodeBlock({ children, language }: {
  children: string;
  language: CodeLanguage;
}) {
  const html = (await highlighter).codeToHtml(children, {
    lang: language,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
    mergeSameStyleTokens: true,
  });

  return (
    <div className="code-block" data-language={language}>
      <div className="code-block-label">{labels[language]}</div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
