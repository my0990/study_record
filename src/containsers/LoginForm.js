import { useEffect, useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import {app} from "../lib/api/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeForm, changeField } from "../modules/auth";
import nameConverter from "../lib/api/nameConverter";





const LoginForm = () => {
    const [isLoading,setIsLoading] = useState(true);
    const [isClicked,setIsClicked] = useState(false);
    const [error,setError] = useState(' ');
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
        setIsClicked(true);
        // 로그인
        app.auth().signInWithEmailAndPassword(nameConverter(form.username), form.password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('username',form.username);
            // navigate("/post");
        })
        .catch((error) => {
            setIsClicked(false);
            setError('아이디와 비번을 확인해주세요')
        })
        app.auth().signOut();
    }

    useEffect(()=>{
        app.auth().onAuthStateChanged((user) => {
            if (user) {
              navigate("/post");
            } else {
                setIsLoading(false);
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
            isClicked={isClicked}
            error={error}
            />
    )
}

export default LoginForm;