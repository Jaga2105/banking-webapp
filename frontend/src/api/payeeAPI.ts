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
export const getAllPayee = async (payerId:string) => {
return await fetch(`${url}/payee/getPayees/${payerId}`, {
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

export const deletePayee = async (id:string) => {
return await fetch(`${url}/payee/deletePayee`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({id}),
})
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.error("Error:", error));
};

export const getPayee = async (id:string) => {
return await fetch(`${url}/payee/getPayee/${id}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  // body: JSON.stringify({id}),
})
  .then((response) =>response.json())
  .then((data) => {
    return data;
  })
  .catch((error) => console.error("Error:", error));
};
export const updatePayee = async (id: string, payeeData:any): Promise<APIResponse> => {
    // console.log(userData)
    try {
      console.log(id);
      const response = await fetch(`${url}/payee/updatePayee/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payeeData),
      });
      const data = await response.json();
      console.log(data)
      return data; // Or handle errors based on response status
    } catch (error) {
      console.error("Error:", error);
      throw error; // Ensure the error is passed up
    }
  };