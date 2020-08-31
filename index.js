const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
    host: 'redis-server',
    port: 6379 // redis' default port
});
client.set('visits', 0);

app.get('/', function (req, res) {
    client.get('visits', (err, visits) => {
        res.send('Number visited: ' + visits);
        client.set('visits', parseInt(visits) + 1);
    });
});

app.listen(8081, () => {
    console.log('Listening on port 8081.');
});