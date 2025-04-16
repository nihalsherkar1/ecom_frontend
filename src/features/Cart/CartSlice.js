import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    quantity: 0,
    error: null,
    status: false,
    showCart: false,
    open: false,
  },
  reducers: {
    addProductToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add item with quantity 1 if it doesn't exist
      }

      //   state.items.push(action.payload);
    },
    removeProductFromCart: (state, action) => {
      //   const { index } = action.payload;
      //   state.items.splice(index, 1); // remove item at the specific
      const { productId, index } = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.productId === productId
      );
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1; //Decrement quantity if more than 1
        } else {
          state.items.splice(itemIndex, 1); //Remove item from cart if quantity is 1
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setShowCart: (state) => {
      state.showCart = !state.showCart;
    },
    setOpen: (state) => {
      state.open = !state.open;
    },
  },
});
export const {
  addProductToCart,
  removeProductFromCart,
  clearCart,
  setShowCart,
  setOpen,
} = CartSlice.actions;
export default CartSlice.reducer;
