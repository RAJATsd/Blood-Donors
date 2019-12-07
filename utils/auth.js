exports.authMiddleWare = (req,res,next) => {
    if(!req.session.password)
    {
        res.redirect('/login');            
    }
    else{
        next();
    }
}