const mysql = require('mysql')
function handler(req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "pico",
        password: "password",
        database: "picoperformance"
    });
    req = req.body
    const Tasks = [[req.EmployeeId, req.TaskDescription, req.StartDate, req.TimeTaken, req.TaskType]]
    con.connect(async (err)=>{
        if (err) {
            res.status(400).send("Datbase Error");
            return 0
        }
        var sql = "Insert Into Tasks(EmployeeId, TaskDescription, StartDate, TimeTaken, TaskType) Values ?";
        con.query(sql, [Tasks], function (erro, result) {
            if (erro) {
                console.log(erro.code)
                res.status(400).send('Query Error');
                return 0;
            }
            res.send('User Blocked Successfully!');
        });
    })
}
exports.execute = handler;
