import axios from "axios";

export const getClient = async(datos) => {
    console.log("Voy a imprimir el token aca")
    console.log(datos)
    return await axios.post("http://127.0.0.1:4000/api/client",datos, {withCredentials: true})
}

export const registerUser = async(user) => {
    return await axios.post("http://127.0.0.1:4000/api/signup",user)
}

export const loginUser = async(user) => {
    return await axios.post("http://127.0.0.1:4000/api/signin",user,{withCredentials: true})
}