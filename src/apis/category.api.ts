import http from "../utils/https.ts";
import type {SuccessResponse} from "../types/util.type.ts";
import type {Category} from "../types/category.type.ts";

const URL ='categories'

const categoryApi = {
  getCategories: () =>{
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}

export default categoryApi;