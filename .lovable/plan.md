

# 버튼 스타일 통일 계획

## 현재 문제

현재 전문가 선택/프로필 버튼이 **3곳**에서 각각 다른 스타일로 구현되어 있습니다:

| 위치 | 사용 컴포넌트 | 터치 피드백 | 스타일 |
|------|-------------|-----------|--------|
| 지역별 전문가 팝업 (RegionalMap) | shadcn `Button` | 없음 | shadcn 기본 스타일 |
| 전문가 카드 (ExpertCard) | `CustomButton` | active:scale-95 | 커스텀 스타일 |
| 전문가 프로필 사이드바 (ExpertSidebar) | `CustomButton` | active:scale-95 | 커스텀 스타일 |

지역별 전문가 팝업의 버튼만 shadcn `Button`을 사용하고 있어 나머지와 디자인이 다릅니다.

## 수정 방향

**지역별 전문가 팝업(RegionalMap)의 선택/프로필 버튼을 `CustomButton`으로 교체**하여 나머지 페이지들과 동일한 스타일로 통일합니다.

- 선택 버튼: 미선택 시 `outline`, 선택 시 `secondary` + 체크 아이콘
- 프로필 버튼: `primary`
- 모든 버튼에 `active:scale-95`, `touch-manipulation`, `select-none` 터치 피드백 적용

## 수정 파일

**`src/components/RegionalMap.tsx`**
- shadcn `Button` import를 `CustomButton` import로 변경
- 선택 버튼: `Button variant="default"` → `CustomButton variant="outline"` (선택 시 `secondary`)
- 프로필 버튼: `Button variant="outline"` → `CustomButton variant="primary"`
- 터치 피드백 클래스 추가: `active:scale-95 transition-transform duration-150 touch-manipulation select-none`
- 사이즈/패딩은 기존 컴팩트 사이즈 유지 (팝업 내 공간 고려)

이렇게 하면 전문가 카드, 프로필 사이드바, 지역 팝업 모두 동일한 버튼 스타일과 터치 피드백을 갖게 됩니다.

