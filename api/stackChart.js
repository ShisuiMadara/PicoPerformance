const mysql = require('mysql')

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
      res.status(400).send('Datbase Error')
      return 0
    }
    console.log('Connected!')
    var sql = 'SELECT Count(TimeTaken) as "Count", Sum(TimeTaken) as "Sum" FROM Tasks WHERE StartDate BETWEEN DATE_ADD("' + startDate + '",INTERVAL 0 DAY) AND DATE_ADD("' + endDate + '", INTERVAL 0 DAY) AND TaskType="break" AND EmployeeId=' + req.EmployeeId
    var resobj = []
    for (i = 0; i < 7; i++){
      resobj.push({})
      sql = 'SELECT Count(TimeTaken) as "Count", Sum(TimeTaken) as "Sum" FROM Tasks WHERE StartDate BETWEEN DATE_ADD("' + startDate + '",INTERVAL '+ i + ' DAY) AND DATE_ADD("' + endDate + '", INTERVAL '+ i + ' DAY) AND TaskType="Break" AND EmployeeId=' + req.EmployeeId
      con.query(sql, async function (erro, result) {
        if (erro) {
          res.status(400).send('Unknown Error')
          return 0
        }
        
        resobj[i].Break = result
      })
      console.log(resobj[i].Break)
      sql = 'SELECT Count(TimeTaken) as "Count", Sum(TimeTaken) as "Sum" FROM Tasks WHERE StartDate BETWEEN DATE_ADD("' + startDate + '",INTERVAL + '+ i + ' DAY) AND DATE_ADD("' + endDate + '", INTERVAL + '+ i + ' DAY) AND TaskType="Meeting" AND EmployeeId=' + req.EmployeeId
       con.query(sql, async function (erro, result) {
        if (erro) {
          res.status(400).send('Unknown Error')
          return 0
        }
        
        resobj[i].Meeting = result
      })
      sql = 'SELECT Count(TimeTaken) as "Count", Sum(TimeTaken) as "Sum" FROM Tasks WHERE StartDate BETWEEN DATE_ADD("' + startDate + '",INTERVAL + '+ i + ' DAY) AND DATE_ADD("' + endDate + '", INTERVAL + '+ i + ' DAY) AND TaskType="Work" AND EmployeeId=' + req.EmployeeId
       con.query(sql, async function (erro, result) {
        if (erro) {
          res.status(400).send('Unknown Error')
          return 0
        }
        resobj[i].Work = result
      })
      
    } 
    res.send(resobj)
  })
}

exports.execute = filter
