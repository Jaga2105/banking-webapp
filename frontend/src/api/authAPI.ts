interface UserData {
    username: string;
    email: string;
    password: string;
  }
  interface APIResponse {
    error?: string;
    message?: string;
  }
  
const url = import.meta.env.VITE_API_URL;
export const registerUser = async (userData:UserData):Promise<APIResponse> => {
    console.log(userData)
  return await fetch(`${url}/auth/register`, {
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