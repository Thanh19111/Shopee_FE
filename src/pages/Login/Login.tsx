import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {type Schema, schema} from "../../utils/rules.ts";
import {useMutation} from "@tanstack/react-query";
import {authApi} from "../../apis/auth.api.ts";
import {isAxiosUnprocessableEntityError} from "../../utils/utils.ts";
import Input from "../../components/Input";
import type {ErrorResponse} from "../../types/util.type.ts";
import {useContext} from "react";
import {AppContext} from "../../contexts/app.context.tsx";
import Button from "../../components/Button";
import path from "../../constants/paths.ts";

type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])
function Login() {
  const navigate = useNavigate();
  const {setIsAuthenticated, setProfile} = useContext(AppContext);
  const {register, setError, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  });

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.data.user);
        navigate(path.home);
      },
      onError: (errors) => {
        if(isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(errors)){
          const formError = errors.response?.data.data;
          if(formError){
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  });

  return (
    <div className='bg-orange'>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form onSubmit={onSubmit} className="p-10 rounded bg-white shadow-sm" noValidate={true}>
              <div className="text-2xl">Đăng nhập</div>
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
              <div className="mt-3">
                <Button isLoading={loginMutation.isPending}
                        disabled = {loginMutation.isPending}
                        type='submit' className="w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center gap-1">
                  Đăng nhập
                </Button>
              </div>
              <div className="flex items-center justify-center mt-8">
                <span className="text-slate-400">Bạn chưa có tài khoản?</span>
                <Link className="text-red-400 ml-1" to="/register">Đăng ký</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;