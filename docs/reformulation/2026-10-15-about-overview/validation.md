# Validação dos blocos institucionais de Sobre — 15/10/2026

## Resultado final

`npm run quality` terminou com **código 0: 21 testes de configuração e 790 testes de navegador passaram**, sem falhas ou retries. A [saída completa](quality.txt) registra a execução final após os ajustes de enquadramento e espaçamento. São 24 casos novos: três cenários por idioma nos quatro projetos existentes. Antes do refinamento visual, a execução [direcionada](targeted.txt) já havia passado nos 64 casos dos blocos institucionais e da correção anterior.

Prettier, ESLint e Stylelint passaram; permanece somente o aviso anterior de complexidade 15/10 no teste de conteúdo/metadados de `site.spec.ts`. Astro check analisou 77 arquivos com zero erros, avisos ou hints. O build gerou as mesmas 38 páginas estáticas. `git diff --check` passou. Nenhuma regra, dependência, exclusão, timeout, limite ou retry foi alterado.

Os novos cenários cobrem os textos completos, agrupamento semântico, dois parágrafos iniciais visíveis, terceiro parágrafo em detalhamento nativo, fotografias únicas, endereço, destino de contato, teclado, foco e ordem de leitura. A geometria é verificada em 1440, 1280, 1024, 900, 768, 390 e 320 px, inclusive com o detalhamento aberto. Enter e Espaço abrem/fecham o texto adicional sem JavaScript; Enter em Como chegar/Getting here leva ao contato correspondente e o coloca na janela.

A fixture editorial continua íntegra. Os testes anteriores permanecem ativos para banner, canais, metadados, rotas PT/EN, links/fragmentos, assets locais, liderança, galeria, Difusão, contatos, cabeçalho, rodapé, comportamento progressivo, publicação em subdiretório e axe. A única expectativa anterior ajustada usa `.about-presentation-copy` como seletor equivalente do texto institucional para preservar a verificação de alinhamento da primeira correção.

## Preservação

O [manifesto de preservação](preservation.json) compara o estado imediatamente anterior a esta segunda correção com o resultado atual. Confirma:

- Os seis parágrafos originais de cada idioma foram transferidos integralmente para o conteúdo tipado: três da apresentação, missão, visão e localização.
- Todas as seções posteriores à antiga apresentação permanecem idênticas nos JSON PT/EN.
- Título, descrição, blocos do banner, fotografias do hero e dados dos canais não mudaram.
- Os nove arquivos comparados, incluindo os componentes/textos dos canais, o CSS anterior de Sobre, cabeçalho, rodapé e estilos compartilhados selecionados, mantêm os mesmos hashes.

As duas fotografias originais continuam sendo usadas uma vez cada; os arquivos de imagem não foram editados. As alterações de apresentação e os destinos das ações estão descritos no [registro editorial](editorial.md).

## Revisão visual

As 12 capturas da seção foram revisadas em PT/EN com JavaScript desativado. O [manifesto de capturas](captures.json) contém medidas, data UTC, viewports e ausência de transbordamento. As medidas usam a altura de janela indicada; a altura de captura foi ampliada para mostrar a seção inteira com o mesmo enquadramento horizontal. `captureViewport` registra essa altura separadamente. As capturas mostram o detalhamento recolhido; a expansão foi exercitada pela suíte de navegador.

| Largura | Português                                                 | Inglês                                                    | Resultado observado                                                                              |
| ------- | --------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1440    | [Desktop PT](screenshots/about-overview-pt-desktop.png)   | [Desktop EN](screenshots/about-overview-en-desktop.png)   | Texto e foto em duas colunas; missão/visão equivalentes; localização com ordem visual invertida. |
| 1280    | [Notebook PT](screenshots/about-overview-pt-notebook.png) | [Notebook EN](screenshots/about-overview-en-notebook.png) | Mesma composição com títulos e margens alinhados.                                                |
| 1024    | [Compacto PT](screenshots/about-overview-pt-compact.png)  | [Compacto EN](screenshots/about-overview-en-compact.png)  | Duas colunas legíveis e sem a região vazia extensa da versão anterior.                           |
| 768     | [Tablet PT](screenshots/about-overview-pt-tablet.png)     | [Tablet EN](screenshots/about-overview-en-tablet.png)     | Empilhamento coerente e fotografias com altura limitada.                                         |
| 390     | [Mobile PT](screenshots/about-overview-pt-mobile.png)     | [Mobile EN](screenshots/about-overview-en-mobile.png)     | Texto, fotos, missão, visão e localização seguem ordem de leitura; endereço e ações completos.   |
| 320     | [Estreito PT](screenshots/about-overview-pt-narrow.png)   | [Estreito EN](screenshots/about-overview-en-narrow.png)   | Sem cortes ou rolagem horizontal; ícones menores deixam mais espaço para os textos.              |

