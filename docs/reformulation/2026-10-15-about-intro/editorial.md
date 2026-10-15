# Banner e canais de Sobre — 15/10/2026

## Escopo autorizado

O mantenedor solicitou a correção da primeira área de Sobre, com base nas recomendações textuais e na segunda imagem anexada à conversa. A intervenção preserva a paleta, a fonte local, a fotografia e a apresentação institucional seguinte, reorganizando o banner e os destinos YouTube/Flickr. O mesmo tratamento é aplicado a About em inglês.

## Conteúdo e organização

O título PT passa a ser “Pesquisa avançada em inteligência artificial no Brasil”, acompanhado de “O C4AI desenvolve pesquisas fundamentais e aplicadas em inteligência artificial, reunindo diferentes áreas do conhecimento.” O botão “Conheça nossas pesquisas” leva à página Pesquisas pelo identificador estável de rota. A versão EN utiliza “Advanced artificial intelligence research in Brazil”, “C4AI conducts fundamental and applied research in artificial intelligence, bringing together different fields of knowledge.” e “Explore our research”. A descrição de metadados acompanha o novo título, conforme o contrato existente dessas páginas.

A identificação discreta “C4AI — USP” segue a referência visual fornecida. O banner usa o arquivo original `/media/06fcd48f000b.jpg` como imagem decorativa, com gradiente escuro à esquerda e progressivamente transparente à direita. Título, descrição e ação compartilham o alinhamento do contêiner institucional. A altura mínima desktop é 416 px, sem altura fixa; o conteúdo pode ampliar a seção. Em telas pequenas, o título e o espaçamento se adaptam e o gradiente preserva a legibilidade.

Os canais ficam em uma seção própria, “Acompanhe nossas atividades” / “Follow our activities”, com dois artigos subordinados por h3: “Seminários e palestras” / “Seminars and talks” e “Eventos e workshops” / “Events and workshops”. Cada um contém ícone SVG decorativo, descrição e link explícito com seta decorativa. Os dois destinos originais foram preservados, inclusive o endereço específico do Flickr para fotografia em álbum. Os ícones são pequenos vetores locais, sem biblioteca ou dependência.

Os cartões permanecem lado a lado acima de 700 px e se empilham em larguras menores. Entre 701 e 1099 px, a ação passa para baixo da descrição dentro de cada cartão para evitar compressão do texto. A apresentação institucional mantém os mesmos blocos, imagens e duas colunas desktop; apenas o espaço anterior foi reduzido.

## Conteúdo preservado e manutenção

Os `blocks` institucionais dos dois JSON permanecem iguais ao início desta etapa, assim como as três fotografias de `heroImages`. A coleção conserva o título e a descrição do banner em `title`/`heroBlocks`. Os blocos genéricos de `promos` foram substituídos pelo conteúdo bilíngue explícito em `src/content/about-intro.ts` e pelo componente semântico `AboutActivities.astro`; a âncora histórica `Overlappable` continua existindo. O registro `revision` foi atualizado sem descartar sua procedência anterior.

Não foram introduzidos JavaScript cliente, dependências, framework, backend ou mudanças no mapa de rotas. As regras de Sobre que antes centralizavam o banner saíram de `institutional.css`; o tratamento novo fica em `about.css`. Home, Pesquisas, cabeçalho e rodapé mantêm sua composição.

## Expectativas de teste alteradas

Somente os H1 de Sobre/About mudam na lista obrigatória independente. O contrato antigo de dois h2 nos canais passa a exigir um h2 contextual e dois h3 subordinados, preservando os testes de ordem, colunas e links. A expectativa de metadados continua acompanhando o H1. Nenhum texto obrigatório da apresentação institucional foi retirado.

O novo contrato manual `aboutIntro` não importa rotas nem coleções da aplicação. Os novos cenários verificam conteúdo, fotografia, destinos, semântica, teclado, foco, ordem de leitura, alinhamento, ausência de sobreposição e adaptação em 1440, 1280, 1024, 768, 390 e 320 px, nos quatro projetos existentes. A revisão visual e os resultados reais estão no [registro de validação](validation.md).
