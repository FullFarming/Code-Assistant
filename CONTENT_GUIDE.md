# Code-Assistant 콘텐츠 제작 가이드

> **대상**: Code-Assistant (C&W Korea WPR팀 내부 업무 가이드 앱) 콘텐츠 추가·수정 담당자
> **최종 수정**: 2026-03-22

---

## 1. 파일 구조 한눈에 보기

```
client/src/
├── data/
│   ├── persons.ts       ← 직원 프로필·소개·담당 업무 목록
│   ├── tasks.ts         ← 각 업무의 상세 절차 (Step by step)
│   ├── searchIndex.ts   ← Siri 검색용 키워드 인덱스
│   └── departments.ts   ← 부서 목록
└── pages/
    └── home.tsx         ← UI 렌더링 (BentoGrid 목록 포함)
```

콘텐츠 추가 시 **반드시 4개 파일을 함께** 수정해야 합니다.

---

## 2. 직원 소개란(description) 수정

**파일**: `client/src/data/persons.ts`

각 직원 객체의 `description` 필드가 채팅 목록과 직원 프로필 화면의 소개 문구로 표시됩니다.

```ts
{
  id: "person_noel",
  name: "김경만",
  nameEn: "Noel Kim",
  // ...
  description: "IT 지원 및 문서 날인 담당",   // ← 이 부분을 수정
  responsibilities: [ ... ]
}
```

### 현재 설정된 소개란

| 직원 | 소개란 |
|------|--------|
| 권희원 (Grace Kwon) | Legal & Compliance Coordination |
| 김경만 (Noel Kim) | IT 지원 및 문서 날인 담당 |
| 김지성 (Gina Kim) | 오피스 관리 및 행정적 업무 지원 담당 |
| 송진영 (Emma Song) | 리셉셔니스트 |

---

## 3. 직원 담당 업무 목록 추가

**파일**: `client/src/data/persons.ts` → `responsibilities` 배열

각 항목은 직원 프로필 → **담당 업무** 리스트에 표시되며, `taskKey`를 통해 업무 상세 패널과 연결됩니다.

```ts
responsibilities: [
  {
    label: "업무 표시 이름",            // 직원 프로필에서 보이는 이름
    taskKey: "tasks.ts의 키 이름",      // DATA 객체의 키와 반드시 일치해야 함
    description: "한 줄 설명"           // 업무 항목 아래에 표시되는 부연 설명
  },
]
```

> **주의**: `taskKey`가 `tasks.ts`의 `DATA` 객체에 없으면 클릭 시 이동하지 않고 비활성(—)으로 표시됩니다.

### 현재 추가된 업무 목록 (2026-03-22 기준)

#### 노엘 (Noel Kim) — 신규 추가
| taskKey | 내용 |
|---------|------|
| `physical_seal` | 계약서 실물 날인, 부대서류 날인, 법인인감증명서·등기부등본 지급 |

#### 지나 (Gina Kim) — 신규 추가
| taskKey | 내용 |
|---------|------|
| `office_repair` | 오피스 내 문제 발생 시 수리·유지보수 지원 요청 |

#### 엠마 (Emma Song) — 신규 추가
| taskKey | 내용 |
|---------|------|
| `parking_reg` | 고객사 방문 차량 주차 등록 (고객사명 + 차량번호 필요) |

---

## 4. 새 업무 절차 추가 (tasks.ts)

**파일**: `client/src/data/tasks.ts` → `DATA` 객체에 키 추가

### 4.1 기본 구조

