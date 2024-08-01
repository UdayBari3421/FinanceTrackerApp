import React, { useEffect } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "../assets/user.svg";

const Header = () => {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logged out Successfully!");
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }

  return loading ? (
    <div className="h-screen flex w-full text-5xl items-center justify-center">
      <span className="flex gap-3 items-center justify-center">
        <p className="border-4 border-white border-t-black border-r-black rounded-[50%] w-[50px] h-[50px] animate-spin"></p>
        <p>Loading...</p>
      </span>
    </div>
  ) : (
    <div className="border-b-2 rounded-b-xl shadow-glow border-green-950 bg-[var(--theme)] p-6 sticky top-0 left-0 z-10 flex justify-between items-center py-4 px-6">
      <p className="text-[var(--white)] font-medium text-[1.2rem]">Financely.</p>
      {user ? (
        <span className="flex gap-2 items-center justify-center">
          <img className="rounded-full" width={28} src={user.photoURL ? user.photoURL : userImg} alt="user" />
          <p className="text-[var(--white)] font-medium text-[1.2rem] cursor-pointer opacity-[0.6] hover:opacity-[1] transition-all duration-[0.3s]" onClick={logoutFnc}>
            Logout
          </p>
        </span>
      ) : (
        <p className="text-[var(--white)] font-medium text-[1.2rem] cursor-default">Dashboard</p>
      )}
    </div>
  );
};

export default Header;
