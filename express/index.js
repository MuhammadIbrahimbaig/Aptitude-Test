let exp = require("express");
require("dotenv").config();
let route = require("./Routes/route");
let cors = require("cors");
let db = require("./dbconnection");
let port_no = process.env.PORT || 4001;
let app = exp();
let path = require("path");   // ✅ yeh zaroori hai

app.use(exp.json());
app.use(cors());
app.use('/Mywork/', route);
app.use("/invoices", exp.static(path.join(__dirname, "invoices")));

db().then(() => {
    app.listen(port_no, function () {
        console.log(`server at started at  `);
    })

}).catch((e) => {
    console.log(e);
})
