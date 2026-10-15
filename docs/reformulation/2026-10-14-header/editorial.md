# Cabeçalho compartilhado — 14/10/2026

## Escopo e referência

O mantenedor autorizou reorganizar o cabeçalho compartilhado do site, em português e inglês. A proposta e a imagem de referência orientam uma composição com três regiões no mesmo eixo em telas largas: logo, navegação principal e idiomas. A mudança deve alcançar as páginas principais, artigos e paginações que usam esse cabeçalho, preservando seus conteúdos e destinos.

O logo vetorial já aprovado no Figma permanece, com a mesma arte, enquadramento e proporções. Esta etapa não altera o hero, os cards de pesquisa, os conteúdos institucionais, os artigos históricos ou o rodapé. Os registros e evidências das mudanças anteriores são preservados. Não se acrescentam páginas, dependências ou JavaScript cliente, nem se autoriza commit, push ou publicação.

## Textos, destinos e indicação de contexto

O primeiro item da navegação em português passa de “Home” a “Início”, preservando o destino `/pt/`. Em inglês, “Home” continua apontando para `/en/`. A identificação acessível do link do logo acompanha o rótulo de início de cada idioma, sem alterar seu texto alternativo institucional.

| Região                        | PT                                                          | EN                                                    |
| ----------------------------- | ----------------------------------------------------------- | ----------------------------------------------------- |
| Navegação principal, em ordem | Início; Sobre; Pesquisas; Notícias; Recursos; Oportunidades | Home; About; Research; News; Resources; Opportunities |
| Seleção de idioma             | Português; English                                          | Português; English                                    |
| Controle responsivo           | Menu                                                        | Menu                                                  |

As rotas internas continuam compostas pelo mapa de identificadores estáveis, com suporte a publicação em subdiretório. Sobre, Notícias e Recursos conservam seus submenus, nomes acessíveis, destinos e ordem. A indicação do destino externo de Oportunidades e os links externos de Publicações/NLP2 permanecem. Não são recriados os itens retirados em etapas editoriais anteriores.

O item que corresponde exatamente à página atual recebe `aria-current="page"`. Nas paginações e nos artigos, Notícias/News indica a seção de contexto por `aria-current="location"`, sem afirmar que seu destino é a página aberta. O idioma atual conserva a indicação acessível existente. A troca de idioma continua respeitando as traduções disponíveis; a mensagem e o acesso alternativo de artigos sem tradução permanecem, sem inventar um par de idiomas.

O estado atual recebe também indicação visual, incluindo sublinhado e peso 700, além dos tratamentos de hover e foco. Os demais textos mantêm peso 400; esses dois pesos correspondem às fontes locais disponíveis, sem solicitar um peso 600 inexistente. Setas de submenus são padronizadas e decorativas, sem mudar o nome dos controles. Os estados aberto/fechado continuam definidos pela semântica nativa de `details` e `summary`.

## Composição e comportamento responsivo

Em telas largas, o conteúdo do cabeçalho mantém o limite institucional de 76 rem (1216 px), alinhado ao restante da página. As três regiões compartilham um eixo de alinhamento vertical; o cabeçalho tem altura mínima de 100 px, determinada pelo conteúdo, sem altura fixa que corte texto. Na Home, essa composição ocupa 100 px; artigos com aviso de tradução ausente podem crescer naturalmente, com até 145,4 px observados na medição desta etapa. Preservar essa informação tem prioridade sobre impor 100 px de altura. O logo mantém 181 × 72 px. O fundo é branco, com borda inferior discreta; a sombra do contêiner do cabeçalho é retirada.

A navegação principal usa intervalos aproximados de 20–24 px; a separação entre essa região e o seletor de idiomas fica entre 24 e 32 px. Links e controles mantêm áreas de interação de pelo menos 44 px, estados visíveis de foco e contraste institucional. Qualquer transição deve respeitar a preferência por movimento reduzido. A informação de tradução ausente pode aumentar a altura natural sem sobrepor as regiões.

O ponto de mudança é de 1240 px: até essa largura, a navegação fica recolhida; a partir de 1241 px, apresenta-se a composição desktop. A escolha considera o espaço necessário para os dois idiomas e para artigos sem tradução. Em uma medição dos 37 HTML `index.html` a 1241 px, a maior largura requerida foi de 1131,3 px, nos artigos portugueses sem tradução, para 1193 px disponíveis, mantendo reserva de 61,7 px. As páginas sem esse aviso requereram 1064,7 px em PT e 1049,3 px em EN. Não foi observado transbordamento nessa medição; os demais testes e a revisão visual completa continuam exigidos.

Na composição recolhida, o logo passa a 160 px de largura, com altura proporcional; o controle Menu fica à sua direita. Com o menu fechado, o cabeçalho da Home ocupa 80 px, como altura mínima natural. Ao abrir, o conteúdo cresce no fluxo da página, sem altura fixa ou sobreposição. Avisos de tradução ausente continuam presentes no conteúdo do menu, sem serem truncados para atender essa referência de altura.

A navegação principal vertical e os idiomas ficam dentro do menu responsivo nativo. As variantes desktop e responsiva podem coexistir no HTML, mas somente uma fica visível e disponível à navegação por teclado em cada largura. A informação de tradução ausente deve ser preservada na variante efetivamente apresentada. O menu e seus submenus operam com teclado e sem JavaScript, com foco visível e ordem lógica: logo, controle Menu, links e idiomas.

## Expectativas substituídas e preservadas

A mudança legítima de texto é “Home” → “Início” no item português e na identificação acessível do acesso inicial; o equivalente inglês permanece. O contrato passa a exigir página/seção atuais, três regiões alinhadas em desktop e idioma dentro do menu recolhido. A antiga composição com faixa de idiomas separada e Menu em linha própria é substituída pelo arranjo aprovado, preservando os destinos e todas as funções anteriores.

Os requisitos continuam manuais e independentes da aplicação. A validação deve cobrir a indicação atual nas páginas principais, artigos e paginações; traduções presentes e ausentes; abertura/fechamento do menu e submenus por teclado; ausência de controles ocultos no percurso de foco; dimensões/proporções do logo; áreas de interação; funcionamento sem JavaScript; largura de 320 px sem transbordamento e publicação em subdiretório. A duplicação de variantes no HTML não autoriza duplicar IDs.

Permanecem os quatro projetos Chromium, axe e as tags WCAG vigentes, os contratos de links, metadados, imagens e conteúdos, além dos testes anteriores de hero, cards e logos. Não se reduzem regras, limites, exclusões ou retries. `npm run quality`, capturas, revisão visual PT/EN e limitações efetivamente observadas serão documentados em [validation.md](validation.md) após integrar a implementação. Esta nota editorial não afirma que a validação já foi concluída.
