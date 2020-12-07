module.exports = {
    getIndex(req, res){
        res.render("pages/index",{title: "QuizZone"});
    },
    getDashboard(req, res){
        res.render("pages/dashboard",{title: "QuizZone|app",userId:req.user.userId});
    },
    getSignIn(req, res) {
        res.render('signin',{title: "QuizZone|Sign In", layout: "layouts/signinSignoutLayout"});
    },
    getSignUp(req,res){
        res.render('signup', {title: "QuizZone|sign Up", layout: "layouts/signinSignoutLayout"});
    }
}