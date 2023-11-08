// Sign In with Email and Password 
// Sign In with Google
// Log Out

import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';   //import the function
import { useState } from 'react';

const Auth = () => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    // console.log(auth?.currentUser?.email);       // method that can be used on auth 
    // console.log(auth?.currentUser?.photoURL);       // method that can be used on auth

    // use async&await or .then.catch (cuz firebase return a lot promises)
    const signInWithEP = async () => {
        try {
            // the first parameter 'auth' is used to link firebase to this app
            await createUserWithEmailAndPassword(auth, email, pwd);     //call the function to create a user on the firebase authentication
            alert("signInWithEP successfully");
        } catch (error) {
            console.error(error);
            alert("Please enter a valid email and ensure your password is at least 6 characters long");
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);     //call the function to create a user on the firebase authentication
            alert("signInWithGoogle successfully");
        } catch (error) {
            console.error(error);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);     //call the function to create a user on the firebase authentication
            alert("Log Out successfully");
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className='mb-24 text-6xl text-rose-500'>Sign In and Log Out</h1>
      <input
        className="w-64 p-2 mb-5 rounded border"
        type="text"
        placeholder="Email..."
        onChange={(e) => {setEmail(e.target.value)}}
      />
      <input
        className="w-64 p-2 mb-5 rounded border"
        type="password"
        placeholder="Password..."
        onChange={(e) => {setPwd(e.target.value)}}      //your password must at least 6 characters
      />
      <button onClick={signInWithEP} className="w-64 mb-5 p-2 bg-blue-500 text-white rounded">Sign in with Email & Pwd</button>

      <button onClick={signInWithGoogle}  className="mb-5 w-64 p-2 bg-purple-500 text-white rounded" >Sign In with Google</button>

      <button onClick={logOut} className="w-64 p-2 bg-sky-500 text-white rounded">Log Out</button>
    </div>
  );
};

export default Auth;
