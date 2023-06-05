import {createDataBase} from './db/conn.js'
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import {usersModel} from './models/users.js'
import jwt from 'jsonwebtoken';
import { checkToken, blackList } from './middleware/middleware.js';

const app = express();
app.use(cors());
app.use(express.json());
await createDataBase();

// cadastro de usuário
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
        if(!data.password || (data.password && data.password.length != 32))
            dataCorrect = false;

        if(!dataCorrect){
            console.log("Data incorrect");
            return res.status(400).send({message: "As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente."});
        }

        var existeEmail = await usersModel.findUserByEmail(data.email);
        if(existeEmail){
            console.log("Email já cadastrado");
            return res.status(422).send({message: "Email já cadastrado no sistema!"});
        }

        var response = await usersModel.insertUser(data);
        console.log("User inserted");
        return res.status(201).send(response);

    }catch(err){
        console.log(err+": Error to insert user");
        return res.status(500).send({message: "Erro ao tentar cadastrar o usuário no servidor"});
    }
});

// login de usuário
app.post("/login", async function(req, res){

    try{

        console.log("Login user");
        console.log(req.body);
        let data = req.body;

        let dataCorrect = true;
        
        if(!data)
            dataCorrect = false;
        if(!data.email || (data.email && (data.email.split("@").length != 2 || (data.email.split("@")?.[1] == "" || data.email.split("@")?.[0] == "") || data.email.length < 10 || data.email.length > 125)))
            dataCorrect = false;
        if(!data.password || (data.password && data.password.length != 32))
            dataCorrect = false;

        if(!dataCorrect){
            console.log("Data incorrect");
            return res.status(400).send({message: "As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente."});
        }

        var user = await usersModel.findUserByEmail(data.email);

        if(user){
            if(user.password == data.password){
                console.log("User logged");
                let retorno = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: "3h"})
                }
                return res.status(200).send(retorno);
            }
        }

        console.log("Email or password incorrect");
        return res.status(401).send({message: "Email ou senha incorretos!"});

    }catch(err){
        console.log(err+": Error to login user");
        return res.status(500).send({message: "Erro ao tentar realizar o login do usuário no servidor"});
    }
});

// logout de usuário
app.post("/logout", checkToken, async function(req, res){
    try{
        console.log("Logout user");
        console.log(req.body);
        let data = req.body;

        let dataCorrect = true;
        if(!data || !data.id)
            dataCorrect = false;

        if(!dataCorrect){
            console.log("Data incorrect");
            return res.status(400).send({message: "As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente."});
        }

        if(data.id != jwt.decode(req.headers['authorization'].split(' ')[1]).id){
            console.log("Token invalid");
            return res.status(401).send({message: "Token inválido!"});
        }

        blackList.add(req.headers['authorization'].split(' ')[1]);
        console.log(blackList)

        console.log("User logged out");
        return res.status(200).send({message: "Logout realizado com sucesso!"});

    }catch(err){
        console.log(err+": Error to logout user");
        return res.status(500).send({message: "Erro ao tentar realizar o logout do usuário no servidor"});
    }
});

// busca de usuário
app.get("/users/:id", checkToken, async function(req, res){
    try {
        const id = req.params?.id;
        if(id == null)
            return res.status(400).send({message: "Id não informado!"});

        if(id != jwt.decode(req.headers['authorization'].split(' ')[1]).id){
            console.log("Token invalid");
            return res.status(401).send({message: "Token inválido!"});
        }

        const user = await usersModel.findUserById(id);
        if(!user)
            return res.status(401).send({message: "Usuário não encontrado!"});

        const userReturn = {
            id: user.id,
            name: user.name,
            email: user.email
        }
        return res.status(200).send(userReturn);
        
    } catch (error) {
        console.log(error+": Error to get user");
        return res.status(500).send({message: "Erro ao tentar buscar o usuário no servidor"});
    }
});

app.put("/users/:id", checkToken, async function(req, res){
    
});

app.listen(process.env.PORT, function(){
    console.log('Server started on port '+process.env.PORT);
});