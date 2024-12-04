import { Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { object , string} from "yup";
import { useAuth } from "../context/Auth";

export default function Login() {
const initialValues = {email:"", password:""}
const {login} = useAuth()
const navigate = useNavigate();
// validation 
const loginSchema = object().shape({
  email: string().email("Invalid Email").required('Email is required!'),
  password:string().min(5, "Min 5 characters").required('Password is required!')
})

const handleSubmit = (values, actions)=>{
  login(values, navigate)
}


  return (
    <section className="flex items-center min-h-screen">
      <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
      className="hidden lg:block w-7/12 h-screen object-cover"
      alt="login page image"
      />
      <div className="w-full max-w-sm p-8 mx-auto bg-white border border-gray-200 rounded-lg shadow">
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={loginSchema}> 

          {({errors, touched})=>(
            <Form className="space-y-5">
                <h5 className="text-3xl text-center font-bold text-gray-500">Login</h5>

                <div>
                  <label htmlFor="email" className="form-label">Email: </label>
                  <Field type="text" name="email" id="email" className="form-control" placeholder="name@email.com"/>
                  {errors.email && touched.email &&(
                    <p className="mt-1 text-red-500 text-xs"> {errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="password" className="form-label">Password: </label>
                  <Field type="password" name="password" id="password" className="form-control" placeholder="******"/>
                  {errors.password && touched.password &&(
                    <p className="mt-1 text-red-500 text-xs"> {errors.password}</p>
                  )}
                </div>

                <div className="flex flex-col justify-center items-center space-y-4">
                  <button type="submit" className="btn-primary">Login to your account</button>
                </div>
                <p className="text-sm font-medium text-gray-500">Not registered? 
                  <Link to="/auth/register" className="text-blue-700 hover:underline"> Create an account</Link>

                </p>

            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
