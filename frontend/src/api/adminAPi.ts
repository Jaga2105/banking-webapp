const url = import.meta.env.VITE_API_URL;
export const getAdminDetails =async() =>{
    return await fetch(`${url}/admin/getAdminDetails`, {
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
}