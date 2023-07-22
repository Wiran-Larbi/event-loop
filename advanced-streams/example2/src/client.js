import { get } from 'http';
import { Transform, Writable } from 'stream';
import fs, { createWriteStream } from 'fs';

const url = 'http://localhost:3000';
const getHttpStream = () => new Promise(resolve => get(url, (res) => resolve(res)));

const stream = await getHttpStream();
// console.log(stream);
// stream.pipe(process.stdout);

stream
    .pipe(
        Transform({
            objectMode: true,
            transform(chunk, enc, cb) {
                const item = JSON.parse(chunk);
                const num = /\d+/.exec(item.name)[0];
                const isEven = num % 2 === 0;
                item.name = item.name.concat(isEven ? ' is even' : ' is odd');
                console.log(item);
                cb(null, item);
            }
        })
    )
    .filter(chunk => chunk.name.includes('even'))
    .map(chunk => {
        chunk.name = chunk.name.toUpperCase();
        return JSON.stringify(chunk) + '\n';
    })
    .pipe(
        createWriteStream('response.log', { flags: "a" })
        // Writable({
        //     objectMode: true,
        //     write(chunk, enc, cb) {
        //         console.log('chunk', chunk);
        //         cb();
        //     }
        // })
    );