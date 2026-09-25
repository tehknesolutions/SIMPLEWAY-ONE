# SimpleWay One Player V1 — Design Specification

**Status:** APPROVED DESIGN / SPEC REVIEW
**Date:** 2026-09-22
**Goal:** entregar a primeira camada visual utilizável do SimpleWay One, reaproveitando o nível visual/metodológico alcançado no SimpleWay English e conectando-o ao motor universal já implementado.

## 1. Princípio central

O Player não será um novo app específico de idioma. Será uma shell universal capaz de executar Language Packs diferentes sobre o mesmo CORE + METHOD + RUNTIME.

A primeira vertical deve permitir: `Home → Language Selector → A1 → Lesson → Player → Activity/Feedback → Progress`.

A UI deve nascer da auditoria e extração do SWE, não de uma demo técnica genérica. Elementos reutilizados do SWE devem ser desacoplados de pressupostos específicos do inglês antes de entrarem no ONE.

## 2. Arquitetura

- `packages/core`: contratos linguísticos/pedagógicos neutros.
- `packages/method`: Universal Learning Cycle + MicroLesson.
- `packages/runtime`: estado, navegação, evidência e progresso.
- `packages/language-packs`: conteúdo e particularidades por idioma.
- `apps/web`: shell visual universal e Lesson Player.
- `packages/ui`: componentes visuais compartilháveis extraídos/adaptados do SWE quando isso reduzir duplicação real.
- `packages/lab`: permanece experimental e não controla diretamente a UI de produção.

## 3. Primeira vertical

Idiomas iniciais: English, HNK e Esperanto. O mesmo Player e Runtime devem servir aos três.

- English: primeiro candidato para extração de conteúdo/UX comprovados do SWE.
- HNK: laboratório principal; conteúdo só entra quando confirmado pela autoridade do projeto.
- Esperanto: língua de comparação; lacunas podem permanecer explicitamente `content-unresolved`.

O Player deve renderizar representação primária, representações auxiliares quando existirem, mídia quando fornecida pelo pack, Capability atual, estágio do método, atividade, feedback, evidência e progresso.

## 4. Fluxo visual

1. Home apresenta identidade SimpleWay One e acesso aos idiomas.
2. Language Selector apresenta packs disponíveis e seus estados.
3. Course/Level apresenta A1 e lições disponíveis.
4. Lesson Player mantém uma shell estável e troca conteúdo conforme Language Pack e estágio.
5. Feedback não usa um `isCorrect` universal; deriva das camadas de Evaluation.
6. Progress deriva do Lesson Runtime e das evidências registradas.

Mobile-first é obrigatório. Desktop expande a composição sem criar outro fluxo pedagógico.

## 5. Reuso do SWE

Antes de implementar componentes visuais, auditar o SWE atual e classificar cada peça em `COPY/ADAPT`, `REBUILD`, `DISCARD` ou `REFERENCE ONLY`.

Priorizar a extração de identidade visual, layout de lição, navegação, cards, vocabulário/mídia, feedback, responsividade e padrões de progresso que já provaram valor. Não copiar acoplamentos de conteúdo inglês, rotas rígidas por lesson, dados duplicados ou lógica pedagógica que conflite com o Runtime universal.

## 6. Estado e dados

O APP não inventa regras de aquisição. Ele recebe uma MicroLesson, cria/consome Lesson Runtime, envia ações do usuário e renderiza o estado retornado.

`Language Pack → MicroLesson → Universal Learning Cycle → Lesson Runtime → UI → learner action → Evaluation/Evidence → Runtime update → UI`.

Conteúdo não resolvido deve ser visível como estado editorial/desenvolvimento e nunca preenchido por inferência automática.

## 7. Erros e fronteiras

- Capability/realization incompatíveis: bloquear inicialização da lição.
- Representação ausente: estado `content-unresolved`, não placeholder inventado.
- Mídia ausente: layout continua funcional sem mídia.
- RTL: respeitar `direction` fornecida pela Representation.
- Erro de Runtime: preservar estado anterior e apresentar erro recuperável.
- Nenhum componente visual pode decidir domínio/mastery por conta própria.

## 8. Testes e critérios de aceite

A implementação deve preservar todos os testes existentes e adicionar testes do Player. A mesma fixture de Lesson Player deve executar English, HNK e Esperanto sem branches de UI por idioma.

Critérios: navegação completa da primeira vertical; responsividade mobile/desktop; HNK confirmado preservado byte-for-byte; unresolved renderizado sem invenção; RTL suportado estruturalmente; evidência registrada via Runtime; progresso visual derivado do Runtime; auditoria SWE documentada.

## 9. Fora do escopo V1

Login, billing, marketplace de cursos, editor completo de Language Packs, analytics avançado, IA conversacional livre, certificação e fórmula universal de mastery ficam fora desta entrega.

## 10. Decisão

Estratégia escolhida: extrair/adaptar o melhor frontend SWE para uma shell universal conectada ao novo motor. Não copiar o app inteiro cegamente e não reconstruir tudo do zero.
