import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { addNewCard, applyNewCard } from "../../api/cardsAPI";
import { toast } from "react-toastify";

const bankList = [
  { id: 1, bankName: "SBI" },
  { id: 2, bankName: "HDFC" },
  { id: 3, bankName: "ICICI" },
  { id: 4, bankName: "Axis Bank" },
  { id: 5, bankName: "Kotak" },
  { id: 6, bankName: "Union Bank" },
  { id: 7, bankName: "Bank of Baroda" },
];

const ApplyCardModal = ({
  setShowAddCardModal,
  setIsChangeDetected,
  customerList,
}: any) => {
  const storedUser: any = localStorage.getItem("user");
  let loggedInUser: any;
  if (storedUser) {
    // Parse the string into a JavaScript object
    loggedInUser = JSON.parse(storedUser);
  }
  const [formData, setFormData] = useState({
    selectedBank: "",
    cardType: "debit", // Default to debit
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [cardAuthor, setCardAuthor] = useState("");

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "cardNumber":
        return /^\d{16}$/.test(value.replace(/\s/g, ""))
          ? ""
          : "Card number must be 16 digits";
      case "cardHolderName":
        return value.trim() ? "" : "Card holder name is required";
      case "expiryDate":
        return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value)
          ? ""
          : "Expiry must be in MM/YY format";
      case "cvv":
        return /^\d{3}$/.test(value) ? "" : "CVV must be 3 digits";
      case "selectedBank":
        return value.trim() ? "" : "Please select a bank";
      default:
        return "";
    }
  };

  const validateForm = (newData: typeof formData): boolean => {
    const newErrors: Record<string, string> = {};
    for (const key in newData) {
      const err = validateField(key, newData[key as keyof typeof newData]);
      if (err) newErrors[key] = err;
    }
    setErrors(newErrors);
    const valid = Object.keys(newErrors).length === 0;
    setIsFormValid(valid);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    

    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    const errorMsg = validateField(name, value);
    console.log(errorMsg);value
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));

    const valid =
      Object.values(updatedForm).every((val) => val.trim() !== "") &&
      Object.values({ ...errors, [name]: errorMsg }).every((msg) => msg === "");

    setIsFormValid(valid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    const data = {
      bankName: formData.selectedBank,
      cardType: formData.cardType,
      author: loggedInUser._id,
    };

    const res: any = await applyNewCard(data);
    console.log(res);
    if (!res.error) {
      setShowAddCardModal(false);
      setIsChangeDetected((prev: boolean) => !prev);
      toast.success(`${data.cardType.charAt(0).toUpperCase() + data.cardType.slice(1)} card applied successfully!`);
    } else {
      toast.error(res.message || "Failed to apply for new card");
      console.error("Error adding card:", res.message);
    }
    console.log("Form Data:", data);
  };
  console.log(customerList);
  console.log(cardAuthor);
  return (
    <div className="absolute inset-0 flex items-center justify-center z-30">
      <div
        className="fixed h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40"
        onClick={() => setShowAddCardModal(false)}
      >
        <form
          className="w-full h-[100vh] flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div
            className="relative min-h-[300px] w-[400px] bg-white rounded-md py-10 px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-3 right-3 z-50 cursor-pointer text-gray-500">
              <RxCross2
                className="h-8 w-8"
                onClick={() => setShowAddCardModal(false)}
              />
            </div>
            <div className="text-lg font-semibold mb-3">Apply New Card</div>

            <div className="flex flex-col gap-4">
              {/* Bank Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="selectedBank" className="text-lg">
                  Select Bank
                </label>
                <select
                  name="selectedBank"
                  id="selectedBank"
                  className="outline-none border-1 border-blue-200 shadow-md rounded-md px-2 py-1"
                  onChange={handleChange}
                  value={formData.selectedBank}
                >
                  <option value="">Select Bank</option>
                  {bankList.map((bank: any) => {
                    return (
                      <option key={bank.id} value={bank.bankName}>
                        {bank.bankName}
                      </option>
                    );
                  })}
                </select>
                {errors.selectedBank && (
                  <p className="text-red-500 text-sm">{errors.selectedBank}</p>
                )}
              </div>
              {/* Card Type */}
              <div className="flex flex-col gap-1">
                <label htmlFor="cardType" className="text-md">
                  Card Type
                </label>
                <div className="flex gap-4">
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="cardType"
                      id="debit"
                      value={"debit"}
                      onChange={handleChange}
                      checked={formData.cardType === "debit"}
                    />
                    <label htmlFor="debit" className="text-sm">
                      Debit
                    </label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="cardType"
                      id="credit"
                      value={"credit"}
                      onChange={handleChange}
                      checked={formData.cardType === "credit"}
                    />
                    <label htmlFor="credit" className="text-sm">
                      Credit
                    </label>
                  </div>
                </div>
                {/* {errors.selectedBank && (
                  <p className="text-red-500 text-sm">{errors.selectedBank}</p>
                )} */}
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <div
                  className="mt-4 px-4 py-2 w-1/2 bg-gray-100 rounded-full flex justify-center items-center hover:bg-gray-200 transition-colors cursor-pointer font-semibold shadow-sm"
                  onClick={() => setShowAddCardModal(false)}
                >
                  Cancel
                </div>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`mt-4 px-4 py-2 w-1/2 rounded-full font-semibold shadow-sm transition-colors ${
                    isFormValid
                      ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyCardModal;
