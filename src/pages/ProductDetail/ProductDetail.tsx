import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import productApi from "../../apis/product.api.ts";
import ProductRating from "../../components/ProductRating";
import {formatCurrency, formatNumberToSocialStyle, rateSale} from "../../utils/utils.ts";
import InputNumber from "../../components/InputNumber";
import DOMPurify from 'dompurify';
import {useEffect, useMemo, useRef, useState} from "react";
import type {Product as ProductType} from "../../types/product.type.ts";

function ProductDetail() {
  const {id} = useParams();
  const {data: productDetailData} =  useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const product = productDetailData?.data.data;
  const [currentIndexImages, setCurrentIndexImages] = useState<number[]>([0, 5]);
  const currentImages = useMemo(() => (product ? product.images.slice(...currentIndexImages) : []), [product, currentIndexImages]);
  const [activeImage, setActiveImage] = useState<string>('');
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if(product && product.images.length > 0){
      setActiveImage(product.images[0]);
    }
  }, [product]);

  const chooseActive = (image: string) => {
    setActiveImage(image);
  }

  const next = () => {
    if(currentIndexImages[1] < (product as ProductType).images.length){
      setCurrentIndexImages(prev => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if(currentIndexImages[0] > 0){
      setCurrentIndexImages(prev => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const image = imageRef.current as HTMLImageElement;
    const rect = event.currentTarget.getBoundingClientRect();
    const {naturalHeight, naturalWidth} = image;
    const {offsetX, offsetY} = event.nativeEvent;
    const top = offsetY * (1- naturalHeight / rect.height);
    const left = offsetX * (1- naturalWidth / rect.width);

    image.style.width = naturalWidth + 'px';
    image.style.height = naturalHeight + 'px';
    image.style.maxWidth = 'unset';

    image.style.top = top + 'px';
    image.style.left = left + 'px';

    // event bubble
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style');
  }

  if (!product) return null;
  return (
    <div className='bg-gray-200 py-6'>
      <div className="container">
        <div className="bg-white p-4 shadow">
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-5">
              <div className="relative w-full pt-[100%] shadow overflow-hidden cursor-zoom-in" onMouseMove={handleZoom} onMouseLeave={handleRemoveZoom}>
                <img
                  ref={imageRef}
                  src={activeImage}
                  alt={product.name}
                  className='pointer-events-none absolute top-0 left-0 h-full w-full bg-white object-cover'
                />
              </div>
              <div className="relative mt-4 grid grid-cols-5 gap-1">
                <button onClick={prev} className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage;
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange'/>}
                    </div>
                  )
                })}
                <button onClick={next} className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-span-7">
              <h1 className="text-xl font-medium uppercase">
                {product.name}
              </h1>
              <div className='mt-8 flex items-center'>
                <div className="flex items-center">
                <span className="mr-1 border-b border-b-orange text-orange">
                  {product.rating}
                </span>
                  <ProductRating rating={product.rating} activeClassname='fill-orange text-orange h-4 w-4'
                                 nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'/>
                </div>
                <div className="mx-4 h-4 w-[1px] bg-gray-300"></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
                <div className="text-gray-500 line-through">
                  đ{formatCurrency(product.price_before_discount)}
                </div>
                <div className="ml-3 text-3xl font-medium text-orange">
                  {formatCurrency(product.price)}
                </div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className="capitalize text-gray-500">
                  Số lượng:
                </div>
                <div className="ml-10 flex items-center">
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14"/>
                    </svg>
                  </button>
                  <InputNumber value={1} className='' classNameError='hidden'
                               classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'/>
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                  </button>
                  <div className="ml-6 text-sm text-gray-500">
                    {product.quantity} sản phẩm có sẵn
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center">
                <button
                  className="flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="current" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" className="size-5 mr-[10px] stroke-orange text-orange">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  className="ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90">
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="mt-8 bg-white p-4 shadow">
          <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
            Mô tả sản phẩm
          </div>
          <div className="mx-4 mt-12 mb-4 text-sm leading-loose text-left">
            <div dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description)
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;