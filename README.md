✨ TinyLink — A Modern URL Shortener

A Full-Stack Assignment built with Next.js, Prisma, and PostgreSQL

TinyLink is a clean, fast, and production-ready URL shortener featuring custom short codes, analytics tracking, responsive UI, and polished UX.

🚀 Features

🔗 URL Shortening
- Create short URLs instantly
- Optional custom short code
- Auto-generated code if not provided
- Duplicate short-code detection
- One-click copy button with tooltip

📊 Analytics & Stats
- Track total clicks
- Track last clicked timestamp
- Dedicated stats page for each short code
- Health check endpoint (/healthz) for monitoring

🖥 UI / UX Highlights
- Modern layout with Lexend Deca & Work Sans fonts
- Loading states via loading.tsx
- Responsive design
- Ant Design table with:
- Sorting
- Tooltip for long URLs
- Ellipsis truncation
- Global Header & Footer
- Clean consistent button styles

⚙️ Backend / API

- REST API for:
- POST /api/links → Create short URL
- DELETE /api/links/[code] → Delete
- GET /[code] → Redirect handler
- GET /healthz → Health check
- Prisma ORM with PostgreSQL
- Unique code generation
- Server-side validation

| Layer         | Technology                                       |
| ------------- | ------------------------------------------------ |
| Frontend      | Next.js 16 (App Router), TailwindCSS, Ant Design |
| Backend       | Next.js Route Handlers                           |
| Database      | PostgreSQL                                       |
| ORM           | Prisma                                           |
| UI Components | Ant Design + Tailwind                            |
| Fonts         | Lexend Deca, Work Sans                           |
| Deployment    | Vercel                                           |

📁 Project Structure
app/
├─ page.tsx → Home (Dashboard)
├─ loading.tsx → Route loading state
├─ healthz/route.ts → /healthz endpoint
├─ api/
│ └─ links/
│ ├─ route.ts → POST (create short link)
│ └─ [code]/route.ts → DELETE (remove link)
└─ code/[code]/page.tsx → Stats page
components/
├─ AddLinkForm.tsx
├─ DashboardTable.tsx
├─ Header.tsx
├─ Footer.tsx
lib/
├─ prisma.ts
├─ fonts.ts
├─ utils.ts

🔧 Installation & Setup

1️⃣ Clone the repository
git clone https://github.com/yourusername/tinylink.git
cd tinylink

2️⃣ Install dependencies
npm install

3️⃣ Set environment variables
Create a .env file based on .env.example:
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

4️⃣ Generate Prisma client
npx prisma migrate dev

5️⃣ Run the development server
npm run dev

🧪 Health Check Endpoint
The assignment requires /healthz without /api, so it is implemented at:
GET /healthz

🚀 Deployment (Vercel)

1. Push repo to GitHub
2. Import into Vercel
3. Add environment variables:
| KEY                    | VALUE                             |
| ---------------------- | --------------------------------- |
| `DATABASE_URL`         | Your hosted PostgreSQL connection |
| `NEXT_PUBLIC_BASE_URL` | `https://yourapp.vercel.app`      |
4. Deploy with one click.