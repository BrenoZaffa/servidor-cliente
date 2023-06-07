var host = import.meta.env.VITE_HOST;
import axios from 'axios';

export const cadastarUser = async (user) => {
    try {
        let res = await axios.post(host+'/users', user)
        return res
    } catch (error) {
        console.log("cadastro: "+ error);
        return error.response
    }
};

export const logarUser = async (user) => {
    try {
        let res = await axios.post(host+'/login', user)
        return res
    } catch (error) {
        console.log("login: "+ error);
        return error.response
    }
}

export const atualizarUser = async (id, user) => {
    try {
        const token = sessionStorage.getItem('token')
        let res = await axios.put(host+'/users/'+id, user, { headers: { Authorization: `Bearer ${token}` } })
        return res
    } catch (error) {
        console.log("atualizar user: "+ error);
        return error.response
    }
};

export const deslogarUser = async (userId) => {
    try {
        const token = sessionStorage.getItem('token')
        let res = await axios.post(host+'/logout', {id: userId}, { headers: { Authorization: `Bearer ${token}` } })
        return res
    } catch (error) {
        console.log("logout: "+ error);
        return error.response
    }
}

export const getOccurrences = async () => {
    try {
        let res = await axios.get(host+'/occurrences')
        return res
    } catch (error) {
        console.log("get occurrences: "+ error);
        return error.response
    }
}

export const getUser = async (id) => {
    try {
        let token = sessionStorage.getItem('token')
        let res = await axios.get(host+'/users/'+id, { headers: { Authorization: `Bearer ${token}` } })
        return res
    } catch (error) {
        console.log("get user: "+ error);
        return error.response
    }
};

export const insertOcorrencia = async (ocorrencia) => {
    try {
        const token = sessionStorage.getItem('token')
        let res = await axios.post(host+'/occurrences', ocorrencia, { headers: { Authorization: `Bearer ${token}` } })
        return res
    } catch (error) {
        console.log("inserir ocorrencia: "+ error);
        return error.response
    }
};