var host = import.meta.env.VITE_HOST;

export const cadastarUser = async (user) => {
    try {
        const response = await fetch(host+'/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

export const logarUser = async (user) => {
    try {
        const response = await fetch(host+'/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}