```ts
export const DATA: Record<string, TaskData> = {

  // 기존 업무들...

  새키이름: {
    icon: "이모지",
    label: "업무 표시 이름",
    badge: "행정 | 지원 | 시설 | IT | Legal | 날인 | Compliance",
    owner: {
      icon: "이모지",
      name: "Emma Song",           // 영문 이름 (WPR_STAFF 키와 일치)
      nameKo: "송진영 사원",         // 한글 이름 + 직급
      team: "WPR",
      contact: "emma.song@cushwake.com"
    },
    steps: [
      {
        n: 1,
        title: "단계 제목",
        desc: "단계 설명 (<strong>강조</strong> HTML 사용 가능)",
        detail: "▶ 상세 보기 버튼을 클릭하면 펼쳐지는 내용 (null이면 버튼 미표시)",
        email: {                   // 이메일 박스 (불필요하면 필드 생략)
          to: "받는 사람",
          cc: "참조 (선택)",
          subject: "제목",
          body: "본문",
          attach: "첨부파일 이름 (선택)"
        }
      },
    ],
    warn: "⚠️ 경고 메시지 (선택)",
    note: "📌 안내 메시지 (선택)",
  },
};
```

### 4.2 절차 작성 원칙

- **절차 변형 금지**: 실제 업무 절차를 그대로 반영합니다. 단계 순서·내용을 임의로 바꾸지 않습니다.
- **필수 정보는 `warn`** 필드: 빠뜨리면 안 되는 정보(예: 차량번호 필수)는 `warn`으로 강조합니다.
- **선택 정보는 `note`** 필드: 추가 팁이나 권장 사항은 `note`에 기재합니다.
- **이메일 템플릿**: 실제 발송에 쓸 수 있도록 `[대괄호]` 안에 채울 항목을 명시합니다.
- **`detail` 필드**: 단계별 상세 설명이 길 경우 `▶ 상세 보기`로 숨기고, 짧으면 `desc`에 직접 작성합니다.

### 4.3 신규 추가된 3개 업무 요약

#### `physical_seal` — 계약서 실물 날인 및 부대서류 지급 (담당: Noel Kim)

| 단계 | 내용 |
|------|------|
| 1 | 날인 요청 메일 발송 (To: Noel, CC: Grace) |
| 2 | 날인 종류별 부대서류 준비 확인 (실물날인/부대서류/법인인감/등기부등본) |
| 3 | 날인 완료 후 서류 수령 |

- **warn**: 법인인감증명서·등기부등본 요청 시 사용 목적·제출처 명시 필수

#### `office_repair` — 오피스 시설 수리 지원 (담당: Gina Kim)

| 단계 | 내용 |
|------|------|
| 1 | 문제 상황 파악 및 기록 (위치·유형·시각) |
| 2 | Gina Kim에게 수리 요청 메일 발송 |
| 3 | 수리 일정 확인 및 현장 협조 |

- **note**: 긴급 상황(누수·정전)은 Teams 메시지로도 즉시 알림

#### `parking_reg` — 고객사 주차 등록 (담당: Emma Song)

| 단계 | 내용 |
|------|------|
| 1 | 필수 정보 준비: ① 고객사명 ② 차량번호 |
| 2 | Emma Song에게 주차 등록 요청 메일 발송 |
| 3 | 등록 완료 확인 후 고객사에 안내 |

- **warn**: 고객사명 + 차량번호 **두 가지 모두** 필수

---

## 5. 검색 인덱스 추가 (searchIndex.ts)

**파일**: `client/src/data/searchIndex.ts`

새 업무를 추가할 때 반드시 검색 인덱스도 함께 추가합니다.

```ts
{
  key: 'tasks.ts의 키',          // DATA 키와 동일
  label: '검색 결과에 표시될 이름',
  badge: '행정 | 지원 | 시설 | IT | Legal | 날인',
  icon: '이모지',
  keywords: ['검색어1', '검색어2', '영문검색어', '담당자이름'],
  ownerName: '김지성 대리',       // 담당자 한글 이름 + 직급
  ownerEn: 'gina kim',           // 담당자 영문 이름 (소문자)
},
```

**키워드 작성 팁**:
- 업무명의 다양한 표현 (예: `주차`, `주차등록`, `파킹`, `parking`)
- 한글 담당자 이름도 포함 (예: `엠마`, `노엘`, `지나`)
- 영문 이름도 포함 (예: `emma`, `noel`, `gina`)

