const mysql = require('mysql')
async function handler(req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "pico",
        password: "password",
        database: "picoperformance"
    });
    req = req.body;
    con.connect(async (err)=>{
        if (err) {
            res.status(400).send("Datbase Error");
            return 0
        }
        var sql = "Update Employee Set Name='" + req.Name +"', ContactNo=" + req.ContactNo + ", Department='" + req.Department + "' Where EmailId='" + req.EmailId + "'";
        con.query(sql, function (erro, result) {
            if (erro){
                console.log(erro.message);
                res.status(400).send('Query Error');
                return 0;
            }
            res.send('Details Edited Successfully!');
        });
    })
}
exports.execute = handler;
