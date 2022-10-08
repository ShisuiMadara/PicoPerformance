const { connect } = require('http2')
const mysql = require('mysql')
//done
async function filter (req, res) {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'pico',
    password: 'password',
    database: 'picoperformance'
  })

  req = req.body

  const d = new Date()
  let mnth = d.getMonth() + 1
  mnth = mnth.toString()
  if (mnth.length === 1) mnth = '0' + mnth
  let dayy = d.getDate().toString()
  if (dayy.length === 1) dayy = '0' + dayy
  let comp2 = d.getFullYear() + '-' + mnth + '-' + dayy


  const sevenDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
  mnth = sevenDaysAgo.getMonth() + 1
  mnth = mnth.toString()
  if (mnth.length === 1) mnth = '0' + mnth
  dayy = sevenDaysAgo.getDate().toString()
  if (dayy.length === 1) dayy = '0' + dayy
  comp2 = sevenDaysAgo.getFullYear() + '-' + mnth + '-' + dayy

  const startDate = comp2 + ' 00:00:00'
  const endDate = comp2 + ' 23:59:59'


  console.log(startDate)
  console.log(endDate)
  con.connect(async (err) => {
    if (err) {
      res.status(400).send({
        success : false,
        message : 'Datbase Error'
      })
      return 0
    }
    var x = 0
    console.log('Connected!')
    const resobj = {}
    var sql = 'SELECT Count(TimeTaken) as "Count", Sum(TimeTaken) as "Sum" FROM Tasks WHERE StartDate BETWEEN DATE_ADD("' + startDate + '",INTERVAL ' + req.Offset + ' DAY) AND DATE_ADD("' + endDate + '", INTERVAL ' + req.Offset + ' DAY) AND TaskType="Break" AND EmployeeId=' + req.EmployeeId
    con.query(sql, (err, result)=>{
      if (err){
        res.status(400).send({
          success : false,
          message : 'Unknown Error'
        })
        return
      }
      resobj.Break = result
      sql = 'SELECT Count(TimeTaken) as "Count", Sum(TimeTaken) as "Sum" FROM Tasks WHERE StartDate BETWEEN DATE_ADD("' + startDate + '",INTERVAL ' + req.Offset + ' DAY) AND DATE_ADD("' + endDate + '", INTERVAL ' + req.Offset + ' DAY) AND TaskType="Meeting" AND EmployeeId=' + req.EmployeeId
      con.query(sql, (err, result)=>{
        if (err){
          res.status(400).send({
            success : false,
            message : 'Unknown Error'
          })
          return
        }
        resobj.Meeting = result
        sql = 'SELECT Count(TimeTaken) as "Count", Sum(TimeTaken) as "Sum" FROM Tasks WHERE StartDate BETWEEN DATE_ADD("' + startDate + '",INTERVAL ' + req.Offset + ' DAY) AND DATE_ADD("' + endDate + '", INTERVAL ' + req.Offset + ' DAY) AND TaskType="Work" AND EmployeeId=' + req.EmployeeId
        con.query(sql, (err, result)=>{
          if (err){
            res.status(400).send({
              success : false,
              message : 'Unknown Error'
            })
            return
          }
          resobj.Work = result
          res.send({
            success : true,
            data: {
              StackData: resobj
            }
          })
        })
      })
    })
  })
}

exports.execute = filter
