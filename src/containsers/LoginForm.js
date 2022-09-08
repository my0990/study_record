import AuthForm from "../components/auth/AuthForm";
import {app} from "../lib/api/firebaseConfig";


const onLogin = (e) => {
    e.preventDefault();
    // 회원가입
    // app.auth().createUserWithEmailAndPassword('jh@naver.com', '123456').then((result)=>{
    //     console.log(result.user)
    //   })
    app.auth().signInWithEmailAndPassword(app.auth, 'jh11@naver.com', '12341156')
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('success');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
    })
}
const LoginForm = () => {
    return(
        <AuthForm onLogin={onLogin}/>
    )
}

export default LoginForm;