export const shippingCosts = {
  "home delivery": 6,
  "drop Point delivery": 3,
  "express delivery": 12,
  "click and collect": 0,
};

export const getShippingCost = (shippingType) => {
  return shippingCosts[shippingType] ?? 0;
};
