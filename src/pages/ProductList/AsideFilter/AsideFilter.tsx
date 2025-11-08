import {Link} from "react-router-dom";
import path from "../../../constants/paths.ts";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

function AsideFilter() {
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold uppercase'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"/>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'/>
      <ul className='text-left'>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 font-semibold'>
            <svg viewBox='0 0 4 7' className='fill-orange h-2 w-2 absolute top-1 left-[-10px]'>
              <polygon points='4 3.5 0 0 0 7'/>
            </svg>
            Thời trang nam
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 text-orange font-semibold'>
            <svg viewBox='0 0 4 7' className='fill-orange h-2 w-2 absolute top-1 left-[-10px]'>
              <polygon points='4 3.5 0 0 0 7'/>
            </svg>
            Thời trang nam
          </Link>
        </li>
      </ul>
      <Link to={path.home} className='flex items-center font-bold mt-4 uppercase'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"/>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'/>
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2'>
          <div className="flex items-start">
            <Input type='text' className='grow' name='from' placeholder='đ Từ' classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm' />
            <div className="mx-2 mt-2 shrink-0">-</div>
            <Input type='text' className='grow' name='from' placeholder='đ Đến' classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm' />
          </div>
          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-1[1px] my-4' />
      <div className="text-sm">Đánh giá</div>
      <ul className="my-3">
        <li className="py-1 pl-2">
          <Link to='' className='flex items-center text-sm'>
            {Array(5).fill(0).map((_, i) => (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" key={i} className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
              </svg>
            ))}
            <span>Trở lên</span>
          </Link>
        </li>
      </ul>
      <div className="bg-gray-300 h-[1px] my-4" />
      <Button className='w-full py-2 px-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>Xóa tất cả</Button>
    </div>
  );
}

export default AsideFilter;