interface LoanApplicationFormData {
  loanType: string;
  assetType: string;
  carBrandName?: string;
  carModelName?: string;
  loanAmount: number | string; // Can be number (from form) or string (during submission)
  loanPeriod: number | string; // Same as above
  name: string;
  email: string;
  bank: string;
  accountNo: string;
  incomeSlab: string; // Explicitly string (since you're using String(formData.incomeSlab))
  bankStatement: Blob | File; // Accepts both Blob (from API) or File (from file input)
  author: string;
}

interface APIResponse {
  error?: string;
  message?: string;
}
// const formData = FormData as unknown as LoanApplicationFormData;
const url = import.meta.env.VITE_API_URL;
export const createCarLoan = async (
  applicationData: FormData | LoanApplicationFormData
): Promise<APIResponse> => {
  const formData =
    applicationData instanceof FormData
      ? applicationData
      : (() => {
          const fd = new FormData();
          Object.entries(applicationData).forEach(([key, value]) => {
            fd.append(key, value instanceof Blob ? value : String(value));
          });
          return fd;
        })();

  return await fetch(`${url}/loan/create-car-loan`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    // body: JSON.stringify(applicationData),
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};
export const createHomeLoan = async (
  applicationData: FormData | LoanApplicationFormData
): Promise<APIResponse> => {
  const formData =
    applicationData instanceof FormData
      ? applicationData
      : (() => {
          const fd = new FormData();
          Object.entries(applicationData).forEach(([key, value]) => {
            fd.append(key, value instanceof Blob ? value : String(value));
          });
          return fd;
        })();

  return await fetch(`${url}/loan/create-home-loan`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    // body: JSON.stringify(applicationData),
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};

export const getAllLoanApplicationForms = async () => {
return await fetch(`${url}/loan/get-loan-application-forms`, {
  method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
})
  .then((response) => {
    return response.json()})
  .then((data) => {
    return data})
  .catch((error) => console.error("Error:", error));
};
