import React from 'react'
import axios from 'axios'
import { useHistory ,useState, useEffect } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card';
import "./addUser.css"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const initialState = {
    name : "",
    email : "",
    contact : "",
}

function AddUser() {

    const [state, setState] = useState(initialState);
    

    let navigate = useNavigate();

    const handleInputChange = (e)=>{

        console.log(e.target);
        const {name,value} = e.target;

        setState({...state,[name] : value})
        console.log(state)

    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(state.name,state.email,state.contact)
        console.log("good")
        if(!state.name || !state.email || !state.contact){
            toast.error("Please provide all fields");
        }
        else{

            axios.post("https://crud-backend-gamma.vercel.app/api/insert",{
                name : state.name,
                email : state.email,
                contact : state.contact
            }).then(()=>{
                setState({name : "" , email : "" , contact : ""})
               

            }).catch((err)=>{
                console.log(err)
            })
            toast.success("Contact added successfully")
            setTimeout(()=>{
                navigate('/');
            },1000)

        }


    }


  return (
    <div>

        <Container >
     
        <h2 style={{textAlign : "center", padding : "1% "}}> Add User</h2>
        <Card  className='card'>
    <form>




        <p htmlFor="name" className='center'>Name</p>
        <Form.Control
            className='size '
          id='name'
          name='name'
          placeholder='Name'
          
          onChange={handleInputChange}
        />
<p htmlFor="name" className='center'>Email</p>
<Form.Control
className='size '
          id='email'
          name='email'
          placeholder='Email'
         
          onChange={handleInputChange}
        />
<p htmlFor="name" className='center'>Contact</p>
<Form.Control
className='size '
          id='contact'
          name='contact'
          placeholder='Contact'
          
          onChange={handleInputChange}
        />
         <Button variant="success" className='button1'  onClick={handleSubmit}>Insert</Button>
         <Button variant="secondary" className='button1'>Go Back</Button>
    </form>
    </Card>
    </Container>
    </div>


  )
}

export default AddUser