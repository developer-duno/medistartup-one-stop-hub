
## 페이지 전환 속도 최적화

### 문제 분석 결과

성능 프로파일에서 다음 병목이 확인되었습니다:

| 항목 | 현재 상황 | 영향 |
|------|----------|------|
| 데이터 로딩 | 4개 테이블 동시 fetch (앱 시작 시) | 초기 로딩 +900ms |
| admin 권한 체크 | user_roles 쿼리 3회 중복 호출 | 각 1.3초 x 3 |
| 페이지 전환 | 스피너 표시 후 청크 다운로드 | 체감 속도 저하 |
| 프리페치 | 없음 | 클릭 후에야 로딩 시작 |

### 수정 계획

#### 1. 링크 호버 시 페이지 프리페치 (체감 속도 대폭 개선)

네비게이션 링크에 마우스를 올리면 해당 페이지 청크를 미리 다운로드하는 `PrefetchLink` 컴포넌트를 만듭니다. 사용자가 클릭할 때는 이미 코드가 준비되어 있어 즉시 전환됩니다.

- 새 파일: `src/components/PrefetchLink.tsx`
- 수정 파일: `src/components/Navbar.tsx` (Link를 PrefetchLink로 교체)

#### 2. admin 권한 체크 중복 제거

`useAuth.tsx`에서 `checkAdminRole`이 `onAuthStateChange`와 `getSession` 양쪽에서 호출되고, `setTimeout`으로 추가 호출까지 발생합니다. ref 플래그를 사용하여 1회만 실행하도록 수정합니다.

- 수정 파일: `src/hooks/useAuth.tsx`

#### 3. 페이지 전환 시 스피너 대신 현재 페이지 유지

`React.startTransition`을 활용하여 새 페이지 로딩 중에도 현재 페이지를 계속 표시합니다. 전체 화면이 스피너로 바뀌는 현상이 사라집니다.

- 수정 파일: `src/App.tsx` (Suspense fallback 최적화)

#### 4. 불필요한 초기 데이터 로딩 최적화

홈페이지 방문 시 필요하지 않은 데이터까지 로딩하는 문제를 완화하기 위해, React Query의 캐시 전략을 활용합니다. staleTime과 gcTime이 이미 설정되어 있으므로, 첫 로딩 이후 페이지 전환 시에는 캐시된 데이터를 즉시 사용합니다.

### 기술 상세

#### PrefetchLink 구현
```text
사용자가 링크에 마우스를 올림
  -> onMouseEnter에서 해당 페이지의 import() 실행
  -> 청크가 백그라운드에서 다운로드됨
  -> 사용자가 클릭 시 이미 로딩 완료 -> 즉시 전환
```

#### admin 권한 체크 수정
```text
현재: onAuthStateChange + getSession + setTimeout = 3회 호출
수정: ref 플래그로 중복 방지, 1회만 호출
```

### 수정 대상 파일

1. `src/components/PrefetchLink.tsx` (신규) - 호버 시 프리페치 링크
2. `src/components/Navbar.tsx` - PrefetchLink 적용
3. `src/hooks/useAuth.tsx` - admin 체크 중복 제거
4. `src/App.tsx` - Suspense fallback 최소화
