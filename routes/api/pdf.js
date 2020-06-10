const {Router} = require('express')
const pdf = require('html-pdf')
const pdfTemplate = require('../../documentTest')
const path = require('path')
const router = Router()
const fs = require('fs')
router.post('/create-pdf', (req, res) => {
  const html = fs.readFileSync(path.join(__dirname, 'test.html'), 'utf8')
  pdf.create(html, {}).toFile('result.pdf', (err) => {
    if (err) {
      res.send(Promise.reject())
    }

    res.send(Promise.resolve())
  })
})

router.get('/fetch-pdf', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'result.pdf'))
})

module.exports = router
// console.log('path', path.join(__dirname, '..', '..', 'result.pdf'))
