# C&W Korea WPR Interactive Employee Guide

## Project Overview
Interactive web application for Cushman & Wakefield Korea employees to navigate internal business processes (document issuance, business trip applications, contracts, etc.) through an iOS-style iPhone mockup interface with bento grid layout.

## Architecture
- **Frontend**: React 18 + TypeScript with Vite
- **Backend**: Express.js (minimal, serving static files)
- **Styling**: Tailwind CSS + custom CSS (iOS design language)
- **State Management**: React useState/useCallback (no global state needed)

## Design System (v3 — iPhone Mockup + Bento)
- **Frame**: iPhone 14 Pro mockup (393×852px) centered on page with Dynamic Island
- **Background**: Lavender-gray gradient (#E8E8ED → #F0F0F5)
- **Colors**: iOS system colors — bg #F2F2F7, surface #FFFFFF, label #1C1C1E, secondary #8E8E93, C&W red #C41230
- **Fonts**: Noto Sans KR (body), SF Pro Text / system (English)
- **Shadows**: Subtle iOS-style (no offset comic shadows)
- **Layout**: Bottom tab bar (팀원/업무목록/FAQ), messenger-style staff list, bento grid cards

## Key Features
- iPhone mockup frame with Dynamic Island, bottom tab bar, home indicator
- **팀원 탭** (default): Messenger-style staff list cards → click → person detail slide panel → click task → task detail slide
- **업무목록 탭**: Bento grid (2-col) with small (1×1) and wide (2×1) cards, pastel gradients, category badges
- **FAQ 탭**: iOS accordion with Q/A items, smooth max-height transitions
- Task detail slide panels (100% width within iPhone frame) with steps + email templates
- Staff name badges (red chips) in email to/cc with mailto links
- Individual copy buttons for email fields + body copy + full copy
- Responsive: on narrow screens (≤430px), iPhone frame becomes full-screen

## File Structure
- `client/src/pages/home.tsx` - Main single-page component with all tabs + slide panels
- `client/src/pages/faq.tsx` - Legacy FAQ page (unused, FAQ integrated into home)
- `client/src/data/tasks.ts` - All task workflow data (13 tasks) with owner info
- `client/src/data/persons.ts` - 4 WPR staff person data with R&R mappings to task keys
- `client/src/index.css` - Complete iOS-style CSS
- `client/src/App.tsx` - Simplified app shell (no header, no routing)

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
