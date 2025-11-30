import {useEffect, useState} from "react";
import {range} from "lodash";

interface Props {
  onChange?: (value: Date) => void;
  value?: Date;
  errorMessage?: string;
}

const DateSelect = ({value, onChange, errorMessage} : Props) => {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  });

  useEffect(() => {
    if(value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {value: valueFromSelect, name} = event.target;
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate);
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date));
  }

  return (
    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
      <div className="truncate w-[20%] pt-3 sm:text-right capitalize">Ngày sinh</div>
      <div className='sm:pl-5 w-[80%]'>
        <div className="flex justify-between">
          <select
            value={value?.getDate() || date.date}
            onChange={handleChange}
            name='date'
            className="h-10 w-[32%] rounded-sm border-black/10 border px-3 hover:border-orange cursor-pointer">
            <option disabled={true}>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            value={value?.getMonth() || date.month}
            name='month'
            className="h-10 w-[32%] rounded-sm border-black/10 px-3 border hover:border-orange cursor-pointer">
            <option disabled={true}>Tháng</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            value={value?.getFullYear() || date.year}
            name='year'
            className="h-10 w-[32%] rounded-sm border-black/10 px-3 border hover:border-orange cursor-pointer">
            <option disabled={true}>Năm</option>
            {range(1990, 2024).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
      </div>
    </div>
  );
};

export default DateSelect;