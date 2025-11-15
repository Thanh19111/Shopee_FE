import AsideFilter from "./AsideFilter";
import SortProductList from "./SortProductList";
import Product from "./Product";
import {useQuery} from "@tanstack/react-query";
import productApi from "../../apis/product.api.ts";
import Pagination from "../../components/Pagination/Pagination.tsx";
import type {ProductListConfig} from "../../types/product.type.ts";
import categoryApi from "../../apis/category.api.ts";
import useQueryConfig from "../../hooks/useQueryConfig.tsx";

function ProductList() {
  const queryConfig = useQueryConfig();

  const {data: productsData} = useQuery({
    queryKey: ['product', queryConfig],
    queryFn: () => {
      return productApi.getProduct(queryConfig as ProductListConfig)
    },
    placeholderData: (previousData) => previousData,
    staleTime: 3 * 60 * 1000
  })

  const {data: categoriesData} = useQuery({
    queryKey: ['category', queryConfig],
    queryFn: () => {
      return categoryApi.getCategories()
    },
    placeholderData: (previousData) => previousData,
    staleTime: 3 * 60 * 1000
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className="container">
        {productsData && (
          <div className="grid grid-cols-12 gap-6">
            <span className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
            </span>
            <div className='col-span-9'>
              <SortProductList queryConfig = {queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {productsData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig = {queryConfig} pageSize={productsData.data.data.pagination.page_size}  />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;