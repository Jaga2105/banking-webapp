const router = require("express").Router();
const {
  createCarLoan,
  createHomeLoan,
  getAllLoanApplicationForms,
  updateLoanApplicationStatus,
  getLoanApplicationDetailsById,
  sendAdminRequest,
  removeAdminRequest,
  uploadRequestedFile,
} = require("../controllers/loan");
const multer = require("multer");
// const upload = multer({ storage: multer.memoryStorage() }); // For handling Blobs
const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory as Buffer
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit (adjust as needed)
  },
});

router.post("/create-car-loan", upload.single("bankStatement"), createCarLoan);
router.post(
  "/create-home-loan",
  upload.single("bankStatement"),
  createHomeLoan
);
router.get("/get-loan-application-forms", getAllLoanApplicationForms);
router.put("/update-loan-status", updateLoanApplicationStatus);
router.get(
  "/get-loan-application-form-details/:id",
  getLoanApplicationDetailsById
);
router.put("/send-admin-request", sendAdminRequest);
router.put("/remove-admin-request", removeAdminRequest);
router.put(
  "/upload-requested-file",
  upload.single("requestedFile"),
  uploadRequestedFile
);
module.exports = router;
