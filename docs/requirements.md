# Requisitos

## Objetivo

Permitir que outro desenvolvedor compreenda, execute, edite, valide e publique o projeto pela documentação. Site institucional bilíngue, com atualizações pouco frequentes por desenvolvedores e manutenção por uma pessoa com auxílio de agentes.

## Implementados na base

| ID  | Requisito                                                 | Evidência executável                                                           |
| --- | --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| R01 | Astro totalmente estático, TypeScript estrito, CSS nativo | Configuração, `check`, build e inspeção do HTML                                |
| R02 | `/`, `/pt/`, `/en/`, `404.html` com conteúdo principal    | Fixtures independentes e E2E                                                   |
| R03 | Correspondência PT/EN por ID estável                      | Seletor e testes de ida e volta                                                |
| R04 | Conteúdo bilíngue validado e explicitamente demonstrativo | Esquema e validação de pares no build; conteúdo renderizado em E2E             |
| R05 | Navegação essencial sem JavaScript                        | Mesmos testes funcionais nos projetos `*-no-js`                                |
| R06 | Semântica, foco visível, salto ao conteúdo, teclado       | E2E, axe e revisão visual                                                      |
| R07 | Links internos e fragmentos válidos                       | Percurso de todos os HTML compilados                                           |
| R08 | Título, descrição, idioma, canonical e hreflang           | E2E com expectativas independentes; 404 deliberadamente sem canonical/hreflang |
| R09 | Configuração explícita de origem e subdiretório           | Testes de rejeição e build de publicação temporário                            |
| R10 | Layout responsivo sem transbordamento horizontal          | Desktop 1440, mobile 390 e largura adicional 320                               |
| R11 | Verificação única reproduzível e CI                       | `npm run quality`, lockfile e workflow                                         |

O favicon e a composição visual são provisórios; não representam identidade visual institucional aprovada. A raiz oferece escolha de idioma, sem inferência por navegador, geolocalização ou JavaScript. A 404 usa português como idioma principal e marca seus trechos ingleses com `lang="en"`.

## Inventário futuro — não são rotas implementadas

Além da página inicial, haverá apresentação do C4AI, dois subprojetos, equipe e contato, em português brasileiro e inglês: aproximadamente seis páginas por idioma. Seus nomes finais, identificadores, URLs e conteúdo serão definidos na etapa editorial. Não há links ou testes exigindo essas páginas nesta base.

Design definitivo, informações institucionais, pesquisadores, parceiros, migração do WordPress, redirecionamento das URLs antigas e decisões finais da infraestrutura USP permanecem futuros. Contato não implica formulário com backend nesta arquitetura; a solução deverá ser especificada antes de implementação.

## Fora desta etapa

React, Tailwind, backend, banco de dados, CMS, autenticação e deploy automático. Lighthouse CI, mutação, comparação automatizada de screenshots, medição global de cobertura e ferramentas de fronteiras arquiteturais não são dependências deste projeto.

As rotas futuras não são usadas como origem da suíte. `tests/e2e/requirements.ts` é um contrato independente: excluir uma página ou uma entrada do mapa não altera as expectativas obrigatórias. Mudanças de requisitos devem ser explicadas no PR, junto com seus novos testes.
