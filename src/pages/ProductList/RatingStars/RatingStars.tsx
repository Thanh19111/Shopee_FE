import {createSearchParams, useNavigate} from "react-router-dom";
import path from "../../../constants/paths.ts";
import type {QueryConfig} from "../ProductList.tsx";

interface Props {
  queryConfig: QueryConfig
}
function RatingStars({queryConfig}: Props) {
  const navigate = useNavigate();
  const handleFilterStar = (ratingFilter: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingFilter)
      }).toString()
    })
  }
  return (
    <ul className="my-3">
      {Array(5).fill(0).map((_, index) => (
        <li className="py-1 pl-2 cursor-pointer" key={index}>
          <div className='flex items-center text-sm' onClick={() => handleFilterStar(5 - index)}>
            {Array(5).fill(0).map((_, indexStar) => {
                if (indexStar < 5 - index) {
                  return (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" key={indexStar} className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
                    </svg>
                  )
                }
                return (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" key={indexStar} className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
                  </svg>
                )
              }
            )}
            {index !== 0 && <span className='mt-1.5 mr-2'>Trở lên</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default RatingStars;