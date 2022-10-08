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


  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
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

  con.connect((err) => {
    if (err) {
      res.status(400).send('Datbase Error')
      return 0
    }
    console.log('Connected!')
    var sql = 'SELECT * FROM Tasks WHERE StartDate BETWEEN DATE_ADD("' + startDate + '",INTERVAL 0 DAY) AND DATE_ADD("' + endDate + '", INTERVAL 0 DAY) AND EmployeeId=' + req.EmployeeId

    con.query(sql, function (erro, result) {
      if (erro) {
        res.status(400).send('Unknown Error')
        return 0
      }
      if (result.length === 0) {
        res.status(404).send('No record in database')
      }
      console.log('Number of records inserted: ' + result.affectedRows)
      res.send(result)
    })
  })
}

exports.execute = filter
