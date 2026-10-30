# Migração local do C4AI — 19/09/2026

Esta entrega implementa o recorte aprovado nesta tarefa: **Home, Sobre, Pesquisas e Notícias em PT/EN e 26 artigos distintos (14 PT, 12 EN)**. Na migração inicial, os 38 documentos HTML eram oito páginas principais, 26 artigos, duas páginas adicionais de paginação, entrada neutra e 404. Desde 29/10/2026, a Home portuguesa ocupa a raiz e `/pt/` permanece como alias, mantendo os 38 HTML. Migração técnica não significa aprovação editorial nem autorização de publicação. O inventário de 12/09 e suas referências permanecem preservados.

## Fontes, rastreabilidade e cobertura

Foram recuperadas as 34 URLs editoriais do recorte, todas com HTTP 200, em 19/09/2026. Os [registros de coleta](migration/sources.json) contêm URL solicitada/final, data UTC, hash SHA-256 do HTML e destino local. Os corpos foram convertidos em blocos semânticos nas coleções `pages`, `challenges` e `articles`. Nenhum artigo descoberto fora dos 26 inventariados foi incluído. Slugs equivalentes entre hosts e barras finais foram deduplicados.

- [Mapa completo de URLs](migration/url-map.json): 34 correspondências implementadas localmente; nenhuma regra de servidor.
- [Diferenças com 12/09](migration/source-differences.json): os 34 títulos coincidem; a única diferença na lista bruta de cabeçalhos é um cabeçalho vazio no artigo sobre combate à fome, ignorado na renderização. Isso **não comprova igualdade integral**: o inventário anterior contém resumos, metadados e seções, não uma cópia completa dos corpos HTML. Para os textos integrais, prevalece a recuperação de 19/09, conforme autorizado.
- [Arquivos e procedência](migration/assets.json): 66 URLs de imagens examinadas; **63 arquivos locais utilizáveis** com hash, dimensões naturais, páginas de uso e `alt` disponível na fonte. Três URLs decorativas de Pesquisas no host `dev-c4ai` devolveram corpo vazio. Não são distribuídas nem referenciadas; o fundo usa gradiente. Fotografias equivalentes disponíveis em Sobre permanecem nessa página.
- [Links externos](migration/link-checks.json): 258 destinos consultados, com resposta, redirecionamento ou erro de acesso. HEAD com falha foi repetido por GET; os 39 destinos adicionais encontrados no HTML final foram consultados por GET. Resposta 200 não comprova validade editorial ou acesso ao documento final. Timeouts, restrição a métodos e erros transitórios não foram classificados automaticamente como remoção permanente.
- [Destinos indisponíveis](migration/unavailable-links.json): links confirmados 404 e placeholder inválido substituídos pelo rótulo e aviso de indisponibilidade; o endereço original continua neste registro. Incluem PDF AgriBio EN, dois arquivos do Drive, uma matéria de imprensa e uma página de pesquisador da IBM.
- [Contatos divergentes](migration/contact-issues.json): OceanML, MClimate, AI Health e KEML EN. Textos originais preservados com aviso. Em KEML EN, o botão apontava a KEML enquanto o texto mostrava GraphML; o botão não inicia contato ambíguo. Não foi adivinhado outro endereço.

A suíte contém **787 trechos de texto congelados diretamente das fontes** em `tests/e2e/editorial-requirements.json`, além de títulos, autoria, datas, descrições, rotas e ordem da primeira listagem. Não são gerados a partir das coleções durante testes. Eles detectam perdas de texto, mas não substituem revisão humana de imagens, traduções, exatidão institucional ou direitos.

## Rotas e relações de idioma

| Fonte principal                              | Português local        | Inglês local       |
| -------------------------------------------- | ---------------------- | ------------------ |
| `/pt/inicio/` e `/`                          | `/` (alias `/pt/`)     | `/en/`             |
| `/pt/sobre/` e `/about/`                     | `/pt/sobre/`           | `/en/about/`       |
| `/pt/pesquisas_2/` e `/research_2/`          | `/pt/pesquisas/`       | `/en/research/`    |
| `/pt/category/noticias/` e `/category/news/` | `/pt/noticias/`        | `/en/news/`        |
| Artigos inventariados                        | `/pt/noticias/<slug>/` | `/en/news/<slug>/` |
| Página 2 das listagens                       | `/pt/noticias/page/2/` | `/en/news/page/2/` |

