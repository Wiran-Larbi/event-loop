const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

// const uv = process.binding('uv');
// console.log('Current thread pool size: ', uv.uv_threadpool_size());

setTimeout(() => console.log("Timer 1 Finished .."), 0);
setImmediate(() => console.log("Immediate 1 Finished .."));


fs.readFile("text-file.txt", 'utf-8', () => {
    console.log("I/O 1 Finished ..");
    console.log(".................");

    setTimeout(() => console.log("Timer 2 Finished .."), 0);
    setTimeout(() => console.log("Timer 3 Finished .."), 2000);
    setImmediate(() => console.log("Immediate 2 Finished .."));

    process.nextTick(() => console.log("Process.nextThick Finished .."));

    crypto.pbkdf2Sync("password", "salt", 100000, 1024, 'sha512');
    console.log(Date.now() - start + ' ms, Password Encrypted : ');

    crypto.pbkdf2("password", "salt", 100000, 1024, 'sha512', (err, crypted) => {
        console.log(Date.now() - start + ' ms, Password Encrypted : ');
    });
    crypto.pbkdf2("password", "salt", 100000, 1024, 'sha512', (err, crypted) => {
        console.log(Date.now() - start + ' ms, Password Encrypted : ');
    });
    crypto.pbkdf2("password", "salt", 100000, 1024, 'sha512', (err, crypted) => {
        console.log(Date.now() - start + ' ms, Password Encrypted : ');
    });

});

console.log("From Top Top Code ..");