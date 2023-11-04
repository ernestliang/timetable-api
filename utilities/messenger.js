const fbAdmin = require('firebase-admin')
var serviceCredentials = require('../secret_key.json');  // fb admin secret key in json file

fbAdmin.initializeApp({
    credential: fbAdmin.credential.cert(serviceCredentials)
});

// const messaging = fbAdmin.messaging();

const Messenger = {
    sendByToken: function(token, title, msg) {        
        // --- prepare messaging payload
        let dataload = {
            "token": token,
            "notification": {},
            "data": {
                "title": title,
                "body": msg,
                "sound": "default"
            }
        };

        // ---- send message
        try {
            fbAdmin.messaging().send(dataload)
                .then(response => {
                    return true;
                })
                .catch(err => {
                    console.log(JSON.stringify(err))
                    return err.message;
                });
        }
        catch(err) {
            console.log(JSON.stringify(err))
        }
    }
}

module.exports = Messenger;