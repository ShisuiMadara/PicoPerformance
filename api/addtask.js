const mysql = require('mysql')
// done
function handler (req, res) {
  if (req.user.isAdmin) {
    return res.status(403).send({
      success: false,
      message: 'Admin can\'t add tasks'
    })
  }
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })
  req = req.body
  const Tasks = [[req.EmployeeId, req.TaskDescription, req.StartDate, req.TimeTaken, req.TaskType]]
  const comp = req.StartDate.slice(0, 10)
  const d = new Date()
  let mnth = d.getMonth() + 1
  mnth = mnth.toString()
  if (mnth.length == 1) mnth = '0' + mnth
  dayy = d.getDate().toString()
  if (dayy.length == 1) dayy = '0' + dayy
  const comp2 = d.getFullYear() + '-' + mnth + '-' + dayy
  console.log(comp2)
  if (comp > comp2) {
    res.status(400).send({
      success: false,
      message: 'Date Value More than Current Date'
    })
    return 0
  }
  con.connect(async (err) => {
    if (err) {
      res.status(400).send({
        message: 'Datbase Error',
        success: false
      })
      return 0
    }
    const sql = 'Insert Into Tasks(EmployeeId, TaskDescription, StartDate, TimeTaken, TaskType) Values ?'
    con.query(sql, [Tasks], function (erro, result) {
      if (erro) {
        console.log(erro.code)
        res.status(400).send({
          success: false,
          message: 'Query Error'
        })
        return 0
      }
      res.status(200).send({
        success: true,
        message: 'Task Added Successfully'
      })
    })
  })
}
exports.execute = handler
