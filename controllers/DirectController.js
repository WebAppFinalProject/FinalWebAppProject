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
    },

    //this is temporary
    // getTest(req,res){
    //     res.render('exam',{title: "QuizeZone|exam", userId:req.user.userId, layout: "layouts/signinSignoutLayout"});
    // },
    // getExam(req,res) {
    //     res.render('exam', {title:"QuizZone|exam", userId:req.user.userId, layout: "layouts/signinSignoutLayout"});
    // },
    // getResult(req, res) {
    //     res.render('result', {title: "QuizZone|result", userId:req.user.userId, layout: "layouts/signinSignoutLayout"})
    // },
    // getSummary(req, res) {
    //     res.render('summary', {title: "QuizZone|summary", userId:req.user.userId, layout: "layouts/signinSignoutLayout"})
    // },
    // getAnalytics(req, res) {
    //     res.render('analytics', {title: "QuizZone|analytics", userId:req.user.userId, layout: "layouts/signinSignoutLayout"})
    // },

    // //temporary settings
    // getSettings(req,res){
    //     res.render('settings',{title: "QuizeZone|settings",userId:req.user.userId, layout: "layouts/signinSignoutLayout" })
       
    // }

    


}