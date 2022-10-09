const mysql = require('mysql')
//done
function handler(req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "pico",
        password: "password",
        database: "picoperformance"
    });
    req = req.body
    var blk = '0'
    var Blocked = 'Unblocked'
    if(req.Block === true) {
        blk = '1'
        Blocked = 'Blocked'
    }
    console.log(blk);
    con.connect(async (err)=>{
        if (err) {
            res.status(400).send({
                message: "Datbase Error",
                success: false
            });
            return 0
        }
        var sql = "Update Employee Set IsBlocked=" + blk + " where EmailId='" + req.EmailId + "'";
        con.query(sql, function (erro, result) {
            if (erro) {
                res.status(400).send({
                    success: false,
                    message: 'Query Error'
                });
                return 0;
            }
            res.send({
                message: 'User ' +  Blocked + ' Successfully!',
                success: true
            });
        });
    })
}
exports.execute = handler;
