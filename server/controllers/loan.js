const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const Loan = require("../models/Loan");

exports.createCarLoan = async (req, res) => {
  try {
    // Since you're using FormData, fields are in req.body and file is in req.file
    const {
      loanType,
      assetType,
      carBrandName,
      carModelName,
      loanAmount,
      loanPeriod,
      name,
      email,
      bank,
      accountNo,
      incomeSlab,
      author,
    } = req.body;

    const bankStatementBlob = req.file; // Assuming single file upload middleware

    // Validate required fields
    if (
      !loanType ||
      !assetType ||
      !carBrandName ||
      !carModelName ||
      !loanAmount ||
      !loanPeriod ||
      !name ||
      !email ||
      !bank ||
      !accountNo ||
      !incomeSlab ||
      !bankStatementBlob ||
      !author
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: true });
    }

    // Process the Blob file
    let bankStatementPath = "";
    if (bankStatementBlob) {
      const uploadDir = path.join(__dirname, "../uploads/bankStatements");

      // Create directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uniqueFileName = `${uuidv4()}.${
        bankStatementBlob.mimetype.split("/")[1] || "pdf"
      }`;
      bankStatementPath = path.join(uploadDir, uniqueFileName);

      // Write the buffer to file
      fs.writeFileSync(bankStatementPath, bankStatementBlob.buffer);
    }

    // Create new loan application
    const newApplication = new Loan({
      loanType,
      assetType,
      carBrandName,
      carModelName,
      loanAmount: parseFloat(loanAmount),
      loanPeriod,
      name,
      email,
      bank,
      accountNo,
      incomeSlab,
      bankStatement: `/uploads/bankStatements/${path.basename(
        bankStatementPath
      )}`,
      status: "pending",
      author,
    });

    // Save to database
    const savedApplication = await newApplication.save();

    res.status(201).json({
      message: "Loan application submitted successfully",
      application: savedApplication,
    });
  } catch (error) {
    console.error("Error submitting loan application:", error);
    res.status(500).json({
      message: "Error submitting loan application",
      error: error.message,
    });
  }
};
exports.createHomeLoan = async (req, res) => {
  try {
    // Since you're using FormData, fields are in req.body and file is in req.file
    const {
      loanType,
      assetType,
      loanAmount,
      loanPeriod,
      name,
      email,
      bank,
      accountNo,
      incomeSlab,
      author,
    } = req.body;

    const bankStatementBlob = req.file; // Assuming single file upload middleware

    // Validate required fields
    if (
      !loanType ||
      !assetType ||
      !loanAmount ||
      !loanPeriod ||
      !name ||
      !email ||
      !bank ||
      !accountNo ||
      !incomeSlab ||
      !bankStatementBlob ||
      !author
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: true });
    }

    // Process the Blob file
    let bankStatementPath = "";
    if (bankStatementBlob) {
      const uploadDir = path.join(__dirname, "../uploads/bankStatements");

      // Create directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uniqueFileName = `${uuidv4()}.${
        bankStatementBlob.mimetype.split("/")[1] || "pdf"
      }`;
      bankStatementPath = path.join(uploadDir, uniqueFileName);

      // Write the buffer to file
      fs.writeFileSync(bankStatementPath, bankStatementBlob.buffer);
    }

    // Create new loan application
    const newApplication = new Loan({
      loanType,
      assetType,
      loanAmount: parseFloat(loanAmount),
      loanPeriod,
      name,
      email,
      bank,
      accountNo,
      incomeSlab,
      bankStatement: `/uploads/bankStatements/${path.basename(
        bankStatementPath
      )}`,
      status: "pending",
      author,
    });

    // Save to database
    const savedApplication = await newApplication.save();

    res.status(201).json({
      message: "Loan application submitted successfully",
      // application: savedApplication
    });
  } catch (error) {
    console.error("Error submitting loan application:", error);
    res.status(500).json({
      message: "Error submitting loan application",
      error: error.message,
    });
  }
};
exports.getAllLoanApplicationForms = async (req, res) => {
  try {
    // Fetch all customers
    const getAllLoanApplicationForms = await Loan.find().sort({
      createdAt: -1,
    });
    // Return the customers as a JSON response
    return res.json(getAllLoanApplicationForms);
  } catch (error) {
    // Handle errors
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateLoanApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    // Validate required fields
    if (!id || !status) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: true });
    }

    const result = await Loan.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      { new: true } // Returns the updated document (default: false)
    );
    if (result) {
      res.status(200).json({ message: "Status updated successfully" });
    } else {
      res.status(404).json({ error: true, message: "Failed to update status" });
    }
  } catch (error) {
    console.error("Error submitting loan application:", error);
    res.status(500).json({
      message: "Error submitting loan application",
      error: error.message,
    });
  }
};
exports.getLoanApplicationDetailsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Loan.findOne({ _id: id });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: true, message: "Customer not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};
exports.sendAdminRequest = async (req, res) => {
  try {
    const { id, adminRequest, adminRequestComment } = req.body;

    // Validate required fields
    if (!id || !adminRequest || !adminRequestComment) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: true });
    }

    const result = await Loan.findByIdAndUpdate(
      id,
      {
        adminRequest: adminRequest,
        adminRequestComment: adminRequestComment,
      },
      { new: true } // Returns the updated document (default: false)
    );
    if (result) {
      res.status(200).json({ message: "Request sent successfully" });
    } else {
      res
        .status(404)
        .json({ error: true, message: "Failed to send the request" });
    }
  } catch (error) {
    console.error("Error submitting loan application:", error);
    res.status(500).json({
      message: "Error submitting loan application",
      error: error.message,
    });
  }
};
exports.removeAdminRequest = async (req, res) => {
  try {
    const { id, adminRequest, adminRequestComment } = req.body;

    // Validate required fields
    if (!id || adminRequest || adminRequestComment) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: true });
    }

    const result = await Loan.findByIdAndUpdate(
      id,
      {
        adminRequest: adminRequest,
        adminRequestComment: adminRequestComment,
      },
      { new: true } // Returns the updated document (default: false)
    );
    if (result) {
      res.status(200).json({ message: "Admin request removed successfully" });
    } else {
      res
        .status(404)
        .json({ error: true, message: "Failed to remove admin request" });
    }
  } catch (error) {
    console.error("Error removing admin request:", error);
    res.status(500).json({
      message: "Error submitting loan application",
      error: error.message,
    });
  }
};
exports.uploadRequestedFile = async (req, res) => {
  try {
    console.log("Uploading requested file...");
    const { id, adminRequest, adminRequestComment } = req.body;
    const requestedFileBlob = req.file; 
    // Assuming single file upload middleware

    // Validate required fields
    if (!id || !requestedFileBlob) {
      console.log("Validation failed");
      return res
        .status(400)
        .json({ message: "All fields are required", error: true });
    }
    console.log("Validation passed");
    // Process the Blob file
    let requestedFilePath = "";
    if (requestedFileBlob) {
      const uploadDir = path.join(__dirname, "../uploads/requestedFiles");

      // Create directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uniqueFileName = `${uuidv4()}.${
        requestedFileBlob.mimetype.split("/")[1] || "pdf"
      }`;
      requestedFilePath = path.join(uploadDir, uniqueFileName);

      // Write the buffer to file
      fs.writeFileSync(requestedFilePath, requestedFileBlob.buffer);
    }
    console.log(requestedFilePath);

    const result = await Loan.findByIdAndUpdate(
      id,
      {
        adminRequest: adminRequest || false,
        adminRequestComment: adminRequestComment || "",
        requestedFile: `/uploads/requestedFiles/${path.basename(
        requestedFilePath
      )}`,
      },
      { new: true } // Returns the updated document (default: false)
    );
    console.log(result)
    if (result) {
      res.status(200).json({ok:true, message: "Requested file uploaded successfully" });
    } else {
      res
        .status(404)
        .json({ error: true, message: "Failed to upload the requested file" });
    }
  } catch (error) {
    console.error("Error uploading requested file:", error);
    res.status(500).json({
      message: "Error uploading requested file",
      error: error.message,
    });
  }
};