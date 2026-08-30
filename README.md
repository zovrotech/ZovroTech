# ZOVRO TECH — Complete Static Project

## Files
- `index.html` — full website, 3D CSS hero, services, work, pricing, contact and appointment.
- `assets/css/style.css` — complete responsive premium design.
- `assets/js/supabase-config.js` — Supabase URL + anon key.
- `assets/js/app.js` — intro animation, 3D particle background, forms and Supabase inserts.
- `admin/index.html` — live admin login/dashboard.
- `admin/admin.css` — dashboard styling.
- `admin/admin.js` — login, live data, metrics and tables.
- `supabase/schema.sql` — database tables, RLS and admin RPC setup.

## IMPORTANT: one-time Supabase setup
1. Open Supabase Dashboard for your project.
2. Go to SQL Editor.
3. Paste all of `supabase/schema.sql` and press Run.
4. Open the website and submit a test enquiry + appointment.
5. Open `/ZovroTech/admin/` and login:
   - Username: `zovrotech`
   - Password: `zovro@1234`

## GitHub Pages
Keep the folder structure exactly as supplied and upload all files/folders to the repository root. GitHub Pages should publish `/index.html`.

## Security note
The browser only contains the Supabase `anon` key. Do NOT put a Supabase `service_role` key in any HTML/JS file.
The admin data is returned through protected database RPC functions rather than a public SELECT policy. For a larger production system, move admin authentication to Supabase Auth/Edge Functions with rate limiting.

## If your old Supabase tables use different names/columns
The included site expects:
`leads(name,email,phone,service,message,status,created_at)`
and
`appointments(name,email,phone,service,preferred_date,preferred_time,message,status,created_at)`.
