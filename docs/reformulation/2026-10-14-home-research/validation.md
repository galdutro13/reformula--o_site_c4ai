# Validação dos cards de linhas de pesquisa da Home — 14/10/2026

## Resultado

O redesign de “Nossas linhas de pesquisa” foi implementado em PT/EN e a execução isolada de `npm run quality` terminou com código 0: **21 testes de configuração e 638 testes de navegador passaram**, sem retries. A [saída completa](quality.txt) registra os resultados reais. Foram acrescentadas 32 execuções para os novos requisitos da Home; a suíte anterior permanece ativa.

Prettier, ESLint e Stylelint passaram. Permanece o aviso anterior de complexidade 15, acima do limite 10, em `tests/e2e/site.spec.ts`; nenhuma regra ou limite foi alterado. Astro check analisou 67 arquivos com zero erros, avisos ou hints. O build estático gerou 38 páginas. A suíte manteve os quatro projetos Chromium desktop/mobile com e sem JavaScript, axe, teclado, links, imagens, metadados, histórico, controles progressivos e verificação de publicação em subdiretório.

## Execuções e isolamento

1. A [primeira execução](quality-first-run.txt) teve 21 testes de configuração aprovados, 634 testes de navegador aprovados e quatro falhas do cenário PT que procurava literalmente `governança` em minúsculas na Home. O novo resumo autorizado não contém essa palavra, enquanto os títulos preservados usam `Governança`. A expectativa foi substituída pela capitalização desses títulos, sem remover a assertiva ou usar comparação mais permissiva. EN e os demais termos permaneceram iguais. O [registro de expectativas](test-expectations.json) documenta a justificativa.
2. A [segunda execução](quality-second-run.txt) teve 21 testes de configuração aprovados e 634 testes de navegador aprovados. As quatro falhas envolveram artefatos temporários ausentes em `test-results`, busca e incorporação de vídeo durante uma reconstrução concorrente. Os arquivos de código dos testes continuaram presentes. O build desta execução ocorreu às 14:19:29; os arquivos de `.test-dist` da pasta compartilhada foram substituídos às 14:20:04. Os registros dos trabalhos de [logo C4AI](../2026-10-14-logo-figma/validation.md) e [logo USP](../2026-10-14-usp-logo-figma/validation.md) também documentam execuções de quality interrompidas por porta ocupada.
3. A execução final usou uma cópia dos 494 arquivos de trabalho em `/private/tmp/c4ai-home-research-quality-EFPkUD`, com `node_modules` existente reutilizado por link, sem instalação. Configuração, testes, porta, workers, timeouts, limites e `retries: 0` permaneceram idênticos. O [manifesto da cópia](validation-snapshot.json) registra data, branch e hashes, e confirmou que a origem não mudou durante a cópia. Build, resultados e relatório de navegador ficaram separados dos diretórios da pasta compartilhada. Todos os 638 testes de navegador passaram nesta execução.

A instalação local do Playwright confirma que a tarefa `clear output` remove as pastas de resultados antes de preparar os plugins, incluindo o servidor. Assim, uma execução concorrente pode remover artefatos de outra execução mesmo que pare depois por porta ocupada. Essa sequência, a reconstrução observada e o sucesso da cópia isolada sustentam a hipótese de interferência entre validações; não constituem evidência de exclusão dos arquivos de teste ou de defeito nos ícones.

Após a execução isolada, a comparação de 215 arquivos de código, testes, scripts, configuração e assets confirmou que a pasta compartilhada ainda corresponde aos hashes da cópia validada, sem divergências. A verificação de formatação da árvore atual e `git diff --check` também passaram após acrescentar o registro de validação.

O ambiente usado foi Node **24.15.0** e npm **11.12.1**, diferente das versões fixadas **24.21.0/11.19.0**. Não foi executada uma rodada com essas versões fixadas. Não houve alteração de dependências, lockfile ou configuração de qualidade.

## Revisão visual

As oito capturas abaixo foram produzidas com JavaScript desativado e revisadas individualmente. O [manifesto de capturas](captures.json) registra os horários, viewports e ausência de transbordamento. As imagens recortam apenas a seção solicitada.

| Largura da janela | Português                                              | Inglês                                                 | Observação                                                                                                 |
| ----------------- | ------------------------------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| 1440 px           | [Desktop PT](screenshots/home-research-pt-desktop.png) | [Desktop EN](screenshots/home-research-en-desktop.png) | Duas colunas iguais, intervalo de 32 px e alinhamento de cabeçalhos, resumos, rótulos e blocos navegáveis. |
| 800 px            | [Tablet PT](screenshots/home-research-pt-tablet.png)   | [Tablet EN](screenshots/home-research-en-tablet.png)   | Cards empilhados, com altura determinada pelo conteúdo.                                                    |
| 390 px            | [Mobile PT](screenshots/home-research-pt-mobile.png)   | [Mobile EN](screenshots/home-research-en-mobile.png)   | Títulos e descrições legíveis, ordem línguas → governança e setas preservadas.                             |
| 320 px            | [320 px PT](screenshots/home-research-pt-narrow.png)   | [320 px EN](screenshots/home-research-en-narrow.png)   | Quebras de linha sem cortes, sobreposição ou rolagem horizontal.                                           |

O fundo claro, a borda superior verde-azulada, os símbolos decorativos e a separação das regiões seguem a referência. Os quatro novos links reúnem título e descrição em um bloco navegável, com nomes acessíveis próprios, descrições associadas e seta decorativa. Os testes verificaram hover, foco visível, ordem dos seis acessos e ativação por Enter até as âncoras existentes em ambos os idiomas e modos de JavaScript.

A revisão e os testes de navegador usaram Chromium, que suporta `subgrid`. O fallback em Grid nativo está no CSS, mas não foi submetido a revisão visual em um navegador sem `subgrid`. Não foram executados testes em Firefox ou WebKit; os testes automatizados de acessibilidade não equivalem a uma auditoria integral de WCAG.

## Preservação de escopo

A comparação com os hashes coletados antes da implementação confirmou que os JSON institucionais de conteúdo e todos os SVGs de pesquisa permaneceram iguais. O ramo de renderização detalhada de `ResearchFocus.astro` é idêntico ao anterior. `Home.astro`, os componentes de navegação, rodapé, cards detalhados, páginas, rotas e estilos de Pesquisas não receberam mudanças desta etapa. O componente compartilhado de ícones recebeu somente dois símbolos decorativos e um tamanho opcional; o tamanho padrão de 24 px dos usos anteriores permanece.

As mudanças de `src/data/marks.json` e os novos logos C4AI/USP pertencem aos trabalhos paralelos, foram preservados e estavam presentes na cópia validada. Não são atribuídos ao redesign dos cards. As evidências anteriores de migração e reformulação permanecem disponíveis. A implementação foi realizada na branch `fase2_reformulacao`, sem staging, commit, push ou publicação por este agente.
