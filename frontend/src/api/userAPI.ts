interface APIResponse {
    error?: string;
    message?: string;
    // others?:Object;
  }
  
const url = import.meta.env.VITE_API_URL;

export const getUserDetails = async (id: string): Promise<APIResponse> => {
    try {
      const response = await fetch(`${url}/user/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data; // Or handle errors based on response status
    } catch (error) {
      console.error("Error:", error);
      throw error; // Ensure the error is passed up
    }
  };

  export const updateUser = async (id: string, userData:any): Promise<APIResponse> => {
    try {
      const response = await fetch(`${url}/user/updateuser/${id}`, {
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
  export const changePassword = async (id:string, password:string) => {
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
  export const contact = async (userData:any):Promise<APIResponse> => {
    return await fetch(`${url}/user/contactUs`, {
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
  // export const sendMoney = async (userData:any): Promise<APIResponse> => {
  //   try {
  //     const response = await fetch(`${url}/user/transferMoney`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     });
  //     const data = await response.json();
  //     return data; // Or handle errors based on response status
  //   } catch (error) {
  //     console.error("Error:", error);
  //     throw error; // Ensure the error is passed up
  //   }
  // };
  