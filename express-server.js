import express from 'express';
import fs from 'fs';
const server = express();

if (!fs.existsSync('directory')){
    fs.mkdirSync('directory');
}

server.get('/create-file', (req, res) => {
    fs.writeFile(
        `directory/${new Date().toISOString().replace(/[:]/g, '-')}.txt`,
        Date.now().toString(), (err)=>{

            if (err) {
                return res.status(500).json({ message: 'Error creating file', error: err });
            }
            res.status(201).json({ message: 'File created successfully' });
        }
      );
});

server.get("/list-files", (req, res)=>{
     fs.readdir('directory', (err, data)=>{
        if (err) {
             return res.status(500).json({ message: 'Error reading directory', error: err });
        }else{
            res.status(201).json({ files: data });
        }
     })
} );

const port = 8000;
server.listen( port , ()=>{
    console.log("Server listening" + port);
});