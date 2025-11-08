import http from "../utils/https.ts";
import type {Product, ProductList, ProductListConfig} from "../types/product.type.ts";
import type {SuccessResponse} from "../types/util.type.ts";

const URL = 'products'

const productApi = {
  getProduct: (params: ProductListConfig) => {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  },

  getProductDetail: (id: string) => {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  }

}

export default productApi;

