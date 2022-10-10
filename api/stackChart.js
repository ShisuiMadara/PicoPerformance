const mysql = require('mysql')
// done
async function filter (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  req = req.body
  const startDate = req.EndDate + ' 00:00:00'
  const endDate = req.EndDate + ' 23:59:59'

  console.log(startDate)
  console.log(endDate)
  const callQuery = (Offset, resObj)=>{
    let sql = 'SELECT Count(TimeTaken) as "Count", Sum(TimeTaken) as "Sum" FROM Tasks WHERE StartDate BETWEEN DATE_ADD("' + startDate + '",INTERVAL -' + Offset + ' DAY) AND DATE_ADD("' + endDate + '", INTERVAL -' + Offset + ' DAY) AND TaskType="Break" AND EmployeeId=' + req.EmployeeId
    con.query(sql, (err, result) => {
      if (err) {
        res.status(400).send({
          success: false,
          message: 'Unknown Error'
        })
        con.end()
        return
      }
      var rex = [
        {
          Name: 'Break',
          Count: result[0].Count,
          Sum: (result[0].Sum ? result[0].Sum : 0)
        }
      ]
      sql = 'SELECT Count(TimeTaken) as "Count", Sum(TimeTaken) as "Sum" FROM Tasks WHERE StartDate BETWEEN DATE_ADD("' + startDate + '",INTERVAL -' + Offset + ' DAY) AND DATE_ADD("' + endDate + '", INTERVAL -' + Offset + ' DAY) AND TaskType="Meeting" AND EmployeeId=' + req.EmployeeId
      con.query(sql, (err, result) => {
        if (err) {
          res.status(400).send({
            success: false,
            message: 'Unknown Error'
          })
          con.end()
          return
        }
        rex.push(
          {
            Name: 'Meeting',
            Count: result[0].Count,
            Sum: (result[0].Sum ? result[0].Sum : 0)
          }
        )
        sql = 'SELECT Count(TimeTaken) as "Count", Sum(TimeTaken) as "Sum" FROM Tasks WHERE StartDate BETWEEN DATE_ADD("' + startDate + '",INTERVAL -' + Offset + ' DAY) AND DATE_ADD("' + endDate + '", INTERVAL -' + Offset + ' DAY) AND TaskType="Work" AND EmployeeId=' + req.EmployeeId
        con.query(sql, (err, result) =>{
          if (err) {
            res.status(400).send({
              success: false,
              message: 'Unknown Error'
            })
            con.end()
            return
          }
          rex.push(
            {
              Name: 'Work',
              Count: result[0].Count,
              Sum: (result[0].Sum ? result[0].Sum : 0)
            }
          )
          resObj.push(rex)
          if (Offset === 6){
            return res.send({
              success: true,
              data:{
                Chart: resObj
              }
            })
          }
          callQuery(Offset + 1, resObj)
        })
      })
    })
  }
  con.connect(async (err) => {
    if (err) {
      res.status(400).send({
        success: false,
        message: 'Datbase Error'
      })
      return 0
    }
    return callQuery(0, [])
  })
}

exports.execute = filter
