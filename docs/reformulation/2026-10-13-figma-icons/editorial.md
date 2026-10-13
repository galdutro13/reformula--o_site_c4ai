# Ilustrações NLP2 e ProIndL fornecidas no Figma — 13/10/2026

## Autorização e escopo

O mantenedor recriou as ilustrações do mockup e solicitou adotar sua versão no lugar das ilustrações usadas na implementação dos cards. O arquivo fornecido contém dois componentes: “NLP2 — Balões de conversa” e “ProIndL — Penas e geometria”. A alteração substitui as ilustrações grandes dos cabeçalhos, nos mesmos projetos e em ambos os idiomas.

Conteúdo, traduções, ordem NLP2 → ProIndL, âncoras, equipes, recursos, contatos, controles expansíveis e pequenos símbolos permanecem sob os requisitos anteriores. Não se acrescentam páginas, dependências, JavaScript cliente ou referências remotas no HTML. A solicitação não autoriza commit, push ou publicação.

## Fonte e exportação

- Fonte: [C4AI — Ícones NLP2 e ProIndL](https://www.figma.com/design/R70QFAvYNAN8NpocOdiBeA/?node-id=0-1), arquivo `R70QFAvYNAN8NpocOdiBeA`, página `0:1`.
- Consulta e exportação: **13/10/2026**, pelo conector Figma, com contexto de design e referência visual dos componentes.
- Formato: SVG transparente, incluindo o fundo orgânico de cada ilustração; dimensões intrínsecas `width="240"`, `height="240"` e `viewBox="0 0 240 240"`.
- Os arquivos exportados são preservados integralmente e servidos a partir de `public/media/`. As URLs de exportação temporárias não são usadas na aplicação.

| Projeto | Componente                           | Nó da arte | Asset local                               | Bytes | SHA-256                                                            |
| ------- | ------------------------------------ | ---------- | ----------------------------------------- | ----- | ------------------------------------------------------------------ |
| NLP2    | `2:24` — NLP2 — Balões de conversa   | `2:25`     | `public/media/research-nlp2-figma.svg`    | 2336  | `1e6d2d421756f928fd24c0a9c4cb4d78fe79d35aa321df5e0b0e36cb0416cea4` |
| ProIndL | `2:35` — ProIndL — Penas e geometria | `2:36`     | `public/media/research-proindl-figma.svg` | 3114  | `42c91a82973c369613475f4335583fb96ecfa7730dfafe27e09899295ae4f7e2` |

## Aplicação e requisitos de validação

Cada ilustração ocupa o cabeçalho do projeto correspondente e continua decorativa, sem alterar os nomes acessíveis dos cards ou dos controles. A integração usa imagem local estática, preservando as dimensões intrínsecas e a proporção do export. A apresentação em uma ou duas colunas segue os critérios anteriores de largura disponível.

O contrato independente acrescenta a associação explícita entre projeto e arquivo fornecido, mantendo as verificações existentes de conteúdo, navegação, teclado, acessibilidade e responsividade. Os hashes acima permitem conferir que a integração não alterou os SVGs. Nenhuma expectativa anterior é retirada para obter aprovação.

Os resultados reais de `npm run quality`, as capturas e as limitações desta substituição devem ser registrados em [validation.md](validation.md). Os relatórios e as capturas de etapas anteriores permanecem preservados como evidência de seus respectivos estados.
