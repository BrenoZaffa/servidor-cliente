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