const functions = require('firebase-functions');
const cors = require('cors')({ origin: true});
const admin = require('firebase-admin');
const serviceAccount = require('./phass.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://phass-c3d43.firebaseio.com"
});

const { SessionsClient } = require('dialogflow');


exports.dialogflowGateway = functions.region('asia-east2').https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { queryInput, sessionId } = request.body;


    const sessionClient = new SessionsClient({ credentials: serviceAccount  });
    const session = sessionClient.sessionPath('phass-c3d43', sessionId);


    const responses = await sessionClient.detectIntent({ session, queryInput});

    const result = responses[0].queryResult;

    response.send(result);
  });
});

const { WebhookClient } = require('dialogflow-fulfillment');

exports.dialogflowWebhook = functions.https.onRequest(async (request, response) => {
    const agent = new WebhookClient({ request, response });

    const result = request.body.queryResult;


    async function userOnboardingHandler(agent) {

      // Do backend stuff here
      const db = admin.firestore();
      const profile = db.collection('users').doc('fnaeIanwmo97FASz');

      const { name} = result.parameters;

        await profile.set({ name})
        agent.add(`Okay!`);
    }


    let intentMap = new Map();
    intentMap.set('UserOnboarding', userOnboardingHandler);
    agent.handleRequest(intentMap);
});
