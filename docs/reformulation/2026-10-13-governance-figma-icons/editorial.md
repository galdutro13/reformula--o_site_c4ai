# Ilustrações OBIA e HarpIA fornecidas no Figma — 13/10/2026

## Autorização e escopo

O mantenedor forneceu seu arquivo Figma e solicitou substituir as ilustrações usadas nos cards de governança por essa versão. A mudança aplica-se aos cabeçalhos de OBIA e HarpIA em português e inglês, mantendo a composição e os controles dos cards existentes.

Layout, CSS, conteúdo, traduções, hierarquia Macro → OBIA e Micro → HarpIA, âncoras, painéis, recursos, contatos e pequenos símbolos permanecem. Os SVGs anteriores são preservados como parte do trabalho existente, embora deixem de ser selecionados nos cards. Os assets de NLP2/ProIndL e todas as evidências anteriores também permanecem. Não se acrescentam dependências, páginas ou JavaScript cliente. A solicitação não autoriza commit, push ou publicação.

## Fonte e exportação

- Fonte fornecida: [arquivo Figma de ícones de governança](https://www.figma.com/design/oRyXiLWMBUDsiVWzDeSs4k/?node-id=2-81), arquivo `oRyXiLWMBUDsiVWzDeSs4k`, nó indicado no pedido `2:81`.
- Consulta e exportação: **13/10/2026**, pelo conector Figma, com contexto de design e referências visuais.
- Formato: exports SVG completos dos componentes, usando a configuração de exportação SVG do Figma. Os arquivos mantêm todas as camadas, transparência, dimensões intrínsecas `width="240"`, `height="240"` e `viewBox="0 0 240 240"`.
- Destino: `public/media/`, com arquivos preservados integralmente. URLs temporárias de exportação não são usadas na aplicação; as artes não são redesenhadas, recortadas ou convertidas em paths inline.

| Projeto | Componente de origem | Nó da arte                          | Asset local                              | Bytes | SHA-256                                                            |
| ------- | -------------------- | ----------------------------------- | ---------------------------------------- | ----- | ------------------------------------------------------------------ |
| OBIA    | `2:18`               | `2:19` — olho e conexões            | `public/media/research-obia-figma.svg`   | 5660  | `d5d99454a5eae33cf57d4825e5284fda71206bb8fa523f8c7ce07f8efd7a8004` |
| HarpIA  | `2:43`               | `7:63` — composição completa da ave | `public/media/research-harpia-figma.svg` | 70836 | `44f4562bed1838497892c7ef0e0dbde51ea24ed72c60ec843118236cdbba169b` |

A arte de OBIA inclui o olho e sua rede de conexões. A arte de HarpIA inclui fundo, penas, corpo com circuitos e cabeça. A descrição presente no Figma atribui sua origem à importação de `mascote_colorido.svg`, com retirada do lettering e adaptação de enquadramento e cores. Essa atribuição registra a fonte fornecida no arquivo; não constitui verificação independente de autenticidade ou aprovação de um logo institucional.

## Procedência e integração

Cada card seleciona sua respectiva imagem local em ambos os idiomas. As ilustrações continuam decorativas, sem acrescentar nomes acessíveis aos cabeçalhos ou controles. A integração preserva as dimensões intrínsecas e as proporções dos exports; nenhuma camada é suprimida para acomodar o espaço.

A consulta ao Figma pertence à procedência dos assets visuais. Os campos `source` e `retrievedAt` dos registros institucionais não são atualizados por essa consulta, pois os textos não são revistos nesta etapa.

## Requisitos de validação

A associação entre projeto e arquivo é acrescentada manualmente ao contrato independente, com integridade conferida pelos hashes acima. Os testes devem exigir carregamento dos arquivos locais, seleção correta em PT/EN, dimensões e geometria preservadas, caráter decorativo, funcionamento com/sem JavaScript e publicação em subdiretório. A revisão visual deve conferir a composição completa e seu espaçamento nos cabeçalhos existentes.

Os contratos anteriores de conteúdo, organização, teclado, acessibilidade, links e responsividade permanecem ativos. A substituição da arte própria pela fornecida é uma mudança legítima de requisito; não autoriza reduzir regras, limites, exclusões, retries ou tags WCAG.

Resultados reais de `npm run quality`, ambiente, capturas e limitações desta troca devem ser registrados em [validation.md](validation.md). Os resultados anteriores validam seus respectivos estados, e não automaticamente esta substituição.
