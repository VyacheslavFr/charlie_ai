const express = require('express');
const body_parser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express().use(body_parser.json());

// const token = process.env.TOKEN;
// const my_token=process.env.MYTOKEN;

const token = 'EAAO0RRiJITcBO4wZAUb1dxhZCClZC9J9c8jR69nqF86sQQic195HJg9uwN8GeqoI1Yl2LsXQSiZAGjlmEuqWEqFDZAxuzZCN8XWmaZCPZBS9gq10Sr6hZCZC42mfEo7dsDtxNlQ5ueUwMO4UwUFMPXm0SKVBxgAiG99dewrLsZB8hRvY9tFg4NLfKAaTLXumjqQ6pZBDWmxbhIPcOtUTZBO0OgN5hqYW4Yuyi3zDtdEgZD';
const my_token='charlietoken';

app.listen(8000 || process.env.PORT, () => {
    console.log(`Server is running`);
});

app.get("/webhook",(req, res) =>{
    let mode=req.query["hub.mode"];
    let challenge=req.query["hub.challenge"];
    let token=req.query["hub.verify_token"];

    if (mode && token) {
        if (mode==="subscribe" && token===my_token) {
            res.status(200).send(challenge);
        } else {
            res.status(403);
        }
    }
})

app.post("/webhook",(req, res) => {
    let body_param=req.body;

    console.log(JSON.stringify(body_param, null, 2));

    if (body_param.object) {
       if (body_param.entry &&
           body_param.entry[0].changes &&
           body_param.entry[0].changes[0].value.message &&
           body_param.entry[0].changes[0].value.message[0]
       ) {
           let phone_number_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
           let from = body_param.entry[0].changes[0].value.message[0].from;
           let msg_body = body_param.entry[0].changes[0].value.message[0].text.body;

           axios({
               method:"POST",
               url:"https://graph.facebook.com/v20.0/" + phone_number_id + "/messages?access_token=" + token,
               data: {
                   messaging_product: "whatsapp",
                   to: from,
                   text: {
                       body: "Rainman"
                   }
               },
               headers: {
                   "Content-Type":"application/json"
               }

           });
           res.sendStatus(200);
       } else {
           res.sendStatus(404);
       }
    }
})