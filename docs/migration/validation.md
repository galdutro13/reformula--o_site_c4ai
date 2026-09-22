# Validação da migração — 19/09/2026

`npm run quality` terminou com **saída 0: 464 testes Playwright aprovados**, incluindo 88 verificações axe de páginas e estados expandidos, sem violações nas regras selecionadas. O comando também aprovou formatação, Stylelint, tipagem, quatro testes de configuração e build de 38 HTML. Astro check examinou 47 arquivos, sem erros, avisos ou hints. Veja o [resumo da execução](quality-summary.txt).

O ESLint manteve **um aviso de complexidade 15**, acima do alerta provisório 10, no cenário de metadados/conteúdo que distingue os tipos de página. A análise e a condição de revisão estão na [política de qualidade](../quality.md). Não foram alterados limites, regras, exclusões ou retries. O contrato demonstrativo foi substituído pelo escopo institucional autorizado, com expectativas independentes das coleções.

Ambiente executado: macOS, Node 24.21.0, npm 11.19.0, Astro 7.3.2, TypeScript 6.0.3, Playwright 1.63.0 e axe Playwright 4.13.0. Dependências e lockfile do projeto não foram alterados. A versão exata de Node foi obtida da distribuição oficial e usada nesta sessão; o desenvolvedor deve selecionar `.nvmrc` antes de executar os comandos.

## Cobertura executada

- 38 rotas obrigatórias: entrada, 404, oito páginas principais, 26 artigos e duas paginações. Conteúdo verificado contra 787 trechos de fontes independentes, mais autoria, datas, títulos, descrições e ordenação.
- Chromium em 1440×900 e 390×844, com e sem JavaScript. Todas as páginas também verificadas em largura 320. Navegação, oito pares principais, par real de artigos, ausência de tradução, submenus, painéis, Tab, Shift+Tab, Enter e salto ao conteúdo.
- Links, âncoras, IDs únicos, imagens não vazias e demais recursos locais de todos os HTML compilados. Nenhuma consulta ao WordPress na suíte obrigatória.
- Busca nos acervos PT/EN e carregamento de iframe por ação explícita. Rede externa bloqueada: o teste comprova o comportamento local, sem simular sucesso do provedor.
- Origem de publicação inválida/ausente rejeitada; build real temporário com subdiretório e inspeção de caminhos de HTML, CSS e busca. O domínio usado nesse teste é somente uma expectativa de strings, não o domínio aprovado do projeto.

## Provas de detecção e restauração

Cada alteração foi aplicada isoladamente e revertida em bloco de restauração, inclusive em caso de erro. Foi exigida uma falha específica de asserção; erro de comando ou ausência de testes não contou como prova. Depois da última restauração, o artefato foi recompilado e o comando completo passou.

| Alteração temporária                                                                          | Teste selecionado no projeto `desktop`           | Resultado observado                                                                                    |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Remover `.test-dist/en/about/index.html`                                                      | `site.spec.ts --grep '/en/about/: conteúdo'`     | Esperado HTTP 200, recebido 404; [evidência](probe-missing-page.txt)                                   |
| Trocar o salto da Home PT por `/broken-migration-probe/`                                      | `site.spec.ts --grep 'links, âncoras'`           | Destino inexistente detectado pelo percurso de links; [evidência](probe-broken-link.txt)               |
| Substituir o parágrafo da missão em `research-pt.json`, mantendo esquema válido, e recompilar | `site.spec.ts --grep '/pt/pesquisas/: conteúdo'` | Trecho obrigatório ausente detectado pela fixture independente; [evidência](probe-missing-content.txt) |

Os comandos selecionados usam `npx playwright test … --project=desktop --reporter=line`. As duas primeiras mutações afetam somente o HTML compilado; a terceira prova que um conteúdo estruturalmente válido ainda pode violar o contrato editorial. O [registro estruturado](failure-probes.json) confirma as três restaurações.

## Comparação visual

Foram examinados no navegador os oito destinos principais e dois artigos representativos, em desktop e celular. Há **24 PNGs novos**: 20 capturas desses dez destinos, menu/submenu móvel expandido, painel de equipe expandido e duas capturas suplementares da fonte inglesa atual. O [manifesto](captures.json) registra URL, data, estado e dimensões reais; os arquivos estão em `screenshots/`. A codificação PNG e as dimensões foram conferidas após a captura. As referências de 12/09 permanecem intactas em `../reference/`.

