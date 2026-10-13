# Validação do índice de Pesquisas — 13/10/2026

## Resultado

`npm run quality` terminou com código **0**: **11 testes de configuração e 526 testes de navegador aprovados**, estes em 53,4 segundos. Astro check analisou 56 arquivos com **0 erros, 0 warnings e 0 hints**; o build gerou 38 páginas estáticas. A saída integral está em [quality.txt](quality.txt).

A execução usou Node **24.15.0** e npm **11.12.1**, diferentes das versões fixadas **24.21.0/11.19.0**. Permanece o aviso preexistente de complexidade 15, limite 10, em `tests/e2e/site.spec.ts`, agora na linha 28; não houve supressão ou mudança do limite. Os avisos do runner sobre `NO_COLOR`/`FORCE_COLOR` não impediram a execução.

## Aceitação verificada

- Navegação identificada pelo heading “Explore nossas pesquisas” / “Explore our research”, com listas e hierarquia h2/h3, descrições e quatro links nativos.
- Dois cartões de largura equivalente lado a lado no desktop, empilhados no mobile e a 320 px; histórico em uma faixa complementar abaixo, sem ocupar uma terceira coluna.
- Destinos `#languages`, `#governance-macro`, `#governance-micro` e `#previous-research`, na ordem prevista, ativados por Enter, com sequência de Tab e foco visível nos quatro projetos com e sem JavaScript.
- Conteúdo das linhas, grupos e histórico, Home e demais páginas preservados; metadados, links/fragmentos/assets, acessibilidade axe e publicação em subdiretório continuam cobertos pela suíte completa.
- Mudança dos nomes acessíveis antigos justificada em [quality.md](../../quality.md#contrato-do-índice-de-pesquisas--13102026), mantendo fixtures independentes da implementação. Os dois cenários adicionais rodam nos quatro projetos (oito execuções novas); nenhum teste ou regra foi desativado.

A alteração de produção limita-se ao novo componente estático `ResearchIndex.astro`, seu stylesheet, à integração em `ResearchFocus.astro` e à substituição dos estilos antigos do índice. Não houve alteração de coleções de conteúdo, rotas, Home, dependências ou lockfile. Os ícones são SVG decorativos locais na marcação, sem novas bibliotecas ou JavaScript cliente.

## Revisão visual

As quatro capturas finais do índice PT/EN em desktop/mobile foram examinadas. Títulos e descrições são legíveis; o alinhamento das duas áreas, o histórico separado, os ícones, as setas e a quebra dos links longos estão adequados. A referência foi a segunda imagem anexada pelo mantenedor, usando cartões discretos e a paleta existente. O sublinhado pertence ao texto dos links, preservando setas sem sublinhado.

O [manifesto](captures.json) registra arquivos, idiomas, páginas, viewport real, timestamp e ausência de JavaScript. Os recortes usam largura 1440 ou 390 pixels; para capturar o índice completo no mobile, a altura foi ampliada à seção e registrada, sem modificar o CSS. As verificações automatizadas também usam as viewports convencionais 1440 × 900 e 390 × 844 e conferem o layout a 320 px.

- [PT desktop](screenshots/research-index-pt-desktop.png)
- [PT mobile](screenshots/research-index-pt-mobile.png)
- [EN desktop](screenshots/research-index-en-desktop.png)
- [EN mobile](screenshots/research-index-en-mobile.png)

Prettier, Stylelint e o check do Astro passaram na integração; após salvar este registro, a formatação e `git diff --check` foram conferidos novamente. O preview de revisão foi encerrado antes da suíte para permitir que o Playwright controle seu próprio servidor, conforme o contrato existente.

## Limites

A suíte usa Chromium; Firefox/WebKit e leitores de tela não foram testados. A rede externa permanece bloqueada nos testes. Esta verificação local não confirma disponibilidade dos serviços externos nem publicação na infraestrutura USP.

Nenhum commit, push ou publicação foi realizado.
