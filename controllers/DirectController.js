module.exports = {
    getIndex(req, res){
        res.render("index",{title: "QuizZone"});
    },
    getDashboard(req, res){
        res.render("dashboard",{title: "QuizZone|Dashboard"});
    }
}