No desktop, a foto principal tem **320 px** de altura e a de localização **256 px**. As linhas de missão/visão medem aproximadamente **186,4 px em PT** e **160,8 px em EN**, com alturas iguais entre os dois cartões de cada idioma. Os intervalos principais são de **48 px**, passando a **32 px** no empilhamento. A linha de localização acrescenta 32 px internos após seu divisor. As imagens acompanham as colunas e passam a 224 px em 390/320 px.

Em 1440 px, a altura medida da seção recolhida passou de aproximadamente **1440 px para 912 px em PT** e **887 px em EN**, comparando o manifesto da primeira correção com o atual. A diferença inclui a nova organização e a apresentação do terceiro parágrafo por expansão nativa; o texto não foi descartado. A fotografia da fachada recebe enquadramento próprio, e a da localização preserva o edifício, o pátio e as bandeiras na área visível.

A revisão não encontrou texto cortado, sobreposição, transbordamento ou desequilíbrio espacial que exigisse nova correção. Os títulos e textos mantêm uma hierarquia sóbria; as três funções informacionais estão agrupadas e separadas por espaçamento consistente.

## Ambiente e limites

A validação ocorreu na pasta de trabalho atual, com Node **24.15.0** e npm **11.12.1**. As versões fixadas **24.21.0/11.19.0** não foram executadas. Não houve instalação de dependências ou mudança de lockfile. A prévia visual serve o build estático em uma porta separada; a suíte inicia seu próprio servidor sem reutilização nem alteração de locks.

As capturas e os testes foram executados em Chromium. Firefox, WebKit e zoom real do navegador não foram executados nesta etapa; axe, teclado e revisão visual não equivalem a uma auditoria integral de acessibilidade. Os testes bloqueiam requisições externas e verificam os destinos existentes como URLs; não confirmam a disponibilidade dos serviços externos nem condições reais de acesso físico.

A primeira tentativa de captura encontrou a prévia da tarefa anterior encerrada; ela foi reiniciada e as capturas foram geradas. Um artefato da captura por elemento em mobile foi resolvido capturando a janela com altura ampliada, sem alterar o layout para esconder o problema. A suíte completa passou na primeira execução desta segunda correção.

Os ajustes permanecem locais. Não houve staging, commit, push ou publicação.

## Ajuste pontual posterior da fotografia

Conforme a orientação posterior do mantenedor, o formato horizontal foi preservado e o ponto do recorte mudou de `center 15%` para `center 65%`, mostrando parte da escadaria. Não mudaram largura, altura, alinhamento, `cover`, breakpoints, textos ou testes. A tentativa intermediária de apresentação quadrada foi desfeita integralmente, inclusive suas alterações de expectativas e documentação.

As capturas finais de [desktop](screenshots/about-photo-position-pt-desktop.png), [tablet](screenshots/about-photo-position-pt-tablet.png) e [mobile](screenshots/about-photo-position-pt-mobile.png) mostram o resultado. As dimensões medidas foram, respectivamente, 579,2 × 320 px, 720 × 320 px e 358 × 224 px, iguais às dimensões anteriores para essas larguras. Fachada, pilares e parte da escadaria permanecem visíveis.

A verificação completa foi repetida após essa alteração e passou com código 0: **21 testes de configuração e 790 testes de navegador**, sem falhas ou retries. A [saída do ajuste](quality-photo-position.txt) registra essa execução; permanecem o aviso preexistente de complexidade e os limites de ambiente/navegadores descritos acima. Não houve commit, push ou publicação.

## Separador entre canais e apresentação

Foi acrescentado o divisor solicitado entre Acompanhe nossas atividades/Follow our activities e a apresentação C4AI. A linha usa a mesma cor e espessura do separador de localização: `#cfe0e3`, 1 px, na largura do contêiner. As medidas confirmaram 32 px entre os cartões e a linha, e 32 px entre a linha e a apresentação, em desktop e mobile. Não foram alterados o conteúdo, a fotografia ou seu enquadramento, testes, regras ou exclusões.

As capturas de [desktop](screenshots/about-divider-pt-desktop.png) e [mobile](screenshots/about-divider-pt-mobile.png) foram revisadas sem JavaScript, sem cortes ou transbordamento. O [manifesto](divider-captures.json) registra dimensões e cores medidas. A apresentação começa em y=777,6 px no desktop, preservando o limite exigido pelos testes de introdução.

`npm run quality` foi repetido e terminou com código 0: **21 testes de configuração e 790 testes de navegador**, sem falhas ou retries. A [saída completa do separador](quality-divider.txt) registra essa execução; permanecem o aviso preexistente de complexidade e os limites de ambiente/navegadores descritos acima. `git diff --check` também passou. Sem commit, push ou publicação.
