import React, {useCallback, useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom'
import { REQUEST_STATUSES } from '../../constants.js';
import './FormLogIn.css';
import {fetchLogin, setLoginRequestStatusIdle, changeRequestAnswerInState} from '../../actions/login';
import {changeProfileInState} from '../../actions/profile';

const FormLogIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageClassName, setErrorMessageClassName] = useState('errorMessage hidden');

  const {loginRequestStatus, loginRequestAnswer} = useSelector(state => state.loginReducer);

  useEffect(() => {
    if(loginRequestStatus === REQUEST_STATUSES.ERROR) {
      dispatch(setLoginRequestStatusIdle());
      setErrorMessageClassName('errorMessage');      
    }
    /* if(loginRequestStatus === REQUEST_STATUSES.SUCCESS) {
      console.log('success, loginRequestAnswer:', loginRequestAnswer);
      dispatch(setLoginRequestStatusIdle());
    } */
  });

  useEffect(() => {
    if (loginRequestAnswer.hasOwnProperty('user')) {     
      dispatch(setLoginRequestStatusIdle());
      dispatch(changeProfileInState(loginRequestAnswer.user));
      dispatch(changeRequestAnswerInState({}));
      history.push('/profile');      
    } else if (loginRequestAnswer.hasOwnProperty('error')) {
      console.log('loginRequestAnswer:', loginRequestAnswer);
      dispatch(changeRequestAnswerInState({}));//добавить обработку ошибки выше
    } 
  });

  const handleOnClickErrorBtn = () => {
    setErrorMessageClassName('errorMessage hidden');
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();    
    const user = {email, password};       
    dispatch(fetchLogin(user));    
    setPassword('');        
  }, [dispatch, email, password]);

  

  return (
    <React.Fragment>
      <div className={errorMessageClassName}>
        <p className='errorMessage__text'>Ошибка</p>
        <p className='errorMessage__text'>Не получается связаться с сервером</p>
        <button className='btnErrorMessageClose' onClick={handleOnClickErrorBtn}>OK</button>
      </div>
     <h3 className='center-text'>Заходите!</h3>        
      <form className='form__login' onSubmit={handleSubmit} name='log_in'>
          <label htmlFor='email'>Электронная почта</label>
          <input 
            type='email' 
            id='email' 
            name='email' 
            value={email}
            onChange={e => setEmail(e.target.value)}>
          </input>          

          <label htmlFor='password'>Пароль</label>
          <input 
            type='password' 
            id='password' 
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}>
          </input>

          <input type='submit' value='ВОЙТИ'></input>
        </form>
      </React.Fragment>
  );
};

export default FormLogIn;
