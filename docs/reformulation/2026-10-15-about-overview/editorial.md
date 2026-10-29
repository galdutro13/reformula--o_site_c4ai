# Apresentação, missão/visão e localização — 15/10/2026

## Escopo e referência

Segunda correção de Sobre/About solicitada pelo mantenedor em 15/10/2026, após o redesign do banner e dos canais. A recomendação e a segunda imagem fornecidas na conversa orientam a divisão da antiga composição assimétrica em três blocos temáticos. A identidade visual existente é preservada: Nunito Sans local, texto escuro sobre branco, cores claras já usadas nos canais e as duas fotografias originais.

## Organização e conteúdo

1. **Apresentação:** título C4AI e os dois primeiros parágrafos institucionais existentes à esquerda, fotografia da fachada à direita. A imagem tem altura desktop de 320 px, com enquadramento próprio e bordas discretamente arredondadas.
2. **Missão e visão:** dois artigos equivalentes, lado a lado, com títulos h3, os textos institucionais completos, superfícies claras, bordas sutis e pequenos ícones decorativos. Não há sombras.
3. **Localização:** fotografia entre árvores à esquerda; identificação Localização/Location, título Onde estamos/Where we are, descrição CIAAM/InovaUSP, endereço e CEP à direita. A imagem tem altura desktop de 256 px, com o enquadramento voltado à parte inferior para incluir o edifício e o acesso.

A apresentação mantém os dois primeiros parágrafos aprovados, sem substituí-los por texto demonstrativo ou novas afirmações institucionais. O terceiro parágrafo completo, sobre colaboração entre áreas de IA, impacto social/econômico e disseminação/transferência de tecnologia, fica disponível no detalhamento nativo. Nenhum dos seis parágrafos da seção antiga foi descartado: os três da apresentação, missão, visão e localização permanecem em PT/EN.

Como a solicitação ocorre na própria página Sobre, a ação “Saiba mais sobre o C4AI” / “Learn more about C4AI” é um `summary` de `details`, com aparência de ação contextual. Ela abre o texto adicional na própria seção, por clique ou teclado, inclusive sem JavaScript. A seta é decorativa e muda de orientação quando o detalhamento está aberto. Não foi criado um link que retorna à mesma página sem acrescentar informação.

“Como chegar” / “Getting here” usa o identificador estável da rota About e a âncora de contato do idioma (`contato`/`contact`). O visitante chega ao bloco existente com endereço, telefone e mapa, incluindo o link alternativo que funciona sem JavaScript. Não foi introduzido um serviço de mapas ou uma nova integração externa.

Os arquivos `/media/8b64dc5090e1.jpg` e `/media/42ddc70db70c.jpg` permanecem inalterados e aparecem uma única vez cada no conteúdo principal. Os novos textos alternativos descrevem a fachada/pilares/escadaria e o edifício/árvores/pátio/bandeiras visíveis nas fotografias. Não atribuem um nome específico a cada edifício sem documentação correspondente.

## Composição responsiva

Acima de 900 px, apresentação e localização usam duas colunas de mesma largura, com 40–64 px entre elas. A apresentação tem texto à esquerda e foto à direita; a localização alterna a ordem visual. Missão e visão ocupam cartões de mesma largura e altura em cada linha. Os três blocos são separados por 48 px; localização recebe também um divisor sutil e 32 px de respiro interno.

Até 900 px, os blocos se empilham: apresentação textual, foto principal, missão, visão, localização textual e sua foto. A ordem de leitura da localização no HTML já começa pelo texto; a inversão desktop é somente visual. Os intervalos principais passam a 32 px, com 24 px dentro das composições. Até 600 px, ícones, padding e distância interna dos cartões se reduzem para dar mais largura de leitura ao texto. Não há altura fixa nos blocos textuais: o detalhamento aberto amplia a linha no fluxo normal.

## Estrutura e preservações

O componente `AboutOverview.astro` e o conteúdo bilíngue tipado `about-overview.ts` substituem somente o antigo grupo `about-2` dos JSON. A âncora `about-2` foi preservada no novo componente semântico. As seções posteriores continuam sendo renderizadas pelos mesmos blocos JSON, sem mudança de conteúdo, fotos, ordem ou contato. Os campos do banner e seus assets, o componente dos canais e seus textos permanecem intactos.

O CSS novo fica em `about-overview.css`, importado pelo arquivo global e restrito às novas classes. Nenhum framework, script cliente, pacote ou alteração de esquema genérico foi necessário.

## Testes e expectativas

O novo contrato manual `aboutOverview` em `tests/e2e/requirements.ts` não importa a aplicação. Os novos cenários verificam conteúdo, agrupamento semântico, imagens únicas, ação nativa, teclado, foco, contato, geometria e reflow em 1440, 1280, 1024, 900, 768, 390 e 320 px nos quatro projetos existentes.

A fixture `editorial-requirements.json` permanece inalterada, mantendo a exigência dos textos institucionais completos. O teste da primeira correção muda somente o seletor da coluna institucional para `.about-presentation-copy`, preservando a exigência de alinhamento ao banner/canais. As verificações anteriores de liderança, Difusão, galeria, contatos, cabeçalho e rodapé continuam ativas. O requisito S05 foi atualizado para registrar esta nova distribuição temática autorizada. Nenhuma regra, contagem de destinos, limite ou exclusão foi enfraquecido.

Resultados reais e capturas pertencem ao [registro de validação](validation.md).

## Ajuste pontual de enquadramento

Após revisar a foto principal, o mantenedor determinou preservar o formato horizontal e apenas deslocar o recorte para incluir parte da escadaria. O ajuste final muda somente `object-position` de `center 15%` para `center 65%`. Dimensões, proporções do contêiner, `object-fit: cover`, alinhamento e comportamento responsivo continuam como antes. A tentativa intermediária de exibição quadrada foi desfeita, inclusive suas alterações em testes e requisitos.

O recorte final foi conferido em 1440, 768 e 390 px: a fachada, os pilares e parte da escadaria ficam visíveis. As novas capturas são [desktop](screenshots/about-photo-position-pt-desktop.png), [tablet](screenshots/about-photo-position-pt-tablet.png) e [mobile](screenshots/about-photo-position-pt-mobile.png).

## Separador entre canais e apresentação

Por solicitação do mantenedor, uma linha de 1 px na cor `#cfe0e3` separa Acompanhe nossas atividades/Follow our activities da apresentação C4AI. Ela usa o mesmo estilo do divisor anterior à localização e acompanha toda a largura do contêiner. Há 32 px entre os cartões e a linha, e 32 px entre a linha e a apresentação. O ajuste é compartilhado por PT/EN e funciona sem JavaScript; conteúdo, imagens e sua posição de recorte permanecem preservados.
