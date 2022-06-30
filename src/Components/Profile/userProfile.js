import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/auth-context';
import classes from './userProfile.module.css';

const UserProfile = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current?.value;

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBNXvgTymjknBfISeIRqoB-THUDJnviVto';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      // assumption : always success!
      navigate('/');
    });
  };

  return (
    <form className={classes.profile} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input id="new-password" type="password" placeholder="Enter New Password" minLength="6" ref={newPasswordInputRef} />
      </div>
      <div className={classes.actions}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default UserProfile;
