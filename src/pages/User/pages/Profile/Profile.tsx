import Input from "../../../../components/Input";

const Profile = () => {
  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Hồ sơ của tôi
        </h1>
        <div className="mt-1 text-sm text-gray-700">
          Quản lý thông tin hồ sơ bảo mật tài khoản
        </div>
        <div className="mt-8 flex flex-col-reverse md:flex-row md:items-start">
          <form className="mt-6 flex-grow md:mt-0 md:pr-12">
            <div className="flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Email</div>
              <div className="sm:w-[80%] sm:pl-5">
                <div className="pt-3 text-gray-700">pha************88@gmail.com</div>
              </div>
            </div>
            <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Tên</div>
              <div className="sm:w-[80%] sm:pl-5">
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'/>
              </div>
            </div>
            <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Số điện thoại</div>
              <div className="sm:w-[80%] sm:pl-5">
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'/>
              </div>
            </div>
            <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Địa chỉ</div>
              <div className="sm:w-[80%] sm:pl-5">
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'/>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap">
              <div className="truncate w-[20%] pt-3 text-right capitalize">Ngày sinh</div>
              <div className='pl-5 w-[80%]'>
                <div className="flex justify-between">
                  <select className="h-10 w-[32%] rounded-sm border-black/10 px-3">
                    <option disabled={true}>Ngày</option>
                  </select>
                  <select className="h-10 w-[32%] rounded-sm border-black/10 px-3">
                    <option disabled={true}>Tháng</option>
                  </select>
                  <select className="h-10 w-[32%] rounded-sm border-black/10 px-3">
                    <option disabled={true}>Năm</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200">
            <div className="flex flex-col items-center">
              <div className="my-5 h-24 w-24">
                <img className='w-full h-full rounded-full object-cover'
                     src='https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn' alt='anh'/>
                <input className='hidden' type='file' accept='.jpg, .jpeg, .png'/>
                <button
                  className='mt-2 flex h-10 items-center justify-end rounded-sm border bg-white px-4 text-sm text-gray-600 shadow-sm'>Chọn ảnh
                </button>
              </div>
              <div className="mt-8 text-gray-400">
                <div>Dung lượng file tối đa 1 MB</div>
                <div>Định dạng: .JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;