import { useEffect, useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import {app} from "../lib/api/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeForm, changeField } from "../modules/auth";
import nameConverter from "../lib/api/nameConverter";





const LoginForm = () => {
    const [isLoading,setIsLoading] = useState(true);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const {form} = useSelector(({auth}) => ({
        form: auth.login
    }));
    const onChange = e => {
        const {value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        )
    }
    useEffect(()=>{
        dispatch(initializeForm('login'));
    },[dispatch]);

    const onLogin = (e) => {
        e.preventDefault();
        // let username = '';
        // if(form.username === '강지현'){
        //     username = 'jh@naver.com';
        // } else if(form.username === '김의진'){
        //     username = 'uj@naver.com';
        // } else if(form.username === '고지웅'){
        //     username = 'jw@naver.com';
        // } else if(form.username === '조미란'){
        //     username = 'mr@naver.com';
        // }
        console.log(e.target.value);
        // 로그인
        app.auth().signInWithEmailAndPassword(nameConverter(form.username), form.password)
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
        console.log('form: ', form)
        app.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
              console.log(uid)
              navigate("/post");
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
        isLoading ? 
        <div>'loading...'</div> : 
        <AuthForm 
            onLogin={onLogin}
            onChange={onChange}
            form ={form}
            />
    )
    
}

export default LoginForm;