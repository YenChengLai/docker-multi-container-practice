const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient();
client.set('visits', 0);

app('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send('Number visited: ' + visits);
        client.set('visits', parseInt(visits)++);
    });
});

app.listen(8081, () => {
    console.log('Listening on port 8081.');
});