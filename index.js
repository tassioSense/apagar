const express = require('express');
const bodyParser = require('body-parser');
const Lead = require('./js/leads')

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html')
});

app.post('/leads', (req, res) => {
   const { name } = req.body;
   const lead = Lead.newLead({ name }); 
    res.send(lead)
})

app.get('/mailing-list-csv', (req, res) => {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment: filename\"' + 'mailing.csv"' );
    Lead.getCsv((data) => {
        res.send(data);
    });
});

app.listen(3000);