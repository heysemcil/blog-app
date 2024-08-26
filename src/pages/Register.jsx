import { Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
import { useAuth } from "../context/Auth";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    password2: "",
  };

  //? Validation
  const registerSchema = object().shape({
    username: string().required("Username is required"),
    email: string().email("Invalid Email").required("Email is required"),
    password: string()
      .min(8, "Minimum 8 characters")
      .required("Password is required!"),
    password2: string()
      .oneOf([ref("password")], "Password doesn't match")
      .required("Password is required!"),
  });

  const handleSubmit = (values, actions) => {
    register(values, navigate);
  };

  return (
    <section className="flex items-center min-h-screen">
      <img
        src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
        alt="register-img"
        className="hidden lg:block w-7/12 h-screen object-cover"
      />
      <div className="w-full max-w-sm p-8 mx-auto bg-white border border-gray-200 rounded-lg shadow">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={registerSchema}
        >
          {({ errors, touched }) => (
            <Form className="space-y-5">
              <h5 className="text-3xl text-center font-bold text-gray-500">
                Sign Up
              </h5>
              <div>
                <label className="form-label" htmlFor="username">
                  Username:
                </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                  placeholder="JohnDoe"
                />
                {errors.username && touched.username && (
                  <p className="mt-1 text-red-500 text-xs">{errors.username}</p>
                )}
              </div>
              <div>
                <label className="form-label" htmlFor="email">
                  Email:
                </label>
                <Field
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="name@email.com"
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="form-label" htmlFor="password">
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="*******"
                />
                {errors.password && touched.password && (
                  <p className="mt-1 text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <div>
                <label className="form-label" htmlFor="password2">
                  Confirm Password:
                </label>
                <Field
                  type="password"
                  name="password2"
                  id="password2"
                  className="form-control"
                  placeholder="*******"
                />
                {errors.password2 && touched.password2 && (
                  <p className="mt-1 text-red-500 text-xs">
                    {errors.password2}
                  </p>
                )}
              </div>
              <div className="flex flex-col justify-center items-center space-y-4">
                <button type="submit" className="btn-primary">
                  Register
                </button>
              </div>
              <p className="text-sm font-medium text-gray-500">
                Already registered?
                <Link
                  to="/auth/login"
                  className="text-blue-700 hover:underline ml-2"
                >
                  Login to your account
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Register;
