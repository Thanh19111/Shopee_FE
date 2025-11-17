import {type InputHTMLAttributes, useState} from "react";
import {type FieldPath, type FieldValues, useController, type UseControllerProps} from "react-hook-form";


export type InputNumberProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  classNameInput?: string,
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement>
  & UseControllerProps<TFieldValues, TName>

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputNumberProps<TFieldValues, TName>) {
  const {field, fieldState} = useController(props);
  const [localValue, setLocalValue] = useState<string>(field.value);
  const {
    type,
    onChange,
    value = '',
    className,
    classNameInput = 'p-3 w-full outline-non border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    ...rest
  } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFormInput = event.target.value;
    const numberCondition = type == 'number' && ((/^\d+$/.test(valueFormInput)) || valueFormInput === '');

    if(numberCondition || type !== 'number') {
      field.onChange(event)
      onChange && onChange(event);
      setLocalValue(valueFormInput);
    }

  }
  return (
    <div className={className}>
      <input
        {...rest} {...field}
        value={value || localValue}
        onChange={handleChange}
        className= {classNameInput}
      />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2;