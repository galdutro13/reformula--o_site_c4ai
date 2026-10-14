# Hero da Home — 14/10/2026

## Escopo e referência

O mantenedor solicitou corrigir a composição inicial da Home, em português e inglês, conforme a proposta textual e a segunda imagem anexada. Esta etapa ajusta a hierarquia e o equilíbrio entre a apresentação institucional, a chamada para Sobre e a ilustração abstrata existente. A referência visual orienta a composição; não autoriza alterar a identidade do cabeçalho, substituir a ilustração ou reescrever o conteúdo institucional.

O título de cada idioma e a imagem atual são preservados. A seção de linhas de pesquisa já redesenhada permanece com seus textos, cards, navegação e estilos internos; somente a margem superior do título da seção é ajustada para melhorar a transição entre hero e pesquisas. Os logos, menus, rodapé, páginas Sobre/Pesquisas, notícias, artigos históricos, metadados e rotas não fazem parte desta correção. Não se acrescentam páginas, dependências ou JavaScript cliente; commit, push e publicação permanecem fora do escopo.

## Texto e navegação

| Elemento           | PT                                                                   | EN                                                                |
| ------------------ | -------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Título preservado  | Um centro de pesquisa em inteligência artificial avançada no Brasil. | A research center for advanced artificial intelligence in Brazil. |
| Chamada anterior   | Saiba mais                                                           | About us                                                          |
| Nova chamada       | Conheça o C4AI                                                       | Discover C4AI                                                     |
| Destino preservado | `/pt/sobre/`                                                         | `/en/about/`                                                      |

A nova chamada explicita o destino institucional e acrescenta uma seta decorativa, sem incluí-la no nome acessível. O acesso continua sendo um link HTML nativo, composto pelo mapa de rotas por identificador estável e válido em publicação em subdiretório. A tradução da chamada não altera o título inglês existente. O título continua sendo o `h1` principal, com idioma programaticamente definido.

A ilustração abstrata original continua servida localmente por `/media/d59b07c37db0.png`, com proporções preservadas, sem cortes ou redesenho e com caráter decorativo. Os campos `source` e `retrievedAt` dos registros da Home mantêm a procedência da migração; o ajuste visual não representa uma nova consulta institucional ou uma mudança do conteúdo histórico.

## Composição e responsividade

Em telas largas, texto e imagem ocupam duas colunas com distribuição aproximada de 52% e 48% do espaço útil, separadas por 48–64 px. A largura do conteúdo permanece no limite institucional de 76 rem (1216 px), alinhada aos cards existentes. O título usa 40 px, peso 700 e entrelinha de 1,2; não recebe quebras manuais para impor uma quantidade fixa de linhas. A distância entre título e chamada é de 28 px. O botão tem altura mínima de 48 px, fundo branco, borda verde-azulada e estados de hover, active e foco visível, mantendo a paleta institucional.

O hero usa espaçamento vertical de 48 px em desktop e 32 px até 800 px, com altura determinada pelo conteúdo, sem alturas artificiais que causem cortes ou excesso de vazio. A imagem usa largura e altura automáticas, `max-width: 100%`, `object-fit: contain` e centralização na coluna, com altura máxima de 400 px em desktop e 288 px no empilhamento. Seus atributos intrínsecos de 856 × 580 permanecem, sem impor outra proporção pelo CSS; tanto a imagem quanto sua caixa preservam o enquadramento. Em larguras de até 800 px, a composição se torna uma coluna, na ordem título → chamada → ilustração, e o título usa escala responsiva de 32–40 px. Os textos mantêm legibilidade, e todos os elementos permanecem no fluxo normal, inclusive a seção de pesquisa imediatamente seguinte.

Os estilos devem ficar restritos ao hero da Home e à sua transição para o título da seção seguinte, cuja margem superior passa a zero. Mudanças para melhorar essa composição não justificam afetar os heros de Sobre, Pesquisas, Notícias ou artigos, nem o layout e os estilos internos dos cards de linhas de pesquisa.

## Expectativas de validação

A única substituição textual desta etapa é a chamada do hero: “Saiba mais” → “Conheça o C4AI” em PT e “About us” → “Discover C4AI” em EN. O contrato independente deve exigir as novas chamadas, destinos corretos, seta decorativa, foco visível, acesso por teclado com e sem JavaScript e hierarquia do título preservada. As expectativas anteriores sobre título, ilustração, cards, metadados, logos e demais conteúdos continuam ativas.

A geometria deve verificar duas colunas em telas largas, uma coluna até 800 px, altura mínima de 48 px para a chamada, imagem carregada e proporcional sem corte, ordem lógica e ausência de transbordamento em 320 px. A revisão visual deve conferir PT/EN em desktop, tablet e mobile, incluindo a relação do hero com os cards seguintes.

O teste de publicação em subdiretório, os quatro projetos Chromium com e sem JavaScript, axe e as tags WCAG vigentes permanecem obrigatórios. Nenhuma regra, limite, exclusão ou retry deve ser relaxado para validar a nova composição. Os resultados reais de `npm run quality`, capturas, ambiente, revisão visual e limitações efetivamente observadas serão registrados separadamente em [validation.md](validation.md), após integrar código e testes. Este registro editorial não afirma que essas verificações já foram concluídas.
