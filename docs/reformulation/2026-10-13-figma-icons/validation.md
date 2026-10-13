# Validação das ilustrações do Figma — 13/10/2026

## Resultado

`npm run quality` terminou com código **0**: **15 testes de configuração e 566 testes de navegador aprovados**, estes em 54,1 segundos. Astro check analisou 61 arquivos com **0 erros, 0 warnings e 0 hints**; o build gerou 38 páginas estáticas. A saída integral está em [quality.txt](quality.txt).

O ambiente utiliza Node **24.15.0** e npm **11.12.1**, diferentes das versões fixadas **24.21.0/11.19.0**. Permanece o aviso preexistente de complexidade 15, limite 10, em `tests/e2e/site.spec.ts:30`, sem supressão. Os avisos de `NO_COLOR`/`FORCE_COLOR` do runner não impediram a execução.

## Integração e verificação

As duas ilustrações exportadas do Figma são imagens locais estáticas: balões no cabeçalho de NLP2 e penas/geometria no de ProIndL, em PT/EN. Uma comparação byte a byte com os arquivos baixados confirmou que ambos permaneceram íntegros; dimensões, bytes e hashes coincidem com o [registro de origem](editorial.md). Não foram redesenhados ou incorporados como caminhos inline.

O componente usa `withBase` para os caminhos locais, atributos `width="240"` e `height="240"`, `alt=""` e `aria-hidden="true"`. A coluna reservada do cabeçalho passou a ter 240 px, preservando o tamanho intrínseco dos exports. Foram removidas as regras de preenchimento e de escala das ilustrações anteriores. A inspeção confirmou renderização de **240 × 240 px** no desktop e tablet, sem sobreposição com o texto, com o fundo orgânico e a geometria presentes no export.

Os oito testes de navegador adicionais exigem associações explícitas entre projeto e arquivo, carregamento local, dimensões naturais, proporção quadrada, decoração acessível e encaixe no cabeçalho. Rodam em PT/EN nos quatro projetos Chromium, inclusive sem JavaScript. A 320 px exigem a ocultação das ilustrações grandes, comportamento anterior, e ausência de transbordamento. As verificações existentes de conteúdo, teclado, painéis, alinhamento, acessibilidade, links e publicação em subdiretório permaneceram e passaram. Nenhum teste, regra, limite, retry ou exclusão foi reduzido.

Uma verificação adicional em PT/EN, sem JavaScript, inspecionou as larguras 600, 601, 1039, 1040, 1100, 1200 e 1440 px, incluindo os limites das mudanças de layout. Nas 14 combinações não houve transbordamento da página nem linhas dos títulos e resumos excedendo a coluna de texto.

## Revisão visual

Foram geradas e examinadas **seis capturas finais**, com cards fechados e JavaScript desabilitado: PT/EN em desktop de 1440 px, tablet de 800 px e celular de 390 px. O [manifesto](captures.json) registra caminho, viewport real, timestamp, geometria das imagens e ausência de transbordamento. A altura da viewport foi ampliada para capturar toda a seção; essa altura está registrada no manifesto.

- [PT desktop](screenshots/languages-pt-desktop.png)
- [PT tablet](screenshots/languages-pt-tablet.png)
- [PT celular](screenshots/languages-pt-mobile.png)
- [EN desktop](screenshots/languages-en-desktop.png)
- [EN tablet](screenshots/languages-en-tablet.png)
- [EN celular](screenshots/languages-en-mobile.png)

Conferi desenhos, associação aos projetos, transparência, ausência de deformação ou corte, espaçamento com os textos e alinhamento das faixas dos cards no desktop. No tablet os cards empilham e mantêm as ilustrações; no celular seguem sem as ilustrações grandes e utilizam a largura disponível. As duas capturas de celular foram reduzidas pela ferramenta de visualização, permitindo avaliar o fluxo e os cortes; conteúdo e geometria também foram conferidos pelos testes. Os estados expandidos permanecem cobertos pela suíte e pela evidência anterior dos cards, sem novas capturas nesta substituição de assets.

## Escopo e limites

Conteúdo, traduções, pequenos símbolos, contatos, equipes, recursos, âncoras e controles não receberam alterações nesta etapa. A revisão independente delimitada da integração não encontrou defeitos concretos. Os registros anteriores foram preservados. A integração não acrescenta dependências, páginas ou JavaScript cliente.

A revisão visual desta etapa limita-se aos cards e usa Chromium; não foram examinados Firefox/WebKit ou leitores de tela. Axe e teclado não certificam conformidade WCAG integral. A disponibilidade futura do arquivo remoto do Figma não afeta os SVGs servidos localmente. Não houve commit, push ou publicação.