---

## 6. 업무 목록 화면(BentoGrid) 추가 (home.tsx)

**파일**: `client/src/pages/home.tsx` → `BENTO_ITEMS` 배열

업무목록 탭의 카드 그리드에 표시됩니다.

```ts
const BENTO_ITEMS: BentoItem[] = [
  // 기존 항목들...

  {
    key: "tasks.ts의 키",
    icon: "이모지",
    label: "카드에 표시될 이름",
    category: "행정 | 지원 | 시설 | IT | Legal | 날인",
    categoryColor: "#색상코드",    // 행정: #C41230 / 지원: #F59E0B / 시설: #10B981 / IT: #3B82F6 / Legal: #8B5CF6
    gradient: "linear-gradient(135deg, #시작색, #끝색)",
    wide: true,   // 2칸 너비 카드 (선택, 기본 1칸)
  },
];
```

### 카테고리별 색상 참고

| 카테고리 | 색상 | 그라디언트 예시 |
|----------|------|----------------|
| 행정 | `#C41230` | `linear-gradient(135deg, #FFF9E6, #FDEFC8)` |
| 지원 | `#F59E0B` | `linear-gradient(135deg, #FFFBEB, #FEF3C7)` |
| 시설 | `#10B981` | `linear-gradient(135deg, #ECFDF5, #D1FAE5)` |
| IT | `#3B82F6` | `linear-gradient(135deg, #E8EAF6, #C5CAE9)` |
| Legal / 날인 | `#8B5CF6` | `linear-gradient(135deg, #F3E8FF, #DDD6FE)` |

---

## 7. 채팅 버블 숨김 처리

### 현재 상태 (적용 완료)

업무 상세 패널(`home.tsx`)에서 이전에 표시되던 아래 채팅 버블 2개가 **제거**되었습니다:

```
[Bot] "{업무명} 업무 가이드를 안내해 드릴게요 😊"
[User] "네, 알려주세요!"
```

### 향후 동일 패턴 추가 시 숨기는 방법

업무 상세 패널은 `home.tsx`의 아래 위치에서 렌더링됩니다:

```tsx
// home.tsx — 약 405번째 줄
<div className="ts-body" ref={panelBodyRef} data-testid="panel-body">
  {/* 이 위치에 채팅 버블을 추가하면 표시됨 */}
  {activeData.steps.length > 0 && (
    <div className="steps-container">
      ...
    </div>
  )}
</div>
```

채팅 스타일 요소를 **추가하지 않는 것**이 기본 원칙입니다. 만약 특정 업무에만 안내 메시지가 필요하면 `tasks.ts`의 `note` 필드를 사용하세요.

```ts
// tasks.ts에서 안내 문구 추가 방법
note: "이 업무에 대한 추가 안내 사항입니다."
// → 패널 하단에 📌 스타일로 표시됨 (채팅 버블 아님)
```

---

## 8. 새 업무 추가 체크리스트

새 업무를 추가할 때 아래 4단계를 순서대로 완료하세요:

- [ ] **`tasks.ts`**: `DATA` 객체에 새 키와 절차 추가
- [ ] **`persons.ts`**: 담당 직원의 `responsibilities` 배열에 항목 추가 (`taskKey` 일치 확인)
- [ ] **`searchIndex.ts`**: 새 업무의 검색 인덱스 항목 추가
- [ ] **`home.tsx`**: `BENTO_ITEMS` 배열에 카드 항목 추가

---

## 9. 담당자 이메일 참고

| 이름 | 한글 | 이메일 |
|------|------|--------|
| Grace Kwon | 권희원 이사 | grace.kwon@ap.cushwake.com |
| Noel Kim | 김경만 과장 | noel.kim@cushwake.com |
| Gina Kim | 김지성 대리 | gina.kim@cushwake.com |
| Emma Song | 송진영 사원 | emma.song@cushwake.com |
