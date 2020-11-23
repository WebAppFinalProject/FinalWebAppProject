module.exports = {
    getIndex(req, res){
        res.render("index",{title: "QuizZone"});
    },
    getDashboard(req, res){
        res.render("dashboard",{title: "QuizZone|Dashboard"});
    },
    getSignIn(req, res) {
        res.render('signin',{title: "QuizZone|Sign In", layout: "layouts/signinSignoutLayout"});
    },
    getSignUp(req,res){
        res.render('signup', {title: "QuizZone|sign Up", layout: "layouts/signinSignoutLayout"});
    }
}
 