# Validação dos cards de NLP2 e ProIndL — 13/10/2026

## Resultado da integração

`npm run quality` terminou com código **0**: **15 testes de configuração e 558 testes de navegador aprovados**, estes em 54,7 segundos. Astro check analisou 61 arquivos com **0 erros, 0 warnings e 0 hints**; o build gerou 38 páginas estáticas. A saída integral está em [quality.txt](quality.txt).

O ambiente utiliza Node **24.15.0** e npm **11.12.1**, diferentes das versões fixadas **24.21.0/11.19.0**. Permanece o aviso preexistente de complexidade 15, limite 10, em `tests/e2e/site.spec.ts`, agora na linha 30, sem supressão. Os avisos de `NO_COLOR`/`FORCE_COLOR` do runner não impediram a execução.

## Aceitação verificada

- Cards NLP2 → ProIndL em PT/EN, com sigla subordinada ao título completo em `h3`, resumo curto, três frentes, liderança separada e um email visível por card.
- Três controles nativos por projeto, inicialmente fechados, com expansão/fechamento por Enter e Space e foco visível, nos quatro projetos de navegador com e sem JavaScript.
- Descrição completa preservada sob Conhecer o projeto; equipe e recursos nos painéis com IDs e URLs legados; nomes acessíveis da chamada identificam cada projeto.
- Layout em duas colunas a 1440 px e uma a 800, 390 e 320 px. Os testes medem largura equivalente e alinhamento das frentes, liderança, controles e contatos no desktop; também conferem ausência de transbordamento com todos os painéis abertos.
- Modelo exige `overview` para NLP2/ProIndL e campos preenchidos, sigla, email válido, frentes e conteúdo seguro nos painéis. As quatro combinações de projeto/idioma são verificadas com fixtures sintéticas independentes.
- Conteúdo histórico, índice, HarpIA, demais páginas, metadados, links/fragmentos/assets, axe e publicação em subdiretório continuam cobertos pela suíte completa.

Os seis novos cenários funcionais rodam nos quatro projetos (24 execuções), além dos quatro testes adicionais do modelo. As expectativas vêm do pedido do mantenedor, não da aplicação. Os títulos obrigatórios de NLP2 e ProIndL passam a ser seus nomes completos; os demais títulos e o mínimo de painéis permanecem. Nenhuma regra, limite, retry, exclusão ou tag WCAG foi reduzida.

A única substituição na fixture de texto detalhado foi a retirada, autorizada pelo mantenedor, do fragmento estranho na primeira pergunta de ProIndL EN. A ocorrência legítima em NLP2 permanece obrigatória. Ver [editorial.md](editorial.md).

## Revisão visual

Foram geradas e examinadas **10 capturas finais**: PT/EN com cards fechados e expandidos em desktop/mobile, mais os dois idiomas em tablet de 800 px. O [manifesto](captures.json) registra estado, página, idioma, viewport real, suporte a subgrid, timestamp e ausência de JavaScript.

Conferi os títulos e badges alinhados no início dos cards, legibilidade dos resumos, separação de frentes e liderança, controles equivalentes, bordas discretas, ilustrações decorativas e contatos. No tablet os cards ficam empilhados com ilustrações; no celular as ilustrações grandes são omitidas e os textos utilizam a largura disponível. Nos estados expandidos, descrição e recursos permanecem no fluxo, sem colisões ou corte de conteúdo.

O grid intrínseco exige pelo menos 30 rem por card, com 2 rem entre colunas. O subgrid alinha cinco faixas compartilhadas; há fallback de grid comum. O Chromium usado na revisão confirmou suporte a subgrid. Para capturar a seção completa, a altura da viewport foi ampliada conforme seu conteúdo e está registrada; os testes usam também as alturas convencionais. As imagens mobile expandidas foram reduzidas pela ferramenta de visualização: serviram para avaliar fluxo e ausência de cortes, enquanto a conferência dos textos detalhados ocorreu nas capturas desktop expandidas e nos testes independentes.

- [PT desktop](screenshots/languages-pt-desktop.png)
- [PT desktop expandido](screenshots/languages-pt-desktop-expanded.png)
- [PT tablet](screenshots/languages-pt-tablet.png)
- [PT mobile](screenshots/languages-pt-mobile.png)
- [PT mobile expandido](screenshots/languages-pt-mobile-expanded.png)
- [EN desktop](screenshots/languages-en-desktop.png)
- [EN desktop expandido](screenshots/languages-en-desktop-expanded.png)
- [EN tablet](screenshots/languages-en-tablet.png)
- [EN mobile](screenshots/languages-en-mobile.png)
- [EN mobile expandido](screenshots/languages-en-mobile-expanded.png)

## Preservações e limites

Uma comparação programática confirmou preservação de `source`, `retrievedAt`, IDs, idioma, âncoras, conteúdo dos painéis Equipe/Recursos e descrições detalhadas dos quatro registros, com a única correção autorizada em ProIndL EN. Os dados e testes preexistentes de HarpIA e as alterações já existentes no stylesheet institucional permaneceram idênticos ao estado inicial desta tarefa. O trabalho anterior do índice foi preservado e sua suíte continua passando.

A mudança utiliza componentes Astro reutilizáveis, conteúdo tipado, CSS nativo e SVGs decorativos; não acrescenta páginas, dependências ou JavaScript cliente. Durante a integração, Stylelint apontou ordem de especificidade em dois seletores; as regras foram reordenadas, mantendo a política de lint. O preview visual foi encerrado antes da execução completa para que o Playwright controle seu próprio servidor. Após salvar este registro, a formatação e `git diff --check` foram conferidos novamente.

A suíte usa Chromium e bloqueia rede externa. Não foram testados Firefox/WebKit, leitores de tela, disponibilidade atual dos PDFs/portais ou entrega dos emails. Axe e teclado não certificam conformidade WCAG integral. Não houve commit, push ou publicação.
