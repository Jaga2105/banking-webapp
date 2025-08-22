interface Data {
    cardNumber?: string;
    cardHolderName?: string;
    expiryDate?: string;
    cvv?: string;
    bankName:string;
    cardType: string; // 'debit' or 'credit'
    author: string;
  }
interface APIResponse {
    error?: string;
    message?: string;
  }
const url = import.meta.env.VITE_API_URL;
export const addNewCard = async (data:Data):Promise<APIResponse> => {
  console.log(data)
  return await fetch(`${url}/card/add-new-card`, {
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

export const getCardsById = async (id:string) => {
return await fetch(`${url}/card/get-cards/${id}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) =>response.json())
  .then((data) => {
    return data;
  })
  .catch((error) => console.error("Error:", error));
};
export const getAllCards = async () => {
return await fetch(`${url}/card/get-all-cards`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) =>response.json())
  .then((data) => {
    return data;
  })
  .catch((error) => console.error("Error:", error));
};

export const deleteCardById = async (cardId:string) => {
return await fetch(`${url}/card/delete-card/${cardId}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
  // body: JSON.stringify({cardId}),
})
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.error("Error:", error));
};
export const applyNewCard = async (data:Data):Promise<APIResponse> => {
  console.log(data)
  return await fetch(`${url}/card/apply-card`, {
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
export const getAllCardApplications = async () => {
return await fetch(`${url}/card/get-all-card-applications`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) =>response.json())
  .then((data) => {
    return data;
  })
  .catch((error) => console.error("Error:", error));
};