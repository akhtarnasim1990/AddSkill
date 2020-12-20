var moment = require('moment');
const dotenv = require('dotenv').config();
const EventEmitter = require('events');
const emitter = new EventEmitter();
const fs = require('fs');

const src_dir = `./${process.env.NODE_ENV}/src`;
const dest_dir = `./${process.env.NODE_ENV}/dest`;

emitter.on('createFolders' , () => {
    if(fs.existsSync(src_dir)) {
        console.log('Folder already exist');
    }else{
        fs.mkdir(src_dir , { recursive : true } , (err) => {
            if(err){
                throw err ;
            }
        });
    };
    if(fs.existsSync(dest_dir)) {
        console.log('File already exist');
    }else{
        fs.mkdir(dest_dir , { recursive : true } , (err) => {
            if(err){
                throw err ;
            }
        });
    };

});

const src_file = src_dir + `/${moment().format('YYYY_MM_DD_HH_MM_SS')}.txt`;
emitter.on('createSourceFile' , () => {
    fs.writeFile(src_file , "Hello World!" , 'utf8' , (err) => {
        if(err) {
            throw err ;
        }
        console.log('File created.');
    });
});

const dest_file = dest_dir + `/${moment().format('YYYY_MM_DD_HH_MM_SS')}.txt`;
emitter.on('createDestFile' , () => {
    if(process.argv[3] == "true"){
        let writeStream = fs.createWriteStream(dest_file);
        writeStream.write("Hello again..." , 'utf8');
        writeStream.end();
        writeStream.on('finish', () => console.log("Writing completed..."));
		writeStream.on('error', () => console.error(err));
    }else{
        fs.writeFile(dest_file , "Hello !" , 'utf8' , (err) => {
            if(err) throw err;
            console.log("Des file created");
        });
    }
});

emitter.emit('createFolders');
emitter.emit('createSourceFile');
emitter.emit('createDestFile');

process.on('SIGINT', () => {
    console.log('Received Interrupt Signal');
    process.exit()
});

// console.log(process.argv)
// console.log(src_dir);
// console.log(dest_dir);

