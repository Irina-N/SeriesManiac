import React, {useCallback, useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { REQUEST_STATUSES } from '../../constants.js';
import './FormSingUp.css';
import {fetchSignUp, setSignUpRequestStatusIdle} from '../../actions/signUp'

const FormSingUp = () => {
  const dispatch = useDispatch();
 
  const [email, setEmail] = useState('');  
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessageClassName, setErrorMessageClassName] = useState('errorMessage hidden');

  const {signUpRequestStatus} = useSelector(state => state.signUpReducer);

/* 
  const emailRegEx = /^[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
  const loginRegEx = /^[A-zА-я0-9._-\s]{3,20}$/;
  const passwordRegEx = '';
 */
 
  const handleOnClickErrorBtn = () => {
    setErrorMessageClassName('errorMessage hidden');
  }
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();    
    const newUser = {email, login, password, passwordConfirmation};
    dispatch(fetchSignUp(newUser));    
    setEmail('');
    setLogin('');
    setPassword(''); 
    setPasswordConfirmation('');    
}, [dispatch, email, login, password, passwordConfirmation]);

  useEffect(() => {
    console.log('request status', signUpRequestStatus)   
  })

  if(signUpRequestStatus === REQUEST_STATUSES.ERROR) {
    dispatch(setSignUpRequestStatusIdle());
    setErrorMessageClassName('errorMessage');      
  }


  return (
      <React.Fragment>
        <div className={errorMessageClassName}>
        <p className='errorMessage__text'>Ошибка</p>
        <p className='errorMessage__text'>Не получается связаться с сервером</p>
        <button className='btnErrorMessageClose' onClick={handleOnClickErrorBtn}>OK</button>
      </div>
        <form className='form__signup' onSubmit={handleSubmit} name='sing_up'>
          <label htmlFor='email'>Электронная почта</label>
          <input 
            required
            type='email' 
            id='email' 
            name='email' 
            value={email}
            onChange={e => setEmail(e.target.value)}>
          </input>

          <label htmlFor='login'>Логин</label>
          <input 
            required 
            type='text' 
            id='login' 
            name='login'
            value={login}
            onChange={e => setLogin(e.target.value)}>
          </input>

          <label htmlFor='password'>Пароль</label>
          <input 
            required
            type='password' 
            id='password' 
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}>
          </input>

          <label htmlFor='password2'>Повторите пароль</label>
          <input 
            required
            type='password' 
            id='password2' 
            name='password2'
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}>
          </input>

          <input type='submit' value='ЗАРЕГИСТРИРОВАТЬСЯ'></input>
        </form>
      </React.Fragment>
            
      );
};


export default FormSingUp;
