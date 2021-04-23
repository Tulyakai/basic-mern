import React, {useState, useEffect} from 'react'
import Axios from 'axios'
export default function CreateExercise() {
    const [data, setData] = useState({
        username: '',
        description: '',
        duration: 0,
        date: ''
    })
    const [userList, setUserList] = useState([])
    const [list, setList] = useState([])

    const submited = (e)=>{
        e.preventDefault()
        
        Axios.post('http://localhost:5000/exercises/add', data)
            .then(res=>console.log(res.data))
            .catch(e=>alert(e))
        window.location.href ='/'

    }

    const change=(e)=>{
        const {name ,value} = e.target
        setData(prev=>{
            return {
                ...prev, 
                [name]:value
            }
        })
    }


    useEffect(() => {
        Axios.get('http://localhost:5000/users/').then(res=>{
            setUserList(res.data)
        })    
    }, [])

    let datalist = null
    if(!!userList){
        let final = [{ _id:"999", username:"--select user--"},...userList]
        datalist = final.map(val=><option key={val._id} value={val.username} >{val.username}</option>)
    }

    useEffect(() => {
        Axios.get('http://localhost:5000/exercises/').then(res=>{
            setList(res.data)
        })    
    }, [])

    let element = null
    
    if (!!list) {
        element = list.map(val=>{
            return (
                <tr>
                    <td>{val.username}</td>
                    <td>{val.description}</td>
                    <td>{val.duration}</td>
                    <td>{val.date}</td>
                </tr>
            )
        })
     
    }
    return (
        <div>
            <h1>Create exercise</h1>
            <form onSubmit={submited}>
                <div className="form-group">
                    <p>Username:</p>
                    <select name="username" onChange={change} value={data.username} >
                        {datalist}                        
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
                    <p>Date:</p>
                    <input name ="date" type="date" onChange={change} value={data.date} required/>
                </div>
                <div className="form-group">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
            <h3>List of exercises:</h3>
            <table>
                <th>
                    <td>Username</td>
                    <td>Description</td>
                    <td>Duration</td>
                    <td>Date</td>
                </th>
                <tr>
                    {element}
                </tr>
            </table>
        </div>
    )
}
