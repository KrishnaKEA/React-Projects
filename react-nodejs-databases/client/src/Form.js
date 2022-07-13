import React,{useState,useEffect} from 'react'
import axios from "axios"

export default function Form() {
    const [name,setName] = useState("");
    const [position,setPosition] = useState("");
    const [department,setDepartment] =useState("");
    const [employeelist, setEmployeelist] = useState([]);

    const createRecord= ()=>{
        axios.post("http://localhost:3001/create",{
            name:name,
            position:position,
            department:department
        }).then(()=>{
            
                console.log("success!!");
            
        })
    }

    const showRecords = ()=> {
        axios.get("http://localhost:3001/show").then((response)=>{
           setEmployeelist(response.data);
            
            })
    }


    useEffect(()=>{
        axios.get("http://localhost:3001/")
        
        .then((data)=>{
            console.log(data);
        })

    },[])


    const mystyle = {
        textAlign:"center",
        display:"flex",
        flexDirection:"column",
        fontFamily: "Arial",
        marginBottom:"10px"
        
      }
      const inputStyle = {
        margin:"auto",
        width:"200px",
        fontWeight:"bold",
        textAlign:"center"

      }
  return (
    <>
    <h1 style={{textAlign:"center"}}>Employee record:</h1>
    <div style={mystyle}>
    <label>Name </label> <input style={inputStyle} type="text" onChange={(event)=>{ setName(event.target.value)}} placeholder='name'/>
    <label>Position </label> <input style={inputStyle} type="text"onChange={(event)=>{ setPosition(event.target.value)}} placeholder='position'/>
    <label>Department </label> <input style={inputStyle} type="text" onChange={(event)=>{ setDepartment(event.target.value)}}placeholder='department'/>
    <br />
    <input style={inputStyle}  onClick={createRecord} type="submit" value="save" />
    </div>
    <hr />
    <div>
    <input style={inputStyle} onClick={showRecords} type="submit" value="show" />
    { employeelist.map((val,key)=>{
        return <div style={{border:"1px solid red",textAlign:"center"}}>
            <h1>Name: {val.name}</h1>
            <h2>Position: {val.position}</h2>
            <h3>Department: {val.department}</h3>
            <button>Edit</button>
            <button>delete</button>
        </div>
    })}



    </div>
    
    </>
    )
}
