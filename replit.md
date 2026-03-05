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
- Slide-in right panel (50% width, fixed position) for task details with ← back button
- Video blurs/dims when panel is open
- Step-by-step workflow guides with numbered steps
- Outlook-style email templates with copy functionality
- Owner/contact person cards for each task
- Header with C&W logo + WPR/FAQ navigation tabs
- FAQ page with Korean Q&A accordion (12 questions)
- Responsive design (desktop 50% panel, tablet full-width panel, mobile 2-col folders)

## File Structure
- `client/src/pages/home.tsx` - Main WPR page with video + monitor overlay + slide panel
- `client/src/pages/faq.tsx` - FAQ accordion page
- `client/src/data/tasks.ts` - All task workflow data (13 tasks) with owner info
- `client/src/index.css` - Complete styling (v2 design system)
- `client/src/App.tsx` - App routing + header component

## Task Categories
- Administrative (행정): 공문번호, 명함, 계약서
- Support (지원): 화환, 국내출장, 해외출장
- Facilities (시설): 락커, 인감, 법인차량
- IT: Supplier, Solstice, Canteen Room, Printix

## Staff
- 김지성 대리 (Gina Kim): 공문번호, 명함, 계약서, 국내출장, 해외출장, 법인차량
- Emma Song: 명함 Reception, 화환
- 권희원 이사 (Grace Kwon): 인감
- IT Team: Solstice, Printix
- WPR Team: Supplier, Canteen
