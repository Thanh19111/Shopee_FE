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
  },
  buyProducts(body: {product_id: string, buy_count: number}[]) {
    return http.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body);
  },
  updatePurchase(body: {product_id: string, buy_count: number}){
    return http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessResponse<{delete_count: number}>>(`${URL}`, {
      data: purchaseIds
    });
  }
}

export default purchaseApi;