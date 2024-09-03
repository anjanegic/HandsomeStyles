export const generateDiscountCode = () => {
  return "DISCOUNT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
};
