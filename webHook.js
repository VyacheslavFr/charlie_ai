const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.query['hub.verify_token'] === 'sadgsahgygf1t2ufg3tguf1tg1') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong validation token');
    }
});

router.post('/', (req, res) => {
    const data = req.body;
    console.log('Received webhook:', JSON.stringify(data, null, 2));

    // Handle incoming messages and events here
    if (data.object === 'whatsapp_business_account') {
        data.entry.forEach(entry => {
            entry.changes.forEach(change => {
                if (change.field === 'messages') {
                    const message = change.value.messages[0];
                    console.log('Incoming message:', message);

                    // Process the message here
                    if (message.type === 'text') {
                        console.log('Text message received:', message.text.body);
                    } else if (message.type === 'image') {
                        console.log('Image message received:', message.image);
                    }
                    // Handle other message types as needed
                }
            });
        });
    }

    // Respond to WhatsApp with a 200 OK to acknowledge receipt of the webhook
    res.sendStatus(200);
});

module.exports = router;