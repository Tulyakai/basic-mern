import React, { useState, useEffect } from 'react'
import Axios from 'axios';

export default function CreateUser() {
    const [username, setuserInput] = useState('')
    const [userList, setuserList] = useState([])

    const submited = (e) =>{
        e.preventDefault()
        Axios.post('http://localhost:5000/users/add',{username})
            .then(res=> console.log(res.data))
            .catch(e=>alert(e))
        window.location.reload()
    }
    let url = "http://localhost:5000/users/"
    useEffect(() => {
        Axios.get(url).then(res=>{
            return setuserList(prev=>{
                return [...prev,...res.data]
            })
        })
    }, [])

    const del = (val)=>{
        Axios.delete(url+val._id).then(res=>console.log(res.data))
        .catch(e=>console.log(e))
        window.location.reload()
    }

    let element = null
    if(!!userList){
        element = userList.map((val, key)=>
        <>
        <li key={val._id}>{val.username}</li>
        <a href="#" onClick={()=>del(val)}>Delete</a>
        </>)
    }

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={submited}>
                <div className="form-group">
                    <h3 for="username">Username:</h3>
                </div>
                <div className="form-group">
                    <input type="text" onChange={(e)=>setuserInput(e.target.value)} value={username} required/>
                </div>
                <div className="form-group">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
            <h3>List of user:</h3>
            <ul>
                {element}
            </ul>

        </div>
    )
}
