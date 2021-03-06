require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb://superman:FakeGitHubPassword@mongodb.mozarts.website:27017/test?authSource=admin';
//const mongoUri = 'mongodb+srv://mongodbuser:FakeGitHubPassword@myowncluster-psihg.gcp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', error => console.error('Connection error', error));

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ' + port));
