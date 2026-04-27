
import {  Field , ErrorMessage } from "formik";

interface CustomFieldProps {
  name: string;
  type: string;
  id: string;
  placeholder: string;
}

const CustomInput = (props: CustomFieldProps) => {
  return (
    <div>
      <label htmlFor={props.id} 
      className="text-sm font-bold text-[#999] mb-2 block tracking-[1px]"
      >{props.name}</label>

      <Field
        name={props.name}
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        className="w-full p-3 border border-[#ddd] rounded text-base outline-none box-border"
      />
        <ErrorMessage
        name={props.name}
        component="div"
        className="text-red-500 text-xs mt-1"
      />
    </div>
  );
};

export default CustomInput;
