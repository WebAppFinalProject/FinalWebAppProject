module.exports = {
    getIndex(req, res){
        res.render("pages/index",{title: "QuizZone"});
    },
    getDashboard(req, res){
        res.render("pages/dashboard",{title: "QuizZone|Dashboard",userId:req.user.userId});
    },
    getSignIn(req, res) {
        res.render('signin',{title: "QuizZone|Sign In", layout: "layouts/signinSignoutLayout"});
    },
    getSignUp(req,res){
        res.render('signup', {title: "QuizZone|sign Up", layout: "layouts/signinSignoutLayout"});
    },

    //this is temporary
    getTest(req,res){
        res.render('test',{title: "QuizeZone|test", userId:req.user.userId});
    }

}