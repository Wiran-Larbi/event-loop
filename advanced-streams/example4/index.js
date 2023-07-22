/**
 echo "id,name,dec,age" > big.csv 
  for i in `seq 1 5`; do node -e "process.stout.write('$i,larbi-$i,$i-text',$i\n'.repeat(1e5))" >> big.csv;done
 */

import { Stats, createReadStream } from 'node:fs';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { randomUUID } from 'node:crypto';
import { log, makeRequest } from './utils.js';
import csvtojson from 'csvtojson';


const dataProcessor = Transform({
    objectMode: true,
    transform(chunk, enc, callback) {
        const jsonData = chunk.toString();
        const data = JSON.parse(jsonData);
        data.id = randomUUID();

        return callback(null, JSON.stringify(data));
    }
})
await pipeline(
    createReadStream('big.csv'),
    csvtojson(),
    dataProcessor,
    async function* (source) {
        let count = 0;
        for await (const data of source) {
            // console.log('data', data.toString());
            log(`processed ${++count}..`);
            const status = await makeRequest(data);
            if (status !== 200)
                throw new Error(`oops! reached rate limit, status : ${status}`);
        }
    }
)