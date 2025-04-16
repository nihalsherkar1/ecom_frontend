import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../features/Product/ProductAction";
import Pagination from "./Pagination";
import { setLoading } from "../features/Product/ProductSlice";
import Loader from "./Assests/Loader";

export default function List() {
  const dispatch = useDispatch();

  const { product, loading } = useSelector((state) => state.products);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    dispatch(fetchProducts({ pageNumber, pageSize }));
  }, [pageNumber, pageSize, dispatch]);

  // useEffect(() => {
  //   dispatch(setLoading(true));

  //   setTimeout(() => {
  //     dispatch(fetchProducts({ pageNumber, pageSize })).finally(() => {
  //       dispatch(setLoading(false));
  //     });
  //   }, 2000);
  // }, [pageNumber, pageSize, dispatch]);

  // const backendBaseUrl = "http://localhost:8080/api/images";

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const memoisedProdcutList = useMemo(() => {
    return product.content.map((product) => (
      <div
        key={product.productId}
        className="group relative border-2 border-none"
      >
        <img
          alt={product.name}
          // src={`${backendBaseUrl}/${product.images}`}
          src={product.imageUrl}
          loading="lazy"
          className="aspect-square w-full shadow-lg border-gray-900 rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <div className="mt-2  shadow-md flex justify-between bg-gray-200 p-4 rounded-md">
          <div>
            <h3 className="text-sm text-gray-700">
              <Link
                to={`/product/${product.productId}`}
                state={{ product: product }}
              >
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name.length > 15
                  ? product.name.substring(0, 25)
                  : product.name}
              </Link>
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
        </div>
      </div>
    ));
  }, [product]);
  const memoizedPagination = useMemo(() => {
    return (
      <Pagination
        currentPage={pageNumber}
        totalPages={Math.ceil(product.totalElements / pageSize)}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        totalElements={product.totalElements}
      />
    );
  }, [pageNumber, pageSize, product.totalElements]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-9 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2> */}
        {console.log("Product: ", product)}
        {loading ? (
          <div className="flex justify-center items-center mt-[50px] ">
            <Loader />
          </div>
        ) : (
          <>
            <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
              {memoisedProdcutList}
            </div>

            <div className="py-5 mt-3">{memoizedPagination}</div>
          </>
        )}
      </div>
    </div>
  );
}
