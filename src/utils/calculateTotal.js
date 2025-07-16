"use client"
export const calculateCartTotal = (items) => {
 return items.reduce((acc, item) => {
   const price =
     item.product.discounted_price > 0
       ? item.product.discounted_price
       : item.product.price;
   const itemTotal = item.quantity * price;
   return acc + itemTotal;
 }, 0);
};

// export const calculateCartItemCount = (items) => {
  
//   const count = items.reduce((total, item) => total + item.quantity, 0);
//     const label = count === 1 ? "item" : "items";
//     localStorage.setItem("cart", JSON.stringify({ count: count }));
//   return `${count} ${label}`;
// };

export const calculateCartItemCount = (items) => {
  const count = items.reduce((total, item) => total + item.quantity, 0);
  const label = count === 1 ? "item" : "items";
  localStorage.setItem("cart", JSON.stringify({ count: count }));
  return count;
};