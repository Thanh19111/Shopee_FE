import type {RegisterOptions, UseFormRegister} from "react-hook-form";
import type {InputHTMLAttributes} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string,
  classNameInput?: string,
  classNameError?: string,
  register?: UseFormRegister<any>,
  rules?: RegisterOptions | undefined
}
function Input({type, errorMessage, className, placeholder, register, rules, name, classNameInput = 'p-3 w-full outline-non border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm', classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm'}: Props) {
  const registerResult = register && name ? register(name, rules): {}
  return (
    <div className={className}>
      <input
        type={type}
        className= {classNameInput}
        placeholder={placeholder}
        {...registerResult}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  );
}

export default Input;