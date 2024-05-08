import { createClient } from "@supabase/supabase-js";

const supabase = createClient('https://ooohhtymjrxmqcpwefrw.supabase.co', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vb2hodHltanJ4bXFjcHdlZnJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzMTUwODUsImV4cCI6MjAyODg5MTA4NX0.B8bGJ69-NRpyL1RrcS_1B2lK8sLNUjO_8IJk4n7Jjh8');

export default supabase;