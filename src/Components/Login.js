
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import {AiOutlineUser} from "react-icons/ai"
// import {Form} from "react-bootstrap"
import {useForm} from "react-hook-form"
import { useState } from "react"
import swal from "sweetalert"
import axios from "axios"
export default function Login(){
    const [id,setId]=useState("admin@namasys.co")
    const [pwd,setPwd]=useState("admin123")
    const{handleSubmit,reset,register}=useForm()
    const submit=(data)=>{
        // console.log(data)
        // console.log(id,pwd)
        if(data.email!==id || data.password!==pwd){
            swal({
                title:"Email & Password does not match",
                icon:"warning"
            })
        }
        else if(data.email===id && data.password===pwd){
            swal({
                title:"Welcome Admin!",
                icon:"success"
            }).then(async()=>{
                // window.location="/tabs"
                const response= await axios.post("https://adduserdata.herokuapp.com/getJwtToken",data)
                if(response.data.token){
                    sessionStorage.setItem("token",response.data.token)
                    // alert(response.data.token)
                    var logoutTimer = setTimeout(function() { sessionStorage.clear(); }, (5*60*1000)); 
                    window.location="/tabs"
                }
            })
        }
        else{
            swal({
                title:"Oops! Something went wrong!",
                icon:"success"
            })
        }
        reset()
    }
    return(
        <div className="flex items-center h-screen justify-center bg-black">
                <Form className="border-2 p-16 rounded-lg text-white " onSubmit={handleSubmit(submit)}>
                    <div className="text-7xl mb-6 flex justify-center items-center">
                        <AiOutlineUser/>
                    </div>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label className="text-xl">Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                        <Form.Text className=" text-black">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-8" controlId="formBasicPassword">
                        <Form.Label className="text-xl">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...register("password")} />
                    </Form.Group>
                    <div className=" flex justify-center content-center">
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                    </div>
                </Form>
        </div>
    )
}