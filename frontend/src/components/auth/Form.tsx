import React from 'react';
import registerImg from "../../assets/register_img.svg"

const Form = () => {
  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
            //   src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            src={registerImg}
              className="w-full"
              alt="Phone image"
            />
          </div>

          {/* Right column container with form */}
          <div className="md:w-8/12 lg:ms-6 lg:w-5/12">
            <form>
              <div className="relative mb-6">
                <input
                  type="text"
                  className="peer block w-full rounded border-gray-300 bg-gray-50 px-3 py-2 leading-tight outline-none focus:border-blue-500 focus:bg-white"
                  id="exampleFormControlInput3"
                  placeholder="Email address"
                />
                <label
                  htmlFor="exampleFormControlInput3"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-full origin-top-left truncate pt-2 leading-tight text-gray-500 transition-all duration-200 ease-out peer-focus:-translate-y-1 peer-focus:scale-75 peer-focus:text-blue-600"
                >
                  Email address
                </label>
              </div>

              <div className="relative mb-6">
                <input
                  type="password"
                  className="peer block w-full rounded border-gray-300 bg-gray-50 px-3 py-2 leading-tight outline-none focus:border-blue-500 focus:bg-white"
                  id="exampleFormControlInput33"
                  placeholder="Password"
                />
                <label
                  htmlFor="exampleFormControlInput33"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-full origin-top-left truncate pt-2 leading-tight text-gray-500 transition-all duration-200 ease-out peer-focus:-translate-y-1 peer-focus:scale-75 peer-focus:text-blue-600"
                >
                  Password
                </label>
              </div>

              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    type="checkbox"
                    value=""
                    id="exampleCheck3"
                  />
                  <label
                    className="ml-2 text-sm text-gray-600"
                    htmlFor="exampleCheck3"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#!"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded bg-blue-600 px-7 py-2.5 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800"
              >
                Sign in
              </button>

              <div className="my-4 flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <p className="mx-4 mb-0 text-center text-sm font-semibold">
                  OR
                </p>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <a
                className="mb-3 flex w-full items-center justify-center rounded bg-blue-600 px-7 py-2.5 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
                href="#!"
              >
                <span className="mr-2">
                  {/* Add appropriate icon SVG here */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="h-4 w-4"
                  >
                    {/* Facebook SVG path */}
                    <path d="M279.14 288l14.22-92.66h-88.91V150.69c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S251.19 0 222.36 0c-73.22 0-120.53 44.38-120.53 124.72v70.62H22.89V288H101.9V480h100.21V288z" />
                  </svg>
                </span>
                Continue with Facebook
              </a>
              <a
                className="flex w-full items-center justify-center rounded bg-blue-400 px-7 py-2.5 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:bg-blue-500 focus:outline-none"
                href="#!"
              >
                <span className="mr-2">
                  {/* Add appropriate icon SVG here */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-4 w-4"
                  >
                    {/* Twitter SVG path */}
                    <path d="M496 109.5c-17.4 7.7-36.2 13-55.9 15.4 20.1-12.1 35.5-31.3 42.8-54.2-18.8 11.2-39.5 19.3-61.5 23.7-17.8-19-43.2-31-71.3-31-53.9 0-97.6 43.7-97.6 97.6 0 7.6 0.8 15 2.5 22.1C132.7 185.6 71.6 153.8 32.5 105.4c-8.3 14.2-13.1 30.7-13.1 48.3 0 33.4 17 62.8 42.8 80.1-15.8-0.5-30.6-4.9-43.6-12.1v1.2c0 46.7 33.2 85.5 77.1 94.4-8.1 2.2-16.7 3.3-25.4 3.3-6.3 0-12.4-0.6-18.4-1.7 12.4 38.7 48.6 66.9 91.5 67.6-33.4 26.2-75.5 41.9-121.1 41.9-7.9 0-15.7-0.5-23.4-1.4 43.1 27.7 94.1 43.9 148.9 43.9 178.7 0 276.6-148.2 276.6-276.6 0-4.2-0.1-8.4-0.3-12.6 19-13.7 35.7-30.8 48.8-50.3z" />
                  </svg>
                </span>
                Continue with Twitter
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
