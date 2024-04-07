import React from "react";

import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [apiErr, setApiErr] = useState(false);
  //for api errors,we can use axios request interceptor but there are only 2 apis so I'm handling them in catch block

  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const fetchProducts = () => {
    //can use loading or shimmer ui state here
    let response = axios.get(
      `https://dummyjson.com/products?limit=${pageSize}&&skip=${page * 10 - 10}`
    );
    response
      .then((data) => {
        console.log(data);
        setProducts(data?.data?.products);

        setTotalPages(data?.data?.total / 10);
      })
      .catch((error) => {
        setApiErr(true);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);
  const paginationHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  const previousPageHandler = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  const nextPageButtonHandler = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  if (apiErr) {
    return <h2>Something went wrong... </h2>;
  }

  return (
    <>
      <div>
        {products.length > 0 && (
          <div className="product__List">
            {products.map((product, index) => {
              return <Product key={product.id} product={product} />;
            })}
          </div>
        )}
      </div>
      {products.length > 0 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => previousPageHandler()}>
            Previous
          </button>

          {[...Array(totalPages)].map((itm, idx) => {
            return (
              <span
                className={page === idx + 1 ? "pagination__selected" : ""}
                key={idx}
                onClick={() => paginationHandler(idx + 1)}
              >
                {idx + 1}
              </span>
            );
          })}
          <button
            disabled={page === totalPages}
            onClick={nextPageButtonHandler}
          >
            {" "}
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default ProductListing;
