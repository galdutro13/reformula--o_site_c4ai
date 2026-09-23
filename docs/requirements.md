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

Home e Pesquisas apresentam dois eixos atuais: processamento de linguagem natural para as línguas do Brasil (NLP2/ProIndL) e governança de IA e avaliação de LLMs (OBIA/KEML). OceanML, MClimate, AI Health e AgriBio aparecem ao final em Trabalhos anteriores. Os dados detalhados dos oito grupos permanecem históricos, sem confirmação de atualidade de equipes ou contatos. Rotas e âncoras antigas são preservadas; não há novas páginas. O contrato inclui duas linhas, agrupamento, ordem e cartões de acesso, conforme [reformulação](reformulation.md).

## Escopo migrado e futuro

A tarefa de migração autorizou Home, Sobre, Pesquisas e Notícias em PT/EN, mais os 26 artigos distintos inventariados (14 PT/12 EN). As rotas e o mapa antigo–novo estão em [migração](migration.md). Sobre mantém pessoas, comitês, difusão, diversidade, parceiros e contato como seções; Pesquisas mantém os oito desafios com descrições, lideranças, equipes, recursos e contatos. Notícias mantém submenus temáticos, oito entradas por página, busca progressiva e indicação de traduções ausentes. Fontes e imagens recuperáveis são locais. Arquivos de categoria/autor/data, bibliografia, oportunidades, parceiros e portais associados permanecem externos.

O contrato original prevê aproximadamente seis páginas por idioma: inicial, apresentação, dois subprojetos, equipe e contato. A identificação dos **dois subprojetos** e a extração de equipe/contato para páginas próprias ainda são futuras. Os oito desafios encontrados não são automaticamente esses subprojetos. A ampliação autorizada nesta tarefa não autoriza migração integral de todos os acervos encontrados.

Revisão editorial, direitos, dados institucionais atuais, traduções ausentes, redirecionamentos de servidor, design definitivo e infraestrutura USP permanecem pendentes. Não há formulário de contato ou backend. A raiz neutra e o antigo `/` inglês exigem decisão explícita no lançamento.

## Fora desta etapa

React, Tailwind, backend, banco de dados, CMS, autenticação e deploy automático. Nenhuma dependência nova foi instalada na migração. Lighthouse CI, mutação, comparação automatizada de screenshots, medição global de cobertura e ferramentas de fronteiras arquiteturais não são dependências deste projeto.

As rotas futuras não são usadas como origem da suíte. `tests/e2e/requirements.ts` é um contrato independente: excluir uma página ou uma entrada do mapa não altera as expectativas obrigatórias. Mudanças de requisitos devem ser explicadas no PR, junto com seus novos testes.
