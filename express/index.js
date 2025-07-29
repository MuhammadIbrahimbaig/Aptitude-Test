let exp = require("express");
require("dotenv").config();
let route = require("./Routes/route");
let cors = require("cors");
let db = require("./dbconnection");
let port_no = process.env.PORT||4001;
let app = exp();

app.use(exp.json());
app.use(cors());
app.use('/Mywork/',route);


db().then(()=>{
app.listen(port_no , function () {
    console.log(`server at started at http://localhost:${port_no}/Mywork/`);
})

}).catch((e)=>{
    console.log(e);
})
