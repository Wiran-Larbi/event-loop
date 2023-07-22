import express from 'express';
import bodyParser from 'body-parser';
import { createWriteStream } from 'node:fs';
import rateLimit from 'express-rate-limit';


/**
  curl \
  -X POST \
  --data '{"name": "larbi","age": 22}' \
  -H 'content-type: application/json' \
  localhost:3001
 */
const limiter = rateLimit({
    window: 1000,
    max: 10, // Limiting each IP to 10 requests per window
    standardHeaders: true,
    legacyHeaders: false
});


const output = createWriteStream('output.ndjson');
const app = express();

app.use(bodyParser.json());
app.use(limiter);

app.post('/', async (req, res) => {
    console.log(req.body);

    output.write(JSON.stringify(req.body) + '\n');
    return res.send('ok!');
})

app.listen(3001, () => {
    console.log('server running on http://localhost:3001');
})