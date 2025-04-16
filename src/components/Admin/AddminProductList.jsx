import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadReport,
  fetchProducts,
} from "../../features/Product/ProductAction";
import Pagination from "../Pagination";
import Modal from "./Modal";
import { updateProduct } from "../../features/Admin/AdminAction";
import NotificationModal from "../NotificationModal";

const AddminProductList = () => {
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.products);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { status, responseMessage } = useSelector((state) => state.admin);
  const [notification, setNotification] = useState("");
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    dispatch(fetchProducts({ pageNumber, pageSize }));
  }, [dispatch, pageNumber, pageSize]);

  useEffect(() => {
    if (status === "succeeded") {
      setNotification("Product Updated Successfully");
      setTimeout(() => closeNotification(), 5000);
    }
    if (status === "failed") {
      setNotification(responseMessage);
      setTimeout(() => closeNotification(), 5000);
    }
  }, [status, responseMessage, dispatch, pageNumber, pageSize]);

  const backendBaseUrl = "http://localhost:8080/api/images";
  const [image, setImage] = useState(null);

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const closeNotification = () => {
    setNotification((prev) => !prev);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setModalContent("edit");
  };

  const handleOverView = (description) => {
    setModalContent(description);
    setIsModalOpen(true);
  };

  const handleDetailOverview = (details) => {
    setModalContent(details);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setModalContent("");
  };

  const handleChange = (e) => {
    setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(selectedProduct)], { type: "application/json" })
    );
    formData.append("image", image);
    console.log("FormData: ", formData);
    dispatch(updateProduct({ formData, productId: selectedProduct.productId }));
    handleModalClose();
  };

  const handleReport = () => {
    dispatch(downloadReport());
  };

  return (
    <div className="container   md:mx-auto  ">
      {notification && (
        <NotificationModal message={notification} onClose={closeNotification} />
      )}
      <div className="flex mr-4">
        <div className="ml-auto  my-3">
          <button
            type="button"
            onClick={handleReport}
            className="bg-blue-500 hover:bg-blue-900 cursor-pointer  text-white px-2 p-1 rounded-lg "
          >
            Download Report
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <div className="overflow-hidden">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-7 py-3">
                  Size
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>

                <th scope="col" className="px-6 py-3">
                  Details
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {product.content.map((prod) => {
                const uniqueSize = [...new Set(prod.size)];
                return (
                  <tr
                    key={prod.productId}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-2    ">
                      <img
                        alt={prod.name}
                        src={`${backendBaseUrl}/${prod.images}`}
                        className="md:w-20 md:h-20 object-cover rounded-md"
                      />
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4   font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="whitespace-normal break-words">
                        {prod.name.length > 90
                          ? prod.name.substring(0, 15) + "..."
                          : prod.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {prod.color.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </td>
                    <td className="px-6 py-4  w-auto ">
                      {uniqueSize.map((item, index) => (
                        <p key={index}> {item} </p>
                      ))}
                    </td>
                    <td className="px-6 py-4">{prod.price}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleOverView(prod.description)}
                        className="whitespace-normal break-words cursor-pointer hover:text-blue-700    "
                      >
                        {prod.description?.length > 30
                          ? prod.description.substring(0, 15) + "..."
                          : prod.description}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDetailOverview(prod.details)}
                        className="whitespace-normal break-words cursor-pointer hover:text-blue-700     "
                      >
                        {prod.details.length > 30
                          ? prod.details.substring(0, 15) + "..."
                          : prod.details}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-content-center  ">
                        <button
                          onClick={() => handleEditClick(prod)}
                          className="bg-gray-100 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded  "
                        >
                          ✏️
                        </button>
                        <button className="ml-2 bg-gray-100 hover:bg-red-700 text-white font-bold py-2 px-2 rounded">
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <div className="mt-8">
          <Pagination
            currentPage={pageNumber}
            totalPages={Math.ceil(product.totalElements / pageSize)}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            totalElements={product.totalElements}
          />
        </div> */}
        {product && product.content && product.totalElements && (
          <div className="  py-10">
            <Pagination
              currentPage={pageNumber}
              totalPages={Math.ceil(product.totalElements / pageSize)}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              totalElements={product.totalElements}
            />
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        {modalContent === "edit" ? (
          <>
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            {selectedProduct && (
              <form className="w-[400px]">
                <div className="flex items-center justify-center mt-3">
                  <label className="text-base font-medium text-gray-900">
                    Profile Picture
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="file-input   max-w-xs bg-gray-600 p-2 text-white rounded"
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={selectedProduct.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex justify-content-center  ">
                  {/* Price */}
                  <div className="mb-4 mx-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={selectedProduct.price}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  {/* Quanity */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Quantity
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={selectedProduct.quantity}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={selectedProduct.description}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </>
        ) : modalContent === "description" ? (
          <>
            <div
              id="toast-default"
              className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg   dark:text-gray-400 dark:bg-gray-800"
              role="alert"
            >
              <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
                  />
                </svg>
                {/* <span className="sr-only"> {modalContent} </span> */}
              </div>
              <div className="ms-3 text-sm font-normal mx-10">
                {modalContent}
              </div>
              <button
                type="button"
                className="ms-auto   -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-default"
                aria-label="Close"
                onClick={handleModalClose}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              id="toast-default"
              className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg   dark:text-gray-400 dark:bg-gray-800"
              role="alert"
            >
              <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
                  />
                </svg>
              </div>
              <div className="ms-3 text-sm font-normal mx-10">
                {modalContent}
              </div>
              <button
                type="button"
                className="ms-auto   -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-default"
                aria-label="Close"
                onClick={handleModalClose}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </Modal>

      {/* <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      </Modal> */}
    </div>
  );
};

export default AddminProductList;

export const downloadFile = (url, filename) => {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
