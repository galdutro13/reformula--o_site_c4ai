# Atualização editorial — 06/10/2026

## Autorização e decisões

O mantenedor autorizou a implementação do plano “Atualização editorial do site C4AI”, consolidando a reunião com Fábio Cozman de 29/09/2026 e o email de 30/09/2026 transcritos na conversa. A revisão abrange PT/EN, sem novas páginas, dependências ou JavaScript cliente, e preserva Astro estático, TypeScript estrito, CSS nativo e o funcionamento essencial sem JavaScript. Commit, push e publicação não fazem parte desta autorização.

Os conflitos foram resolvidos expressamente: preservar a liderança como Comitê Executivo e retirar os textos dos demais blocos de comitês, mantendo duas fotos; manter o vídeo do workshop com a data 2022 e retirar sua chamada; retirar simultaneamente textos e links de Impacto & Parceiros da página Sobre. “Joca” designa João Paulo Veiga, que permanece na liderança como Coordenador de Impacto; o apelido não deve aparecer na interface.

## Conteúdo aprovado e preservações

| Área                 | Alteração autorizada                                                                                                                              | Preservação exigida                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Home                 | Frase “Um centro de pesquisa em inteligência artificial avançada no Brasil.”; dois cartões; governança com links Macro/Micro; retirar diversidade | Ilustração, acesso a Sobre e cartão de línguas do Brasil                                             |
| Pesquisas            | Macro → OBIA e regulação de IA; Micro → empresas e HarpIA; KEML ao final do histórico                                                             | NLP2, ProIndL, OBIA e os cinco registros históricos completos, inclusive painéis, equipes e contatos |
| Sobre: abertura      | Três parágrafos revisados; localização CIAAM/InovaUSP; retirar comentários iniciais de Difusão e Impacto                                          | Fotos, Missão e Visão; referência histórica a IBM/FAPESP em 2020                                     |
| Sobre: destaques     | Retirar “C4AI DOIS ANOS”; duas colunas YouTube/Flickr no desktop, uma no mobile                                                                   | Artigo histórico de aniversário                                                                      |
| Sobre: liderança     | Fabio, Fernando Osório, João Paulo Veiga; abaixo Jairo, Maurício, Eliana                                                                          | Fotos, descrições e links dos seis integrantes; ordem equivalente no mobile                          |
| Sobre: comitês       | Retirar banners, títulos, listas, descrições e contatos dos blocos separados                                                                      | Apresentação da liderança como Comitê Executivo e duas fotos em galeria com alt descritivo           |
| Sobre: demais seções | Retirar Diversidade e Inclusão e Impacto & Parceiros; Difusão com Osório como único coordenador                                                   | Texto de Difusão, workshop, endereço, telefone e mapa                                                |
| Contato em Sobre     | Somente `c4ai@usp.br`, inclusive no link de Difusão; introdução no singular                                                                       | Contatos históricos fora de Sobre                                                                    |
| Menus                | Retirar os dois destinos de Sobre e os dois portais de Recursos                                                                                   | Publicações, NLP2 e demais itens; acervos externos não são excluídos                                 |
| Rodapé global        | Sede no CIAAM, logos CIAAM/USP locais e acessíveis                                                                                                | Redes sociais existentes e conteúdo editorial dos artigos                                            |

As âncoras `languages` e `governance` continuam existentes; `governance-macro`, `governance-micro` e `harpia` são estáveis e iguais em PT/EN. A ordem histórica é OceanML, MClimate, AI Health, AgriBio, KEML. A âncora `KEML_B_eng` permanece no próprio registro histórico.

Os fragmentos das seções excluídas de Sobre deixam de existir junto com seus links internos: `diversidade`, `impacto`, `reusable-sections-6` (bloco separado dos três comitês) e `reusable-sections-3` (chamada antiga do workshop). O bloco textual dos dois comitês, anteriormente identificado por `cis`, é substituído pela galeria `about-gallery`, que contém as fotografias preservadas. Não criar âncoras vazias nem redirecionamentos artificiais para os conteúdos retirados. Os fragmentos mantidos, inclusive liderança, Difusão e contato, continuam funcionais.

## Textos e traduções

O texto principal aprovado de Sobre deve ser reproduzido literalmente em português:

