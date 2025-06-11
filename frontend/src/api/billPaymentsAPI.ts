interface Data {
    senderAccountNo?: string;
    amount?: string;
    description?: string;
    // billType: string;
    // payerId: string;
  }
  interface APIResponse {
    error?: string;
    message?: string;
  }
const url = import.meta.env.VITE_API_URL;
export const mobileRecharge = async (data:Data):Promise<APIResponse> => {
  console.log(data)
  return await fetch(`${url}/billPayment/mobileRecharge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};
export const electricityBillPayment = async (data:Data):Promise<APIResponse> => {
  console.log(data)
  return await fetch(`${url}/billPayment/electricityBill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};