import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaThumbsUp,
} from "react-icons/fa6";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import FooterBar from "../components/FooterBar";

export const ContactUsPage = () => {
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-2 h-screen">
        <div className="   flex  justify-center items-center pl-25 ">
          <div className="">
            <h1 className=" text-[60px] font-serif text-[#000000] mb-2">
              Get in touch
            </h1>

            <h2 className="text-[18px] font-semibold text-[#2a2725] mb-8 ">
              we'd like to hear from you!
            </h2>

            <p className="text-gray-500 text-[14px] leading-relaxed mb-25">
              if you have any quistions or suggestions or just want to <br /> say
              hi, please fill the contact form <br /> we will get back to you as
              soon as possible us
            </p>


            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=somwwear@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-600 mb-3 hover:text-[#7a4b2b] transition"
            >
              <FaEnvelope className="text-[20px]" />
              <span>somwwear@gmail.com</span>
            </a>


            <div className="flex gap-4 text-gray-600 text-[20px]">
              <FaThumbsUp className="cursor-pointer hover:text-[#7a4b2b] hover:scale-110 transition" />
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="cursor-pointer hover:text-[#7a4b2b] hover:scale-110 transition" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="cursor-pointer hover:text-[#7a4b2b] hover:scale-110 transition" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="cursor-pointer hover:text-[#7a4b2b] hover:scale-110 transition" />
              </a>
            </div>
          </div>
        </div>

        <div className="  flex justify-center items-center  ">
          <div className="p-10 max-w-[600px] flex flex-col justify-center items-center mt-12 ">
            <Formik
              initialValues={{ name: "", email: "", phone: "", message: "" }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                toast.success("Message sent successfully ");
                console.log(values);
                setSubmitting(false);
                resetForm();
              }}
              validationSchema={yup.object({
                name: yup.string().required("Required"),
                email: yup.string().email("Invalid email").required("Required"),
                phone: yup.string().required("Required"),
                message: yup.string().required("Required"),
              })}
            >
              {(formik) => (
                <Form className="">
                  <Field
                    name="name"
                    id="name"
                    placeholder="Name "
                    className="w-full h-11 px-3 mb-4 
              border-2 border-gray-400 
              rounded-md 
              focus:outline-none focus:border-[#000000] 
              transition text-sm"
                  />

                  <Field
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-full h-11 px-3 mb-4 
              border-2 border-gray-400
              rounded-md 
              focus:outline-none focus:border-[#000000] 
              transition text-sm"
                  />

                  <Field
                    name="phone"
                    id="phone"
                    placeholder="Phone  "
                    className="w-full h-11 px-3 mb-4 
              border-2 border-gray-400 
              rounded-md 
              focus:outline-none focus:border-[#000000] 
              transition text-sm"
                  />

                  <Field
                    as="textarea"
                    name="message"
                    placeholder="Message"
                    className="w-full h-30 px-3 mb-4 border-2 border-gray-400 rounded-md focus:outline-none focus:border-[#000000] transition text-sm"
                  />
                  {formik.submitCount > 0 && !formik.isValid && (
                    <div className="text-red-500 text-sm text-center mt-3">
                      Please fill all required fields correctly
                    </div>
                  )}

                  <div className="flex justify-center items-center w-full">
                    <button
                      type="submit"
                      className="bg-black w-[150px] h-[4  0px] border rounded-md text-white mt-4 cursor-pointer hover:bg-gray-800 transition "
                    >
                      send
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <FooterBar />
    </>
  );
};
export default ContactUsPage;