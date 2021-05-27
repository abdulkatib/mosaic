const express = require('express');
const upload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const app = express();
const cors = require('cors');
const PORT = 3001;

app.use(cors());
app.use(upload());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
	if (req.files) {
		const file = req.files.file;
		const filename = file.name;

		file.mv(`./public/images/${filename}`, (err) => {
			if (err) return res.send(err);
			// res.sendFile(__dirname + '/images');
			var files = fs.readdirSync(__dirname + '/public/images/');

			res.json({ html: res.sendFile(__dirname + '/index.html'), files });
		});
	}
});

app.listen(PORT);
