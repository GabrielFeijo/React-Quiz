import axios from "axios";

const scoreFetch = axios.create({
    baseURL: 'https://nao-pode-vazar.com.br/gg12',
    headers:{
        'Content-Type': 'application/json'
    }
})

export default scoreFetch;