import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SignInSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
          });
      } else {
        toast.error("Password and Confirm Password don't match!");
        setLoading(false);
      }
    } else {
      toast.error("All feilds are mandatory!");
      setLoading(false);
    }
  }

  function loginWithEmail() {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("User Logged In!");
          setLoading(false);
          createDoc(user);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All feilds are mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      try {
        await setDoc(doc(db, "users", user.uid), {
          name: displayName ? displayName : name,
          email: email,
          photoURL: photoURL ? photoURL : "",
          createdAt: createdAt,
        });
        toast.success("Doc Created!");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          createDoc(user);
          navigate("/dashboard");
          toast.success("User authenticated!");
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }
  return (
    <>
      {loginForm ? (
        <div className="w-[50%] px-8 max-w-[450px] shadow-own-uday h-auto rounded-2xl py-4">
          <h2 className="font-medium text-[1.2rem] text-center">
            Login on <span className="text-[var(--theme)]">Financely</span>
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <Input type="email" label="email" state={email} setState={setEmail} placeholder="JohnDoe@gmail.com" />
              <Input type="password" label="password" state={password} setState={setPassword} placeholder="Example@123" />
            </div>
            <div className="flex flex-col gap-1">
              <Button onClick={loginWithEmail} disabled={loading} text={loading ? "Loading..." : "Login Using Email and Password"} />
              <p className="text-center m-0 font-light text-sm">or</p>
              <Button onClick={googleAuth} disabled={loading} text={loading ? "Loading..." : "Login Using Google"} blue={"true"} />
              <p className="cursor-pointer text-center m-0 font-light text-sm mt-3" onClick={() => setLoginForm(!loginForm)}>
                Or Don't Have An Account? Click Here
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-[50%] px-8 max-w-[450px] shadow-own-uday h-auto rounded-2xl py-4">
          <h2 className="font-medium text-[1.2rem] text-center">
            Sign Up on <span className="text-[var(--theme)]">Financely</span>
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <Input type="text" label="full name" state={name} setState={setName} placeholder="John Doe" />
              <Input type="email" label="email" state={email} setState={setEmail} placeholder="JohnDoe@gmail.com" />
              <Input type="password" label="password" state={password} setState={setPassword} placeholder="Example@123" />
              <Input type="password" label="confirm password" state={confirmPassword} setState={setConfirmPassword} placeholder="Example@123" />
            </div>
            <div className="flex flex-col gap-1">
              <Button onClick={signupWithEmail} disabled={loading} text={loading ? "Loading..." : "Signup Using Email and Password"} />
              <p className="text-center m-0 font-light text-sm">or</p>
              <Button onClick={googleAuth} disabled={loading} text={loading ? "Loading..." : "Signup Using Google"} blue={"true"} />
              <p className="cursor-pointer text-center m-0 font-light text-sm mt-3" onClick={() => setLoginForm(!loginForm)}>
                Or Have An Account Already? Click Here
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SignInSignUp;
