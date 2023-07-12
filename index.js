const express = require('express');
const { RtmTokenBuilder, RtmRole } = require('agora-token');

const app = express();
const APP_ID = '0c41c495f3794cc1a46ef7656850b9f7';
const APP_CERTIFICATE = 'ed7c0961341646ecb4aac4c80d48e134';
const port = 3000;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

app.get('/rtm_token', (req, res) => {
  const userID = req.query.userID;

  if (!username) {
    res.status(400).json({ error: 'User name is required.' });
    return;
  }
 

  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtmTokenBuilder.buildToken(
    APP_ID,
    APP_CERTIFICATE,
    userID,
    RtmRole.Rtm_User,
    privilegeExpiredTs
  );

  res.send(token);
});

app.listen(port, () => {
  console.log('RTM token server listening on port:' + port);
});
