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
    var comp = req.StartDate.slice(0, 10);
    const d = new Date();
    var mnth = d.getMonth() + 1;
    mnth = mnth.toString();
    if (mnth.length == 1) mnth = '0' + mnth;
    dayy = d.getDate().toString();
    if (dayy.length == 1) dayy = '0' + dayy;
    var comp2 = d.getFullYear() + '-' + mnth + '-' + dayy
    console.log(comp2);
    if (comp > comp2){
        res.status(400).send('Date Value More than Current Date')
        return 0;
    }
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
            res.send('Task Added Successfully');
        });
    })
}
exports.execute = handler;