A migração de 19/09/2026 usou a raiz como escolha explícita de idioma. Essa decisão foi substituída pelo [acesso direto aprovado em 29/10/2026](reformulation.md#acesso-direto-em-português--29102026): `/` serve a Home portuguesa sem redirecionamento; `/pt/` serve o mesmo HTML com canonical `/`; `/en/` é a Home inglesa. O mapa de URLs atualiza apenas o destino da antiga Home portuguesa. A equivalência editorial da antiga raiz inglesa com `/en/` permanece registrada, mas não configura um redirecionamento HTTP: no lançamento, a raiz abrirá em português e a versão inglesa terá acesso explícito em `/en/` e no cabeçalho.

O artigo sobre marco regulatório perde apenas o U+FFFC e o hífen residual do slug antigo `…-brasil-%ef%bf%bc/`, conforme mapa; seu texto não foi reescrito.

As quatro páginas principais têm pares completos obrigatórios. O único par de artigos confirmado neste recorte é o seminário de Luis Lamb; os demais 24 artigos não recebem tradução presumida. A interface informa a ausência e oferece um link separado para o índice de Notícias no outro idioma. Não há `hreflang` fictício para esses artigos. O par Lamb preserva a mistura de idiomas já presente no texto português; revisão linguística continua pendente.

Categorias e arquivos de autor/data permanecem no WordPress. A categoria principal Notícias/News, equivalente à página migrada, é a exceção direcionada localmente na navegação. A autoria continua vinculada ao arquivo externo; a data é preservada como texto sem tornar sua navegação externa obrigatória. Links “Fonte original” permanecem externos deliberadamente. Caminhos da pesquisa antiga (`/pt/pesquisas/` no WordPress e `/research-activities-in-the-c4ai/`) continuam externos quando a fonte referencia conteúdo histórico não equivalente aos oito desafios atuais.

## Submenus, organização e destinos temporários

**Sobre:** Liderança/Leadership, Difusão/Outreach, Diversidade & Inclusão/Diversity & Inclusion, Impacto & Parceiros/Impact & Partners e Contato/Contact. Permanecem como seções, com IDs originais. Missão, visão, localização, pessoas, administração, comitês, difusão, impacto, LGPD e contato foram mantidos na sequência da fonte. Equipe e contato não foram extraídos para páginas novas nesta etapa.

**Pesquisas:** NLP2, ProIndL, KEML, OceanML, MClimate, OBIA@C4AI, AI Health e AgriBio, com os IDs `*_B_eng` originais também em português. Cada desafio possui registro próprio por idioma, descrição, lideranças, painéis e recursos recuperados. O índice preserva sua organização; o corpo preserva a ordem NLP2, ProIndL, KEML, OceanML, MClimate, OBIA, AI Health, AgriBio. **Esses oito desafios não identificam os dois subprojetos contratados.** Não foram criadas páginas individuais para eles.

**Notícias:** ChatBot/ChatGPT, Perspectives, mesas-redondas, Tech Law, encontros e imprensa. Os fragmentos PT `chat_port`, `seminar_port`, `mesaRedonda`, `techLaw_port`, `05_port`, `press` e EN `chat`, `seminar`, `roundTable`, `techLaw`, `05`, `others` foram preservados, assim como `topo` onde existente.

O arquivo PT tem 11 itens classificados como Notícias na fonte, em páginas de oito e três. Há outros três artigos em português que a fonte classificava no arquivo inglês: Corpus Carolina, DemonumentaRA e línguas indígenas. Permanecem em português, acessíveis na seção adicional “Outros artigos em português no acervo”, na busca e na navegação entre artigos. A listagem inglesa reúne os 12 artigos em inglês, em páginas de oito e quatro. Isso evita apresentar os três artigos portugueses como traduções inglesas. As oito entradas iniciais em cada idioma seguem a ordem observada; empates de data preservam a ordem da fonte.

Na migração inicial, Recursos e Oportunidades receberam destinos externos identificados. Oportunidades/Opportunities foi retirado do cabeçalho em 30/10/2026 por decisão do mantenedor; os destinos de Recursos permanecem. Publicações bibliográficas, parceiros, CID, NLP2, arquivos temáticos e candidaturas não foram migrados. Não há páginas vazias simulando esses serviços. Seu destino definitivo continua pendente. A busca local abrange todos os artigos migrados do idioma atual, sem consultar o WordPress.

Fragmentos não são enviados ao servidor: eventual política de redirecionamentos deve combinar mapa de caminhos com preservação dos IDs. O mapa é documentação para decisão de lançamento, não configuração de redirecionamento. Não se propõe encaminhar material sem equivalente à Home.

## Diferenças intencionais de apresentação e interação

- Marcas, ilustração, retratos e fotografias recuperáveis são locais. Paleta teal, composição clara da Home, destaques, cartões, colunas, rodapé institucional e sequência editorial permanecem reconhecíveis. O cabeçalho branco consistente substitui sobreposições transparentes de contraste variável. O seletor vira dois links nativos em fluxo; não encobre o texto.
- Nunito Sans regular e negrito são servidos localmente; a licença SIL OFL 1.1 foi conferida no [repositório oficial Google Fonts](https://github.com/google/fonts/tree/main/ofl/nunitosans) e acompanha `public/fonts/OFL.txt`. As variações secundárias de Open Sans/Playfair do tema foram consolidadas em Nunito Sans e itálico nativo. Fontes locais não consultam Google durante build ou uso.
- Submenus e painéis usam `details/summary`, com alvos de pelo menos 44 px e teclado nativo. O menu móvel expande em fluxo, sem painel lateral ou bloqueio de foco. Não há cabeçalho fixo escondendo âncoras.
- O carrossel de canais de Notícias virou três cartões estáticos. O destaque de Sobre usa uma fotografia estática; as demais fotografias do slideshow estão em galeria ao final, sem animação. Os três fundos vazios de Pesquisas foram removidos. A nova disposição muda alturas e quebras em relação ao WordPress deliberadamente.
- A barra de acessibilidade foi substituída por HTML semântico, um H1 por página, foco visível, salto para o conteúdo, contraste revisto e layout responsivo. Ícones decorativos do tema não são dependência; links recebem nomes legíveis. O link vazio invisível para um vídeo em News EN foi retirado; a correção de “I” fora do link “A no agronegócio…” reúne “IA” no nome acessível.
- O grid de notícias conserva quatro colunas no desktop, duas em telas intermediárias e uma no celular. Busca é melhoria progressiva: o campo fica desabilitado com explicação sem JS, enquanto artigos, paginação e painéis continuam disponíveis.
- Mapas, vídeos e agenda oferecem links externos; frames permitidos só são criados após acionar “Carregar conteúdo externo”. Não se transportaram comentários fechados, widgets WordPress nem formulários presumidos. Testes simulam o acionamento bloqueando a rede externa; não comprovam funcionamento atual dos provedores.
- Datas, autoria, créditos, referências, categorias e grafias editoriais existentes foram preservados. Informação antiga não foi atualizada por inferência. `alt` vazio permanece para ilustração decorativa ou imagens cujo contexto já é textual; a qualidade descritiva de cartazes e fotografias exige revisão editorial humana. Crédito disponível permanece no corpo; ausência de crédito não foi preenchida por suposição.

## Verificação e revisão visual

A matriz, capturas novas e resultados finais estão em [validação da migração](migration/validation.md). Capturas ficam separadas em `docs/migration/screenshots/`, sem sobrescrever `docs/reference/`. A comparação usa viewports 1440×900 e 390×844; não toma artefatos de escala dos PNGs longos como medidas do layout.

Os testes demonstrativos foram substituídos pelo contrato institucional aprovado e ampliados. Nenhuma regra de lint/axe foi desativada, nenhuma exclusão ou retry foi adicionado e nenhuma dependência mudou. Foram ampliadas as verificações de BASE_PATH, arquivos, estados de painéis e conteúdo. A coleção demonstrativa foi removida por não ter mais uso.

## Decisões pendentes

1. Aprovação institucional de textos, nomes, cargos, números, contatos e datas, inclusive traduções e trechos mistos; identificar os dois subprojetos contratados.
2. Direitos de uso de fotografias, retratos, marcas e documentos. A licença da fonte tipográfica foi conferida; disponibilidade pública das imagens não é autorização de reutilização.
3. Destino definitivo dos acervos externos e tratamento dos links indisponíveis, especialmente PDFs e Drive. Respostas HTTP pontuais não garantem disponibilidade futura.
4. Redirecionamentos antigos, conflito da raiz inglesa, política de arquivos e eventuais aliases de fragmentos.
5. Domínio, BASE_PATH, TLS, servidor, 404 HTTP, cache, acesso e rollback na USP, conforme [publicação](publishing.md).

Não houve commit, push, publicação ou configuração de redirecionamentos de servidor.

## Correções P2 — 22/09/2026

A busca agora extrai conteúdo editorial por tipo de bloco, incluindo grupos/painéis e referências a desafios, em vez de pesquisar a serialização JSON. Na inicialização do navegador, segmentos HTML são interpretados em `template` desconectado, sem carregar recursos; entidades viram caracteres e elementos inline preservam a continuidade das palavras. Quebras e limites de blocos separam palavras. Índice e consulta normalizam caixa, acentos e espaços, inclusive os não separáveis. Atributos, IDs e caminhos de imagens não são termos de busca; URLs exibidas no próprio texto continuam pesquisáveis. O índice normalizado é calculado uma vez e mantém ordem e idioma dos artigos, URLs com `BASE_PATH` e busca por substring.

Somente o iframe de `www.youtube-nocookie.com` usa `strict-origin-when-cross-origin`, enviando a origem sem o caminho da página na requisição externa. Mapa e agenda continuam com `no-referrer`; todos continuam dependendo de acionamento explícito e oferecendo link externo sem JavaScript. A mudança atende à identificação por `Referer` descrita na [documentação oficial do YouTube](https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-player-api-client-identity). Textos editoriais, coleções, rotas e dependências não foram alterados. Veja as regressões e resultados no [registro de validação](migration/validation.md#correções-p2--22092026).

## Restauração da foto de Pesquisas — 30/10/2026

O diagnóstico de 19/09 acima permanece histórico: as URLs do host de desenvolvimento falharam e não foram distribuídas. Por decisão posterior do mantenedor, Pesquisas PT/EN passa a reutilizar a fotografia equivalente já preservada a partir do host institucional e usada em Sobre, `/media/06fcd48f000b.jpg`. Não há nova coleta, alteração dos bytes ou reescrita do inventário de migração. O índice e a seção histórica passam a se chamar Projetos anteriores/Previous projects, preservando âncoras e conteúdo. A decisão e os resultados atuais estão no [registro da reformulação](reformulation.md#projetos-anteriores-e-foto-de-pesquisas--30102026).
