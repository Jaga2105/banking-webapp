
interface UserData {
    name: string;
    careOf: string;
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
    console.log(userData)
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
    console.log(response)
    return response.json()})
  .then((data) => {
    console.log(data)
    return data})
  .catch((error) => console.error("Error:", error));
};

export const deleteCustomer = async (id:string) => {
  console.log(id)
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
  console.log(id)
return await fetch(`${url}/admin/getCustomer`, {
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