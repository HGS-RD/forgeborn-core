curl -X POST 'https://psbvjpvbhpgsnggbptfa.supabase.co/rest/v1/forgeborn.llm_logs' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzYnZqcHZiaHBnc25nZ2JwdGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDU0OTgsImV4cCI6MjA2MDM4MTQ5OH0.7_hh6nYiWj8FjvHc3JfoUjK8j7wftiVLyN9mciwwESg" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzYnZqcHZiaHBnc25nZ2JwdGZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDgwNTQ5OCwiZXhwIjoyMDYwMzgxNDk4fQ.0o8q7zOJE5wRlCR2IZyChbjxznpI3uEqqKlhU6TtOIc" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "rc_id": "RC_TEST_SUCCESS_4",
    "agent": "curl",
    "message": "This should finally write and return",
    "level": "test_level"

            
  }'
