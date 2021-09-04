import React, {useCallback, useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import { REQUEST_STATUSES, FETCH_URL } from '../../common/constants/constants.js';
import './FormRegister.css';
import { fetchUser, fetchRegister } from '../../store/actions/currentUser';

export default function FormRegister (){
  const dispatch = useDispatch();
  const history = useHistory();
 
  const [email, setEmail] = useState('');  
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessageClassName, setErrorMessageClassName] = useState('errorMessage hidden');

  const {requestStatus, user, requestError} = useSelector(state => state.currentUserReducer);

  //TODO: сделать валидацию
/* 
  const emailRegEx = /^[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
  const loginRegEx = /^[A-zА-я0-9._-\s]{3,20}$/;
  const passwordRegEx = '';
 */

  useEffect(() => {
    if(requestStatus === REQUEST_STATUSES.ERROR) {
      setErrorMessageClassName('errorMessage');      
    }
  });

  useEffect(() => {
    if (user.id) {     
      history.push('/profile');      
    }  
  });

  const handleOnClickErrorBtn = () => {
    setErrorMessageClassName('errorMessage hidden');
  }
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();    
    const formData = {email, login, password, passwordConfirmation};
    dispatch(fetchRegister(formData, FETCH_URL.REGISTER));       
    setEmail('');
    setLogin('');
    setPassword(''); 
    setPasswordConfirmation('');    
}, [dispatch, email, login, password, passwordConfirmation]);

  return (
    <React.Fragment>
      <div className={errorMessageClassName}>
      <p className='errorMessage__text'>Ошибка {requestError.errorCode}</p>
        <p className='errorMessage__text'> Пожалуйста, убедитесь в правильности заполнения полей.<br/>{requestError.errorDescription?.join(' ') ?? ''} </p>
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

