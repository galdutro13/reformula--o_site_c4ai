# Cards de NLP2 e ProIndL — 13/10/2026

## Escopo e autorização

O mantenedor solicitou corrigir hierarquia visual, organização da informação, legibilidade e consistência dos dois projetos na seção de línguas do Brasil, mantendo duas colunas quando houver espaço. A proposta textual e a segunda imagem anexada autorizam uma apresentação de visão geral, com cards equivalentes e descrições inicialmente curtas. A mudança abrange NLP2 e ProIndL em PT/EN, o componente que os apresenta e os requisitos, testes e documentação correspondentes.

O índice de Pesquisas e a complementação de HarpIA são trabalhos anteriores não commitados, preservados com suas evidências. Governança, Macro/Micro, HarpIA, KEML e os outros registros históricos ficam fora desta correção. A ordem NLP2 → ProIndL e as âncoras `languages`, `NLP2_B_eng` e `ProIndL_B_eng` são preservadas.

## Síntese editorial aprovada

Os nomes completos, resumos, frentes e lideranças em português vêm da proposta explicitamente adotada no pedido do mantenedor. A síntese é usada para orientar o visitante; não constitui uma nova apuração de resultados, vínculo atual, desempenho ou impacto dos projetos. As traduções inglesas mantêm o propósito dos textos portugueses, sem acrescentar capacidades.

| Elemento           | NLP2                                                                                                                                               | ProIndL                                                                                                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nome completo PT   | Processamento de Linguagem Natural para o Português                                                                                                | Fortalecimento das Línguas Indígenas Brasileiras com IA                                                                                                                             |
| Nome completo EN   | Natural Language Processing for Portuguese                                                                                                         | Strengthening Brazilian Indigenous Languages with AI                                                                                                                                |
| Resumo PT          | Desenvolvimento de recursos linguísticos e ferramentas abertas para aprimorar o processamento automático do português brasileiro escrito e falado. | Pesquisa colaborativa sobre o desenvolvimento de tecnologias de inteligência artificial para apoiar a documentação e o fortalecimento das línguas indígenas brasileiras.            |
| Resumo EN          | Development of linguistic resources and open tools to improve the automatic processing of written and spoken Brazilian Portuguese.                 | Collaborative research into the development of artificial intelligence technologies to support the documentation and strengthening of Brazilian Indigenous languages.               |
| Frentes PT         | Análise sintática e anotação linguística; Construção de corpora e modelos de linguagem; Reconhecimento, síntese e processamento da fala.           | Documentação e preservação linguística; Ferramentas de IA para línguas com poucos recursos digitais; Desenvolvimento ético de tecnologias em colaboração com comunidades indígenas. |
| Frentes EN         | Syntactic analysis and linguistic annotation; Building corpora and language models; Speech recognition, synthesis and processing.                  | Language documentation and preservation; AI tools for languages with few digital resources; Ethical development of technologies in collaboration with Indigenous communities.       |
| Liderança PT       | Marcelo Finger, Sandra M. Aluísio e Thiago A. S. Pardo.                                                                                            | Luciana Storto e Claudio Pinhanez.                                                                                                                                                  |
| Liderança EN       | Marcelo Finger, Sandra M. Aluísio and Thiago A. S. Pardo.                                                                                          | Luciana Storto and Claudio Pinhanez.                                                                                                                                                |
| Contato preservado | c4ai-nlp2@usp.br                                                                                                                                   | c4ai-proindl@usp.br                                                                                                                                                                 |

Não se adotam automaticamente os subtítulos explicativos adicionais desenhados dentro da segunda imagem: são referência de composição, enquanto os textos explícitos do pedido delimitam a síntese a implementar.

## Organização e preservação

