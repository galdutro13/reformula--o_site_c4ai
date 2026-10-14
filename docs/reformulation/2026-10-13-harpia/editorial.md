# Complementação do HarpIA — 13/10/2026

## Escopo e autorização

O mantenedor solicitou complementar a seção HarpIA com informações obtidas no site do projeto. Esse pedido amplia o contrato de 06/10, então limitado à síntese e ao link oficial. A mudança abrange exclusivamente o registro HarpIA PT/EN e os requisitos, testes e documentação correspondentes. A âncora `harpia` e a associação Micro → HarpIA são preservadas.

Há trabalho anterior não commitado no índice de Pesquisas, identificado no início da tarefa. Essa composição e suas evidências em `../2026-10-13/` foram preservadas; os resultados desta complementação são registrados em um diretório próprio. KEML continua em Trabalhos anteriores, com seu registro histórico intacto.

## Conteúdo acrescentado

- Subtítulo de avaliação de LLMs; idealização e gestão por Sarajane Marques Peres e Fabio Gagliardi Cozman, conforme os créditos oficiais.
- Síntese de módulos independentes, interfaces compartilhadas, registro de dados e resultados para auditoria e reprodução; instalação na infraestrutura do usuário e foco em avaliação.
- O painel Módulos / Modules foi retirado de PT/EN por solicitação posterior do mantenedor durante a revisão desta entrega. As páginas dos módulos continuam acessíveis pelos links do painel Recursos.
- Painel Equipe / Team: líderes de pesquisa, pesquisadores, liderança de desenvolvimento/arquitetura e gestão de qualidade/divulgação; link para a relação completa de créditos. A seleção vem dos créditos consultados do HarpIA, sem copiar equipes ou contatos do registro histórico de KEML. Não se transfere a condição de membros atuais a pessoas identificadas como ex-membros.
- Painel Recursos / Resources: seis links para documentação dos módulos, repositório em construção, arquitetura e perguntas frequentes/orientações de instalação.
- Link de contato para o formulário indicado nas perguntas frequentes do projeto, sem copiar emails pessoais ou os exemplos demonstrativos do rodapé externo.

A síntese inicial aprovada continua literalmente presente. Os novos textos são paráfrases editoriais das fontes, com tradução equivalente EN. As listas da equipe são atribuídas aos créditos do projeto; sua consulta não equivale a confirmação individual de vínculo institucional atual.

## Fontes consultadas

Consulta em 13/10/2026. Os conteúdos relevantes PT foram também conferidos por requisição HTTP direta, todos com resposta 200, além da leitura das páginas pelo navegador de pesquisa. `retrievedAt` foi atualizado para `2026-10-13T19:31:08Z`; a revisão registra separadamente a autorização editorial. As páginas em geral trazem datas de publicação de fevereiro a maio de 2025, que não foram apresentadas como datas de novas versões.

| Fonte PT                                                                   | Equivalente EN                                              | Uso                                                          |
| -------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| [HarpIA](https://sites.usp.br/keml/harpia/)                                | [HarpIA](https://sites.usp.br/keml/en/harpia-2/)            | Propósito, independência e composição de módulos             |
| [Survey](https://sites.usp.br/keml/harpia-survey/)                         | [Survey](https://sites.usp.br/keml/en/harpia-survey-2/)     | Avaliação humana, tarefas, Moodle e exportação               |
| [Lab](https://sites.usp.br/keml/harpia-lab/)                               | [Lab](https://sites.usp.br/keml/en/harpia-lab-2/)           | Avaliação automatizada, arquivos JSON, interfaces e métricas |
| [Twin](https://sites.usp.br/keml/harpia-twin/)                             | [Twin](https://sites.usp.br/keml/en/harpia-twin-2/)         | Objetivo e estágio inicial de desenvolvimento                |
| [Recursos](https://sites.usp.br/keml/harpia-modelos-e-conjuntos-de-dados/) | [Resources](https://sites.usp.br/keml/en/harpia-resources/) | Página ainda em construção                                   |
| [Arquitetura](https://sites.usp.br/keml/harpia-arquitetura/)               | [Architecture](https://sites.usp.br/keml/en/architecture/)  | Estrutura, processamento e registro de resultados            |
| [Créditos](https://sites.usp.br/keml/creditos/)                            | [Credits](https://sites.usp.br/keml/en/credits/)            | Nomes e responsabilidades da equipe                          |
| [Perguntas frequentes](https://sites.usp.br/keml/perguntas-frequentes/)    | [FAQ](https://sites.usp.br/keml/en/faq/)                    | Instalação própria, limites de escopo e link de contato      |
| [Contato](https://sites.usp.br/keml/contato/)                              | [Contact](https://sites.usp.br/keml/en/contact/)            | Destino do formulário; nenhum envio executado                |

## Limites e divergências das fontes

A página PT de arquitetura usa “HarpIA Chatbot” em um item, mas a página dedicada e o menu identificam HarpIA Twin; a arquitetura EN também usa Twin. Adotou-se o nome comum às páginas dedicadas PT/EN. A página de Lab usa presente em PT e futuro em parte da descrição da versão 1 EN. A síntese descreve a versão documentada pelo projeto, sem afirmar teste ou disponibilização atual de uma instância hospedada.

Twin e Recursos permanecem explicitamente em desenvolvimento/construção. Funcionalidades futuras de RAG, ataques, gráficos, comparação estatística e comparação simultânea de modelos não foram convertidas em funcionalidades disponíveis. As páginas [Downloads PT](https://sites.usp.br/keml/downloads/) e [EN](https://sites.usp.br/keml/en/downloads-2/) ainda anunciam conteúdo futuro; não se criou um botão que prometa arquivos baixáveis.

Não foram alterados componentes, CSS, schemas, dependências ou JavaScript cliente. Os dois painéis usam o renderer de conteúdo e `details`/`summary` existentes.

## Contrato e evidências

A expectativa anterior de exatamente um link e nenhum painel no HarpIA foi substituída por: link principal preservado; dois painéis nomeados em ordem (Equipe/Recursos); informações de equipe; seis recursos e um formulário oficial; ausência do painel Módulos, de emails herdados e de iframes. O teste adicional PT/EN abre e fecha todos os painéis por teclado, com foco visível, nos quatro projetos com/sem JavaScript. As fixtures são manuais e independentes das coleções.

Os trechos novos e as expectativas foram adicionados; nenhum texto histórico protegido foi retirado. A suíte integral e a revisão visual da implementação estão em [validation.md](validation.md).

O mantenedor também solicitou renomear o rótulo público “Idealização e gestão do projeto” para “Líderes”, com equivalente EN “Leaders”. Os dois nomes são preservados conforme a categoria de idealização/gestão nos créditos oficiais; a alteração é do rótulo da interface.
