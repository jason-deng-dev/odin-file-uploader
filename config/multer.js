import multer from 'multer'
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
export default upload;

// so that when form data comes in
// stores it in memory as a buffer on req.file.buffer