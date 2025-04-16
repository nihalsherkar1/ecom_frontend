import axios from "axios";
import React from "react";
import { useRazorpay } from "react-razorpay";

const PaymentComponent = () => {
  // const { error, isLoading, Razorpay } = useRazorpay();

  // const handlePayment = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/payment/createOrder",null,
  //       {
  //         params: {
  //           amount: 500, // Amount in INR
  //           currency: "INR",
  //         },
  //       }
  //     );
  //     const orderId = response.data;

  //     const options = {
  //       key: "rzp_test_7GiFe57HSFEmWe",
  //       amount: 1000, // amount should be in paisa
  //       currency: "INR",
  //       name: "My Store",
  //       description: "Payment for Order #12345",
  //       order_id: orderId,
  //       handler: function (response) {
  //         console.log(response);
  //         alert("Payment Successfull");
  //         // Add your server-side code here to save the payment details and process the order
  //       },
  //       prefill: {
  //         name: "John",
  //         email: "john@example.com",
  //         contact: "9876543210",
  //       },
  //       theme: {
  //         color: "#F37254",
  //       },
  //     };
  //     const razorpayInstance = new Razorpay(options);
  //     razorpayInstance.open();
  //   } catch (error) {
  //     console.error("Error creating order: ", error);
  //   }
  // };

  return (
    <div>
      <div>
        <h1>Payment Page</h1>
        {isLoading && <p>Loading Razorpay...</p>}
        {error && <p>Error loading Razorpay: {error}</p>}
        <button
          type="button"
          className="text-white bg-blue-700 p-3 rounded-lg my-3 shadow hover:bg-blue-800"
          onClick={handlePayment}
          disabled={isLoading}
        >
          Pay Now
        </button>
        
      </div>
    </div>
  );
};

export default PaymentComponent;
