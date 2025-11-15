import {forwardRef, type InputHTMLAttributes} from "react";

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string,
  classNameInput?: string,
  classNameError?: string,
}
const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>( function InputNumberInner(
  {errorMessage,
    className,
    classNameInput = 'p-3 w-full outline-non border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    if(((/^\d+$/.test(value)) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div ref={ref} className={className}>
      <input
        onChange={handleChange}
        className= {classNameInput}
        {...rest}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )})

export default InputNumber;