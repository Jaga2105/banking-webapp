import React, { ChangeEvent } from "react";
import { FaHome } from "react-icons/fa";
import { HiHomeModern } from "react-icons/hi2";
import { formatIndianRupees } from "../../helpers/FormatIndianRupee";

interface LoanDetailsProps {
  formData: {
    assetType: string;
    loanAmount: string;
    loanPeriod: string;
  };
  formErrors: {
    assetType?: string;
    loanAmount?: string;
    loanPeriod?: string;
  };
  onFormChange: (field: string, value: string) => void;
}
const HomeLoanDetails: React.FC<LoanDetailsProps> = ({
  formData,
  onFormChange,
  formErrors,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFormChange(e.target.name, e.target.value);
  };

  const handleRadioChange = (field: string, value: string) => {
    onFormChange(field, value);
  };

  const loanPeriods = [
    { value: "12months", label: "12 months" },
    { value: "24months", label: "24 months" },
    { value: "36months", label: "36 months" },
    { value: "48months", label: "48 months" },
    { value: "60months", label: "60 months" },
  ];

  const assetTypes = [
    {
      value: "home-construction",
      label: "Construction",
      icon: <FaHome className="h-6 w-6" />,
    },
    {
      value: "flat-purchase",
      label: "Flat Purchase",
      icon: <HiHomeModern className="h-6 w-6" />,
    },
  ];
  return (
    <div className="space-y-12 w-2/3">
      <div className="pb-12 mt-8">
        <h2 className="text-xl font-bold text-gray-900">Loan Details</h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            {/* Asset Type Selection */}
            <div>
              <div className="text-md font-semibold">Choose your Home type</div>
              <div className="mt-2 grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2">
                {assetTypes.map((asset) => (
                  <label
                    key={asset.value}
                    htmlFor={asset.value}
                    className="flex flex-col items-center gap-x-3 h-[100px] w-[120px] border-1 border-gray-200 shadow-md rounded-md p-4 cursor-pointer hover:bg-gray-200 has-[:checked]:bg-indigo-50 has-[:checked]:ring-2 has-[:checked]:ring-indigo-600"
                  >
                    <input
                      id={asset.value}
                      name="assetType"
                      value={asset.value}
                      type="radio"
                      checked={formData.assetType === asset.value}
                      className="hidden"
                      onChange={() =>
                        handleRadioChange("assetType", asset.value)
                      }
                    />
                    {asset.icon}
                    <span className="block text-sm/6 font-medium text-gray-900 pointer-events-none">
                      {asset.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Loan Amount */}
            <div className="w-full">
              <div className="mt-4">
                <label htmlFor="loanAmount">Loan Amount (&#8377;)</label>
                <div className="mt-2">
                  <input
                    id="loanAmount"
                    name="loanAmount"
                    type="text"
                    value={formatIndianRupees(formData.loanAmount)}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 ${
                      formErrors.loanAmount
                        ? "outline-red-400"
                        : "outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    }  sm:text-sm/6`}
                  />
                </div>
                {formErrors.loanAmount && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.loanAmount}
                  </p>
                )}
              </div>
            </div>

            {/* Loan Period */}
            <div className="mt-2">
              <div className="text-md font-semibold">
                Your preferred loan period
              </div>
              <div className="mt-2 flex gap-2 flex-wrap">
                {loanPeriods.map((period) => (
                  <label
                    key={period.value}
                    htmlFor={period.value}
                    className="flex flex-col items-center justify-center gap-x-3 h-[40px] w-[100px] border-1 border-gray-200 shadow-md rounded-md p-4 cursor-pointer hover:bg-gray-200 has-[:checked]:bg-indigo-50 has-[:checked]:ring-2 has-[:checked]:ring-indigo-600"
                  >
                    <input
                      id={period.value}
                      name="loanPeriod"
                      value={period.value}
                      type="radio"
                      checked={formData.loanPeriod === period.value}
                      className="hidden"
                      onChange={() =>
                        handleRadioChange("loanPeriod", period.value)
                      }
                    />
                    <span className="block text-xs font-medium text-gray-900 pointer-events-none">
                      {period.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoanDetails;
