// store/loanApplicationSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllLoanApplicationForms,
  getLoanApplicationDEtails,
  udloadRequestedDocument,
} from "../../api/loanAPI"; // adjust path

const storedUser: any = localStorage.getItem("user");
let loggedInUser: any;
if (storedUser) {
  // Parse the string into a JavaScript object
  loggedInUser = JSON.parse(storedUser);
}
interface UploadRequestPayload {
  file: Blob;
  id: string;
  adminRequest: boolean;
  adminRequestComment: string;
}

// Thunk to fetch data
export const fetchLoanApplications = createAsyncThunk(
  "loanApplications/fetchAll",
  async (_, { getState }) => {
    const res = await getAllLoanApplicationForms();
    const state: any = getState();
    const userId = loggedInUser._id; // adjust based on your store
    return res.filter(
      (loan: any) => loan.author === userId && loan.adminRequest
    );
  }
);
export const fetchLoanApplicationDetails = createAsyncThunk(
  "loanApplications/fetchById",
  async (id: string, { getState }) => {
    const res = await getLoanApplicationDEtails(id);
    const state: any = getState();
    const userId = loggedInUser._id; // adjust based on your store
    console.log(res)
    // return res.filter(
    //   (loan: any) => loan.author === userId && loan.adminRequest
    // );
    return res; // Assuming res is the application details object
  }
);
export const uploadRequestedFile = createAsyncThunk(
  "loanApplications/updateRequestedFile",
  async (data: UploadRequestPayload, { getState }) => {
    console.log("Data in thunk:", data);
    const res = await udloadRequestedDocument(data);
    // if(res.ok){
    //   await fetchLoanApplicationDetails(data.id)
    //   return;
    // }
    // await fetchLoanApplications();
    console.log(res);
    const state: any = getState();
    const userId = loggedInUser._id; // adjust based on your store
    // return res.filter(
    //   (loan: any) => loan.author === userId && loan.adminRequest
    // );
    return res.ok;
  }
);

const loanApplicationSlice = createSlice({
  name: "loanApplications",
  initialState: {
    loanApplications: [],
    applicationDetails: null,
    fileUploaded: false,
    // status: "idle", // 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanApplications.pending, (state) => {
        // state.status = "loading";
      })
      .addCase(fetchLoanApplications.fulfilled, (state, action) => {
        // state.status = "succeeded";
        state.loanApplications = action.payload;
      })
      .addCase(fetchLoanApplications.rejected, (state, action) => {
        // state.status = "failed";
        // state.error = action.error.message || "Failed to fetch";
      });

    builder
      .addCase(fetchLoanApplicationDetails.pending, (state) => {
        // state.status = "loading";
      })
      .addCase(fetchLoanApplicationDetails.fulfilled, (state, action) => {
        // state.status = "succeeded";
        state.applicationDetails = action.payload;
      })
      .addCase(fetchLoanApplicationDetails.rejected, (state, action) => {
        // state.status = "failed";
        // state.error = action.error.message || "Failed to fetch loan application details.";
      });

    builder
      .addCase(uploadRequestedFile.pending, (state) => {
        // state.status = "loading";
      })
      .addCase(uploadRequestedFile.fulfilled, (state, action) => {
        // state.status = "succeeded";
        console.log("File upload response:", action.payload);
        state.fileUploaded = action.payload;
      })
      .addCase(uploadRequestedFile.rejected, (state, action) => {
        // state.status = "failed";
        // state.error = action.error.message || "Failed to fetch loan application details.";
      });
  },
});

export default loanApplicationSlice.reducer;
