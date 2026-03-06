# C&W Korea WPR Interactive Employee Guide

## Project Overview
Interactive web application for Cushman & Wakefield Korea employees to navigate internal business processes (document issuance, business trip applications, contracts, etc.) through an animated, webtoon-style interface.

## Architecture
- **Frontend**: React 18 + TypeScript with Vite
- **Backend**: Express.js (minimal, serving static files)
- **Styling**: Tailwind CSS + custom CSS (webtoon/comic style)
- **State Management**: React useState/useCallback (no global state needed)

## Design System (v2)
- **Theme**: Webtoon/comic style with ink (#111), paper (#f7f5f0), accent red (#c41230)
- **Fonts**: Nanum Pen Script (brush/headings), Noto Sans KR (body text)
- **Shadows**: Offset box shadows (4px 4px 0px) for comic effect
- **Layout**: Full-width video (80%) with monitor overlay containing folder grid; right slide-in panel for task details

## Key Features
- Looping animation video as main visual (80% size, dark background)
- Monitor overlay with 13 folder icon buttons in a 4-column grid (macOS-style titlebar)
- **Tab bar** inside monitor overlay: "기능별 분류" (folder grid) / "담당자별 분류" (person cards)
- **담당자별 분류 탭**: 4 staff person cards (2×2 grid) → click → R&R responsibility list → click → opens same slide panel as folder icons
- Slide-in right panel (50% width, fixed position) for task details with ← back button
- Video blurs/dims when panel is open
- Step-by-step workflow guides with numbered steps
- Outlook-style email templates with copy functionality (to/cc/subject/body individual copy + full copy)
- WPR staff names in email to/cc highlighted as red badge chips (clickable mailto links)
- Owner/contact person cards for each task
- Header with C&W logo + WPR/FAQ navigation tabs
- FAQ page with Korean Q&A accordion (12 questions)
- Responsive design (desktop 50% panel, tablet full-width panel, mobile 2-col folders; person grid 1-col on mobile)

## File Structure
- `client/src/pages/home.tsx` - Main WPR page with video + monitor overlay + slide panel
- `client/src/pages/faq.tsx` - FAQ accordion page
- `client/src/data/tasks.ts` - All task workflow data (13 tasks) with owner info
- `client/src/data/persons.ts` - 4 WPR staff person data with R&R mappings to task keys
- `client/src/index.css` - Complete styling (v2 design system)
- `client/src/App.tsx` - App routing + header component

## Task Categories
- Administrative (행정): 공문번호, 명함, 계약서
- Support (지원): 화환, 국내출장, 해외출장
- Facilities (시설): 락커, 인감, 법인차량
- IT: Supplier, Solstice, Canteen Room, Printix

## Staff (담당자별 분류 순서)
- 권희원 이사 (Grace Kwon): WPR팀 총괄
- 김경만 과장 (Noel Kim): 인감(Glosign), Solstice, Canteen Room, Printix
- 김지성 대리 (Gina Kim): 공문번호, 계약서, 국내출장, 해외출장, 락커, Supplier
- 송진영 사원 (Emma Song): 명함, 화환, 법인차량
