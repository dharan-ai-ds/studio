const url = "https://atxnitpgsddlgzmqvnlt.supabase.co/rest/v1/issues?select=*";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0eG5pdHBnc2RkbGd6bXF2bmx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MDIyNjEsImV4cCI6MjA5MDI3ODI2MX0.WupnJ-J6Tl_4MUMRc3v_Q0Chk1C3rioM6OT9LdLq3A0";

fetch(url, {
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`
  }
}).then(res => res.json()).then(data => {
  if (data.error || data.code) {
    console.error("Error:", data);
  } else {
    console.log("Success! Table exists. Row count:", data.length);
  }
}).catch(console.error);
