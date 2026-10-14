# Requisitos

## Objetivo

Permitir que outro desenvolvedor compreenda, execute, edite, valide e publique o projeto pela documentação. Site institucional bilíngue, com atualizações pouco frequentes por desenvolvedores e manutenção por uma pessoa com auxílio de agentes.

## Implementados na base e na migração aprovada em 19/09/2026

| ID  | Requisito                                                                 | Evidência executável                                                           |
| --- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| R01 | Astro totalmente estático, TypeScript estrito, CSS nativo                 | Configuração, `check`, build e inspeção do HTML                                |
| R02 | 38 HTML: raiz, 404, oito páginas principais, 26 artigos e duas paginações | Fixtures independentes e E2E                                                   |
| R03 | Correspondência PT/EN por ID estável                                      | Seletor e testes de ida e volta                                                |
| R04 | Conteúdo institucional recuperado, com origem e validação de pares        | Esquema e validação de pares no build; conteúdo renderizado em E2E             |
| R05 | Navegação essencial sem JavaScript                                        | Mesmos testes funcionais nos projetos `*-no-js`                                |
| R06 | Semântica, foco visível, salto ao conteúdo, teclado                       | E2E, axe e revisão visual                                                      |
| R07 | Links internos e fragmentos válidos                                       | Percurso de todos os HTML compilados                                           |
| R08 | Título, descrição, idioma, canonical e hreflang                           | E2E com expectativas independentes; 404 deliberadamente sem canonical/hreflang |
| R09 | Configuração explícita de origem e subdiretório                           | Testes de rejeição e build de publicação temporário                            |
| R10 | Layout responsivo sem transbordamento horizontal                          | Desktop 1440, mobile 390 e largura adicional 320                               |
| R11 | Verificação única reproduzível e CI                                       | `npm run quality`, lockfile e workflow                                         |

O favicon continua provisório. A identidade visual foi adaptada das referências existentes, com diferenças intencionais documentadas na migração; não representa nova aprovação institucional. A raiz oferece escolha de idioma, sem inferência por navegador, geolocalização ou JavaScript. A 404 usa português como idioma principal e marca seus trechos ingleses com `lang="en"`.

## Reformulação de 22/09/2026

Naquela etapa, Home e Pesquisas passaram a apresentar dois eixos: processamento de linguagem natural para as línguas do Brasil (NLP2/ProIndL) e governança de IA e avaliação de LLMs (OBIA/KEML). OceanML, MClimate, AI Health e AgriBio foram colocados ao final em Trabalhos anteriores. Os dados detalhados dos oito grupos permaneceram históricos, sem confirmação de atualidade de equipes ou contatos. O registro daquela entrega e suas evidências permanecem em [reformulação](reformulation.md). A organização vigente é definida pela atualização abaixo.

## Atualização editorial de 06/10/2026

O escopo aprovado reúne a reunião de 29/09, o email de Fábio Cozman de 30/09 e as resoluções expressas do mantenedor. Aplica-se a Home, Sobre e Pesquisas em PT/EN e à navegação e ao rodapé compartilhados; não altera o conteúdo editorial das notícias e dos artigos históricos. O [registro editorial](reformulation/2026-10-06/editorial.md) detalha fontes, traduções, preservações e retirada de fragmentos. A implementação e sua validação devem ser avaliadas pelo [registro de validação](reformulation/2026-10-06/validation.md), sem tratar resultados de setembro como evidência desta atualização.

| ID  | Requisito editorial atual                                                                                                                   | Evidência exigida                                                                |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| E01 | Exatamente dois eixos em Home/Pesquisas: línguas do Brasil e governança de IA; Macro → OBIA e Micro → HarpIA                                | Contrato independente, validação de associações e navegação com/sem JavaScript   |
| E02 | Âncoras `languages`, `governance`, `governance-macro`, `governance-micro` e `harpia` iguais em PT/EN                                        | Links e fragmentos dos HTML compilados                                           |
| E03 | Histórico na ordem OceanML, MClimate, AI Health, AgriBio e KEML; KEML preservado integralmente, inclusive `KEML_B_eng`                      | Fixtures dos grupos históricos e testes de agrupamento/ordem                     |
| E04 | Home com dois cartões responsivos, frase aprovada e sem destaque de diversidade; Sobre com apresentação revisada e destaques YouTube/Flickr | Textos, imagens, grid e navegação nos quatro projetos Chromium                   |
| E05 | Sobre com seis integrantes na ordem aprovada, sem os blocos textuais dos cinco comitês; duas fotografias preservadas                        | Pessoas, descrições, links, ordem, imagens e textos alternativos                 |
| E06 | Sobre sem Diversidade e Inclusão e Impacto & Parceiros; Difusão com Fernando Osório; somente `c4ai@usp.br` como email                       | Ausências restritas aos locais aprovados e conteúdo preservado das outras seções |
| E07 | Workshop mantido com identificação 2022, sem chamada antiga; endereço, telefone e mapa preservados                                          | Conteúdo, ativação explícita do iframe, `Referer` e alternativa sem JavaScript   |
| E08 | Navegação sem os destinos retirados; rodapé CIAAM/USP em todas as páginas, mantendo redes sociais                                           | Menus, links, imagens locais, assinatura institucional e artigos                 |
| E09 | `blocks: []` permitido somente para Home; demais páginas, grupos e painéis com conteúdo obrigatório                                         | Casos positivos e rejeições de esquema, sem enfraquecer campos obrigatórios      |

