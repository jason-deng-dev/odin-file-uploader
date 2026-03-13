DB structure

Users: id/username/password

One to Many (One user can have multiple folders)
Folders: id/name/created_at/user_id

One to Many (one folder can have multiple files)
Files: id/file_URL/name/size/upload_time/folder_id
