import React ,{useState, useEffect} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

export default function ExerciseList() {
    const [exercises, setExercises] = useState([])

    let url = "http://localhost:5000/exercises/"
    useEffect(() => {
        Axios.get(url).then(res=>{
            return setExercises(prev=>{
                return [...prev,...res.data]
            })
        })
    }, [])

    const del = (val) =>{
        Axios.delete(url+val._id).then(res=>console.log(res.data))
        window.location.reload()
    }

    let element = null
    if(!!exercises){
        element = exercises.map(val=>{
            return (
                <tr key={val._id}>
                    <td>{val.username}</td>
                    <td>{val.description}</td>
                    <td>{val.duration}</td>
                    <td>{val.date}</td>
                    <td><Link to={"/edit/"+val._id}>Edit</Link> | <a href="#" onClick={()=>del(val)}>Delete</a></td>
                </tr>
            )
        })    }
    
    return (
        <div>
            <h3>All exercises:</h3>
            <table>
                <th>
                    <td>Username</td>
                    <td>Description</td>
                    <td>Duration</td>
                    <td>Date</td>
                    <td>Action</td>

                </th>
                <tr>
                    {element}
                </tr>
            </table>
        </div>
        
    )
}
