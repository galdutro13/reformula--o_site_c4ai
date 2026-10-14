# Logo do cabeçalho em SVG — 14/10/2026

O mantenedor solicitou exportar a versão aprovada no [Figma — C4AI, nó 4:2](https://www.figma.com/design/WviBHrbW202GAagNGh4ryD?node-id=4-2) e substituir o logo do site, preservando proporções e o restante do layout.

## Arquivos e enquadramento

- [c4ai-logo-original.svg](c4ai-logo-original.svg) guarda a exportação integral de 1328 × 488 do Figma, em sRGB e com letras convertidas em caminhos. O documento Figma mantém os três textos editáveis.
- `public/media/c4ai-logo-figma.svg` preserva todos os caminhos, preenchimentos e grupos da exportação. Somente `width`, `height` e `viewBox` do elemento raiz foram adaptados para o encaixe no cabeçalho.
- A área externa continua em 181 × 72 px. O `viewBox="245 28.421052632 952.631578947 378.947368421"` aplica escala uniforme de 0,19 e ajusta as margens vazias do quadro de referência: a marca ocupa aproximadamente 171 × 61 px, iniciando na margem esquerda e a 6 px do topo, como o PNG anterior. Não há distorção ou recorte do desenho.
- `src/data/marks.json` passa a apontar para o SVG. O PNG anterior permanece disponível. `Header.astro`, CSS, rotas, texto alternativo e navegação não são modificados por esta substituição.

A cor permanece `#00707E`; o branco de fundo já corresponde ao cabeçalho. As letras vetorizadas preservam a aparência da aproximação Montserrat Bold aprovada, sem baixar ou instalar fontes no navegador. Esta exportação não altera a limitação tipográfica registrada na reconstrução nem afirma que a aproximação seja o arquivo institucional original.

## Validação

`npm run quality` foi executado após a troca. Prettier passou; ESLint/Stylelint passaram com o aviso de complexidade já existente em `tests/e2e/site.spec.ts`; Astro check analisou 67 arquivos sem erros, avisos ou hints; os 21 testes de configuração passaram e o build estático gerou 38 páginas. Playwright não iniciou porque `http://127.0.0.1:4321` já estava ocupado por uma prévia existente. Não foi reutilizado nem encerrado esse servidor, e não foram alteradas as verificações para contornar o bloqueio. A suíte completa de navegador não está validada por esta execução.

A comparação específica usou um build estático separado, servido temporariamente na porta 4437. Em Chromium com JavaScript desativado, PT e EN foram verificados nas larguras de 1440, 390 e 320 px. Nas seis combinações:

- Logo, link da marca, cabeçalho, linha de navegação, barra de idiomas e início de `main` mantiveram exatamente as mesmas posições e dimensões de antes da troca.
- A imagem continuou em 181 × 72 px, com texto alternativo preservado. O novo SVG retornou HTTP 200 e `image/svg+xml`.
- A comparação dos pixels das capturas do cabeçalho encontrou **zero pixels alterados fora do retângulo do logo**.
- O desenho permaneceu sem distorção; a revisão visual das capturas desktop e mobile confirmou o encaixe.

Capturas do resultado: [desktop PT](header-pt-desktop.png) e [mobile PT](header-pt-mobile.png).

O XML dos dois SVGs foi validado. Ambos contêm seis caminhos: três formas do símbolo e três linhas de texto vetorizadas. A comparação textual confirmou que todo o conteúdo após a tag de abertura do SVG é idêntico nas versões integral e web.

| Arquivo                            | Bytes  | SHA-256                                                            |
| ---------------------------------- | ------ | ------------------------------------------------------------------ |
| `c4ai-logo-original.svg`           | 21.373 | `ec09ed0b9ead640a1bae4c65eb7680a296d28fa4a56f05767da57e85db15c303` |
| `public/media/c4ai-logo-figma.svg` | 21.403 | `5b7bd5769232b1a590843aa26d280eaed19bc96b181b9fec737f31ada1bbd512` |

Não houve alteração de testes, limites, regras ou exclusões nesta tarefa; não houve commit, push ou publicação. Alterações de outras tarefas já presentes na árvore de trabalho foram preservadas.
