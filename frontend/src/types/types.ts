export interface LoanApplicationForm {
    assetType: string;
    carBrandName: string;
    carModelName: string;
    loanAmount: string;
    loanPeriod: string;
    name: string;
    email: string;
    bank: string;
    accountNo: string;
    incomeSlab: boolean | null;
    bankStatement: File | null;
  }