const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const Loan = require('../models/Loan');

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
        author
      } = req.body;

      const bankStatementBlob = req.file; // Assuming single file upload middleware
      console.log(req.body)
      console.log(req.file)

      // Validate required fields
      if (!loanType || !assetType || !carBrandName || !carModelName || 
          !loanAmount || !loanPeriod || !name || 
          !email || !bank || !accountNo || 
          !incomeSlab || !bankStatementBlob || !author) {
        return res.status(400).json({ message: 'All fields are required', error:true });
      }

      // Process the Blob file
      let bankStatementPath = '';
      if (bankStatementBlob) {
        const uploadDir = path.join(__dirname, '../uploads/bankStatements');
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const uniqueFileName = `${uuidv4()}.${bankStatementBlob.mimetype.split('/')[1] || 'pdf'}`;
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
        bankStatement: `/uploads/bankStatements/${path.basename(bankStatementPath)}`,
        status: 'pending',
        author
      });

      // Save to database
      const savedApplication = await newApplication.save();

      res.status(201).json({
        message: 'Loan application submitted successfully',
        application: savedApplication
      });

    } catch (error) {
      console.error('Error submitting loan application:', error);
      res.status(500).json({ 
        message: 'Error submitting loan application',
        error: error.message 
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
        author
      } = req.body;

      const bankStatementBlob = req.file; // Assuming single file upload middleware

      // Validate required fields
      if (!loanType || !assetType || 
          !loanAmount || !loanPeriod || !name || 
          !email || !bank || !accountNo || 
          !incomeSlab || !bankStatementBlob || !author) {
        return res.status(400).json({ message: 'All fields are required', error:true });
      }

      // Process the Blob file
      let bankStatementPath = '';
      if (bankStatementBlob) {
        const uploadDir = path.join(__dirname, '../uploads/bankStatements');
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const uniqueFileName = `${uuidv4()}.${bankStatementBlob.mimetype.split('/')[1] || 'pdf'}`;
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
        bankStatement: `/uploads/bankStatements/${path.basename(bankStatementPath)}`,
        status: 'pending',
        author
      });

      // Save to database
      const savedApplication = await newApplication.save();

      res.status(201).json({
        message: 'Loan application submitted successfully',
        // application: savedApplication
      });

    } catch (error) {
      console.error('Error submitting loan application:', error);
      res.status(500).json({ 
        message: 'Error submitting loan application',
        error: error.message 
      });
    }

};
exports.getAllLoanApplicationForms = async (req, res) => {
  try {
    // Fetch all customers
    const getAllLoanApplicationForms = await Loan.find().sort({
      createdAt: -1,
    }); // No .toArray() needed
    // Return the customers as a JSON response
    return res.json(getAllLoanApplicationForms);
  } catch (error) {
    // Handle errors
    return res.status(500).json({ error: "Internal Server Error" });
  }
};