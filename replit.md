# C&W Korea Multi-Department Interactive Guide

## Project Overview
Interactive web application for Cushman & Wakefield Korea employees. Features an iOS-style iPhone mockup with a home screen launcher that opens department-specific apps (currently WPR). Uses the C&W corporate building wallpaper as the home screen background.

## Architecture
- **Frontend**: React 18 + TypeScript with Vite
- **Backend**: Express.js (minimal, serving static files)
- **Styling**: Tailwind CSS + custom CSS (iOS design language)
- **State Management**: React useState/useCallback/useReducer (Siri uses state machine)
- **Routing**: wouter (/ for WPR home, /faq for FAQ page)
- **View Mode**: State-based (home screen ↔ department app) within iPhone frame

## Design System (v4 — Home Screen + Department Apps)
- **Frame**: iPhone 14 Pro mockup at 80% scale (314×682px) centered on page with Dynamic Island
- **Home Screen**: C&W corporate wallpaper background, real-time clock widget, iOS-style folder icons for departments, glassmorphism dock bar, home indicator
- **App Mode**: iOS-bg (#F2F2F7) background, nav bar, tab content, bottom tab bar with Siri button, tappable home indicator to return
- **Colors**: iOS system colors — bg #F2F2F7, surface #FFFFFF, label #1C1C1E, secondary #8E8E93, C&W red #C41230
- **Fonts**: Noto Sans KR (body), SF Pro Text / system (English)
- **Layout**: iPhone frame (center) + slide panel (right, 380px)
- **Transitions**: App launch fade-in (300ms), folder icon press feedback (scale 0.88)

## Key Features
- **Home Screen**: Wallpaper with C&W building image, live clock, department folder icons (WPR, HR), iOS dock bar (Phone, Messages, Safari), home indicator
- **Department App Launch**: Tap folder icon → app content appears with nav bar, tab bar, home indicator (tappable to return home)
- Header with C&W logo and WPR/FAQ navigation
- iPhone mockup frame (80% scale) with Dynamic Island (looping video), bottom tab bar, home indicator
- **Siri Search**: Button in bottom tab bar (between 팀원/업무목록), floating overlay with glassmorphism, rainbow glow, real-time search
- **팀원 탭** (default): Messenger-style staff list cards → person detail slide panel → task detail slide
- **업무목록 탭**: Bento grid (2-col) with small/wide cards, pastel gradients, category badges
- **FAQ page** (/faq route): Standalone iOS-style accordion
- Task detail slide panels with steps + email templates
- Staff name badges in email to/cc with mailto links
- Responsive: on narrow screens (≤430px), iPhone frame full-screen

## File Structure
- `client/src/App.tsx` - App shell with Header (logo + WPR/FAQ nav) + wouter routing
- `client/src/pages/home.tsx` - iPhone mockup with home screen + WPR app mode, Siri search, tabs, slide panels
- `client/src/pages/HomeScreen.tsx` - iPhone home screen (wallpaper, clock, folder icons, dock)
- `client/src/pages/faq.tsx` - Standalone FAQ page with iOS-style accordion
- `client/src/components/FolderIcon.tsx` - iOS-style department folder icon button
- `client/src/components/DockBar.tsx` - Home screen dock bar (Phone, Messages, Safari)
- `client/src/components/HomeIndicator.tsx` - iPhone home indicator bar (tappable in app mode)
- `client/src/data/departments.ts` - Department registry (WPR, HR)
- `client/src/data/tasks.ts` - All task workflow data (13 tasks) with owner info
- `client/src/data/persons.ts` - 4 WPR staff person data with R&R mappings to task keys
- `client/src/data/searchIndex.ts` - Search index with keywords per task for Siri search
- `client/src/index.css` - Complete iOS-style CSS including home screen, header, Siri, FAQ, responsive

## View Mode State
- `viewMode: "home"` → Home screen with wallpaper + folder icons + dock
- `viewMode: "app"` → WPR app with nav bar + tab content + bottom tab bar + tappable home indicator
- Dynamic Island is always visible regardless of view mode
- iphone-notch background transitions (transparent on home, ios-bg in app)

## Siri Search (Floating Overlay — Apple HIG)
- Siri button in bottom tab bar (center), uses Siri icon image
- Overlay: existing content blurred, glassmorphism popup with search results
- Floating search bar with rainbow glow animation
- State machine: idle → opening → active → searching → navigating → closing
- Close via Siri button, cancel, ESC, or overlay background click

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

## Departments
- **WPR** (id: "wpr"): Workplace Resources — 시설·행정·IT 지원, red (#C41230)
- **HR** (id: "hr"): Human Resources — 인사·채용·복지, blue (#2563EB) — placeholder, no data yet
