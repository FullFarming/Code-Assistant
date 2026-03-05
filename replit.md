# C&W Korea WPR Interactive Employee Guide

## Project Overview
Interactive web application for Cushman & Wakefield Korea employees to navigate internal business processes (document issuance, business trip applications, contracts, etc.) through an animated, webtoon-style interface.

## Architecture
- **Frontend**: React 18 + TypeScript with Vite
- **Backend**: Express.js (minimal, serving static files)
- **Styling**: Tailwind CSS + custom CSS (webtoon/comic style)
- **State Management**: React useState/useCallback (no global state needed)

## Design System
- **Theme**: Webtoon/comic style with ink (#111), paper (#f7f5f0), accent red (#c41230)
- **Fonts**: Nanum Pen Script (brush/headings), Noto Sans KR (body text)
- **Shadows**: Offset box shadows (4px 4px 0px) for comic effect
- **Layout**: 50/50 split - left panel (video + bubbles), right panel (monitor display)

## Key Features
- Looping animation video as main visual
- 13 floating thought bubbles with hover/click interactions
- Monitor-style slide panel for task details
- Step-by-step workflow guides with numbered steps
- Outlook-style email templates with copy functionality
- Owner/contact person cards for each task
- Responsive design (desktop 2-col, tablet/mobile 1-col)

## File Structure
- `client/src/pages/home.tsx` - Main page component
- `client/src/data/tasks.ts` - All task workflow data (13 tasks)
- `client/src/index.css` - Complete styling (webtoon design system)
- `client/src/App.tsx` - App routing

## Task Categories
- Administrative (행정): 공문번호, 명함, 계약서
- Support (지원): 화환, 국내출장, 해외출장
- Facilities (시설): 락커, 인감, 법인차량
- IT: Supplier, Solstice, Canteen Room, Printix
