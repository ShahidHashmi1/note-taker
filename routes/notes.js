const router = require('express').Router();
const db = require('../db/db.json');
const fs = require('fs');

router.get('/', (req, res) => {
    res.json(db)
})

router.post('/', (req, res) => {
    db.push(req.body)
    res.json(db);
fs.writeFileSync('./db/db.json', JSON.stringify(db,null,'\t'))
})

// router.delete('/' (req, res) => {
//     db.push(req.body)
//     res.json(db)
// })
// app.delete('/api/notes/:id', (req, res) => {
//     res.sendFile(path.join('/db/db.json',(err) => {
//         (err) ? console.error(err) : console.log('success');
//     }))
// });

module.exports = router;