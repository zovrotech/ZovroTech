/* Public Supabase settings.
   The anon key is intended for browser apps. Never put a service_role key here. */
window.ZOVRO_SUPABASE_URL = "https://cgwosspbrvqffmixvaza.supabase.co";
window.ZOVRO_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnd29zc3BicnZxZmZtaXh2YXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MzQxNjMsImV4cCI6MjEwMjAxMDE2M30.VotRvLtnbtPy8-fQaQnHNzkjOHNAXN8I31HzjPMXXbc";
window.supabaseClient = window.supabase.createClient(window.ZOVRO_SUPABASE_URL, window.ZOVRO_SUPABASE_ANON_KEY);
