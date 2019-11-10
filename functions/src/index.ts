import * as functions from 'firebase-functions';
const cors = require('cors')({ origin: true});
import * as admin from 'firebase-admin';
// import * as dialogflow from 'dialogflow';
const serviceAccount = require("./phass.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://phass-c3d43.firebaseio.com"
});

// import { SessionsClient } from 'dialogflow';
const { SessionsClient } = require('dialogflow');
    
export const dialogflowGateway = functions.region('asia-east2').https.onRequest((request, response) => {
cors(request, response, async () => {
    const {queryInput, sessionid } = request.body;

    const sessionClient = new SessionsClient({ credentials: serviceAccount });
    const session = sessionClient.sessionPath('phass-c3d43', sessionid);

    const responses = await sessionClient.detectIntent({session, queryInput});
    const result = responses[0].queryResult;


    response.send(result);
  });
});
