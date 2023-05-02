import {createDataBase} from './db/conn.js'
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import {
    insertUser
} from './models/users.js'

const app = express();

app.use(cors());
app.use(express.json());

createDataBase();

app.post("/users", function(req, res){
    insertUser(req.body).then(() => {
        res.status(201).send(req.body);
    }).catch((err) => {
        res.status(500).send({err, msg: "Erro ao inserir usuário"});
    });
});

app.listen(process.env.PORT, function(){
    console.log('Server started on port '+process.env.PORT);
});