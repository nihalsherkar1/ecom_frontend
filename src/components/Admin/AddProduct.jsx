import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/Admin/AdminAction";
import NotificationModal from "../NotificationModal";

const AddProduct = () => {
  const [data, setData] = useState({
    name: "",
    descripton: "",
    details: "",
    price: "",
    size: [],
    color: [],
    quantity: "",
  });
  const [notification, setNotification] = useState("");

  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (status === "succeeded") {
      setNotification("Product added successfully");
    } else if (status === "failed") {
      setNotification("Failed to add product");
    }
  }, [status]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleColorChange = (e) => {
    setCurrentColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setCurrentSize(e.target.value);
  };

  const addSize = () => {
    if (currentSize.trim() !== "") {
      setData({
        ...data,
        size: [...data.size, currentSize.trim()],
      });
      setCurrentSize("");
    }
  };

  const addColor = () => {
    if (currentColor.trim() !== "") {
      setData({
        ...data,
        color: [...data.color, currentColor.trim()],
      });
      setCurrentColor("");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    formData.append("image", image);
    console.log("formdata: ", formData);

    dispatch(addProduct(formData));
  };

  const closeNotification = () => {
    setNotification((prev) => !prev);
  };

  return (
    <div className="px-[130px] ">
      {notification && (
        <NotificationModal message={notification} onClose={closeNotification} />
      )}
      <div className="mt-4 flex flex-col bg-gray-100 border-gray-500   rounded-lg p-4 px-3 shadow-lg">
        <h2 className="text-black font-bold text-lg">Add Product</h2>
        <form action="" onSubmit={handleSubmit}>
          {/* Product name */}
          <div className="mt-4">
            {/* <label className="text-black" htmlFor="name">
            Product Name
          </label> */}
            <input
              placeholder="Your Product Name"
              className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={data.name}
            />
          </div>

          {/*   Decription */}
          <div className="mt-4 flex justify-content-center">
            <textarea
              placeholder="Your Description"
              className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              id="descripton"
              name="descripton"
              onChange={handleChange}
              value={data.descripton}
            ></textarea>

            <textarea
              placeholder="Your Details"
              className="w-full bg-white rounded-md border-gray-300 text-black mx-2 px-2 py-1"
              id="details"
              name="details"
              onChange={handleChange}
              value={data.details}
            ></textarea>
          </div>

          {/* Price */}
          <div className="mt-4 flex flex-row space-x-2">
            <div className="flex-1">
              <label className="text-black" htmlFor="city">
                Price
              </label>
              <input
                placeholder="Your Price"
                className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                id="price"
                type="text"
                name="price"
                onChange={handleChange}
                value={data.price}
              />
            </div>

            <div className="flex-1">
              <label className="text-black" htmlFor="state">
                Quantity
              </label>
              <input
                placeholder="Your Quantity"
                className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                id="quantity"
                type="text"
                name="quantity"
                onChange={handleChange}
                value={data.quantity}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-row space-x-2">
            {/* <div className="flex-1">
              <label className="text-black" htmlFor="zip">
                Color
              </label>
              <input
                placeholder="Your Color"
                className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                id="color"
                type="text"
                name="color"
                onChange={handleColorChange}
                value={currentColor}
              />
              <button
                type="button"
                className="bg-white text-black rounded-md px-4 py-1 hover:bg-gray-200 hover:text-gray-900 mt-2"
                onClick={addColor}
              >
                Add Color
              </button>
            </div> */}

            {/* Color start */}
            <div className="flex-1">
              <div>
                <div className="mx-2 p-2">
                  <label className="text-black" htmlFor="zip">
                    Color
                  </label>
                  <input
                    placeholder="Your Color"
                    className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                    id="color"
                    type="text"
                    name="color"
                    onChange={handleColorChange}
                    value={currentColor}
                  />
                  <button
                    type="button"
                    className="bg-white text-black rounded-md px-4 py-1 hover:bg-gray-200 hover:text-gray-900 mt-2"
                    onClick={addColor}
                  >
                    Add Color
                  </button>
                </div>
              </div>
            </div>

            {/* Size */}
            <div className="flex-1">
              <div className="mx-2 p-2">
                <label className="text-black" htmlFor="size">
                  Size
                </label>
                <input
                  placeholder="Your Size"
                  className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                  id="size"
                  type="text"
                  name="size"
                  onChange={handleSizeChange}
                  value={currentSize}
                />
                <button
                  type="button"
                  className="bg-white text-black rounded-md px-4 py-1 hover:bg-gray-200 hover:text-gray-900 mt-2"
                  onClick={addSize}
                >
                  Add Size
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-3">
            <label className="text-base font-medium text-gray-900">
              Profile Picture
            </label>
          </div>
          <div className="mt-2">
            <input
              className="file-input w-full max-w-xs bg-gray-600 p-3 text-white rounded"
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              className="bg-white text-black rounded-md px-4 py-1 hover:bg-gray-200 hover:text-gray-900"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
