const express = require('express');
const path = require('path');
const fs = require('fs');
const { json } = require('body-parser');

// if completed, complete delete request via uuid ---->
// const uuid = require('./helpers/uuid')
// ----------------------------------->

const app = express();
const PORT = process.env.PORT || 3001;

// app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./Develop/public'));

// Wildcard route to direct users back to index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './Develop/public/index.html'))
); 

app.get('/notes', (req, res) =>
    res.send(path.join(__dirname, './Develop/public/notes.html', (err) => {
        (err) ? res.error(err) : console.log(`Successful ${req.method} request received.`)
    }))
); 

app.post('/notes', (req, res) => {
    // const dbNotes = []
    const dbNotes = JSON.parse(fs.readFileSync('./db/db.json'));
    // const newNote = {
    //     title: req.body.title,
    //     text: req.body.text
    // };
    const newNote = req.body;
    dbNotes.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(dbNotes))
    res.json(dbNotes);
});



// app.get('/api/notes', (req, res) => {
//     res.sendFile(path.join('/db/db.json',(err) => {
//         (err) ? console.error(err) : console.log('success');
//     }))
// });
// d

// app.post('/api/notes', (req, res) => {
//     res.sendFile(path.join('/db/db.json',(err) => {
//         (err) ? console.error(err) : console.log('success');
//     }))
// }); 

// ------------------------------
// look into DELETE /api/notes/:id
// ------------------------------

// app.delete('/api/notes/:id', (req, res) => {
//     res.sendFile(path.join('/db/db.json',(err) => {
//         (err) ? console.error(err) : console.log('success');
//     }))
// }); 

app.listen(PORT, () =>
    console.log(`Note Taker App listening at http://localhost:${PORT} 📓`)
);
