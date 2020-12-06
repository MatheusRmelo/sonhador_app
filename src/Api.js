const BASEAPI = 'http://192.168.2.9:5000';

const apiFetchPost = async (endpoint, body) => {
    const res = await fetch(BASEAPI+endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type":'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();

    // if(json.notallowed){
    //     window.location.href = '/signin';
    //     return;
    // }

    return json;
}
const apiFetchGet = async (endpoint, body = []) => {
    // if(!body.token){
    //     let token = Cookies.get('token');
    //     if(token){
    //         body.token = token;
    //     }
    // }

    const res = await fetch(`${BASEAPI+endpoint}`);
    const json = await res.json();

    // if(json.notallowed){
    //     window.location.href = '/signin';
    //     return;
    // }

    return json;
}

const api = {
    saveBook: async (book)=>{
        const json = await apiFetchPost(
            '/book/add',
            book
        );  
        return json;
    },
    ping: async ()=>{
        const json = await apiFetchGet('/ping');

        return json;
    }
}


export default ()=>api;