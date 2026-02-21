

## 지역별 전문가 페이지 무한 렌더링 및 모바일 패널 버그 수정

### 문제 분석

`RegionalExperts.tsx`에서 **Maximum update depth exceeded** 에러가 발생하고 있습니다. 원인은 두 개의 `useEffect`가 서로의 의존성을 변경하며 무한 루프를 형성하는 것입니다:

1. **첫 번째 useEffect** (라인 ~42): `searchParams`, `regions` 변경 시 `setActiveRegion` 호출
2. **두 번째 useEffect** (라인 ~72): `searchParams`, `isMobile`, `regionGroupsCompat` 변경 시 `setActiveRegion('')` 호출 -> 컨텍스트 리렌더 -> 첫 번째 effect 재실행 -> 무한 루프

추가로 `regionGroupsCompat`는 매 렌더마다 새 배열 참조를 생성하여 두 번째 effect가 계속 트리거됩니다.

### 수정 계획

#### 1. 두 useEffect를 하나로 통합
- URL 파라미터(`region`, `group`) 읽기와 상태 설정을 단일 effect로 합침
- 초기 마운트 시에만 URL 파라미터 복원 실행 (ref 플래그 사용)

#### 2. 의존성 안정화
- `regionGroupsCompat`를 의존성에서 제거하고, ref로 최신 값 참조
- `setActiveRegion`은 안정적인 함수이므로 의존성에서 제거

#### 3. 모바일 패널 닫힘 처리 개선
- 모바일 패널 닫기 시 URL 파라미터도 정리하여 패널이 다시 열리지 않도록 처리

### 수정 대상 파일

- `src/pages/RegionalExperts.tsx` - useEffect 통합 및 무한 루프 제거

### 기술 상세

```text
현재 흐름 (버그):
useEffect#1 -> setActiveRegion -> 컨텍스트 리렌더
  -> useEffect#2 -> setActiveRegion('') -> 컨텍스트 리렌더
    -> useEffect#1 -> ... (무한 루프)

수정 후:
useEffect (단일, 마운트 시 1회)
  -> URL params 읽기
  -> 상태 일괄 설정
  -> 이후 URL 변경은 handleGroupClick/handleRegionClick에서만 처리
```

