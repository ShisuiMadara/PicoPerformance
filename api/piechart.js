const mysql = require('mysql')
const { execute } = require('./getAllTasks')

function handler (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })
  req = req.body

  con.connect(async (err) => {
    if (err) {
      res.status(400).send({
        message: 'Datbase Error',
        success: false
      })
      return 0
    }
    var sql = "Select date_add('" + req.StartDate + "', INTERVAL " + (req.Yesterday?'-1':'0') + " DAY) as 'a', date_add('" + req.EndDate + "', INTERVAL " + (req.Yesterday?'-1':'0') + " DAY) as 'b'"
    con.query(sql, function(err, result){
      req.StartDate = result[0].a;
      req.EndDate = result[0].b;
      sql = 'SELECT Count(TaskId) As "Count", Sum(TimeTaken) As "Sum", TaskType FROM Tasks Where EmployeeId="' + req.EmployeeId + '" AND TaskType="Break" AND StartDate BETWEEN "' + req.StartDate + '" AND "' + req.EndDate + '"'
      con.query(sql, function (erro, result1) {
        if (erro) {
          console.log(erro.message)
          console.log(1)
          res.status(400).send({
            message: 'Query Error',
            success: false
          })
          return 0
        }
        sql = 'SELECT Count(TaskId) As "Count", Sum(TimeTaken) As "Sum", TaskType FROM Tasks Where EmployeeId="' + req.EmployeeId + '" AND TaskType="Meeting" AND StartDate BETWEEN "' + req.StartDate + '" AND "' + req.EndDate + '"'
        con.query(sql, function (erro, result2) {
          if (erro) {
            console.log(erro.message)
            console.log(2)
            res.status(400).send({
              message: 'Query Error',
              success: false
            })
            return 0
          }
          sql = 'SELECT Count(TaskId) As "Count", Sum(TimeTaken) As "Sum", TaskType FROM Tasks Where EmployeeId="' + req.EmployeeId + '" AND TaskType="Work" AND StartDate BETWEEN "' + req.StartDate + '" AND "' + req.EndDate + '"'
          con.query(sql, function (erro, result3) {
            if (erro) {
              console.log(result3)
              console.log(3)
              res.status(400).send({
                message: 'Query Error',
                success: false
              })
              con.end()
              return 0
            }
            res.send({
              data: {
                Details: {
                  Break: {
                    Count: result1[0].Count,
                    Sum: result1[0].Sum
                  },
                  Meeting: {
                    Count: result2[0].Count,
                    Sum: result2[0].Sum
                  },
                  Work: {
                    Count: result3[0].Count,
                    Sum: result3[0].Sum
                  }
                }
              },
              success: true
            })
            con.end()
          })
        })
      })
    }) 
  })
}
exports.execute = handler
