import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { addNewCard } from "../../api/cardsAPI";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateAnyChangeDetected } from "../../store/reducers/cardReducer";
import { PulseLoader } from "react-spinners";

const bankList = [
  { id: 1, bankName: "SBI" },
  { id: 2, bankName: "HDFC" },
  { id: 3, bankName: "ICICI" },
  { id: 4, bankName: "Axis Bank" },
  { id: 5, bankName: "Kotak" },
  { id: 6, bankName: "Union Bank" },
  { id: 7, bankName: "Bank of Baroda" },
];

const AddCardModal = ({
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
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
    selectedBank: "",
    cardType: "debit", // Default to debit
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [cardAuthor, setCardAuthor] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const isChangeDetected = useSelector(
    (state: any) => state.card.isChangeDetected
  );

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
    let formattedValue = value;

    if (name === "cardNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 16);
      formattedValue = cleaned.replace(/(.{4})/g, "$1 ").trim();
    }

    if (name === "expiryDate") {
      // Remove non-digit characters
      const cleaned = value.replace(/[^\d]/g, "").slice(0, 4);

      let month = cleaned.slice(0, 2);
      let year = cleaned.slice(2, 4);

      // If month is more than 12, clamp it to 12
      if (month.length === 2 && parseInt(month, 10) > 12) {
        month = "12";
      }

      formattedValue = month;
      if (year) {
        formattedValue += `/${year}`;
      }
    }

    const updatedForm = { ...formData, [name]: formattedValue };
    setFormData(updatedForm);

    const errorMsg = validateField(name, formattedValue);
    console.log(errorMsg);
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
      cardNumber: formData.cardNumber,
      cardHolderName: formData.cardHolderName,
      expiryDate: formData.expiryDate,
      cvv: formData.cvv,
      bankName: formData.selectedBank,
      cardType: formData.cardType,
      author: cardAuthor,
    };

    setIsFetching((prev)=>!prev);
    const res: any = await addNewCard(data);
    console.log(res);
    if (!res.error) {
      setShowAddCardModal(false);
      // setIsChangeDetected((prev: boolean) => !prev);
      dispatch(updateAnyChangeDetected(!isChangeDetected));
      toast.success("Card added successfully!");
    } else {
      toast.error(res.message || "Failed to add card");
      console.error("Error adding card:", res.message);
    }
    setIsFetching((prev)=>!prev)
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
            className="relative min-h-[400px] w-[500px] bg-white rounded-md py-6 px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-3 right-3 z-50 cursor-pointer text-gray-500">
              <RxCross2
                className="h-8 w-8"
                onClick={() => setShowAddCardModal(false)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold mb-2">Add New Card</div>

              {/* Card Number */}
              <div className="flex flex-col gap-1">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-200"
                  placeholder="0000 0000 0000 0000"
                />
                {errors.cardNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.cardNumber}
                  </span>
                )}
              </div>
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

              {/* Card Holder */}
              {/* <div className="flex flex-col gap-1">
                <label htmlFor="cardHolderName">Card Holder Name</label>
                <input
                  type="text"
                  id="cardHolderName"
                  name="cardHolderName"
                  value={formData.cardHolderName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-200"
                  placeholder="John Doe"
                />
                {errors.cardHolderName && (
                  <span className="text-red-500 text-sm">
                    {errors.cardHolderName}
                  </span>
                )}
              </div> */}
              <div className="flex flex-col gap-1">
                <label htmlFor="cardHolderName" className="text-lg">
                  Card Holder
                </label>
                {/* <select
                  name="cardHolderName"
                  id="cardHolderName"
                  className="outline-none border-1 border-blue-200 shadow-md rounded-md px-2 py-1"
                  onChange={handleChange}
                  value={formData.cardHolderName}
                >
                  <option value="">Select Customer</option>
                  {customerList.map((customer: any) => {
                    return (
                      <option
                        key={customer._id}
                        value={customer.name}
                        onClick={() => setCardAuthor(customer._id)}
                      >
                        {customer.name}
                      </option>
                    );
                  })}
                </select> */}
                <select
                  name="cardHolderName"
                  id="cardHolderName"
                  className="outline-none border-1 border-blue-200 shadow-md rounded-md px-2 py-1"
                  onChange={(e) => {
                    setCardAuthor(e.target.value); // Store _id directly
                    const selectedCustomer = customerList.find(
                      (c: any) => c._id === e.target.value
                    );
                    if (selectedCustomer) {
                      handleChange({
                        target: {
                          name: "cardHolderName",
                          value: selectedCustomer.name,
                        },
                      } as React.ChangeEvent<HTMLInputElement>);
                    }
                  }}
                  value={cardAuthor} // bind to selected _id
                >
                  <option value="">Select Customer</option>
                  {customerList.map((customer: any) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.name}
                    </option>
                  ))}
                </select>

                {errors.cardHolderName && (
                  <p className="text-red-500 text-sm">
                    {errors.cardHolderName}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                {/* Expiry */}
                <div className="flex flex-col gap-1 w-1/2">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-200"
                    placeholder="MM/YY"
                  />
                  {errors.expiryDate && (
                    <span className="text-red-500 text-sm">
                      {errors.expiryDate}
                    </span>
                  )}
                </div>

                {/* CVV */}
                <div className="flex flex-col gap-1 w-1/2">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-200"
                    placeholder="123"
                  />
                  {errors.cvv && (
                    <span className="text-red-500 text-sm">{errors.cvv}</span>
                  )}
                </div>
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
                  {!isFetching ? "Add Card" : 
                  <PulseLoader size={6} color="white" />}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;
