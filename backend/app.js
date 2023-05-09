import {createDataBase} from './db/conn.js'
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import {usersModel} from './models/users.js'

const app = express();

app.use(cors());
app.use(express.json());

await createDataBase();

app.post("/users", async function(req, res){
    try{
        console.log("Insert user");
        console.log(req.body);
        let data = req.body;

        let dataCorrect = true;
        
        if(!data)
            dataCorrect = false;
        if(!data.name || (data.name && (data.name.length < 2 || data.name.length > 125)))
            dataCorrect = false;
        if(!data.email || (data.email && (data.email.split("@").length != 2 || (data.email.split("@")?.[1] == "" || data.email.split("@")?.[0] == "") || data.email.length < 10 || data.email.length > 125)))
            dataCorrect = false;
        if(!data.password || (data.password && (data.password.length < 2 || data.password.length > 125)))
            dataCorrect = false;

        if(!dataCorrect){
            console.log("Data incorrect");
            res.status(400).send({message: "As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente."});
            return;
        }

        var existeEmail = await usersModel.findUserByEmail(data.email);
        if(existeEmail){
            console.log("Email já cadastrado");
            res.status(422).send({message: "Email já cadastrado no sistema!"});
            return;
        }

        var response = await usersModel.insertUser(data);
        console.log("User inserted");
        res.status(201).send(response);

    }catch(err){
        console.log(err+": Error to insert user");
        res.status(500).send({message: "Erro ao tentar cadastrar o usuário no servidor"});
    }
});

app.listen(process.env.PORT, function(){
    console.log('Server started on port '+process.env.PORT);
});