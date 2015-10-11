'use strict';

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2('1031466315037-mri5opmcirkisus3fllv97q2oakgenfa.apps.googleusercontent.com',
								'7zF3DHS0Zr8b57LowYlxXYAj',
								'http://localhost:9000/oauthredirect/');

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
	'https://www.googleapis.com/auth/plus.me',
	'https://www.googleapis.com/auth/drive'
];
var url = oauth2Client.generateAuthUrl({
	access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
	scope: scopes // If you only need one scope you can pass it as string
});



module.exports.login = function (req, res) {
	res.json({ url: url });
};
