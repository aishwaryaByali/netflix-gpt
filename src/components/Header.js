import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../utils/firebase";
// import { useDispatch } from "react-redux";
// import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnVal, setBtnVal] = useState("Sign Out");
  // const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // dispatch(removeUser());
        navigate("/");
        setBtnVal("Sign In");
      })
      .catch((error) => {
        console.log("Did not sign out");
      });
  };
  console.log("user", user, auth.currentUser);
  return (
    <div className="absolute flex justify-between w-screen px-8 py-4 mx-2 bg-gradient-to-b from-black z-50">
      <img
        className="w-44 h-full"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="netflix-logo"
      />
      {auth.currentUser && (
        <div className="flex p-2 justify-between">
          <img
            className="w-12 h-12"
            src="https://static.vecteezy.com/system/resources/thumbnails/007/407/996/small/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg"
            alt="user-icon"
          />

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
