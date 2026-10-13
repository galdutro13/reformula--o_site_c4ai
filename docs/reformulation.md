# Primeira reformulação — 22/09/2026

Este documento preserva o histórico da primeira reformulação e seus resultados. A [atualização editorial de 06/10/2026](#atualização-editorial--06102026) define as mudanças posteriores; resultados e capturas abaixo não devem ser apresentados como validação da atualização de outubro.

Home e Pesquisas, em PT/EN, passam a comunicar o novo foco autorizado pelo mantenedor. Esta etapa altera a apresentação e a organização; não confirma dados atuais de equipes, contatos, resultados ou financiamento.

## Organização adotada

| Linha atual                                                                                                            | Registros associados                                | Âncora nova         |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------- |
| Processamento de linguagem natural para as línguas do Brasil / Natural language processing for the languages of Brazil | NLP2 e ProIndL                                      | `languages`         |
| Governança de IA e avaliação de LLMs / AI governance and LLM evaluation                                                | OBIA@C4AI e KEML                                    | `governance`        |
| Trabalhos anteriores / Previous research                                                                               | OceanML, MClimate, AI Health e AgriBio, nessa ordem | `previous-research` |

As duas primeiras linhas têm sínteses novas e equivalentes nos dois idiomas, limitadas ao foco informado: português, línguas indígenas, governança de IA e avaliação de grandes modelos de linguagem. Elas aparecem com igual importância na Home e no início de Pesquisas. A Home mantém ilustração, acesso a Sobre e destaque de diversidade e inclusão.

Os registros detalhados dos oito grupos foram preservados sem alterações, incluindo lideranças, equipes, recursos, contatos e avisos de divergência existentes. A procedência dos dados fica registrada nesta documentação; os avisos de revisão foram removidos da interface por solicitação do mantenedor. Associar OBIA/KEML ao eixo de governança não significa afirmar que todas as atividades históricas de KEML continuam no escopo atual.

As oito âncoras antigas permanecem nos respectivos registros. A navegação interna oferece as duas linhas e o histórico; os cartões da Home apontam às linhas de Pesquisas. Não há novas páginas, mudança de rotas, redirecionamento, dependência ou JavaScript adicional.

## Conteúdo e procedência

A coleção `researchLines`, em `src/content/research-lines/`, compartilha nomes, sínteses, âncoras e referências dos grupos entre Home e Pesquisas. O esquema exige os campos e dois grupos por linha. O build exige os dois pares de idiomas, as associações autorizadas, referências existentes e os quatro grupos históricos na ordem definida.

`revision` registra a data e o fundamento editorial nos novos registros e nas quatro páginas revisadas. `source` e `retrievedAt` das páginas continuam identificando a origem migrada, não a fonte dos novos textos. A apresentação anterior fica preservada em [Home PT](reformulation/home-pt-before.json), [Home EN](reformulation/home-en-before.json), [Pesquisas PT](reformulation/research-pt-before.json) e [Research EN](reformulation/research-en-before.json). O inventário e a documentação da migração não foram reescritos.

Foram retirados da apresentação pública atual o número aproximado de 250 pesquisadores e a caracterização dos oito desafios como atuais. Textos e índice antigos foram substituídos por sínteses do novo escopo. Nenhum novo número ou composição de equipe foi inferido.

## Implementação e verificações

`ResearchFocus.astro` compartilha a apresentação dos eixos, com cartões na Home e seções com registros em Pesquisas. Foi eliminada a seleção por posição (`slice`) que removia parte da antiga Home. O CSS mantém paleta, tipografia, ilustração e gradiente existentes, usando dois cartões de mesma largura e altura no desktop e uma coluna no celular.

O contrato independente foi atualizado para exatamente duas linhas, nomes PT/EN, associações, avisos, ordem do histórico, navegação por teclado dos cartões e novas descrições de metadados. [changed-expectations.json](reformulation/changed-expectations.json) discrimina os textos substituídos; **757 trechos** continuam obrigatórios, incluindo o conteúdo histórico de Pesquisas e os textos das páginas fora do escopo. Regras, limites, tags axe, exclusões e retries não foram relaxados.

A primeira execução completa de `npm run quality` passou: **486 testes Playwright**, cinco testes de configuração, build estático de 38 páginas, formatação e lint aprovados, Astro check com 52 arquivos e zero erros/avisos/hints. Permanece o aviso preexistente de complexidade 15 no teste de metadados, conforme a política de qualidade. A execução usa Node 24.21.0 e npm 11.19.0, sem alterar dependências ou lockfile.

A prova de detecção removeu temporariamente a seção `governance` do HTML compilado de Pesquisas PT. O teste independente `pt: duas linhas atuais e histórico preservado` falhou especificamente com **duas seções esperadas e uma encontrada**. O arquivo foi restaurado byte a byte. Veja [evidência](reformulation/missing-line-probe.txt). O comando usado foi `npx playwright test site.spec.ts --project=desktop --grep 'pt: duas linhas atuais' --reporter=line`. A verificação completa é repetida após a restauração e a documentação. Seu resultado final é registrado em [quality.txt](reformulation/quality.txt).

## Revisão visual

Comparação manual com as capturas da migração em `docs/migration/screenshots/`, preservadas. As novas capturas ficam em `docs/reformulation/screenshots/`; o [manifesto](reformulation/captures.json) registra caminho, estado, data e dimensões reais.

| Página       | Desktop                                                       | Celular                                                     |
| ------------ | ------------------------------------------------------------- | ----------------------------------------------------------- |
| Home PT      | [1440×900](reformulation/screenshots/home-pt-desktop.png)     | [390×844](reformulation/screenshots/home-pt-mobile.png)     |
| Home EN      | [1440×900](reformulation/screenshots/home-en-desktop.png)     | [390×844](reformulation/screenshots/home-en-mobile.png)     |
| Pesquisas PT | [1440×900](reformulation/screenshots/research-pt-desktop.png) | [390×844](reformulation/screenshots/research-pt-mobile.png) |
| Research EN  | [1440×900](reformulation/screenshots/research-en-desktop.png) | [390×844](reformulation/screenshots/research-en-mobile.png) |

Capturas adicionais: [cartões empilhados no celular](reformulation/screenshots/home-en-mobile-cards.png), [histórico no desktop](reformulation/screenshots/history-pt-desktop.png) e [histórico no celular](reformulation/screenshots/history-pt-mobile.png).

Diferenças intencionais: a Home ganhou uma introdução explícita e dois cartões maiores em lugar dos oito exemplos; Pesquisas ganhou introdução mais curta, índice de três destinos e separação entre sínteses atuais e registros históricos. A sequência histórica foi reorganizada conforme a tabela. No celular, os cartões e os grupos são empilhados; a navegação continua nativa e em fluxo. Os testes também verificam transbordamento em 320 px, teclado, links/arquivos, painéis, idioma, metadados e subdiretório.

## Pendências e limites

- Sobre/About permanece com a descrição estratégica ampla de aprendizado, decisão, representação e raciocínio, além de lideranças, comitês, vínculos e instalações da migração. A revisão institucional dessas afirmações pertence a uma próxima etapa; não foram atualizadas por inferência.
- Notícias, os 26 artigos e os acervos externos permanecem registros datados. Referências a antigos desafios nesses textos não foram reinterpretadas como linhas atuais.
- Permanecem pendentes a confirmação de equipes e contatos, a revisão institucional de traduções, direitos e os detalhes de hospedagem USP. As duas linhas não criam automaticamente as páginas dos dois subprojetos previstas no contrato original.
- A comparação visual é manual e amostral; axe não certifica conformidade integral. Não foram testados leitores de tela, dispositivos físicos, Firefox/WebKit ou CI remota. A suíte obrigatória usa apenas o artefato local, sem consultar o site público.

Sem commit, push ou publicação nesta etapa.

## Ajuste da Home — 23/09/2026

Por solicitação editorial, a Home em português usa o título “Um centro de pesquisa para inteligência artificial avançada no Brasil”; a versão inglesa usa “A research center for advanced artificial intelligence in Brazil”. O idioma do título acompanha cada versão. O parágrafo de `heroBlocks` foi removido. Permanecem a ilustração, o acesso a Sobre, os dois cartões e a descrição dos metadados sobre as linhas atuais. Pesquisas não foi alterada. As capturas acima registram o estado anterior a este ajuste.

As expectativas independentes do título foram atualizadas e a verificação existente passou a conferir a ausência do parágrafo e a identificação de idioma. Nenhuma regra de qualidade foi relaxada.

## Remoção dos avisos de revisão — 23/09/2026

Foram removidos os avisos `historical-notice` das duas linhas e de Trabalhos anteriores, em português e inglês, além do parágrafo explicativo sobre o histórico. Os títulos, grupos, conteúdo, painéis e âncoras permanecem. Observações destinadas ao mantenedor devem ser comunicadas no Codex e registradas na documentação, sem inserção automática na página pública.

Os testes que exigiam os avisos agora verificam sua ausência, conforme a nova solicitação editorial. As verificações de preservação dos oito grupos e de sua organização permanecem. A remoção dos avisos não constitui aprovação editorial dos dados antigos.

## Atualização editorial — 06/10/2026

O plano expressamente autorizado pelo mantenedor consolida a reunião de 29/09 e o email de 30/09 de Fábio Cozman. A nova organização mantém dois eixos, subdivide governança em Macro (OBIA e regulação de IA) e Micro (implantação em empresas e HarpIA), e desloca KEML para o final de Trabalhos anteriores, preservando integralmente seu registro. Home e Sobre recebem a frase e os textos aprovados; Sobre mantém a liderança selecionada como Comitê Executivo e duas fotografias dos comitês, mas retira os demais conteúdos indicados. O workshop permanece com a data 2022. A assinatura CIAAM/USP substitui o conjunto anterior no rodapé de todo o site.

O [registro editorial](reformulation/2026-10-06/editorial.md) discrimina decisões, fontes consultadas, traduções e fragmentos retirados. O [registro de expectativas](reformulation/2026-10-06/changed-expectations.json) documenta as substituições nos testes. O [registro de validação](reformulation/2026-10-06/validation.md) distingue resultados efetivamente executados de verificações pendentes.

Esta etapa não reescreve inventários, relatórios, capturas ou demais evidências anteriores de migração e reformulação. Os artigos e notícias preservam seus conteúdos datados, recebendo apenas a navegação e o rodapé compartilhados. A aprovação das alterações editoriais não confirma a atualidade de equipes e contatos históricos nem autoriza publicação.
