const axios = require('axios');

const whatsappApiUrl = 'https://graph.facebook.com/v20.0/420651631129815/messages';
const accessToken = 'EAAO0RRiJITcBO4wZAUb1dxhZCClZC9J9c8jR69nqF86sQQic195HJg9uwN8GeqoI1Yl2LsXQSiZAGjlmEuqWEqFDZAxuzZCN8XWmaZCPZBS9gq10Sr6hZCZC42mfEo7dsDtxNlQ5ueUwMO4UwUFMPXm0SKVBxgAiG99dewrLsZB8hRvY9tFg4NLfKAaTLXumjqQ6pZBDWmxbhIPcOtUTZBO0OgN5hqYW4Yuyi3zDtdEgZD';

const payload = {
    "messaging_product": "whatsapp",
    "to": "37580292932365",
    "type": "template",
    "template": {
        "name": "hello_world",
        "language": {
            "code": "en_US"
        }
    }
};

const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
};

axios.post(whatsappApiUrl, payload, { headers })
    .then(response => {
        console.log('Message sent successfully:', response.data);
    })
    .catch(error => {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
    });