HarpIA recebe registros próprios com síntese bilíngue, lideranças, equipe atribuída aos créditos oficiais, recursos e formulário de contato, conforme a complementação autorizada em 13/10/2026. Os dois painéis Equipe e Recursos devem funcionar sem JavaScript; o painel Módulos foi retirado por solicitação posterior do mantenedor. Os links de documentação permanecem, com HarpIA Recursos identificado como em construção. Fontes e datas reais de consulta estão no [registro editorial](reformulation/2026-10-13-harpia/editorial.md). Essa adição não transfere a procedência, equipes ou contatos de KEML. A frase de sede no CIAAM é distinta da localização física no InovaUSP. A menção histórica ao apoio de IBM e FAPESP permanece na apresentação de Sobre; retirar seus logos do rodapé não autoriza apagar referências históricas.

## Redesign do índice de Pesquisas — 13/10/2026

O índice interno de Pesquisas PT/EN passa a apresentar os dois eixos como grupos de mesma importância: títulos identificáveis, descrição breve e links subordinados. Os grupos ocupam duas colunas equivalentes no desktop e uma coluna no mobile; Trabalhos anteriores ocupa uma faixa complementar abaixo de ambos. O escopo é limitado à navegação inicial da página, conforme a proposta e a segunda imagem fornecidas pelo mantenedor. O [registro de reformulação](reformulation.md#redesign-do-índice-de-pesquisas--13102026) descreve os textos e as expectativas substituídos.

| ID  | Requisito do índice                                                                                                               | Evidência exigida                                                            |
| --- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| I01 | Navegação nomeada pelo título “Explore nossas pesquisas” / “Explore our research”, com introdução e listas sem marcadores visuais | Nome acessível, títulos e estrutura HTML no contrato independente            |
| I02 | Dois grupos com títulos e descrições, lado a lado em telas grandes e empilhados no mobile; histórico complementar abaixo          | Ordem semântica e geometria nos quatro projetos Chromium e largura de 320 px |
| I03 | Quatro links nativos em ordem: línguas, Macro, Micro e histórico; destinos existentes e foco visível                              | Navegação por teclado, fragmentos e estados de foco com/sem JavaScript       |

O destino `#governance` permanece na seção existente e no acesso da Home. Os textos completos, grupos, registros históricos, identificadores e demais componentes do site não são alterados por esta correção de composição.

## Cards de NLP2 e ProIndL — 13/10/2026

A segunda correção de Pesquisas solicitada pelo mantenedor limita-se à apresentação de NLP2 e ProIndL em PT/EN. Os projetos passam a usar um componente reutilizável de visão geral: nome completo em destaque, sigla, resumo, três frentes de pesquisa e liderança separados. A descrição detalhada existente permanece disponível no próprio card pelo controle nativo “Conhecer o projeto” / “Explore the project”. Equipe, recursos e contatos são preservados. A síntese fornecida pelo mantenedor constitui uma orientação editorial autorizada, sem afirmar novos resultados, vínculos ou capacidades verificadas dos projetos. Ver [registro editorial](reformulation/2026-10-13-languages/editorial.md).

| ID  | Requisito dos cards                                                                                                                | Evidência exigida                                                                     |
| --- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| L01 | NLP2 e ProIndL como cards equivalentes, nessa ordem, com título completo `h3`, sigla e resumo próprios                             | Contrato manual de conteúdo, hierarquia de títulos e ordem semântica em PT/EN         |
| L02 | Três frentes de pesquisa em lista e liderança separada em cada card, sem misturá-la ao título                                      | Textos independentes e estrutura acessível                                            |
| L03 | Descrição extensa no controle nativo Conhecer o projeto; Equipe e Recursos e publicações abaixo, todos inicialmente fechados       | Abertura/fechamento por teclado, foco visível e conteúdo acessível com/sem JavaScript |
| L04 | Preservar `NLP2_B_eng`, `ProIndL_B_eng`, IDs dos painéis, URLs de equipe e recursos e os dois emails                               | Contrato de fragmentos, conteúdo detalhado e destinos preservados                     |
| L05 | Duas colunas quando cada card dispõe de pelo menos 30 rem; uma coluna no espaço menor, sem cortar textos, ilustrações ou controles | Geometria a 1440, 800, 390 e 320 px e revisão visual                                  |
| L06 | Componente Astro estático, CSS nativo e ilustrações SVG decorativas; nenhum novo script cliente, dependência ou destino de página  | Check/build, axe, links, publicação em subdiretório e inspeção do artefato            |

As descrições extensas continuam exigidas no HTML e nos controles expandidos; diminuir o texto inicialmente exposto não autoriza apagá-lo. A única correção textual adicional autorizada pelo mantenedor nesta tarefa remove da primeira pergunta de ProIndL EN um fragmento estranho sobre textos sintaticamente anotados, alinhando-a ao equivalente português. Os outros textos longos permanecem preservados. A âncora `languages`, o índice recém-revisado, Macro/Micro, HarpIA, KEML e os demais registros históricos não são alterados por esta correção. A execução e a revisão visual pertencem ao [registro de validação desta etapa](reformulation/2026-10-13-languages/validation.md), não aos resultados anteriores.

### Ilustrações fornecidas no Figma — 13/10/2026

O pedido posterior do mantenedor substitui as duas ilustrações grandes criadas na implementação por seus componentes exportados do Figma, aplicados aos respectivos cards em PT/EN. Os SVGs devem ser locais e íntegros, com dimensões intrínsecas de 240 × 240 e `viewBox="0 0 240 240"`, mantendo o caráter decorativo. O [registro editorial](reformulation/2026-10-13-figma-icons/editorial.md) identifica o arquivo, os nós, os nomes, os hashes e a data real de consulta.

| ID  | Requisito das ilustrações                                                                                                            | Evidência exigida                                                                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| L07 | NLP2 usa `research-nlp2-figma.svg`; ProIndL usa `research-proindl-figma.svg`, em PT/EN, sem redesenho ou mudança dos SVGs exportados | Associação manual por projeto, integridade dos arquivos, dimensões e revisão visual |
| L08 | Assets decorativos locais funcionam sem JavaScript e em publicação em subdiretório, mantendo proporções e conteúdo dos cards         | HTML compilado, nomes acessíveis preservados, URLs locais e geometria responsiva    |

Os requisitos L01–L06 continuam ativos. A substituição não altera os resumos, as descrições, as equipes, os recursos, os contatos ou os pequenos símbolos existentes. A qualidade e a revisão visual desta troca devem ser registradas separadamente em [validation.md](reformulation/2026-10-13-figma-icons/validation.md).

## Cards de governança — 13/10/2026

OBIA e HarpIA reutilizam o componente e a escala tipográfica dos cards de NLP2 e ProIndL. Governança continua sendo um único eixo: os cabeçalhos Macro e Micro ficam fora dos cards, imediatamente acima de OBIA e HarpIA, respectivamente. Os títulos dos projetos são `h4`, abaixo das frentes `h3` e do eixo `h2`. A síntese e as traduções estão no [registro editorial](reformulation/2026-10-13-governance-cards/editorial.md).

| ID  | Requisito                                                                                                                 | Evidência exigida                                                                                                        |
| --- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| G01 | Macro → OBIA e Micro → HarpIA, com cabeçalhos separados, títulos completos e identificadores discretos                    | Hierarquia semântica, ordem e associações independentes em PT/EN                                                         |
| G02 | Três frentes por projeto, com ícone, título e descrição; liderança separada                                               | Textos manuais e tipografia equivalente aos cards de línguas                                                             |
| G03 | Descrição integral de OBIA e HarpIA em Sobre o projeto / Sobre a plataforma, incluindo junho de 2022 e condições de uso   | Texto obrigatório preservado, expansão e fechamento por teclado com/sem JavaScript                                       |
| G04 | OBIA com dois painéis; HarpIA com três; recursos, equipe e contatos existentes preservados                                | Destinos e âncoras legados; formulário HarpIA sem email inventado; consolidação autorizada dos dois Resources EN de OBIA |
| G05 | CTA OBIA revela sua descrição; CTA HarpIA mantém a página oficial; nenhum destino vazio                                   | Foco visível, revelação nativa por fragmento e URLs PT/EN                                                                |
| G06 | Duas colunas quando há espaço para 30 rem por card; alturas e faixas alinhadas; cada frente precede seu projeto no mobile | Geometria a 1440, 800, 390 e 320 px, sem transbordamento, e revisão visual                                               |

O modelo admite frentes descritivas e contato externo. OBIA pode omitir Equipe e mantém email; HarpIA exige equipe e contato externo; NLP2/ProIndL continuam exigindo Equipe e email. Painéis e grupos continuam exigindo conteúdo; chamadas externas aceitam somente HTTP(S) e chamadas internas somente fragmentos definidos. A primeira implementação dos cards de governança usou ilustrações decorativas próprias; a substituição pelos SVGs fornecidos no Figma é definida abaixo. Os SVGs de NLP2 e ProIndL fornecidos no Figma permanecem intactos.

### Ilustrações de OBIA e HarpIA fornecidas no Figma — 13/10/2026

O mantenedor solicitou adotar as ilustrações de seu [arquivo Figma](https://www.figma.com/design/oRyXiLWMBUDsiVWzDeSs4k/?node-id=2-81) nos cabeçalhos de OBIA e HarpIA em PT/EN. Os SVGs completos exportados substituem as ilustrações próprias da primeira implementação, preservando dimensões intrínsecas de 240 × 240, proporções, transparência e todas as camadas. O [registro editorial](reformulation/2026-10-13-governance-figma-icons/editorial.md) identifica os nós, os assets, os hashes e a consulta de 13/10/2026.

| ID  | Requisito das ilustrações de governança                                                                                                 | Evidência exigida                                                                  |
| --- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| G07 | OBIA usa `research-obia-figma.svg`; HarpIA usa `research-harpia-figma.svg`, em PT/EN, preservando integralmente os exports SVG do Figma | Associação manual por projeto, integridade dos arquivos e revisão visual           |
| G08 | Imagens decorativas locais mantêm dimensões e proporções e funcionam sem JavaScript e em subdiretório                                   | Carregamento, geometria, nomes acessíveis preservados e URLs no artefato compilado |

Os requisitos G01–G06 continuam ativos. A troca altera somente a ilustração selecionada para cada cabeçalho, preservando layout, conteúdo, CSS, pequenos símbolos, controles, contatos e as imagens anteriores como registros do trabalho existente. A arte de HarpIA é adotada como fornecida pelo mantenedor no Figma; essa procedência não constitui verificação independente de um logo oficial. A consulta aos assets não altera `source` ou `retrievedAt` dos conteúdos institucionais. Resultados e capturas desta substituição devem ser registrados em [validation.md](reformulation/2026-10-13-governance-figma-icons/validation.md).

## Escopo migrado e futuro

A tarefa de migração autorizou Home, Sobre, Pesquisas e Notícias em PT/EN, mais os 26 artigos distintos inventariados (14 PT/12 EN). As rotas e o mapa antigo–novo estão em [migração](migration.md). Na migração, Sobre incluía pessoas, comitês, difusão, diversidade, parceiros e contato; a atualização de 06/10 altera essa seleção conforme o contrato acima. Pesquisas preserva os oito registros migrados com descrições, lideranças, equipes, recursos e contatos, agora com KEML no histórico, e acrescenta a síntese de HarpIA. Notícias mantém submenus temáticos, oito entradas por página, busca progressiva e indicação de traduções ausentes. Fontes e imagens recuperáveis são locais. Arquivos de categoria/autor/data, bibliografia, oportunidades, parceiros e portais associados permanecem externos; a retirada de links dos menus não remove esses acervos.

O contrato original prevê aproximadamente seis páginas por idioma: inicial, apresentação, dois subprojetos, equipe e contato. A identificação dos **dois subprojetos** e a extração de equipe/contato para páginas próprias ainda são futuras. Os oito desafios encontrados não são automaticamente esses subprojetos. A ampliação autorizada nesta tarefa não autoriza migração integral de todos os acervos encontrados.

A aprovação editorial de 06/10 limita-se aos textos e às mudanças explicitamente indicados. A revisão institucional dos demais dados, direitos, traduções ausentes, redirecionamentos de servidor, design definitivo e infraestrutura USP permanecem pendentes. Não há formulário de contato ou backend. A raiz neutra e o antigo `/` inglês exigem decisão explícita no lançamento.

## Fora desta etapa

React, Tailwind, backend, banco de dados, CMS, autenticação e deploy automático. Nenhuma dependência nova foi instalada na migração. Lighthouse CI, mutação, comparação automatizada de screenshots, medição global de cobertura e ferramentas de fronteiras arquiteturais não são dependências deste projeto.

As rotas futuras não são usadas como origem da suíte. `tests/e2e/requirements.ts` é um contrato independente: excluir uma página ou uma entrada do mapa não altera as expectativas obrigatórias. Mudanças de requisitos devem ser explicadas no PR, junto com seus novos testes.
