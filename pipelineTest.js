const { pipeline, Readable } = require('stream'); 
const { createWriteStream } = require('fs'); 


pipeline(
    Readable.from(['a', 'b', 'c', '\r\n']),
    createWriteStream('outfile.txt'),
    (err) => {
        console.log('finish callback file write stream');
    }
);