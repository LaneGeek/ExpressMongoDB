const express = require('express');
const mongoose = require('mongoose');

const app = express();

const mongoUri = 'mongodb+srv://mongodbuser:FakeGitHubPassword@myowncluster-psihg.gcp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', error => console.error('Connection error', error));

app.get('/', (req, res) => {
    res.send('Hi there!');
});

app.listen(3000, () => console.log('Listening on port 3000'));
