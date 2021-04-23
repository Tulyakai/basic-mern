import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function EditExercise(props) {
    const [data, setData] = useState(null)
    const [datalist, setList] = useState([])
    
    useEffect(() => {
        Axios.get('http://localhost:5000/exercises/'+props.match.params.id).then(res=>setData(res.data))
        
    }, [])

    useEffect(() => {
        Axios.get('http://localhost:5000/users/').then(res=>setList(res.data))    
    }, [])
    
    

    console.log(data)
    
    const submited =(e)=>{
        e.preventDefault()
        Axios.post('http://localhost:5000/exercises/update/'+props.match.params.id,data).then(res=>setList(res.data))    
        window.location = "/"
    }
    const change =(e)=>{
        const {name, value} = e.target
        setData(prev=>{
            return {...prev,
            [name]:value}
        })
    }
    
    let dataele = null
    if(!!datalist){
        dataele = datalist.map(val=><option key={val._id} value={val.username} >{val.username}</option>)
    }
    let element = null

    if (!!data) {
        element = (
            <form onSubmit={submited}>
            <div className="form-group">
                <p>Username:</p>
                <select name="username" onChange={change} value={data.username} >
                    {dataele}                        
                </select>


                {/* <input name="username" list="list" placeholder="Select user" onChange={change} value={data.username} required/>
                <datalist id="list">
                    {datalist}
                </datalist> */}
            </div>
            <div className="form-group">
                <p>Description:</p>
                <input name="description" type="text" onChange={change} value={data.description} required/>
            </div>
            <div className="form-group">
                <p>Duration:</p>
                <input name ="duration" type="number" onChange={change} value={data.duration} min="1" max="10" required/>
            </div>
            <div className="form-group">
            <p>Date:{data.date}</p>
                <input name ="date" type="date" onChange={change} value={String(data.date).slice(0,10)} required/>
            </div>
            <div className="form-group">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>)
    }
    return (
        <div>
            <h1>Edit exercise</h1>
            {element}
        </div>
    )
}

