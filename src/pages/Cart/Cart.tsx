import {useMutation, useQuery} from "@tanstack/react-query";
import {purchasesStatus} from "../../constants/purchase.ts";
import purchaseApi from "../../apis/purchase.api.ts";
import {Link} from "react-router-dom";
import path from "../../constants/paths.ts";
import {formatCurrency, generateNameId} from "../../utils/utils.ts";
import QuantityController from "../../components/QuantityController";
import Button from "../../components/Button";
import {useEffect, useState} from "react";
import type {Purchase} from "../../types/purchase.type.ts";
import {produce} from "immer";
import {keyBy} from "lodash";
import {toast} from "react-toastify";

interface ExtendedPurchase extends Purchase {
  disabled: boolean;
  checked: boolean;
}

const Cart = () => {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([]);

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch();
    }
  });

  const {data: purchasesInCartData, refetch} = useQuery({
    queryKey: ['purchases', {status: purchasesStatus.inCart}],
    queryFn: () => purchaseApi.getPurchases({status: purchasesStatus.inCart}),
  });

  const purchasesInCart = purchasesInCartData?.data.data;
  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(produce(draft => {
      draft[purchaseIndex].checked = event.target.checked;
    }))
  };

  const handleCheckAll = () => {
    setExtendedPurchases(
      prev => prev.map(purchase => ({
        ...purchase,
        checked: !isALlChecked
      }))
    )
  }

  const isALlChecked = extendedPurchases.every((purchase) => purchase.checked);

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if(enable) {
      const purchases = extendedPurchases[purchaseIndex];
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true;
        })
      )
      updatePurchaseMutation.mutate({
        product_id: purchases.product._id,
        buy_count: value
      })
    }
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value;
      })
    )
  }

  const buyProductMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch();
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const checkedPurchases = extendedPurchases.filter(purchase => purchase.checked);
  const checkedPurchasedLength = checkedPurchases.length;

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id;
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchases = () => {
    const purchasedIds = checkedPurchases.map(purchase => purchase._id);
    deletePurchaseMutation.mutate(purchasedIds);
  }

  const totalCheckedPurchasePrice = checkedPurchases.reduce((result, current) => {
    return result + current.product.price * current.buy_count;
  }, 0)

  const totalCheckedPurchaseSavingPrice = checkedPurchases.reduce((result, current) => {
    return result + (current.product.price_before_discount - current.product.price) * current.buy_count;
  }, 0)

  const handleByPurchase = () => {
    if(checkedPurchases.length > 0){
      const body = checkedPurchases.map((purchase) => (
        {
          product_id: purchase.product._id,
          buy_count: purchase.buy_count
        }
      ));
      buyProductMutation.mutate(body)
    }
  }

  useEffect(() => {
    setExtendedPurchases(prev => {
      const extendedPurchasesObject = keyBy(prev, '_id');
      return purchasesInCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(extendedPurchasesObject[purchase._id]?.checked) || false
        })) || []
      }
    )
  }, [purchasesInCart])
  return (
    <div className='bg-neutral-100 py-16'>
      <div className="container">
        <div className="overflow-auto">
          <div className='min-w-[1000px]'>
            <div className="grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow">
              <div className="col-span-6">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 items-center justify-center">
                    <input type='checkbox' onClick={handleCheckAll} className='h-5 w-5 accent-amber-500' checked={isALlChecked}/>
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
            {extendedPurchases.length && <div className="my-3 rounded-sm p-5 bg-white shadow">
              {extendedPurchases.map((purchase, index) => (
                <div key={purchase._id}
                     className='first:mt-0 items-center grid grid-cols-12 text-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-sm text-gray-500 mb-5'>
                  <div className='col-span-6'>
                    <div className="flex">
                      <div className="flex flex-shrink-0 items-center justify-center pr-3">
                        <input type='checkbox' className='h-5 w-5 accent-amber-500' checked={purchase.checked} onChange={handleCheck(index)}/>
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
                          onFocusOut={(value) => handleQuantity(index, value, value <= purchase.product.quantity && value >= 1 && value !== (purchasesInCart as Purchase[])[index].buy_count)}
                          onType={handleTypeQuantity(index)}
                          onIncrease={value => handleQuantity(index, value, value <= purchase.product.quantity)}
                          onDecrease={value => handleQuantity(index, value, value >= 1)}
                          disabled={purchase.disabled}
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
                        <button onClick={handleDelete(index)} className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            }
          </div>
        </div>
        <div className='sticky shadow border border-gray-100 bottom-0 z-10 flex flex-col sm:flex-row sm:items-center rounded-sm bg-white p-5 mt-8'>
          <div className="flex items-center">
            <div className="flex flex-shrink-0 items-center justify-center pr-3">
              <input type='checkbox' onClick={handleCheckAll} className='h-5 w-5 accent-orange' checked={isALlChecked}/>
            </div>
            <button className='mx-3 border-none bg-none'>
              Chọn tất cả ({extendedPurchases.length})
            </button>
            <button onClick={handleDeleteManyPurchases} className='mx-3 border-none bg-none'>
              Xóa
            </button>
          </div>
          <div className="sm:ml-auto flex flex-col sm:flex-row sm:items-center mt-5 sm:mt-0">
            <div>
              <div className="flex items-center sm:justify-end">
                <div>Tổng thanh toán ({checkedPurchasedLength} sản phẩm)</div>
                <div className='ml-2 text-2xl text-orange'>đ{formatCurrency(totalCheckedPurchasePrice)}</div>
              </div>
              <div className="flex items-center sm:justify-end text-sm">
                <div className="text-gray-500">Tiết kiệm</div>
                <div className="ml-6 text-orange">đ{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
              </div>
            </div>
            <Button
              onClick={handleByPurchase}
              disabled={buyProductMutation.isPending}
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