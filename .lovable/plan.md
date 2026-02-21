

# DDD 방식 리팩토링 및 불필요 파일 정리 계획

## 현재 문제점

현재 프로젝트는 도메인 로직이 여러 폴더에 분산되어 있습니다:
- **types**: `src/types/`
- **비즈니스 로직/상태**: `src/contexts/`
- **유틸리티**: `src/utils/`
- **데이터**: `src/data/`
- **훅**: `src/hooks/`

`src/domains/region/`만 DDD 패턴이 적용되어 있고, 나머지 도메인(expert, service, simulator, insight, consultation, success-story)은 적용되지 않았습니다.

---

## 1단계: 불필요한 파일 삭제

아래 파일들은 어디서도 import되지 않거나 내용이 비어있어 삭제 대상입니다:

| 파일 | 삭제 사유 |
|------|----------|
| `src/App.css` | 내용이 빈 주석만 존재, 어디서도 import하지 않음 |
| `src/README.md` | 코드에서 사용하지 않는 문서 파일 |
| `src/data/initialExperts.ts` | 어디서도 import하지 않음 (DB로 마이그레이션 완료) |
| `src/utils/regionMigration.ts` | 어디서도 import하지 않음 (마이그레이션 완료) |
| `src/utils/schema/index.ts` | 어디서도 import하지 않음 (`schemaUtils.ts`가 동일 역할 수행) |
| `public/index.html` | Vite 프로젝트에서 루트 `index.html`만 사용, `public/index.html`은 불필요 |

---

## 2단계: DDD 도메인 폴더 구조 생성

각 도메인을 `src/domains/` 아래에 다음 구조로 정리합니다:

```text
src/domains/
  expert/
    types.ts          -- src/types/expert.ts + src/contexts/expertsTypes.ts 통합
    context.tsx        -- src/contexts/ExpertsContext.tsx 이동
    operations.ts      -- src/contexts/expertsOperations.ts 이동
    dbMapper.ts        -- src/utils/expertDbMapper.ts 이동
    schema.ts          -- src/utils/schema/expertSchema.ts 이동
  service/
    types.ts           -- src/types/service.ts 이동
    context.tsx        -- src/contexts/ServicesContext.tsx 이동
    schema.ts          -- src/utils/schema/serviceSchema.ts 이동
    urlMapping.ts      -- src/utils/serviceUrlMapping.ts 이동
    utils.ts           -- src/utils/serviceUtils.ts 이동
    initialData.ts     -- src/data/initialServices.ts 이동
  region/
    (이미 존재)
    context.tsx        -- src/contexts/RegionsContext.tsx 이동
    contextTypes.d.ts  -- src/contexts/RegionsContext.d.ts 이동
    helpers.ts         -- src/contexts/regionsHelpers.ts 이동
    schema.ts          -- src/utils/schema/regionSchema.ts 이동
  insight/
    context.tsx        -- src/contexts/InsightsContext.tsx 이동
    schema.ts          -- src/utils/schema/insightSchema.ts 이동
  consultation/
    context.tsx        -- src/contexts/ConsultationContext.tsx 이동
  success-story/
    context.tsx        -- src/contexts/SuccessStoriesContext.tsx 이동
    schema.ts          -- src/utils/schema/storySchema.ts 이동
  simulator/
    types.ts           -- src/components/simulator/types/simulatorTypes.ts + admin/simulator/types.ts 통합
    hooks.ts           -- src/components/simulator/hooks/ 통합
  common/
    schema.ts          -- src/utils/schema/organizationSchema.ts 이동
    seo.ts             -- src/utils/seo/metaUtils.ts 이동
    externalApi.ts     -- src/utils/externalApiUtils.ts 이동
```

---

## 3단계: import 경로 일괄 업데이트

모든 기존 import 경로를 새 도메인 경로로 변경합니다. 예시:

- `@/types/expert` --> `@/domains/expert/types`
- `@/contexts/ExpertsContext` --> `@/domains/expert/context`
- `@/utils/expertDbMapper` --> `@/domains/expert/dbMapper`
- `@/utils/schemaUtils` --> 각 도메인의 schema 직접 import
- `@/utils/seoUtils` --> `@/domains/common/seo`

---

## 4단계: 배럴 export 파일 정리

`src/utils/schemaUtils.ts`와 `src/utils/seoUtils.ts`는 단순 re-export 파일입니다. 이들을 삭제하고, 사용처에서 도메인 경로를 직접 import하도록 변경합니다.

---

## 5단계: 빈 폴더 정리

이동이 완료된 후 비어있는 기존 폴더를 삭제합니다:
- `src/contexts/` (전체 이동 후)
- `src/data/` (전체 이동 후)
- `src/types/` (`kakaoMap.d.ts`만 `src/domains/common/`으로 이동)
- `src/utils/schema/` (전체 이동 후)
- `src/utils/seo/` (전체 이동 후)

---

## 영향 범위

- 약 30개 이상의 파일에서 import 경로 변경이 필요합니다
- 기능 변경은 없으며, 순수 구조 리팩토링입니다
- 빌드 에러가 발생하지 않도록 한 도메인씩 순차적으로 진행합니다

