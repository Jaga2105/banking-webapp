interface APIResponse {
    error?: string;
    message?: string;
    // others?:Object;
  }
  
const url = import.meta.env.VITE_API_URL;

export const sendMoney = async (userData:any): Promise<APIResponse> => {
    try {
      const response = await fetch(`${url}/transaction/transferMoney`, {
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
  export const mobileRecharge = async (userData:any): Promise<APIResponse> => {
    try {
      const response = await fetch(`${url}/transaction/mobileRecharge`, {
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
  export const electricityBillPayment = async (userData:any): Promise<APIResponse> => {
    try {
      const response = await fetch(`${url}/transaction/electricityBillPayment`, {
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