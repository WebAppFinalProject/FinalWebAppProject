// const dbUri = "mongodb://admin:admin@cluster0-shard-00-00.wn0yq.mongodb.net:27017,"+
// "cluster0-shard-00-01.wn0yq.mongodb.net:27017,cluster0-shard-00-02.wn0yq.mongodb.net:27017/webapp_database" +
// "?ssl=true&replicaSet=atlas-qwj52s-shard-0&authSource=admin&retryWrites=true&w=majority";
const dbUri = "mongodb://admin:admin@cluster0-shard-00-00.ro4is.mongodb.net:27017,cluster0-shard-00-01.ro4is.mongodb.net:27017,cluster0-shard-00-02.ro4is.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-b0d7by-shard-0&authSource=admin&retryWrites=true&w=majority"

const dbUriv1 = "mongodb://localhost/webapp_database";

module.exports = {dbUri, dbUriv1};