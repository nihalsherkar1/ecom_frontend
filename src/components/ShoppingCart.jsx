import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeProductFromCart,
  setOpen,
  setShowCart,
} from "../features/Cart/CartSlice";
import { OrderProduct } from "../features/Order/OrderAction";
import NotificationModal from "./NotificationModal";
import { useRazorpay } from "react-razorpay";
import axios from "axios";

const ShoppingCart = ({ onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [notification, setNotification] = useState("");
  const { showCart } = useSelector((state) => state.cart);
  // const { order, status, error } = useSelector((state) => state.order);
  console.log("cartItems", cartItems);
  console.log("Order Status: ", status);
  if (!open) return null;

  const backendBaseUrl = "http://localhost:8080/api/images";

  // const { userId } = useSelector((state) => state.register);

  const user = localStorage.getItem("user");

  const parsedUser = JSON.parse(user);
  console.log("userId: ", parsedUser?.id);

  //*   Payment Code

  const { error, isLoading, Razorpay } = useRazorpay();

  //* *************

  const handleRemove = (productId) => {
    dispatch(removeProductFromCart({ productId }));
  };

  const handleOrder = () => {
    if (cartItems.length > 0) {
      const orderDetails = {
        productId: cartItems[0].productId, // Assuming a single product order for simplicity
        quantity: cartItems[0].quantity, // Adjust as needed for your use case
        user: {
          id: parsedUser.id,
        },
      };
      dispatch(OrderProduct(orderDetails));
      dispatch(clearCart());
      dispatch(setShowCart());
    }
  };

  const calculateSubtotal = (price, quantity) => {
    return (parseFloat(price) * quantity).toFixed(2);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        return total + parseFloat(item.price) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const closeNotification = () => {
    setNotification((prev) => !prev);
  };

  const handlePayment = async () => {
    const totalAmount = calculateTotal();
    try {
      if (parsedUser?.id) {
        const response = await axios.post(
          "http://localhost:8080/api/payment/createOrder",
          null,
          {
            params: {
              amount: totalAmount, // Amount in INR
              currency: "INR",
              productId: cartItems[0].productId,
              userId: parsedUser?.id, //
            },
          }
        );
        const orderId = response.data;

        const options = {
          key: "rzp_test_7GiFe57HSFEmWe",
          amount: totalAmount * 100, // amount should be in paisa
          currency: "INR",
          name: "Shopsy",
          description: "Payment for Order #12345",
          order_id: orderId,
          handler: function (response) {
            console.log(response);

            handleOrder();
            // Add your server-side code here to save the payment details and process the order
          },
          prefill: {
            name: parsedUser?.userName,
            email: parsedUser?.email,
            contact: "9876543210",
          },
          theme: {
            color: "#F37254",
          },
        };
        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();
      } else {
        alert("Please login");
      }
    } catch (error) {
      console.error("Error creating order: ", error);
    }
  };

  return (
    <>
      {notification && (
        <NotificationModal message={notification} onClose={closeNotification} />
      )}
      <Dialog open={showCart} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={onClose}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cartItems.map((item, index) => (
                            <li key={item.productId} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={item.imageAlt}
                                  src={`${backendBaseUrl}/${item.images}`}
                                  className="size-full object-cover"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={item.href}>{item.name}</a>
                                    </h3>
                                    <p className="ml-4">{item.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {item.color}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Qty {item.quantity}
                                  </p>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                      onClick={() =>
                                        handleRemove(item.productId, index)
                                      }
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <p>Subtotal</p>
                                  <p>
                                    {calculateSubtotal(
                                      item.price,
                                      item.quantity
                                    )}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total</p>
                      <p>${calculateTotal()}</p>
                    </div>

                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={handlePayment}
                        className="flex w-full items-center justify-center rounded-full border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                      >
                        Order
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <button
                          type="button"
                          onClick={onClose}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ShoppingCart;
