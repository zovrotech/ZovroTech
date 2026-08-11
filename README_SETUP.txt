ZOVRO TECH — SUPABASE + ADMIN SETUP

1) Upload/replace the website files with this project.
2) In Supabase Dashboard -> SQL Editor, run supabase.sql.
3) Supabase -> Authentication -> Users -> Add user. Create your admin email/password.
4) Copy that user's UUID and run:
   insert into public.admins (user_id) values ('YOUR_AUTH_USER_UUID');
5) Open your website and submit a test lead.
6) Open /admin/ and sign in with the admin account.
7) The dashboard shows total/new/contacted/converted, searchable leads, detail view, status changes and delete.

SECURITY:
- The supplied key is the legacy anon key. It is intended for public/client-side use, but you should migrate to a Supabase publishable key and rotate credentials later.
- NEVER put a Supabase service_role or secret key in this project.
- Lead SELECT/UPDATE/DELETE is protected by RLS and the admins table.

ADMIN URL ON GITHUB PAGES:
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO/admin/
