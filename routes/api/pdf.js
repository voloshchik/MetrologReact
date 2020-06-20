const {Router} = require('express')
const pdf = require('html-pdf')
const pdfTemplate = require('../../documentTest')
const path = require('path')
const router = Router()
const fs = require('fs')
let ejs = require('ejs')

router.post('/create-pdf', (req, res) => {
  console.log('req.body', req.body)

  // const html =
  // fs.readFileSync(path.join(__dirname, 'test.html'), 'utf8')

  ejs.renderFile(
    path.join(__dirname, 'test.ejs'),
    {data: req.body['devicesData'], year: req.body['data']},
    (err, data) => {
      if (err) {
        res.send(err)
      } else {
        let options = {
          height: '11.25in',
          width: '8.5in',
          header: {
            height: '20mm',
          },
          footer: {
            height: '20mm',
          },
        }
        pdf.create(data, options).toFile('report.pdf', function (err, data) {
          if (err) {
            res.send(err)
          } else {
            res.send('File created successfully')
          }
        })
      }
    }
  )
})

router.get('/fetch-pdf', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'report.pdf'))
})

module.exports = router
// console.log('path', path.join(__dirname, '..', '..', 'result.pdf'))
