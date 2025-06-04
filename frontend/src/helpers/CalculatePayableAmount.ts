export const calculatePayableAmount = (
  amount: string | number,
  selectedPayeeBankName: string | null | undefined,
  senderBankName: string | null | undefined
) => {
  if (!amount || !selectedPayeeBankName || !senderBankName) {
    return 0;
  }
  let payableAmount;
  if (selectedPayeeBankName !== senderBankName) {
    // If the sender and payee banks are the same, no fees are applied
    payableAmount = Number(amount) + 10;
  } else {
    payableAmount = Number(amount);
  }
  return payableAmount;
};
