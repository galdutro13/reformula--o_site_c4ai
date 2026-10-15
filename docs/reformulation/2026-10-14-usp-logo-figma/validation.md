# Logo da USP em SVG — 14/10/2026

O mantenedor autorizou exportar a reconstrução aprovada no [Figma — USP, nó 1:2](https://www.figma.com/design/ZdQAVjwv4sbWkyCUZFthBK?node-id=1-2) e substituir o logo da USP no site, mantendo proporções e o restante do layout.

## Arquivos e enquadramento

- [usp-logo-original.svg](usp-logo-original.svg) guarda a exportação integral de 912 × 492, em sRGB. Os seis traços continuam editáveis no Figma.
- `public/media/usp-logo-figma.svg` preserva os seis caminhos, grupos, espessuras e a cor `#231F20`. A versão web altera apenas os atributos `width`, `height` e `viewBox` da raiz e remove o retângulo branco do quadro de referência, mantendo a transparência do PNG anterior.
- O arquivo web mantém a área intrínseca de 230 × 100. O enquadramento usa escala uniforme de aproximadamente 0,212615, para acomodar a marca em cerca de 150 × 61 px, com margens de 40 px à esquerda e 20 px acima, como no PNG anterior. Não há distorção nem recorte dos traços.
- O CSS existente continua exibindo a imagem com largura de 180 px e altura proporcional. `src/data/marks.json` passa a apontar para o SVG; o PNG anterior é preservado.
- `Footer.astro`, CSS, dimensões HTML, link para a USP, texto alternativo, carregamento tardio, rotas e logo CIAAM não são modificados por esta troca. O logo C4AI adotado anteriormente permanece.

Esta é a reconstrução vetorial aprovada pelo mantenedor; sua procedência no Figma não a transforma em um arquivo vetorial institucional original. O desfoque da referência raster não integra os traços.

## Validação

`npm run quality` foi executado após a troca. Prettier passou; ESLint/Stylelint passaram com o aviso de complexidade já existente em `tests/e2e/site.spec.ts`; Astro check analisou 67 arquivos sem erros, avisos ou hints; os 21 testes de configuração passaram; o build estático gerou 38 páginas. Playwright não iniciou porque a porta de `http://127.0.0.1:4321` estava ocupada. O servidor existente não foi reutilizado nem encerrado, e a configuração de testes não foi alterada. A suíte completa de navegador não está validada por esta execução.

A comparação específica usou um build estático separado, servido temporariamente na porta 4437. Chromium, com JavaScript desativado, verificou PT e EN em 1440, 390 e 320 px. Nas seis combinações:

- Cabeçalho, `main`, rodapé, região das marcas, imagens USP/CIAAM e região inferior do rodapé mantiveram exatamente suas posições e dimensões anteriores.
- O logo USP continuou em 180 × 78,25 px. O link `https://www.usp.br/`, o texto alternativo e o carregamento da imagem permaneceram funcionais.
- O SVG retornou HTTP 200 e `image/svg+xml`.
- A comparação das capturas encontrou **zero pixels alterados fora do retângulo do logo USP**.

A revisão visual das capturas [desktop PT](footer-pt-desktop.png) e [mobile PT](footer-pt-mobile.png) confirmou o enquadramento e a preservação do restante do rodapé. Os dois SVGs foram analisados como XML: todos os atributos dos seis caminhos são idênticos entre original e versão web; a versão web não contém o retângulo de fundo.

| Arquivo                           | Bytes | SHA-256                                                            |
| --------------------------------- | ----- | ------------------------------------------------------------------ |
| `usp-logo-original.svg`           | 1.466 | `07b3bbce153eb4ea40711f6af351d8f92e10fe2bd5c9d6e1bf007c70dd200ab4` |
| `public/media/usp-logo-figma.svg` | 1.463 | `605c0e01341e2316d7c62ebce8f45ad5d5bb61756702d3046078cf519d18b053` |

Não houve alteração de testes, limites, regras ou exclusões, nem commit, push ou publicação. O trabalho anterior presente no repositório foi preservado.
