import { blacklist } from '../helpers/blacklist.js';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export let blackList = new blacklist();

export function checkToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token)
        return res.status(401).send({message: "Token não informado!"});

    if(blackList.isBlacklisted(token)){
        return res.status(401).send({message: "Token inválido!"});
    }
        
    try{
        jwt.verify(token, process.env.SECRET);
        next();
    } catch(err){
        return res.status(400).send({message: "Erro: Token inválido!"});
    }
}