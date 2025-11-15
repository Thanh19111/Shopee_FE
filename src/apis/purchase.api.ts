import http from "../utils/https.ts";
import type {SuccessResponse} from "../types/util.type.ts";
import type {Purchase, PurchaseListStatus} from "../types/purchase.type.ts";

const URL = 'purchases';
const purchaseApi = {
  addToCart(body: {product_id: string, buy_count: number}){
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: {status: PurchaseListStatus}) {
    return http.get<SuccessResponse<Purchase[]>>(`${URL}`, {
      params
    })
  }
}

export default purchaseApi;