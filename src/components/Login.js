import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-auto w-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/594f8025-139a-4a35-b58d-4ecf8fdc507c/d3c4e455-f0bf-4003-b7cd-511dda6da82a/IN-en-20240108-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bg-img"
        />
      </div>
      <form className="absolute w-4/12 h-auto bg-black my-36 mx-auto right-0 left-0 text-white opacity-80 rounded-lg">
        <h4 className="font-bold p-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h4>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Name"
            className="p-4 m-4 w-10/12 pr-6 bg-gray-200 text-black"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 m-4 w-10/12 pr-6 bg-gray-700 text-black"
          // className="p-4 m-4 w-10/12 pr-6 bg-gray-200 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 m-4 w-10/12 pr-6 bg-gray-700 text-black"
        />
        <button className="p-4 m-4 w-10/12 pr-6 text-black rounded-lg bg-red-800">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-4" onClick={toggleSignIn}>
          {isSignInForm
            ? "New to Netflix? Sign Up now"
            : "Already registered? Sign In now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
