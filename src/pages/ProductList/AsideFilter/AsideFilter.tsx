import {createSearchParams, Link, useNavigate} from "react-router-dom";
import path from "../../../constants/paths.ts";
import Button from "../../../components/Button";
import type {Category} from "../../../types/category.type.ts";
import classNames from "classnames";
import InputNumber from "../../../components/InputNumber";
import {Controller, useForm} from "react-hook-form";
import {type Schema, schema} from "../../../utils/rules.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import type {NoUndefindedField} from "../../../types/util.type.ts";
import RatingStars from "../RatingStars";
import {omit} from "lodash";
import type {QueryConfig} from "../../../hooks/useQueryConfig.tsx";
import InputV2 from "../../../components/InputV2";

type FormData = NoUndefindedField<Pick<Schema, 'price_max' | 'price_min'>>
interface Props {
  queryConfig: QueryConfig;
  categories: Category[];
}

/**
 *
 * Rule validate
 * Nếu có price_min và price_max thì price_max >= price_min
 * Còn không thì nếu có price_min thì không có price_max và ngược lại
 */

const priceSchema = schema.pick(['price_min', 'price_max']);

function AsideFilter({queryConfig, categories}: Props) {
  const {category} = queryConfig;
  const {control, trigger, handleSubmit, formState: {errors}} = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema)
  });


  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min,
      }).toString()
    })
  })

  const handleRemoverAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }

  const navigate = useNavigate();

  console.log(errors)
  return (
    <div className='py-4'>
      <Link to={path.home} className={classNames('flex items-center font-bold', {
        'text-orange': !category
      })}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"/>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'/>
      <ul className='text-left'>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li key={categoryItem._id} className='py-2 pl-2'>
            <Link to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                category: categoryItem._id
              }).toString()
            }} className={classNames('relative px-2', {
              'text-orange font-semibold': isActive
            })
            }>
              {isActive &&
                <svg viewBox='0 0 4 7' className='fill-orange h-2 w-2 absolute top-1 left-[-10px]'>
                <polygon points='4 3.5 0 0 0 7'/>
              </svg>}
              {categoryItem.name}
            </Link>
            </li>
          )
        })}
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
        <form className='mt-2' onSubmit={onSubmit}>
          <div className="flex items-start">
            {/*<Controller*/}
            {/*  control={control}*/}
            {/*  name='price_min'*/}
            {/*  render={({field}) => {*/}
            {/*    return (*/}
            {/*      <InputNumber*/}
            {/*        type='text'*/}
            {/*        className='grow'*/}
            {/*        placeholder='đ Từ'*/}
            {/*        classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'*/}
            {/*        classNameError='hidden'*/}
            {/*        {...field}*/}
            {/*        onChange={event => {*/}
            {/*          field.onChange(event);*/}
            {/*          trigger('price_max')*/}
            {/*        }}*/}
            {/*      />)*/}
            {/*  }}*/}
            {/*/>*/}

            <InputV2
              control = {control}
              name = 'price_min'
              type='number'
              className='grow'
              placeholder='đ Từ'
              classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              classNameError='hidden'
              onChange={() => {
                trigger('price_max')
              }}/>


            <div className="mx-2 mt-2 shrink-0">-</div>
            <Controller
              control={control}
              name='price_max'
              render={({field}) => {
                return (
                  <InputNumber
                    classNameError='hidden'
                    ref={field.ref}
                    onChange={event => {
                      field.onChange(event);
                      trigger('price_min')
                    }}
                    value={field.value}
                    type='text'
                    className='grow'
                    name='from'
                    placeholder='đ Đến'
                    classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  />)
              }}
            />


          </div>
          <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm text-center'>{errors.price_min?.message}</div>
          <Button
            className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-1[1px] my-4'/>
      <div className="text-sm">Đánh giá</div>

      <RatingStars queryConfig={queryConfig} />
      <div className="bg-gray-300 h-[1px] my-4" />
      <Button onClick={handleRemoverAll} className='w-full py-2 px-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>Xóa tất cả</Button>
    </div>
  );
}

export default AsideFilter;