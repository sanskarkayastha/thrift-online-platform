import axios from "axios"

export const getAllUsers = async ()=>{
    let data = await axios.get("http://localhost:4000/users").data
    return data
}

export const checkIfEmailExists = async (email) =>{
    if(email.trim() === ''){
        return false
    }else{
        let data = await (await axios.get(`http://localhost:4000/users/?email=${email}`)).data
        if(data.length > 0){
            return true
        }else{
            return false
        }
    }
}

export const addUser = async (user)=>{
    let data = await axios.post("http://localhost:4000/users",user)
    if(data){
        return true
    }else{
        return false
    }
}

export const updateUserListings = async (id,listings)=>{
    let data = await axios.patch(`http://localhost:4000/users,${id}`,{"listings":listings})
    return data
}

export const getUserById = async (id)=>{
    let data = await axios.get(`http://localhost:4000/users,${id}`)
    return data
}