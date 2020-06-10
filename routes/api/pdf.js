const {Router} = require('express')
const pdf = require('html-pdf')
const pdfTemplate = require('../../documentTest')
const path = require('path')
const router = Router()
const fs = require('fs')
let ejs = require('ejs')
let students = [
  {name: 'Joy', email: 'joy@example.com', city: 'New York', country: 'USA'},
  {
    name: 'John',
    email: 'John@example.com',
    city: 'San Francisco',
    country: 'USA',
  },
]
router.post('/create-pdf', (req, res) => {
  // const html =
  // fs.readFileSync(path.join(__dirname, 'test.html'), 'utf8')

  ejs.renderFile(
    path.join(__dirname, 'test.ejs'),
    {students: students},
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
        pdf
          .create(data, options)
          .toFile('pdf/result.pdf', function (err, data) {
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
  res.sendFile(path.join(__dirname, '..', '..', 'pdf', 'report.pdf'))
})

module.exports = router
// console.log('path', path.join(__dirname, '..', '..', 'result.pdf'))