> O Centro de Inteligência Artificial (Center for Artificial Intelligence – C4AI) tem o compromisso de desenvolver pesquisas no estado da arte em Inteligência Artificial (IA), explorando tanto aspectos básicos quanto aplicados nesta área.
>
> O C4AI foi criado em 2020 com apoio da IBM e da Fundação de Amparo à Pesquisa do Estado de São Paulo (FAPESP), dentro do Programa de Centros de Pesquisa Aplicada.
>
> O C4AI considera que o próximo nível de desempenho em IA só poderá ser alcançado enfatizando a combinação de aprendizado de máquina, tomada de decisão, representação de conhecimento e raciocínio, e incrementando a colaboração entre essas áreas e suas aplicações. O C4AI também desenvolve estudos sobre o impacto social e econômico da IA e conduz atividades de disseminação de conhecimento e transferência de tecnologia, procurando formas de melhorar a qualidade de vida humana.

Localização aprovada:

> O C4AI é sediado no CIAAM e localizado no InovaUSP, um espaço para inovação e pesquisa multidisciplinar no coração do campus Butantã da USP.

Síntese aprovada de HarpIA:

> HarpIA é uma plataforma de código aberto voltada à avaliação de grandes modelos de linguagem (LLMs), com ferramentas para tornar esse processo mais padronizado, reprodutível e transparente.

A versão inglesa deve traduzir fielmente esses textos e as novas sínteses de governança, sem ampliar alegações institucionais. O título inglês existente “A research center for advanced artificial intelligence in Brazil.” permanece. “Educação e Disseminação” corresponde a “Education and Dissemination”; o vídeo usa “Vídeo do workshop — 2022” / “Workshop video — 2022”. Os textos traduzidos são adaptações para esta implementação, não citações literais das páginas externas nem evidência de aprovação institucional independente de cada tradução.

Uma correção adicional autorizada pelo mantenedor trata a biografia inglesa de João Paulo Veiga, que repetia a descrição de Alexandre. A versão EN deve traduzir fielmente a biografia PT já existente de João Paulo, preservando a procedência desse conteúdo e sem acrescentar credenciais. Essa correção é a única substituição da descrição de um integrante mantido e deve constar do registro de expectativas.

Não acrescentar equipe, contatos, módulos ou alegações de resultados a HarpIA. Os temas amplos de governança em empresas e regulação de IA vêm do escopo editorial fornecido, não de inferência das descrições históricas de OBIA ou KEML.

## Fontes e procedência

| Fonte                                                                                         | Utilização                                                                                        | Consulta/verificação                                                                 |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Reunião de 29/09/2026, email de 30/09/2026 e plano aprovado, transcritos na conversa          | Textos de Sobre, sede institucional, liderança, remoções e organização das pesquisas              | Autorização direta do mantenedor; não há cópia de email obtida por conector          |
| [HarpIA PT](https://sites.usp.br/keml/harpia/)                                                | Grafia oficial, avaliação de LLMs, código aberto, padronização, reprodutibilidade e transparência | Consultada em 06/10/2026; conteúdo compatível com a síntese aprovada                 |
| [HarpIA EN](https://sites.usp.br/keml/en/harpia-2/)                                           | Destino equivalente em inglês e confirmação da descrição da plataforma                            | Consultada em 06/10/2026; não copiar o texto extenso nem descrição dos módulos       |
| [Logo CIAAM](https://ciaam.usp.br/wp-content/uploads/sites/1519/2024/07/logo-ciaam-short.png) | Origem do arquivo autorizado para cópia local                                                     | Download realizado em 06/10/2026: `public/media/ciaam.png`, PNG de 1648 × 646 pixels |
| Conteúdo local migrado e evidências de setembro                                               | Textos e imagens expressamente preservados, URL do workshop e contatos históricos fora de Sobre   | Preservar os registros existentes, sem revalidar sua atualidade por inferência       |

Os registros HarpIA devem trazer fontes próprias e a data de consulta 2026-10-06 (`retrievedAt`: `2026-10-06T18:54:19Z`). Não copiar `source`/`retrievedAt` de KEML. A revisão editorial das páginas deve ser registrada separadamente da procedência dos textos originalmente migrados. As datas históricas das fontes e dos artigos não são alteradas para simular atualização.

## Contrato de validação

O [registro de expectativas alteradas](changed-expectations.json) deve explicar as substituições nas fixtures independentes. Textos retirados por esta autorização deixam de ser obrigatórios somente nos locais indicados; os oito registros migrados de pesquisa e os artigos permanecem protegidos. `blocks: []` é permitido exclusivamente para Home, cujo conteúdo principal vem dos componentes de destaque e pesquisa; outras páginas, grupos e painéis continuam exigindo conteúdo.

Não há nova exceção de qualidade: requisitos foram alterados por autorização editorial, não para contornar falhas. [validation.md](validation.md) registra a execução da suíte completa e a revisão visual desta implementação, separadas das evidências históricas.
