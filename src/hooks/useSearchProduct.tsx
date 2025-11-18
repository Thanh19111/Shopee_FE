import {omit} from "lodash";
import path from "../constants/paths.ts";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import useQueryConfig from "./useQueryConfig.tsx";
import {schema, type Schema} from "../utils/rules.ts";

const UseSearchProduct = () => {
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();

  type FormData = Pick<Schema, 'name'>;
  const nameSchema = schema.pick(['name']);

  const {register, handleSubmit} = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order ? omit(
        {
          ...queryConfig,
          name: data.name
        }, ['order', 'sort_by']) :
      {
        ...queryConfig,
        name: data.name
      }

    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })

  return {onSubmitSearch, register}
};

export default UseSearchProduct;