# Validação da complementação HarpIA — 13/10/2026

## Resultado

`npm run quality` terminou com código **0**, com **11 testes de configuração e 534 testes de navegador aprovados**, estes em **53,0 s**. Astro check analisou 57 arquivos, com **0 erros, 0 warnings e 0 hints**; o build gerou 38 páginas estáticas. A saída integral está em [quality.txt](quality.txt).

A execução usou Node **24.15.0** e npm **11.12.1**, diferentes das versões fixadas **24.21.0/11.19.0**. Permanece o aviso preexistente de complexidade 15, limite 10, em `tests/e2e/site.spec.ts`, agora na linha 29, sem supressão. Os avisos `NO_COLOR`/`FORCE_COLOR` do runner não impediram os testes.

O preview existente foi encerrado pelo comando `npm run preview:local -- stop` antes da suíte para permitir que o Playwright controlasse seu próprio servidor. Depois dos testes, o preview foi restaurado no mesmo endereço local, `http://127.0.0.1:4321/`, para revisão.

## Aceitação

- A síntese inicial e o link principal HarpIA permanecem obrigatórios; a fixture acrescenta os novos textos de apresentação, lideranças e orientação de uso.
- Dois painéis na ordem Equipe/Recursos (Team/Resources), inicialmente fechados e acionáveis com Enter e foco visível. A abertura e o fechamento foram verificados em PT/EN nos quatro projetos Chromium, com e sem JavaScript: oito execuções novas, além da cobertura prévia de painéis e acessibilidade.
- O rótulo “Líderes” / “Leaders”, a equipe selecionada, os créditos, seis destinos de recursos e formulário oficial foram verificados por expectativas independentes. A ausência de `#harpia-modules` é exigida em PT/EN conforme a solicitação posterior do mantenedor.
- HarpIA Recursos é identificado como em construção no link correspondente. As descrições detalhadas dos módulos foram retiradas junto com seu painel. Não há emails herdados de KEML, exemplos demonstrativos do rodapé externo, iframes ou formulário embutido.
- Os testes de agrupamento Macro/Micro, histórico KEML, demais registros, índice de navegação, metadados, links/fragmentos/assets, axe, responsividade, 320 px e publicação em subdiretório continuam aprovados.

A mudança legítima do requisito anterior (um link e nenhum painel), seguida da retirada autorizada de Módulos está justificada no [registro editorial](editorial.md) e em `docs/quality.md`. Não houve redução de regras, limites, exclusões ou retries; os textos de pesquisa anteriormente protegidos continuam na fixture.

## Revisão visual

As **oito capturas PT/EN desktop/mobile**, fechadas e expandidas, foram examinadas. A apresentação, rótulo Líderes/Leaders, equipe e links são legíveis; os painéis respeitam a coluna e o empilhamento móvel, sem cortes, sobreposição ou transbordamento observados. Os ícones e o estilo dos painéis provêm dos componentes e CSS já existentes.

O [manifesto](captures.json) registra páginas, idiomas, estados, viewport real e timestamp. As larguras são 1440 e 390 px. Para capturar integralmente as seções, a altura de viewport foi ampliada ao conteúdo e registrada; não se modificou CSS para produzir as imagens. Os testes usam também as viewports convencionais 1440 × 900 e 390 × 844.

- [PT fechado](screenshots/harpia-pt-desktop-closed.png) e [expandido](screenshots/harpia-pt-desktop-expanded.png).
- [PT móvel fechado](screenshots/harpia-pt-mobile-closed.png) e [expandido](screenshots/harpia-pt-mobile-expanded.png).
- [EN fechado](screenshots/harpia-en-desktop-closed.png) e [expandido](screenshots/harpia-en-desktop-expanded.png).
- [EN móvel fechado](screenshots/harpia-en-mobile-closed.png) e [expandido](screenshots/harpia-en-mobile-expanded.png).

## Preservações e limites

A comparação de hashes com o estado inicial confirmou que esta tarefa alterou somente os dois registros HarpIA, quatro arquivos de requisitos/testes existentes e os três documentos de requisitos/qualidade/reformulação. Foram acrescentados o teste específico HarpIA e os registros/evidências desta etapa. O trabalho anterior no índice de Pesquisas, seus componentes, CSS e evidências foi preservado; entre os arquivos compartilhados, só foram acrescentados o contrato, a importação do teste e a documentação correspondente. Não foram alterados schemas, dependências, lockfile, rotas, notícias, artigos ou registros históricos.

As fontes foram consultadas separadamente, conforme [editorial.md](editorial.md). A suíte bloqueia a rede externa e não confirma o funcionamento do formulário do projeto, seus módulos de software ou suas instâncias. Nenhuma mensagem foi enviada e nenhum módulo HarpIA foi instalado/executado. Firefox/WebKit e leitores de tela não foram testados.

A formatação e `git diff --check` foram verificados novamente após salvar as evidências. Não houve commit, push ou publicação.
