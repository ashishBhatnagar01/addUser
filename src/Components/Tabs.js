import { Tab } from "@headlessui/react";
import {Form} from "react-bootstrap"
import {useForm} from "react-hook-form"
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import {AiOutlineUserAdd} from "react-icons/ai"
import { Table } from "react-bootstrap";
import axios from "axios"
import swal from "sweetalert"
import { useEffect, useState } from "react";
import {MdOutlineDelete} from "react-icons/md"

export default function Tabs() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const [data,setData]=useState([])
  useEffect(async()=>{
    const response=await axios.get("https://adduserdata.herokuapp.com/getUsers");
    setData(response.data.users)
  })
    const {handleSubmit,reset,register,formState:{errors}}=useForm()
    const submitData = async(data)=>{
        // console.log(data)
        if(!sessionStorage.getItem("token")){
          swal({
            title:"Validation token Expired!, Please login Again!",
            icon:"warning"
          }).then(()=>{
            window.location="/"
          })
        }
        else{
          const response = await axios.post("https://adduserdata.herokuapp.com/addUser",data)
          if(response.data.message){
            swal({
              title:`${response.data.message}`,
              icon:`${response.data.icon}`
            })
          }
          reset()
      }
      reset()
    }
    async function deleteUser(id){
      if(!sessionStorage.getItem("token")){
        swal({
          title:"Validation token Expired!, Please login Again!",
          icon:"warning"
        }).then(()=>{
          window.location="/"
        })
      }
      else{
        const response = await axios.post("https://adduserdata.herokuapp.com/deleteUser",{id:id})
      if(response.data.delete){
        swal({
          title:"User Deleted Successfully",
          icon:"success"
        })
      }
      }
    }
  return (
    <div className="bg-black h-screen">
      <Tab.Group>
        <div className="w-1/4 mx-auto p-6">
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400  ring-opacity-60",
                  selected
                    ? "bg-white shadow"
                    : "text-white hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Add User
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400  ring-opacity-60",
                  selected
                    ? "bg-white shadow"
                    : "text-white hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Admin
            </Tab>
          </Tab.List>
        </div>
        <Tab.Panels  className="flex justify-center items-center h-2/3 mt-16">
          <Tab.Panel>
          <Form className="border-2 p-8 rounded-lg text-white " onSubmit={handleSubmit(submitData)}>
                    <div className="text-7xl mb-6 flex justify-center items-center">
                        <AiOutlineUserAdd/>
                    </div>
                    <Row className="mb-2">
                        <Col>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label className="text-xl">Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" {...register("userName",{required:true})} />
                                {errors.name && errors.name.type === "required" && <span className="text-white">This is required</span>}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label className="text-xl">Contact No.</Form.Label>
                                <Form.Control type="number" placeholder="Enter contact No." {...register("contactNo",{required:true,maxLength:10})} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label className="text-xl">Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" {...register("email",{required:true})} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label className="text-xl">Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter address" {...register("address")} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className=" flex justify-center content-center mt-4 mb-2">
                        <Button variant="primary" type="submit" >
                            Add User
                        </Button>
                    </div>
                </Form>
          </Tab.Panel>
          <Tab.Panel>
          <Table striped bordered hover variant="dark" style={{width:"60vw"}} className="p-4 text-center">
            <thead>
                <tr>
                <th>Username</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
              {data.map((user)=>(
                <tr>
                <td>{user.userName}</td>
                <td>{user.contactNo}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td className="text-3xl text-white ml-3 " ><MdOutlineDelete className=" bg-red-500 rounded-xl cursor-pointer text-center " onClick={()=>deleteUser(user._id)} /></td>
                </tr>
               ))}
            </tbody>
            </Table>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
