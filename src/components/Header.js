import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { NETFLIX_LOGO, USER_LOGO } from "../utils/constant";
const Header = () => {
  const [btnVal, setBtnVal] = useState("Sign Out");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setBtnVal("Sign In");
      })
      .catch((error) => {
        console.log("Did not sign out");
      });
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      // user is signed in
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
      return () => {
        unSubscribe();
      };
    });
  }, []);
  console.log("user", user);
  return (
    <div className="absolute flex justify-between w-screen px-8 py-4 mx-2 bg-gradient-to-b from-black z-50">
      <img className="w-44 h-full" src={NETFLIX_LOGO} alt="netflix-logo" />
      {auth.currentUser && (
        <div className="flex p-2 justify-between">
          <img className="w-12 h-12" src={USER_LOGO} alt="user-icon" />

          <button
            className="bg-red-500 rounded-md m-4 text-white"
            onClick={handleSignOut}
          >
            {btnVal}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
