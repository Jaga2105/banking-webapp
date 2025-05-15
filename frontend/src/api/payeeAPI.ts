interface PayeeData {
    bankName: string;
    bankLogo: string;
    accountNo: string;
    payeeName: string;
  }
  interface APIResponse {
    error?: string;
    message?: string;
  }
const url = import.meta.env.VITE_API_URL;
export const addNewPayee = async (payeeData:PayeeData):Promise<APIResponse> => {
  return await fetch(`${url}/payee/addPayee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payeeData),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};
export const getAllPayee = async () => {
return await fetch(`${url}/payee/getPayees`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    return response.json()})
  .then((data) => {
    return data})
  .catch((error) => console.error("Error:", error));
};