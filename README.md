### TODOLIST:
- clicking on file name expands file to spread to show info
- clicking edit brings up form on file to change name
    - idea right now is clicking edit button redirects ('/file_id/folder_id'), which we pass to ejs to load the edit form for that file 
- add delete/download/edit button for folders


## DB structure

Users: id/username/password

One to Many (One user can have multiple folders)
Folders: id/name/created_at/user_id

One to Many (one folder can have multiple files)
Files: id/file_URL/name/size/upload_time/folder_id

### To accomodate folder sharing


Users: id/username/password

One to Many (One user can have multiple folders)
Folders: id/name/created_at/user_id

One to Many (One folder can have multiple access links)
Links: id/folder_id/expire_time

One to Many (one folder can have multiple files)
Files: id/file_URL/name/size/upload_time/folder_id
