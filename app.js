var express = require('express'),
	app 	= express();

app
	// Get server PORT (default to 8080)
	.set('port', process.env.PORT || 8080)
	
	// Public folder is static
	.use(express.static(__dirname + '/public'))

	// Start listening on predefined PORT
	.listen(app.get('port'), function () {
		console.log('Application running on ', app.get('port'));
	});