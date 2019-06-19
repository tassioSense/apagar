const express = require('express');
const bodyParser = require('body-parser');
const Lead = require('./public/js/leads')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

// home / index
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

// article
app.get('/voce-sabe-como-organizar-um-coffee-break-para-eventos', (req, res) => {
    res.sendFile(__dirname + '/public/articles/voce-sabe-como-organizar-um-coffee-break-para-eventos.html')
});

app.post('/leads', (req, res) => {
    const teste = req.body;
    const lead = Lead.newLead(teste);
    res.send("Obrigado por se cadastrar. Vamos te tirar do tédio! ;)")
});

app.get('/mailing-list-csv', (req, res) => {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment: filename\"' + 'mailing.csv"');
    Lead.getCsv((data) => {
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});