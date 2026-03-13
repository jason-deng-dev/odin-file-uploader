export const ensureLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.redirect('/auth/login');
};

export const ensureLoggedOut = (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    res.redirect('/')
}
    
