import { ErrorMessage, Field, Formik, Form } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";




export function ShopperRegister() {
    const navigate= useNavigate();
    return (
          <div className="container-fluid">
           
                <h2>Register User</h2>
            <Formik

                initialValues={
                    {
                        UserId: "",
                        UserName: "",
                        Password: "",
                        Email: "",
                        Age: 0,
                        Mobile: ""
                    }
                }

                validationSchema={
                    yup.object({
                        UserId: yup.string().required("UserId Required"),
                        UserName: yup.string().required("UserName Required"),
                        Password: yup.string().required("Password Required").matches(/(?=.*[A-Z])\w{4,15}/, "Password 4 to 15 with atleast one UpperCase letter"),
                        Email: yup.string().required("Email Required").email("Invalid Email"),
                        Age: yup.number().required("Age Required"),
                        Mobile: yup.string().required("Mobile Required").matches(/\+91\d{10}/, "Mobile invalid +91 and 10 digits")
                    })

                }

                onSubmit={
                    (values) => {
                        axios({
                            method: "post",
                            url: "http://127.0.0.1:8000/registeruser",
                            data: values

                        }).then(() => {
                            alert("Registerd Successfully..");
                            navigate("/login");

                        })
                    }
                }


            >
                {

                    <Form>
                        <dl>
                            <dt>UserId</dt>
                            <dd>< Field type="UserId" name="UserId" /></dd>
                            <dd className="text-danger"><ErrorMessage name="UserId" /></dd>
                            <dt>UserName</dt>
                            <dd>< Field type="UserName" name="UserName" /></dd>
                            <dd className="text-danger"><ErrorMessage name="UserName" /></dd>
                            <dt>Password</dt>
                            <dd>< Field type="Password" name="Password" /></dd>
                            <dd className="text-danger"><ErrorMessage name="Password" /></dd>
                            <dt>Email</dt>
                            <dd>< Field type="Email" name="Email" /></dd>
                            <dd className="text-danger"><ErrorMessage name="Email" /></dd>
                            <dt>Age</dt>
                            <dd>< Field type="Age" name="Age" /></dd>
                            <dd className="text-danger"><ErrorMessage name="Age" /></dd>
                            <dt>Mobile</dt>
                            <dd>< Field type="Mobile" name="Mobile" /></dd>
                            <dd className="text-danger"><ErrorMessage name="Mobile" /></dd>
                        </dl>
                        <button className="btn btn-primary">Register</button>
                        <div>
                            <Link to="/login">Existeing User</Link>
                        </div>
                         </Form>

                }



            </Formik>
            

        </div>
    )
}
