
import { Formik, Form,  } from "formik";
import * as Yup from "yup";
import CustomInput from '../components/CustomInput';

interface SignupValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {

  const initialValues: SignupValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans bg-white ">
      <div className="w-full max-w-[380px]  p-6 mx-auto mb-15">
        <div className="text-center mb-4">
          <h1 className="text-[50px] font-black tracking-[4px] leading-tight uppercase text-black">
            SIGN UP
            <br />
            NOW
          </h1>
          <p className="text-[#999] text-[15px]">
            Create your Somewear account
          </p>
        </div>

        <Formik<SignupValues>
          initialValues={initialValues}
          onSubmit={(v: SignupValues) => console.log(v)}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, "name must be at least 2 characters")
              .required("Required"),
            email: Yup.string().email("invalid email").required("Required"),
            phone: Yup.string()
              .matches(/^01[0125][0-9]{8}$/, "invalid phone number")
              .required("Required"),
            password: Yup.string()
              .min(8, "password must be at least 8 characters")
              .required("Required"),

            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Required"),
          })}
        >
          {(formik) => (
            <Form className="space-y-2">
              
              <CustomInput name="name" type="text" placeholder="ahmed salah" id="name"/>
              <CustomInput name="email" type="email" placeholder="you@email.com" id="email"/>
              <CustomInput name="phone" type="text" placeholder="0123456789" id="phone"/>
              <CustomInput name="password" type="password" placeholder="********" id="password"/>
              <CustomInput name="confirmPassword" type="password" placeholder="********" id="confirm-password"/>
              <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                className={` w-full p-3 rounded text-base transition ${
                  formik.isValid && formik.dirty
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 "  
                } `}
              >
                Sign up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
