const express = require('express');
const bodyParser = require('body-parser');
const Lead = require('./public/js/leads')

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true}));

// home/index
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// article
app.get('/article', (req, res) => {
    res.sendFile(__dirname + '/public/articles/article.html')
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