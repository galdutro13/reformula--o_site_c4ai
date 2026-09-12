# Instruções para agentes

- Faça alterações de escopo limitado; preserve arquivos e trabalho existente. Não faça commit, push ou publicação sem solicitação.
- Preserve Astro totalmente estático, componentes `.astro`, TypeScript estrito e CSS nativo. Não introduza framework de interface, backend, CMS ou JavaScript cliente sem necessidade autorizada.
- Justifique cada dependência; confira estabilidade e compatibilidade oficial e atualize o lockfile com npm. Não use instalações forçadas para contornar incompatibilidades.
- Mantenha conteúdo essencial e navegação funcionais sem JavaScript. Use o mapa de rotas por identificadores estáveis para PT/EN.
- Escreva testes orientados a requisitos. A lista obrigatória em `tests/e2e/requirements.ts` é independente da implementação; não a derive das rotas ou coleções.
- Execute `npm run quality` antes de concluir. Relate resultados reais e qualquer verificação não executada.
- Nunca enfraqueça testes, regras, limites ou exclusões apenas para obter aprovação. Relate e justifique qualquer mudança nessas verificações, inclusive neste arquivo; registre exceções conforme `docs/quality.md`.
- Atualize a documentação afetada. Não apresente conteúdo demonstrativo como informação institucional real.
