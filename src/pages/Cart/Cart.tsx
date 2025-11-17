import {useQuery} from "@tanstack/react-query";
import {purchasesStatus} from "../../constants/purchase.ts";
import purchaseApi from "../../apis/purchase.api.ts";
import {Link} from "react-router-dom";
import path from "../../constants/paths.ts";
import {formatCurrency, generateNameId} from "../../utils/utils.ts";
import QuantityController from "../../components/QuantityController";
import Button from "../../components/Button";

const Cart = () => {
  const {data: purchasesInCartData} = useQuery({
    queryKey: ['purchases', {status: purchasesStatus.inCart}],
    queryFn: () => purchaseApi.getPurchases({status: purchasesStatus.inCart}),
  });

  const purchasesInCart = purchasesInCartData?.data.data;

  return (
    <div className='bg-neutral-100 py-16'>
      <div className="container">
        <div className="overflow-auto">
          <div className='min-w-[1000px]'>
            <div className="grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow">
              <div className="col-span-6">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 items-center justify-center">
                    <input type='checkbox' className='h-5 w-5 accent-amber-500'/>
                  </div>
                  <div className="flex-grow text-black">
                    Sản phẩm
                  </div>
                </div>
              </div>
              <div className="col-span-6">
                <div className="grid-cols-5">
                  <div className="grid text-center grid-cols-5">
                    <div className="col-span-2">Đơn giá</div>
                    <div className="col-span-1">Số lượng</div>
                    <div className="col-span-1">Số tiền</div>
                    <div className="col-span-1">Thao tác</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3 rounded-sm p-5 bg-white shadow">
              {purchasesInCart?.map((purchase) => (
                <div key={purchase._id}
                     className='first:mt-0 grid grid-cols-12 text-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-sm text-gray-500 mb-5'>
                  <div className='col-span-6'>
                    <div className="flex">
                      <div className="flex flex-shrink-0 items-center justify-center pr-3">
                        <input type='checkbox' className='h-5 w-5 accent-amber-500'/>
                      </div>
                      <div className="flex-grow">
                        <div className="flex">
                          <Link to={`${path.home}${generateNameId({
                            name: purchase.product.name,
                            id: purchase.product._id
                          })}`} className='h-20 w-20 flex-shrink-0'>
                            <img alt={purchase.product.name} src={purchase.product.image}/>
                          </Link>
                          <div className="flex-grow px-2 pt-1 pb-2">
                            <Link className='line-clamp-2' to={`${path.home}${generateNameId({
                              name: purchase.product.name,
                              id: purchase.product._id
                            })}`}>
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className="grid text-center grid-cols-5">
                      <div className="col-span-2">
                        <div className="flex items-center justify-center">
                          <span
                            className='text-gray-300 line-through'>đ{formatCurrency(purchase.product.price_before_discount)}</span>
                          <span className='ml-3'>đ{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <QuantityController
                          value={purchase.buy_count}
                          max={purchase.product.quantity}
                          classNameWrapper='flex items-center'/>
                      </div>
                      <div className="col-span-1">
                        <span className='text-orange'>
                          đ{formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      <div className="col-span-1">
                        <button className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky shadow border border-gray-100 bottom-0 z-10 flex flex-col sm:flex-row sm:items-center rounded-sm bg-white p-5 mt-8'>
          <div className="flex items-center">
            <div className="flex flex-shrink-0 items-center justify-center pr-3">
              <input type='checkbox' className='h-5 w-5 accent-orange'/>
            </div>
            <button className='mx-3 border-none bg-none'>
              Chọn tất cả
            </button>
            <button className='mx-3 border-none bg-none'>
              Xóa
            </button>
          </div>
          <div className="sm:ml-auto flex flex-col sm:flex-row sm:items-center mt-5 sm:mt-0">
            <div>
              <div className="flex items-center sm:justify-end">
                <div>Tổng thanh toán (0 sản phẩm)</div>
                <div className='ml-2 text-2xl text-orange'>đ138000</div>
              </div>
              <div className="flex items-center sm:justify-end text-sm">
                <div className="text-gray-500">Tiết kiệm</div>
                <div className="ml-6 text-orange">đ1928924</div>
              </div>
            </div>
            <Button
              className='mt-5 sm:mt-0 h-10 w-52 text-sm flex justify-center items-center uppercase text-white bg-red-500 hover:bg-red-600 sm:ml-4'>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;