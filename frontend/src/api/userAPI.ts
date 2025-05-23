interface APIResponse {
    error?: string;
    message?: string;
    // others?:Object;
  }
  
const url = import.meta.env.VITE_API_URL;

export const getUserDetails = async (id: string): Promise<APIResponse> => {
    try {
      console.log(id);
      const response = await fetch(`${url}/user/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)
      const data = await response.json();
      console.log(data)
      return data; // Or handle errors based on response status
    } catch (error) {
      console.error("Error:", error);
      throw error; // Ensure the error is passed up
    }
  };

  export const updateUser = async (id: string, userData:any): Promise<APIResponse> => {
    console.log(userData)
    try {
      console.log(id);
      const response = await fetch(`${url}/user/updateuser/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(data)
      return data; // Or handle errors based on response status
    } catch (error) {
      console.error("Error:", error);
      throw error; // Ensure the error is passed up
    }
  };
  export const changePassword = async (id:string, password:string) => {
    console.log(id)
  return await fetch(`${url}/user/changePassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id, password}),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
  };
  export const sendMoney = async (userData:any): Promise<APIResponse> => {
    console.log(userData)
    try {
      const response = await fetch(`${url}/user/transferMoney`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data; // Or handle errors based on response status
    } catch (error) {
      console.error("Error:", error);
      throw error; // Ensure the error is passed up
    }
  };
  