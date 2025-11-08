import AsideFilter from "./AsideFilter";
import SortProductList from "./SortProductList";
import Product from "./Product";
import {useQuery} from "@tanstack/react-query";
import useQueryParam from "../../hooks/useQueryParam.tsx";
import productApi from "../../apis/product.api.ts";

function ProductList() {
  const queryParams = useQueryParam();
  const {data} = useQuery({
    queryKey: ['product', queryParams],
    queryFn: () => {
      return productApi.getProduct(queryParams)
    }
  })

  console.log(1)
  console.log(data);
  return (
    <div className='bg-gray-200 py-6'>
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <span className='col-span-3'>
            <AsideFilter />
          </span>
          <div className='col-span-9'>
            <SortProductList />
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {data && data.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;