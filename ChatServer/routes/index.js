var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
// 	res.render('index', {
// 		title: 'Express'
// 	});
// });

// webhook
router.get('/webhook', function(req, res) {
	if (req.query['hub.verify_token'] === 'meme') {
		return res.send(req.query['hub.challenge']);
	} else {
		return res.send('Error, wrong validation token');
	}
})

router.post('/webhook', function(req, res) {
	messaging_events = req.body.entry[0].messaging;
	for (i = 0; i < messaging_events.length; i++) {
		event = req.body.entry[0].messaging[i];
		sender = event.sender.id;
		if (event.message && event.message.text) {
			text = event.message.text;
			// sendTextMessage(sender, "我是Meme，你剛剛說了：" + text.substring(0, 200));
			sendTextMessage(sender, "我去洗澡囉，晚安");
		}
	}
	res.sendStatus(200);
});

var token = "EAAXC3RwTmukBAH6alOBN69sTKJbMPWAKZAZCKJlSsTfTlQz18UvlZCEgDRNeiZAUH5dJQilElzQnxXUuiBJPnjDJ34absN2Q8e0N2zo7WNeTmVw9zjKA5BuhOdnDbyl5JJHxXrdgvyBOO7vhZCPdjQ1F1wIPUwc4sQEnTeVBaCgZDZD";

function sendTextMessage(sender, text) {
	const messageData = {
		text: text
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {
			access_token: token
		},
		method: 'POST',
		json: {
			recipient: {
				id: sender
			},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
}

module.exports = router;