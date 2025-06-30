import React, { FormEvent, useState } from "react";
import { contact } from "../api/userAPI";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comments: string;
};

type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  comments?: string;
};

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comments: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.comments.trim()) {
      newErrors.comments = "Comments are required";
    } else if (formData.comments.length < 10) {
      newErrors.comments = "Comments must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with submission
      setIsLoading(true);
      const res: any = await contact(formData);
      console.log(res);
      if (!res.error) {
        toast.success("Message sent Successfully");
      } else {
        toast.error(res.error);
      }
      setIsLoading(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        comments: "",
      });
      // Add your form submission logic here (e.g., API call)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-50px)] bg-[#1f7392]">
      <div className="h-full w-3/4 py-4 flex flex-col gap-2 items-center">
        <div className="text-3xl text-white">Request a Consultation</div>
        <div className="text-2xl text-white">
          Let us help you accomplish big goals.
        </div>
        <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex justify-between w-full gap-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="firstName"
                className="text-white text-lg font-semibold"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="off"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="h-8 w-full bg-white focus:outline-none py-2 px-2 rounded-sm"
              />
              {errors.firstName && (
                <span className="text-red-300 text-sm">{errors.firstName}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="lastName"
                className="text-white text-lg font-semibold"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="off"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="h-8 w-full bg-white focus:outline-none py-2 px-2 rounded-sm"
              />
              {errors.lastName && (
                <span className="text-red-300 text-sm">{errors.lastName}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-white text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="Enter email.."
              value={formData.email}
              onChange={handleChange}
              className="h-8 w-full bg-white focus:outline-none py-2 px-2 rounded-sm"
            />
            {errors.email && (
              <span className="text-red-300 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-white text-lg font-semibold">
              Phone
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              name="phone"
              id="phone"
              autoComplete="off"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className="h-8 w-full bg-white focus:outline-none py-2 px-2 rounded-sm"
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                  e.preventDefault();
                }
              }}
            />
            {errors.phone && (
              <span className="text-red-300 text-sm">{errors.phone}</span>
            )}
            {/* <input
              type="text"
              maxLength={10}
              inputMode="numeric"
              pattern="[0-9]*"
              name="phone"
              id="emphoneail"
              autoComplete="off"
              placeholder="Enter phone No.."
              className="h-8 w-full bg-white focus:outline-none py-2 px-2 rounded-sm"
            /> */}
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="comments"
              className="text-white text-lg font-semibold"
            >
              Comments
            </label>
            <textarea
              name="comments"
              id="comments"
              autoComplete="off"
              placeholder="Enter what's in your mind..."
              value={formData.comments}
              onChange={handleChange}
              cols={3}
              className="w-full bg-white focus:outline-none py-2 px-2 rounded-sm"
            />
            {errors.comments && (
              <span className="text-red-300 text-sm">{errors.comments}</span>
            )}
          </div>
          <button
            type="submit"
            className="mt-2 border-2 border-blue-200 text-white text-lg font-semibold rounded-sm cursor-pointer hover:bg-[#7abed7]"
          >
            {!isLoading ? (
            "Send Message"
          ) : (
            <PulseLoader className="text-white" color="white" size={8} />
          )}
          </button>
          {/* <div className="relative h-14 mt-8 bg-white rounded-md">
            <input
              type="name"
              id="name"
              placeholder=""
              className="block w-full h-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-transparent peer"
              autoComplete="off"
              required
            />
            <label
              htmlFor="name"
              className="absolute top-1/2 text-gray-500 transition-all duration-200 ease-in-out
                   peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                   peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500
                   bg-white px-1 peer-focus:px-1"
            >
              Enter Name
            </label>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

// import React, { useState } from "react";

// type FormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   comments: string;
// };

// type FormErrors = {
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   phone?: string;
//   comments?: string;
// };

// const ContactUs = () => {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     comments: "",
//   });

//   const [errors, setErrors] = useState<FormErrors>({});

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};

//     if (!formData.firstName.trim()) {
//       newErrors.firstName = "First name is required";
//     } else if (formData.firstName.length < 2) {
//       newErrors.firstName = "First name must be at least 2 characters";
//     }

//     if (!formData.lastName.trim()) {
//       newErrors.lastName = "Last name is required";
//     } else if (formData.lastName.length < 2) {
//       newErrors.lastName = "Last name must be at least 2 characters";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must be 10 digits";
//     }

//     if (!formData.comments.trim()) {
//       newErrors.comments = "Comments are required";
//     } else if (formData.comments.length < 10) {
//       newErrors.comments = "Comments must be at least 10 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       // Form is valid, proceed with submission
//       console.log("Form submitted:", formData);
//       // Add your form submission logic here (e.g., API call)
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-[calc(100vh-50px)] bg-[#1f7392]">
//       <div className="h-full w-3/4 py-4 flex flex-col gap-2 items-center">
//         <div className="text-3xl text-white">Request a Consultation</div>
//         <div className="text-2xl text-white">
//           Let us help you accomplish big goals.
//         </div>
//         <form
//           onSubmit={handleSubmit}
//           className="mt-4 flex flex-col gap-4 w-full max-w-2xl"
//         >
//           <div className="flex justify-between w-full gap-2">
//             <div className="flex flex-col gap-1 w-full">
//               <label
//                 htmlFor="firstName"
//                 className="text-white text-lg font-semibold"
//               >
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 id="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 autoComplete="off"
//                 placeholder="Enter First Name"
//                 className="h-8 w-full bg-white focus:outline-none py-2 px-2 rounded-sm"
//               />
//               {errors.firstName && (
//                 <span className="text-red-300 text-sm">{errors.firstName}</span>
//               )}
//             </div>
//             <div className="flex flex-col gap-1 w-full">
//               <label
//                 htmlFor="lastName"
//                 className="text-white text-lg font-semibold"
//               >
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 id="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 autoComplete="off"
//                 placeholder="Enter Last Name"
//                 className="h-8 w-full bg-white focus:outline-none py-2 px-2 rounded-sm"
//               />
//               {errors.lastName && (
//                 <span className="text-red-300 text-sm">{errors.lastName}</span>
//               )}
//             </div>
//           </div>
//           <div className="flex flex-col gap-1">
//             <label htmlFor="email" className="text-white text-lg font-semibold">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={formData.email}
//               onChange={handleChange}
//               autoComplete="off"
//               placeholder="Enter email"
//               className="h-8 w-full bg-white focus:outline-none py-2 px-2 rounded-sm"
//             />
//             {errors.email && (
//               <span className="text-red-300 text-sm">{errors.email}</span>
//             )}
//           </div>
//           <div className="flex flex-col gap-1">
//             <label htmlFor="phone" className="text-white text-lg font-semibold">
//               Phone
//             </label>
//             <input
//               type="text"
//               inputMode="numeric"
//               pattern="[0-9]*"
//               maxLength={10}
//               name="phone"
//               id="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               autoComplete="off"
//               placeholder="Enter phone number"
//               className="h-8 w-full bg-white focus:outline-none py-2 px-2 rounded-sm"
//               onKeyDown={(e) => {
//                 if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
//                   e.preventDefault();
//                 }
//               }}
//             />
//             {errors.phone && (
//               <span className="text-red-300 text-sm">{errors.phone}</span>
//             )}
//           </div>
//           <div className="flex flex-col gap-1">
//             <label
//               htmlFor="comments"
//               className="text-white text-lg font-semibold"
//             >
//               Comments
//             </label>
//             <textarea
//               name="comments"
//               id="comments"
//               value={formData.comments}
//               onChange={handleChange}
//               autoComplete="off"
//               placeholder="Enter what's in your mind..."
//               rows={3}
//               className="w-full bg-white focus:outline-none py-2 px-2 rounded-sm"
//             />
//             {errors.comments && (
//               <span className="text-red-300 text-sm">{errors.comments}</span>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="mt-2 border-2 border-blue-200 text-white text-lg font-semibold rounded-sm cursor-pointer hover:bg-[#7abed7] py-2"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;
