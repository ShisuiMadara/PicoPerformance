const mysql = require('mysql')
function handler(req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "pico",
        password: "password",
        database: "picoperformance"
    });
    req = req.body
    var blk = '0'
    if(req.Block === true) {blk = '1'}
    console.log(blk);
    con.connect(async (err)=>{
        if (err) {
            res.status(400).send("Datbase Error");
            return 0
        }
        var sql = "Update Employee Set IsBlocked=" + blk + " where EmailId='" + req.EmailId + "'";
        con.query(sql, function (erro, result) {
            if (erro) {
                res.status(400).send('Query Error');
                return 0;
            }
            res.send('User Blocked Successfully!');
        });
    })
}
exports.execute = handler;
