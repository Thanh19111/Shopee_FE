import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {type Schema, schema} from "../../utils/rules.ts";
import Input from "../../components/Input";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "@tanstack/react-query";
import {authApi} from "../../apis/auth.api.ts";
import {omit} from "lodash";
import {isAxiosUnprocessableEntityError} from "../../utils/utils.ts";
import type {ErrorResponse} from "../../types/util.type.ts";
import {useContext} from "react";
import {AppContext} from "../../contexts/app.context.tsx";
import Button from "../../components/Button";
import path from "../../constants/paths.ts";

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email' , 'password', 'confirm_password'])

const Register = () => {
  const navigate = useNavigate();
  const {setIsAuthenticated, setProfile} = useContext(AppContext);
  const {register, setError, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password']);
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.data.user)
        navigate(path.home);
      },
      onError: (errors) => {
        if(isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(errors)){
          const formError = errors.response?.data.data;
          // if(formError.data?.email){
          //   setError('email', {
          //     message: formError.data?.email,
          //     type: 'Server',
          //   })
          // }
          // if (formError.data?.password) {
          //   setError('password', {
          //     message: formError.data?.password,
          //     type: 'Server'
          //   })
          // }

          if(formError){
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  // const rules = getRules(getValues);
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  return (
    <div className='bg-orange'>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form onSubmit={onSubmit} className="p-10 rounded bg-white shadow-sm" noValidate={true}>
              <div className="text-2xl">Đăng ký</div>
                <Input
                  name='email'
                  register = {register}
                  type="email"
                  errorMessage={errors.email?.message}
                  className='mt-8'
                  placeholder={'Email'}
                />
              <Input
                name='password'
                register = {register}
                type="password"
                errorMessage={errors.password?.message}
                className='mt-2'
                placeholder={'Password'}
              />
              <Input
                name='confirm_password'
                register = {register}
                type="password"
                errorMessage={errors.confirm_password?.message}
                className='mt-2'
                placeholder={'Confirm Password'}
              />
              <div className="mt-2">
                <Button
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                  className="w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600">
                  Đăng ký
                </Button>
              </div>
                <div className="flex items-center justify-center mt-8">
                  <span className="text-slate-400">Bạn đã có tài khoản?</span>
                  <Link className="text-red-400 ml-1" to="/login">Đăng nhập</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Register;