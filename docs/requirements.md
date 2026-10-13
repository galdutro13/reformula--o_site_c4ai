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

HarpIA recebe registros próprios e síntese bilíngue aprovada, com fonte e data de consulta reais. Essa adição não transfere a procedência, equipes ou contatos de KEML. A frase de sede no CIAAM é distinta da localização física no InovaUSP. A menção histórica ao apoio de IBM e FAPESP permanece na apresentação de Sobre; retirar seus logos do rodapé não autoriza apagar referências históricas.

## Escopo migrado e futuro

A tarefa de migração autorizou Home, Sobre, Pesquisas e Notícias em PT/EN, mais os 26 artigos distintos inventariados (14 PT/12 EN). As rotas e o mapa antigo–novo estão em [migração](migration.md). Na migração, Sobre incluía pessoas, comitês, difusão, diversidade, parceiros e contato; a atualização de 06/10 altera essa seleção conforme o contrato acima. Pesquisas preserva os oito registros migrados com descrições, lideranças, equipes, recursos e contatos, agora com KEML no histórico, e acrescenta a síntese de HarpIA. Notícias mantém submenus temáticos, oito entradas por página, busca progressiva e indicação de traduções ausentes. Fontes e imagens recuperáveis são locais. Arquivos de categoria/autor/data, bibliografia, oportunidades, parceiros e portais associados permanecem externos; a retirada de links dos menus não remove esses acervos.

O contrato original prevê aproximadamente seis páginas por idioma: inicial, apresentação, dois subprojetos, equipe e contato. A identificação dos **dois subprojetos** e a extração de equipe/contato para páginas próprias ainda são futuras. Os oito desafios encontrados não são automaticamente esses subprojetos. A ampliação autorizada nesta tarefa não autoriza migração integral de todos os acervos encontrados.

A aprovação editorial de 06/10 limita-se aos textos e às mudanças explicitamente indicados. A revisão institucional dos demais dados, direitos, traduções ausentes, redirecionamentos de servidor, design definitivo e infraestrutura USP permanecem pendentes. Não há formulário de contato ou backend. A raiz neutra e o antigo `/` inglês exigem decisão explícita no lançamento.

## Fora desta etapa

React, Tailwind, backend, banco de dados, CMS, autenticação e deploy automático. Nenhuma dependência nova foi instalada na migração. Lighthouse CI, mutação, comparação automatizada de screenshots, medição global de cobertura e ferramentas de fronteiras arquiteturais não são dependências deste projeto.

As rotas futuras não são usadas como origem da suíte. `tests/e2e/requirements.ts` é um contrato independente: excluir uma página ou uma entrada do mapa não altera as expectativas obrigatórias. Mudanças de requisitos devem ser explicadas no PR, junto com seus novos testes.
