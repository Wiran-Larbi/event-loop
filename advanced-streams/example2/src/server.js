import http from 'http';
import { Readable } from 'node:stream';
import { randomUUID } from 'crypto';

function* generate() {
    for (let i = 0; i <= 99; i++) {
        const data = {
            id: randomUUID(),
            name: `Larbi-${i + 1}`,
            at: Date.now()
        }
        yield data;
    }
}

function handler(req, res) {
    const readable = Readable({
        read() {
            for (const data of generate()) {
                this.push(JSON.stringify(data).concat('\n'));
            }
            this.push(null);
        }
    })

    readable.pipe(res);
}


const server = http.createServer(handler)
    .listen(3000)
    .on('listening', () => console.log('server running at 3000'));