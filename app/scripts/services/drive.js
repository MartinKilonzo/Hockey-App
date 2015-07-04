vr readline = require('readline');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

/*var CLIENT_ID = main.CLIENT_ID,
CLIENT_SECRET = main.CLIENT_SECRET,
REDIRECT_URL = main.REDIRECT_URL,
SCOPE = 'https://www.googleapis.com/auth/drive.file';*/

var CLIENT_ID = '1031466315037-mri5opmcirkisus3fllv97q2oakgenfa.apps.googleusercontent.com',
CLIENT_SECRET = '7zF3DHS0Zr8b57LowYlxXYAj',
REDIRECT_URL = 'http://localhost:9000',
//REDIRECT_URL = 'http://localhost:9000/oauth2callback',
SCOPE = 'https://www.googleapis.com/auth/drive.file';

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var auth = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var url = auth.generateAuthUrl({ scope: SCOPE });
var getAccessToken = function(code) {
  auth.getToken(code, function(err, tokens) {
    if (err) {
      console.log('Error while trying to retrieve access token', err);
      return;
    }
    auth.credentials = tokens;
    upload();
  });
};
var upload = function() {
  var drive = google.drive({ version: 'v2', auth: auth });
  drive.files.insert({
    resource: {
      title: 'My Document',
      mimeType: 'text/plain'
    },
    media: {
      mimeType: 'text/plain',
      body: 'Hello World!'
    }
  }, console.log);
};
console.log('Visit the url: ', url);
rl.question('Enter the code here:', getAccessToken);