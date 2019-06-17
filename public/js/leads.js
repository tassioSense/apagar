const firebase = require('../../server/firebase');
const iconv = require('iconv-lite');
const csv = require('csv-stringify');

const newLead = ({ name }) => {
    const leads = firebase.database().ref('leads');
    const lead = leads.push({ name });
    return lead;    
};

const getCsv = (callback) => {
    const leads = firebase.database().ref('leads');
    const data = [['id', 'name']];
    leads.on('value', (snapshot) => {
        snapshot.forEach((lead) => {
            const { name } = lead.val();
            data.push([lead.key, name])
        });
        csv(data, (err, output) => {
            callback(output);
        })
    });
};

module.exports = {
    newLead,
    getCsv,
}