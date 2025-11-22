import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import {useMutation, useQuery} from "@tanstack/react-query";
import {userApi} from "../../../../apis/user.api.ts";
import {userSchema, type UserSchema} from "../../../../utils/rules.ts";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import InputNumber from "../../../../components/InputNumber";
import {useEffect} from "react";
import DateSelect from "../../components/DateSelect";

type FormData = Pick<UserSchema, 'name' | 'address' | 'date_of_birth' | 'phone' | 'avatar'>
const profileSchema = userSchema.pick(['name', 'address', 'date_of_birth', 'phone', 'avatar'])
const Profile = () => {
  const {register, control, formState: {errors}, handleSubmit, setValue, watch, setError} = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  });

  const {data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  });

  const profile = profileData?.data.data;

  useEffect(() => {
    if(profile){
      setValue('name', profile.name);
      setValue('phone', profile.phone);
      setValue('address', profile.name);
      setValue('avatar', profile.avatar);
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1));
    }
  }, [profile])

  const updateProfileMutation = useMutation(userApi.updateProfile)

  const onSubmit = handleSubmit(async (data) => {
    await updateProfileMutation.mutateAsync({

    })
  })
  
  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Hồ sơ của tôi
        </h1>
        <div className="mt-1 text-sm text-gray-700">
          Quản lý thông tin hồ sơ bảo mật tài khoản
        </div>
        <form onSubmit={onSubmit} className="mt-8 flex flex-col-reverse md:flex-row md:items-start">
          <div className="mt-6 flex-grow md:mt-0 md:pr-12">
            <div className="flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Email</div>
              <div className="sm:w-[80%] sm:pl-5">
                <div className="pt-3 text-gray-700">{profile?.email}</div>
              </div>
            </div>
            <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Tên</div>
              <div className="sm:w-[80%] sm:pl-5">
                <Input
                  register={register}
                  name= 'name'
                  placeholder='Tên'
                  errorMessage={errors.name?.message}
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'/>
              </div>
            </div>
            <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Số điện thoại</div>
              <div className="sm:w-[80%] sm:pl-5">
                <Controller
                  control={control}
                  name='phone'
                  render={({field}) => (
                    <InputNumber
                      placeholder='Số điện thoại'
                      errorMessage={errors.phone?.message}
                      classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                      {...field}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
            <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
              <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Địa chỉ</div>
              <div className="sm:w-[80%] sm:pl-5">
                <Input
                  register={register}
                  name= 'address'
                  placeholder='Địa chỉ'
                  errorMessage={errors.address?.message}
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'/>
              </div>
            </div>
            <Controller
              control={control}
              name='date_of_birth'
              render={({field}) => (
              <DateSelect value={field.value} onChange={field.onChange} errorMessage={errors.date_of_birth?.message} />
            )}
            />

            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate w-[20%] pt-3 text-right capitalize' />
              <div className='sm:pl-5 w-[80%]'>
                <Button type='submit' className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'>Lưu</Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200">
            <div className="flex flex-col items-center">
              <div className="my-5 h-24 w-24">
                <img className='w-full h-full rounded-full object-cover'
                     src='https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn' alt='anh'/>
                <input className='hidden' type='file' accept='.jpg, .jpeg, .png'/>
                <button
                  type='submit'
                  className='mt-2 flex h-10 items-center justify-end rounded-sm border bg-white px-4 text-sm text-gray-600 shadow-sm'>Chọn ảnh
                </button>
              </div>
              <div className="mt-8 text-gray-400">
                <div>Dung lượng file tối đa 1 MB</div>
                <div>Định dạng: .JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;