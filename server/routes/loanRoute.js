const router = require("express").Router();
const { createCarLoan,createHomeLoan, getAllLoanApplicationForms } = require("../controllers/loan");
const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage() }); // For handling Blobs
const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory as Buffer
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit (adjust as needed)
  }
});

router.post("/create-car-loan", upload.single("bankStatement"), createCarLoan);
router.post("/create-home-loan", upload.single("bankStatement"), createHomeLoan);
router.get("/get-loan-application-forms", getAllLoanApplicationForms)

module.exports = router;