import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  setOpen,
  setShowCart,
} from "../features/Cart/CartSlice";
import NotificationModal from "./NotificationModal";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const location = useLocation();
  const { product } = location.state || {};

  console.log("data", product);
  const { order, status, error, responseMessage } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState(product?.size?.[2] || null);
  const [notification, setNotification] = useState("");
  // const backendBaseUrl = "http://localhost:8080/api/images";
  if (!product) {
    return <div>Product not found.</div>; // Handle case where product is not passed
  }

  const closeNotification = () => {
    setNotification((prev) => !prev);
  };

  const { showCart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (status === "succeeded") {
      setNotification(responseMessage);
      // setTimeout(() => closeNotification(), 5000);
    }
    if (status === "failed") {
      setNotification(responseMessage);
      // setTimeout(() => closeNotification(), 5000);
    }
  }, [status, responseMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (product) {
      dispatch(addProductToCart(product));
    }
    window.scrollTo(0, 0);
    dispatch(setShowCart());
  };

  const toggleCart = () => {
    dispatch(setShowCart());
  };

  const uniqueSizes = [...new Set(product.size)];

  return (
    <>
      {notification && (
        <NotificationModal message={notification} onClose={closeNotification} />
      )}

      <div className="bg-white">
        <div className="pt-0">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <img
              alt={"csdsdcsd"}
              // src={`${backendBaseUrl}/${product.images}`}
              src={product.imageUrl}
              className="hidden size-full rounded-lg object-cover lg:block"
            />
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <img
                alt={"csdsdcsd"}
                // src={`${backendBaseUrl}/${product.images}`}
                src={product.imageUrl}
                className="aspect-3/2 w-full rounded-lg object-cover"
              />
              <img
                alt={"csdsdcsd"}
                // src={`${backendBaseUrl}/${product.images}`}
                src={product.imageUrl}
                className="aspect-3/2 w-full rounded-lg object-cover"
              />
            </div>
            <img
              alt={"csdsdcsd"}
              // src={`${backendBaseUrl}/${product.images}`}
              src={product.imageUrl}
              className="aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-auto"
            />
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ₹{product.price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "size-5 shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="flex items-center gap-x-3"
                    >
                      {product.color.map((color) => (
                        <Radio
                          key={color}
                          value={color}
                          aria-label={color}
                          className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1"
                        >
                          <span
                            aria-hidden="true"
                            className="size-8 rounded-full border border-black/10"
                            style={{
                              backgroundColor:
                                color === "Black "
                                  ? "black"
                                  : color.toLowerCase(),
                            }}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {uniqueSizes.map((size) => (
                        <Radio
                          key={size}
                          value={size}
                          className={classNames(
                            "cursor-pointer bg-white text-gray-900 shadow-xs",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size}</span>
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                >
                  Add to bag
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              <div>
                <h2 className="text-lg font-bold py-3  ">{product.title}</h2>
              </div>
              {/* Description and details */}
              <div>
                <div className="space-y-6">
                  <h2 className="text-lg font-medium tracking-tight text-gray-600">
                    Description
                  </h2>
                  <p className="text-base text-gray-600">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-600">Details</h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400">
                      <span className="text-gray-600">{product.details}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div> */}
            </div>
          </div>
          {showCart && (
            <ShoppingCart
              // open={showCart}
              onClose={toggleCart}
              product={product}
            />
          )}
        </div>
      </div>
    </>
  );
}
