import React, { useState, useRef } from "react";
import Header from "./Header";
import { validateForm } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_LOGO, PHOTO_URL } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const nameValid = useRef(null);
  const dispatch = useDispatch();
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
          updateProfile(user, {
            displayName: nameValid.current.value,
            photoURL: PHOTO_URL,
          })
            .then(() => {
              const { uid, email, photoURL, displayName } = auth.currentUser;
              dispatch(addUser, {
                uid,
                displayName: displayName,
                email,
                photoURL: photoURL,
              });
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
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
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="h-auto w-full" src={BG_LOGO} alt="bg-img" />
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
