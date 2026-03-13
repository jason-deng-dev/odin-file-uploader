export const folderCreateGet = async (req, res, next) => {
    try {
        res.render('folder/create.ejs')
    } catch (err) {
        next(err)
    }

}
export const folderCreatePost = async (req, res, next) => {
    try {
        
    } catch (err) { 
        next(err)
    }
}