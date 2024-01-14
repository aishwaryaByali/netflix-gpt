import React, { useState, useRef } from "react";
import Header from "./Header";
import { validateForm } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const nameValid = useRef(null);

  const toggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = () => {
    let message;
    if (!isSignInForm) {
      message = validateForm(
        email.current.value,
        password.current.value,
        nameValid.current.value
      );
    } else {
      message = validateForm(email.current.value, password.current.value);
    }
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredentials) => {
          const user = userCredentials.user;
          // console.log("user", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredentials) => {
          const user = userCredentials.user;
          // console.log("user", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
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
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-4/12 h-auto bg-black my-36 mx-auto right-0 left-0 text-white opacity-80 rounded-lg"
      >
        <h4 className="font-bold p-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h4>
        {!isSignInForm && (
          <input
            ref={nameValid}
            type="text"
            placeholder="Name"
            className="p-4 m-4 w-10/12 pr-6 bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 m-4 w-10/12 pr-6 bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 m-4 w-10/12 pr-6 bg-gray-700"
        />
        {!isSignInForm ? (
          <p className="text-red-700 font-bold px-4">{errorMessage}</p>
        ) : (
          ""
        )}
        <button
          className="p-4 m-4 w-10/12 pr-6 text-black rounded-lg bg-red-800"
          onClick={handleButtonClick}
        >
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
