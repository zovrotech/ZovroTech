ZOVRO TECH — SUPABASE + ADMIN SETUP

1) Upload this entire project to GitHub Pages.
2) In Supabase SQL Editor, run supabase.sql.
3) The website contact form writes to public.leads.
4) Admin page: /admin/

REQUESTED ADMIN CREDENTIALS
Username: zovrotech
Password: zovro@1234

SECURITY WARNING
The requested username/password are implemented as a browser-side convenience gate.
That means they are visible to someone inspecting the website files and are NOT a secure
server-side authentication system.

For a real production admin dashboard:
- Create a Supabase Auth user.
- Use Supabase Auth signInWithPassword in admin.js.
- Add authenticated SELECT/UPDATE RLS policies for that admin user's UUID.
- Never put a Supabase service_role/secret key in this website.

The Supabase URL and anon key supplied for this build are stored in:
assets/js/supabase-config.js
Only a publishable/anon key belongs in browser code.

ADMIN URL
https://zovrotech.github.io/ZovroTech/admin/
