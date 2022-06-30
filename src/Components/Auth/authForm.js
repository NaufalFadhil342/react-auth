import { useState, useRef, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/auth-context';
import classes from './authForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const rePasswordInputRef = useRef();

  const navigate = useNavigate();

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();

      const data = {
        email: emailInputRef.current?.value,
        password: passwordInputRef.current?.value,
        passwordConfirm: rePasswordInputRef.current?.value,
      };

      setIsLoading(true);
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNXvgTymjknBfISeIRqoB-THUDJnviVto';
      if (isLogin) {
        fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            setIsLoading(false);
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = 'Authentication Failed!';
                // if (data && data.error && data.error.message) {
                //   errorMessage = data.error.message;
                // }
                alert(errorMessage);
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            const expirationTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
            authCtx.login(data.idToken, expirationTime.toISOString());
            navigate('/');
          })
          .catch((err) => {
            alert(err.message);
          });
      } else {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNXvgTymjknBfISeIRqoB-THUDJnviVto', {
          method: 'POST',
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            setIsLoading(false);
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = 'Authentication Failed!';
                // if (data && data.error && data.error.message) {
                //   errorMessage = data.error.message;
                // }
                alert(errorMessage);
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    },
    [isLogin, authCtx, navigate]
  );

  const switchToggleHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const repeatPassword = (
    <div className={classes.control}>
      <label htmlFor="repeatPassword">Repeat Password</label>
      <input ref={rePasswordInputRef} id="repeatPassword" type="password" name="repeatPassword" placeholder="Repeat Password" required />
    </div>
  );

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Enter Email</label>
          <input ref={emailInputRef} id="email" type="email" name="email" placeholder="Enter Email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Enter Password</label>
          <input ref={passwordInputRef} id="password" type="password" name="password" placeholder="Enter Password" required />
        </div>
        {!isLogin ? repeatPassword : ''}
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p style={{ color: 'white' }}>Sending request...</p>}
          <button type="button" className={classes.toggle} onClick={switchToggleHandler}>
            {isLogin ? 'Create New Account' : 'Already Have Account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
