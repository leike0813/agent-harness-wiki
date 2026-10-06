# Fictional local transcript storage

Demo Open CLI is fictional. It appends UTF-8 JSONL records to ~/.demo/sessions/<session-id>.jsonl. Session IDs are supplied on creation and retained on resume.
Each record has a required type (message), session_id, role (user or assistant), and content string.
Example: {"type":"message","session_id":"demo-session","role":"user","content":"Example request"}
No database is used. Close the CLI before copying or deleting the file. A copied file can be restored at its original path with the same session ID. Deleting it removes recovery history.
Tool events, branching, automatic retention and diagnostic commands are not described in this fictional source.
