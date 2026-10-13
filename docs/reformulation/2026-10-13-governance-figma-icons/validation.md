# Validação das ilustrações OBIA/HarpIA do Figma — 13/10/2026

## Resultado

`npm run quality` terminou com código **0**: **21 testes de configuração e 606 testes de navegador aprovados**, nos quatro projetos Chromium desktop/mobile com e sem JavaScript. Astro check analisou 64 arquivos com **0 erros, 0 warnings e 0 hints**; o build gerou 38 páginas estáticas. A saída integral está em [quality.txt](quality.txt).

O ambiente utiliza Node **24.15.0** e npm **11.12.1**, diferentes das versões fixadas **24.21.0/11.19.0**. Permanece o aviso preexistente de complexidade 15, limite 10, em `tests/e2e/site.spec.ts:31`, sem supressão. Os avisos de `NO_COLOR`/`FORCE_COLOR` do runner não impediram a execução.

## Fidelidade e preservação

Foram usados os exports SVG completos dos componentes Figma `2:18` (OBIA) e `2:43` (HarpIA), conforme o [registro de origem](editorial.md). O export de OBIA inclui olho, conexões e fundo orgânico. O export de HarpIA inclui fundo, penas, corpo/circuitos e cabeça na composição fornecida. Os arquivos não foram redesenhados, recortados, recoloridos ou incorporados como paths inline.

Uma comparação byte a byte confirmou igualdade entre os downloads originais e os dois arquivos em `public/media/`. Os novos testes de configuração exigem bytes, SHA-256 e raiz/viewBox de 240 × 240 dos exports fornecidos; as expectativas não são regeneradas a partir da aplicação.

O componente continua usando `<img>` local com `withBase`, `width="240"`, `height="240"`, `alt=""` e `aria-hidden="true"`. As oito verificações adicionais de navegador exigem associação correta por projeto em PT/EN, carregamento, tamanho natural e renderizado, proporção quadrada e encaixe no cabeçalho sem sobreposição. A 320 px preservam a ocultação das ilustrações grandes e a ausência de transbordamento. As verificações existentes de línguas, conteúdo, Macro/Micro, painéis, teclado, axe, links e publicação em subdiretório passaram. Nenhum teste, regra, limite, retry ou exclusão foi reduzido.

Uma comparação de hashes com o estado inicial da tarefa confirmou que o único arquivo de produção anterior alterado foi `ResearchProjectIllustration.astro`, nas duas referências de imagem. Conteúdo, traduções, CSS, hierarquia, contatos, âncoras, painéis e pequenos símbolos permaneceram idênticos. Os SVGs de NLP2/ProIndL e as ilustrações anteriores de OBIA/HarpIA também permaneceram íntegros; as artes anteriores deixam de ser selecionadas nos cards e continuam disponíveis como evidência do trabalho precedente.

## Revisão visual

Foram geradas e examinadas **seis capturas finais**, com painéis fechados e JavaScript desabilitado: PT/EN em desktop de 1440 px, tablet de 800 px e celular de 390 px. O [manifesto](captures.json) registra viewport real, timestamp, geometria das imagens e ausência de transbordamento. A altura da viewport foi ampliada para capturar a seção completa e está registrada no manifesto; os testes usam também alturas convencionais.

Conferi a correspondência com as referências visuais dos componentes Figma: olho/rede no card OBIA e ave/circuitos no card HarpIA, com formas, fundos transparentes e cores preservados. A dimensão natural e renderizada é **240 × 240 px** em desktop/tablet, na coluna existente, sem deformação, corte ou colisão com o texto. No celular os desenhos grandes continuam ocultos, mantendo o espaço dos textos e controles. Os painéis expandidos permanecem cobertos pela suíte e pela evidência anterior dos cards, sem novas capturas expandidas nesta substituição de assets.

- [PT desktop](screenshots/governance-pt-desktop.png)
- [PT tablet](screenshots/governance-pt-tablet.png)
- [PT celular](screenshots/governance-pt-mobile.png)
- [EN desktop](screenshots/governance-en-desktop.png)
- [EN tablet](screenshots/governance-en-tablet.png)
- [EN celular](screenshots/governance-en-mobile.png)

As capturas de tablet e celular foram reduzidas pela ferramenta de visualização. Serviram para avaliar fluxo e ausência de cortes; os detalhes dos desenhos foram conferidos nas capturas desktop e nas referências Figma, e a geometria foi medida pelos testes e pelo manifesto.

## Limites e estado

Não foram testados Firefox/WebKit, leitores de tela ou disponibilidade futura do arquivo remoto do Figma. A renderização do site usa os arquivos locais e não depende das URLs temporárias de exportação. Axe e teclado não certificam conformidade WCAG integral. A consulta ao Figma registra a procedência visual e não altera as datas de coleta dos conteúdos institucionais.

A implementação mantém Astro estático, TypeScript estrito e CSS nativo, sem novas dependências, páginas ou JavaScript cliente. Os registros anteriores foram preservados. Após salvar este registro, a formatação e `git diff --check` foram conferidos novamente. Não houve commit, push ou publicação.
