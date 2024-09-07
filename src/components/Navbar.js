import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import {
  updateDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { AuthContext } from "../context/auth";

import { GoogleOutlined } from "@ant-design/icons";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setGoogle, google } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();

  const handleSignout = async () => {
    setGoogle(false);
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        isOnline: false,
      });
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Chiqish vaqtida xatolik:", error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      await setDoc(doc(db, "users", result.user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });

      setGoogle(true);

      navigate("/");
      console.log("Google foydalanuvchi kirishi muvaffaqiyatli");
    } catch (error) {
      console.error("Google kirishda xato", error);
    }
  };

  return (
    <nav>
      <h3>
        <Link to='/'>Chats</Link>
      </h3>
      <div>
        {user ? (
          <>
            <button className='btn' onClick={handleSignout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <div className='flex '>
              <GoogleOutlined
                onClick={() => signInWithGoogle()}
                className='px-5 text-[22px] cursor-pointer'
              />
              <Link to='/register'>Register</Link>
              <Link to='/login'>Login</Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
