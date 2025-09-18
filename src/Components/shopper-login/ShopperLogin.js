import { Formik,Field,Form} from "formik";

import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export function ShopperLogin(){
    const navigate= useNavigate();
    const [cookie,setCookie,removeCookie]=useCookies();
    return(
        
        <div className="container-fluid">
            <h2>User Login</h2>
            <Formik
            
             initialValues={
            {
                UserId:"",
                Password:""
            }
           }

            onSubmit={
                (values)=>{
                    axios({
                        method:"get",
                        url:"http://127.0.0.1:8000/users"
                        
                    }).then(response=>{

                        for(var user of response.data)
                        {
                            if(user.UserId==values.UserId && user.Password==values.Password)
                            {
                                setCookie("userid",values.UserId);
                                navigate("/home");
                                break;
                            } else{
                                navigate("/invalid");
                                
                            }

                        }

                    })
                }

            }
        


            > 
            
            {
                    <Form>
                        <dl>
                            <dt>User Id</dt>
                            <dd>< Field type="UserId" name="UserId"/></dd>
                            <dt>Password</dt>
                            <dd>< Field type="Password" name="Password"/></dd>

                        </dl>
                        <button className="btn btn-success">Login</button>
                        <div>
                       <Link to="/register">New user?Register</Link>
                        </div>
                        </Form>
                    

                }

            </Formik>            

        </div>
    )
}