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
interface UploadRequestPayload {
  file: Blob;
  id: string;
  adminRequest: boolean;
  adminRequestComment: string;
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
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.error("Error:", error));
};

export const changeLoanApplicationStatus = async (
  id: string,
  status: string
) => {
  return await fetch(`${url}/loan/update-loan-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, status }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};

export const getLoanApplicationDEtails = async (id: string) => {
  console.log(id);
  return await fetch(`${url}/loan/get-loan-application-form-details/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error("Error:", error));
};

export const sendAdminRequest = async (
  id: string,
  adminRequest: boolean,
  adminRequestComment: string
) => {
  return await fetch(`${url}/loan/send-admin-request`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, adminRequest, adminRequestComment }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};

export const removeAdminRequest = async (
  id: string,
  adminRequest: boolean,
  adminRequestComment: string
) => {
  return await fetch(`${url}/loan/remove-admin-request`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, adminRequest, adminRequestComment }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error));
};

export const udloadRequestedDocument = async (data: UploadRequestPayload) => {
  const { file, id, adminRequest, adminRequestComment } = data;
  console.log(typeof file);
  const formData = new FormData();
  formData.append("requestedFile", file); // this must match `upload.single("file")`
  formData.append("id", id);
  formData.append("adminRequest", String(adminRequest));
  formData.append("adminRequestComment", adminRequestComment);

  return await fetch(`${url}/loan/upload-requested-file`, {
    method: "PUT",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify({ id, adminRequest, adminRequestComment, file }),
    body: formData,
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.error("Error:", error));
};
