import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import './home.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Home() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
        const result = await axios.get("https://crud-backend-gamma.vercel.app/api/get");
    setData(result.data);
    console.log(result.data)
    } catch (error) {
        console.log("Error : "+ error)
    }
    
  };

  const deleteUser = (id)=>{

    if(window.confirm("Are you sure you want to delete this user")){

        axios.post(`https://crud-backend-gamma.vercel.app/api/delete/${id}`);
        toast.success("User deleted successfully");
        setTimeout(()=>{
            loadData();
        },1000);

    }

  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Home</h2>
      <Container className="cont">
        <Link to={'/addUser'}>
        <Button style={{float : "right", margin : '2%'}} className="btn btn-primary">Add new user</Button>
        </Link>
    
      <Table striped bordered hover style={{textAlign:"center"}} >
      <thead className='table-dark'>
        <tr >
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody variant="dark">

            {
                data.map((item,index)=>{
                    return(
                        <tr key={item.id}  >

                            <th>{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td className="d-flex justify-content-around"><Link to={`/view/${item.id}`}>
                                 <Button className="button" variant="secondary">View</Button>
                                 </Link>
                                 <Link to={`/update/${item.id}`}>
                            
                            <Button variant="secondary" className="button bg-success">Update</Button>
                            </Link>
                            <Button variant="secondary" className="button bg-danger" onClick={()=>{
                                deleteUser(item.id);
                            }} >Delete</Button>
                            </td>
                        </tr>
                    )
                })
            }


      </tbody>
    </Table>

    </Container>
    </div>
  );
}

export default Home;
