export async function placeOrder(order) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { id: `ORD-${Date.now()}` };
}