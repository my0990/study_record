import { useEffect, useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import {app} from "../lib/api/firebaseConfig";
import { useNavigate } from "react-router-dom";





const LoginForm = () => {
    const [isLoading,setIsLoading] = useState(true);
    
    let navigate = useNavigate();
    const onLogin = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        // 로그인
        app.auth().signInWithEmailAndPassword('jh@naver.com', '123456')
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            // navigate("/post");
              
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
        })
        app.auth().signOut();
    }

    useEffect(()=>{
        app.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
              console.log(uid)
            //   navigate("/post");
              // ...
            } else {
                console.log('logout')
                setIsLoading(false);
              // User is signed out
              // ...
            }
          });
    },[])
    return(
        isLoading ? <div>'loading...'</div> : <AuthForm onLogin={onLogin}/>
    )
    
}

export default LoginForm;