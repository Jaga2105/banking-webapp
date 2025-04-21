
interface UserData {
    name: string;
    email: string;
    phone: string;
    aadhaar: string;
    address: string;
    profilePic: string;
  }
  interface APIResponse {
    error?: string;
    message?: string;
  }
const url = import.meta.env.VITE_API_URL;
export const addNewCustomer = async (userData:UserData):Promise<APIResponse> => {
  return await fetch(`${url}/admin/addCustomer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};

export const getAllCustomers = async () => {
return await fetch(`${url}/admin/getAllCustomers`, {
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

export const deleteCustomer = async (id:string) => {
return await fetch(`${url}/admin/deleteCustomer`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({id}),
})
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.error("Error:", error));
};
export const getCustomer = async (id:string) => {
return await fetch(`${url}/admin/getCustomer`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({id}),
})
  .then((response) =>response.json())
  .then((data) => {
    return data;
  })
  .catch((error) => console.error("Error:", error));
};
export const changeCustomerStatus = async (id:string, status:boolean) => {
return await fetch(`${url}/admin/changeCustomerStatus`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({id, status}),
})
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.error("Error:", error));
};
