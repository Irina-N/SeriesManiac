import React, {useCallback, useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { REQUEST_STATUSES } from '../../constants.js';
import './FormLogIn.css';
import {fetchLogin, setLoginRequestStatusIdle} from '../../actions/login';

const FormLogIn = () => {
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageClassName, setErrorMessageClassName] = useState('errorMessage hidden');

  const {loginRequestStatus} = useSelector(state => state.loginReducer);

  const handleOnClickErrorBtn = () => {
    setErrorMessageClassName('errorMessage hidden');
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault();    
    const user = {email, password};       
    dispatch(fetchLogin(user));    
    setPassword('');        
  }, [dispatch, email, password]);

  useEffect(() => {
    console.log('request status', loginRequestStatus)   
  })

  if(loginRequestStatus === REQUEST_STATUSES.ERROR) {
    dispatch(setLoginRequestStatusIdle());
    setErrorMessageClassName('errorMessage');      
  }
    

  return (
    <React.Fragment>
      <div className={errorMessageClassName}>
        <p className='errorMessage__text'>Ошибка</p>
        <p className='errorMessage__text'>Здесь планируется разместить описание ошибки в зависимости от того, что придёт с бэкенда (в первую очередь сообщение, что неправильно введены email или пароль)</p>
        <button className='btnErrorMessageClose' onClick={handleOnClickErrorBtn}>OK</button>
      </div>
     <h3 className='center-text'>Заходите!</h3>        
      <form className='form__login' onSubmit={handleSubmit} name='log_in'>
          <label htmlFor='email'>Электронная почта</label>
          <input 
            type='text' 
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
