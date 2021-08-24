import React, {useCallback, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { REQUEST_STATUSES } from '../../common/constants/constants.js';
import './FormSingUp.css';
import {fetchSignUp} from '../../store/actions/signUp'

const FormSingUp = () => {
  const dispatch = useDispatch();
 
  const [email, setEmail] = useState('');  
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const {signUpRequestStatus} = useSelector(state => state.signUpReducer);

/* 
  const emailRegEx = /^[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
  const loginRegEx = /^[A-zА-я0-9._-\s]{3,20}$/;
  const passwordRegEx = '';
 */
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();    
    const newUser = {email, login, password, passwordConfirmation};
    dispatch(fetchSignUp(newUser));    
    setEmail('');
    setLogin('');
    setPassword(''); 
    setPasswordConfirmation('');    
}, [dispatch, email, login, password, passwordConfirmation])


  return (
        <form className='form__signup' onSubmit={handleSubmit} name='sing_up'>
          <label htmlFor='email'>Электронная почта</label>
          <input 
            required
            type='text' 
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
      );
};


export default FormSingUp;
