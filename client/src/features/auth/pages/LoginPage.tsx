
import { useState } from "react";
import { ErrorMessage, Formik } from "formik";
import { Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import axios from "axios";

interface LoginValues {
  email: string;
  password: string;
}
const LoginPage= () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate(); 

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const handleLogin =async (values:LoginValues)=>{
   
    const result = await axios.post("http://localhost:3000/users/login" ,values)
    const {token, safeUser} = result.data.data
 
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(safeUser));

      if (safeUser.role ==="admin") {
        navigate("/admin");  
      } else {
        navigate("/products");
  }
}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans bg-white">
      <div className="w-full max-w-[360px] p-5">
        <div className="text-center mb-10">
          <h1 className="text-[50px] font-black tracking-[8px] leading-tight uppercase text-black">
            
            Welcome
            <br />
            Back
          </h1>
          <p className="text-[#999] text-[15px]">
            Sign in to your Somewear account
          </p>
        </div>
        <div>
          <Formik<LoginValues>
            initialValues={initialValues}
            onSubmit={handleLogin}
            validationSchema={Yup.object({
              email: Yup.string().email("invalid email").required("Required"),
              password: Yup.string()
                .min(8, "password must be at least 8 characters")
                .required("Required"),
            })}
          >
            {(formik) => (
              <Form>
                <CustomInput name="email" type="email" placeholder="you@email.com" id="email" />


                <label
                  htmlFor="password"
                  className="text-sm font-bold text-[#999] mb-2 block tracking-[1px]"
                >
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    id="password"
                    className={`w-full p-3 border border-[#ddd] rounded text-xs outline-none box-border
                  ${formik.errors.password && formik.touched.password ? "mb-1" : "mb-5"}`}
                  />

                  <span
                    onClick={()=>togglePassword()}
                    className="absolute right-[10px] top-[12px] cursor-pointer text-sm text-[#555]"
                  >
                    {showPassword ? "hide" : "show"}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-[14px] mb-2"
                />
                <button
                  type="submit"
                  disabled={
                    !(formik.isValid && formik.dirty) || formik.isSubmitting
                  }
                  className={` w-full p-3 rounded text-base transition ${
                    formik.isValid && formik.dirty && !formik.isSubmitting
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-300 text-gray-500 "
                  } `}
                >
                  LOG IN
                </button>
                <p className="text-center mt-[10px] text-sm text-[#999]">
                  Don't have an account?
                  <Link to="/signup" className="text-black font-bold underline">
                    Sign Up
                  </Link>
                </p>
                
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
