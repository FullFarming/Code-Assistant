# C&W Korea WPR Interactive Employee Guide

## Project Overview
Interactive web application for Cushman & Wakefield Korea employees to navigate internal business processes (document issuance, business trip applications, contracts, etc.) through an iOS-style iPhone mockup interface with bento grid layout.

## Architecture
- **Frontend**: React 18 + TypeScript with Vite
- **Backend**: Express.js (minimal, serving static files)
- **Styling**: Tailwind CSS + custom CSS (iOS design language)
- **State Management**: React useState/useCallback/useReducer (Siri uses state machine)
- **Routing**: wouter (/ for WPR home, /faq for FAQ page)

## Design System (v3 — iPhone Mockup + Bento + Siri)
- **Frame**: iPhone 14 Pro mockup at 80% scale (314×682px) centered on page with Dynamic Island
- **Background**: Lavender-gray gradient (#E8E8ED → #F0F0F5)
- **Colors**: iOS system colors — bg #F2F2F7, surface #FFFFFF, label #1C1C1E, secondary #8E8E93, C&W red #C41230
- **Fonts**: Noto Sans KR (body), SF Pro Text / system (English)
- **Shadows**: Subtle iOS-style (no offset comic shadows)
- **Header**: White bar with C&W logo (left) + WPR/FAQ navigation buttons (right), red underline on active
- **Layout**: iPhone frame (center) + slide panel (right, 380px)
- **Siri Button**: In bottom tab bar between 팀원/업무목록 tabs, uses Siri icon image

## Key Features
- Header with C&W logo and WPR/FAQ navigation
- iPhone mockup frame (80% scale) with Dynamic Island, bottom tab bar, home indicator
- **Siri Search**: Button in bottom tab bar (between 팀원/업무목록), search UI renders inside iPhone mockup with dark theme, rainbow glow on frame when active, real-time search across all tasks/keywords/owners, click result to navigate to task detail
- **팀원 탭** (default): Messenger-style staff list cards → click → person detail slide panel → click task → task detail slide
- **업무목록 탭**: Bento grid (2-col) with small (1×1) and wide (2×1) cards, pastel gradients, category badges
- **FAQ page** (/faq route): Standalone iOS-style accordion with Q/A badges, separate from iPhone mockup
- Task detail slide panels with steps + email templates
- Staff name badges (red chips) in email to/cc with mailto links
- Individual copy buttons for email fields + body copy + full copy
- Responsive: on narrow screens (≤430px), iPhone frame full-screen

## File Structure
- `client/src/App.tsx` - App shell with Header (logo + WPR/FAQ nav) + wouter routing
- `client/src/pages/home.tsx` - iPhone mockup with Siri search (in-frame), 팀원/업무목록 tabs + slide panels
- `client/src/pages/faq.tsx` - Standalone FAQ page with iOS-style accordion
- `client/src/data/tasks.ts` - All task workflow data (13 tasks) with owner info
- `client/src/data/persons.ts` - 4 WPR staff person data with R&R mappings to task keys
- `client/src/data/searchIndex.ts` - Search index with keywords per task for Siri search
- `client/src/index.css` - Complete iOS-style CSS including header, Siri, FAQ page, responsive styles

## Siri Search
- Siri button in bottom tab bar (center, between 팀원/업무목록), uses provided Siri icon image (`client/public/siri-icon.png`)
- Search UI renders inside iPhone content area with dark theme (#1a1a2e)
- State machine: idle → opening → active → searching → navigating → closing
- Debounced search (150ms) across task labels, keys, keywords, owner names, categories
- Max 6 results, staggered card animation (slide-up)
- Rainbow glow animation on iPhone frame border when active
- Nav bar shows "검색" title + blue "닫기" close button when active
- Click result → auto-navigate to task detail, switch to 업무목록 tab

## Task Categories & Bento Card Sizes
- **행정** (#C41230): 공문번호, 명함, 계약서 — small cards
- **지원** (#F59E0B): 화환 (small), 국내출장 (wide), 해외출장 (wide)
- **시설** (#10B981): 락커, 인감, 법인차량 — small cards
- **IT** (#3B82F6): Supplier (wide), Solstice, Canteen Room, Printix — small

## Staff (담당자별 순서)
- 권희원 이사 (Grace Kwon): WPR팀 총괄
- 김경만 과장 (Noel Kim): 인감(Glosign), Solstice, Canteen Room, Printix
- 김지성 대리 (Gina Kim): 공문번호, 계약서, 국내출장, 해외출장, 락커, Supplier
- 송진영 사원 (Emma Song): 명함, 화환, 법인차량