- O título completo é o `h3` de cada projeto, subordinado ao título `h2` do eixo. A sigla é um badge, sem criar um nível de título concorrente. Resumo, frentes de pesquisa e liderança possuem funções visuais separadas.
- “Conhecer o projeto” / “Explore the project” é um `summary` de `details`, com identificação acessível do projeto. Esse controle abre no próprio card a descrição extensa existente; o pedido admite componentes expansíveis e não autoriza novas páginas. Ele não promete navegação a um destino externo presumido.
- Equipe / Team e Recursos e publicações / Resources and publications permanecem controles nativos `details`/`summary`. Seus conteúdos e URLs são mantidos; somente o rótulo do segundo painel muda. Cada contato é um link `mailto:` com o email visível.
- A apresentação usa um componente Astro reutilizável, dados tipados de visão geral e CSS nativo. A descrição original permanece nos blocos de conteúdo; os metadados de origem e consulta não são copiados ou atualizados por causa de uma mudança visual.
- O grid usa `repeat(auto-fit, minmax(min(100%, 30rem), 1fr))` e gap de 2 rem. Há duas colunas a 1440 px e empilhamento a 800, 390 e 320 px. Em duas colunas, CSS `subgrid` alinha cinco blocos compartilhados — apresentação, frentes, liderança, painéis e contato —, com grid básico como fallback. Cards com conteúdo expandido crescem no fluxo, sem truncamento ou altura fixa para esconder informação.
- Ilustrações e ícones são SVG nativos decorativos, preservando a paleta institucional. Não introduzem uma nova identidade institucional nem substituem informações textuais. São excluídos da árvore de acessibilidade e não dependem de arquivos ou scripts remotos.

## Procedência dos registros preservados

As descrições detalhadas, listas de equipe, recursos e emails já pertencem aos registros migrados em setembro. Esta etapa inspecionou os arquivos locais; não realizou nova consulta externa para confirmar atualidade. `source` e `retrievedAt` preservam a procedência real da migração:

| Idioma | Fonte original preservada                   | `retrievedAt` preservado           |
| ------ | ------------------------------------------- | ---------------------------------- |
| PT     | `https://c4ai.inova.usp.br/pt/pesquisas_2/` | `2026-09-19T17:41:08.089160+00:00` |
| EN     | `https://c4ai.inova.usp.br/research_2/`     | `2026-09-19T17:41:08.407988+00:00` |

IDs preservados dos painéis: NLP2 PT `16252-c50` / `16252-c53`, NLP2 EN `5-c53` / `5-c56`, ProIndL PT `16252-c69` / `16252-c72` e ProIndL EN `5-c76` / `5-c79`, para Equipe e Recursos, respectivamente. As URLs de PDFs e portais e os dois emails permanecem disponíveis.

Na inspeção inicial, a primeira pergunta da descrição detalhada de ProIndL EN continha o trecho “syntactically annotated texts for building robust tagging and parsing models;”, ausente do equivalente português e relacionado a NLP2. O mantenedor autorizou expressamente sua retirada em 13/10/2026. A pergunta passa a ser “How can AI technologies improve documentation and related efforts for Brazilian indigenous languages?”. Somente essa expectativa foi substituída na fixture editorial; a frase legítima em NLP2 permanece obrigatória. Os testes exigem a ausência do trecho no card ProIndL, inclusive com a descrição expandida.

## Expectativas substituídas e validação

Os títulos antigos concatenavam o nome completo e “Líderes” / “Leaders” seguido dos nomes. Essa concatenação deixa de ser exigida; nome e liderança passam a ser conferidos separadamente. A sigla continua presente, mas deixa de ser o título principal do projeto. O rótulo “Recursos” / “Resources” é substituído por “Recursos e publicações” / “Resources and publications”. O conteúdo longo continua obrigatório, localizado no controle expansível do projeto, em vez de inicialmente exposto.

As expectativas novas são manuais, derivadas do pedido do mantenedor, não geradas pelos dados da aplicação. Os testes devem verificar textos, títulos, ordem, links e conteúdo preservado; expansão e fechamento por teclado com foco visível; dois cards no desktop e empilhamento no espaço menor; funcionamento sem JavaScript e preservação dos demais requisitos. Não se relaxam tags WCAG, regras, limites, exclusões, retries ou a lista obrigatória de páginas. Resultados reais e capturas desta etapa ficam em [validation.md](validation.md).