| Página               | Desktop migrado                                        | Celular migrado                                      | Comparação e diferença deliberada                                                         |
| -------------------- | ------------------------------------------------------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Home PT              | [1440×900](screenshots/home-pt-desktop.png)            | [390×844](screenshots/home-pt-mobile.png)            | Ilustração, texto, oito atividades e CTA; seletor em fluxo e foco incorporado             |
| Home EN              | [1440×900](screenshots/home-en-desktop.png)            | [390×844](screenshots/home-en-mobile.png)            | Mesma estrutura da fonte inglesa; links nativos substituem o widget de idioma             |
| Sobre PT             | [1440×900](screenshots/about-pt-desktop.png)           | [390×844](screenshots/about-pt-mobile.png)           | Fotografia e três destaques mantidos; galeria estática substitui slideshow                |
| About EN             | [1440×900](screenshots/about-en-desktop.png)           | [390×844](screenshots/about-en-mobile.png)           | Cabeçalho branco substitui sobreposição; contraste dos destaques revisto                  |
| Pesquisas PT         | [1440×900](screenshots/research-pt-desktop.png)        | [390×844](screenshots/research-pt-mobile.png)        | Oito desafios, cores e ordem; gradiente mais escuro garante leitura                       |
| Research EN          | [1440×900](screenshots/research-en-desktop.png)        | [390×844](screenshots/research-en-mobile.png)        | Mantida a organização; fundos irrecuperáveis removidos, sem substituir conteúdo           |
| Notícias PT          | [1440×900](screenshots/news-pt-desktop.png)            | [390×844](screenshots/news-pt-mobile.png)            | Três cartões estáticos substituem carrossel; listagem, coluna lateral e temas preservados |
| News EN              | [1440×900](screenshots/news-en-desktop.png)            | [390×844](screenshots/news-en-mobile.png)            | Mesma adaptação; artigos portugueses classificados como News não viram traduções          |
| Artigo Best Paper PT | [1440×900](screenshots/post-best-paper-pt-desktop.png) | [390×844](screenshots/post-best-paper-pt-mobile.png) | Destaque fotográfico, título, autoria, data, imagem e coluna lateral; H1 semântico        |
| Artigo Luis Lamb EN  | [1440×900](screenshots/post-lamb-en-desktop.png)       | [390×844](screenshots/post-lamb-en-mobile.png)       | Fotografia, cartaz e metadados preservados; par bilíngue explícito                        |

Os nove primeiros destinos foram comparados com seus PNGs `*-viewport.png` e referências integrais de 12/09. O artigo inglês não tinha captura individual nesse conjunto: foi comparado com a [fonte atual em desktop](screenshots/source-post-lamb-en-desktop.png) e [celular](screenshots/source-post-lamb-en-mobile.png). Essa captura suplementar desktop tem **1440×810**, não 900; a página local correspondente foi capturada em 1440×900. Artefatos de escala dos PNGs longos não foram usados como medida de proporção.

Estados adicionais: [menu e submenu Sobre abertos](screenshots/home-pt-mobile-menu-open.png) e [equipe NLP2 expandida](screenshots/research-pt-mobile-team-open.png). A revisão corrigiu o alinhamento do rótulo Sobre ao topo do submenu móvel. Os testes complementam a inspeção com ausência de transbordamento e acessibilidade dos estados expandidos.

As mudanças de alturas, quebras, tipografia secundária, carrosséis, cabeçalho e contraste são intencionais e estão detalhadas em [migração](../migration.md). A comparação foi humana e amostral, sem teste de igualdade de pixels.

## Limites e pendências

Não foram executados testes em Firefox/WebKit, leitores de tela, dispositivos físicos ou infraestrutura USP; a CI remota não foi acionada. Axe não comprova conformidade integral WCAG. A revisão manual não cobre cada trecho de todas as páginas longas nem certifica acessibilidade editorial de cada cartaz. Os 26 artigos foram validados automaticamente; dois receberam comparação visual individual.

Links externos foram consultados durante a recuperação, separadamente da suíte. Não se garante disponibilidade futura, acesso autenticado a arquivos nem funcionamento integral de vídeos, mapa ou agenda. Nenhum formulário ou mensagem foi enviado.

Continuam pendentes aprovação institucional, traduções ausentes, contatos divergentes, direitos das imagens, identificação dos dois subprojetos, destinos definitivos dos acervos e configuração USP. Não houve commit, push, publicação ou redirecionamento de servidor.

## Correções P2 — 22/09/2026

Regressões adicionadas antes de modificar os componentes, executadas com `npm run build:local` e `npx playwright test tests/e2e/progressive.spec.ts --project=desktop --project=mobile --reporter=line`: **12 falhas esperadas e quatro testes existentes aprovados**. Em ambos os tamanhos, o workshop PT/EN enviava requisição sem `Referer`; as frases `o Laboratório Virtual`, sua variante com caixa/espaços/acentos e `CEO & Founder` não encontravam seus artigos, enquanto `html` retornava os 14 artigos portugueses.

Após as correções, a mesma execução direcionada, acrescida da fixture de HTML inerte, terminou com **18 testes aprovados**. Foi verificada a requisição com somente a origem para o YouTube e a preservação de `no-referrer` para mapa e agenda; a rede externa permaneceu bloqueada. O teste adicional de extração recursiva também passou. A fixture sintética existe somente no transporte do teste e não modifica conteúdo editorial. Os registros de 19/09 acima permanecem históricos.

Ambiente desta correção: Node **24.15.0** e npm **11.12.1**, disponíveis na sessão. Diferem das versões fixadas no projeto (24.21.0/11.19.0); não houve instalação nem alteração de manifestos/lockfile. A execução nessas versões exatas e na CI remota não foi realizada nesta correção.

Resultado final: `npm run quality` terminou com código **0** — Prettier, ESLint/Stylelint, Astro check (**zero erros/avisos/hints**), **cinco testes de configuração/extração**, build de **38 HTML** e **478 testes Playwright aprovados** em desktop/mobile com e sem JavaScript. Permanece apenas o aviso de complexidade preexistente em `tests/e2e/site.spec.ts`. O teste de publicação verificou `BASE_PATH=/centro/`. Não houve commit, push ou publicação; disponibilidade integral dos provedores externos continua fora desta validação.
