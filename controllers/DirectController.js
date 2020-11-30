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
        res.render('exam',{title: "QuizeZone|exam", userId:req.user.userId, layout: "layouts/signinSignoutLayout"});
    },

    //temporary settings
    getSettings(req,res){
        res.render('settings',{title: "QuizeZone|settings",userId:req.user.userId, layout: "layouts/signinSignoutLayout" })
       
    },

    getExam(req,res) {
        res.render('exam', {title:"QuizZone|exam", userId:req.user.userId, layout: "layouts/signinSignoutLayout"});
    }

}