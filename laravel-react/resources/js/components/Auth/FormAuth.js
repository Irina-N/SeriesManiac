import React, {useCallback, useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import { REQUEST_STATUSES, FETCH_URL } from '../../common/constants/constants.js';
import './FormAuth.css';
import { fetchUser } from '../../store/actions/currentUser';


export default function FormAuth () {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageClassName, setErrorMessageClassName] = useState('errorMessage hidden');

  const {requestStatus, user, error} = useSelector(state => state.currentUserReducer);
  
  useEffect(() => {
    if(requestStatus === REQUEST_STATUSES.ERROR) {
      setErrorMessageClassName('errorMessage');      
    }
  }, [requestStatus, error]);

  useEffect(() => {
    if (user.id) {     
      history.push('/profile');      
    }  
  });

  const handleOnClickErrorBtn = () => {
    setErrorMessageClassName('errorMessage hidden');
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();    
    const formData = {email, password};       
    dispatch(fetchUser(formData, FETCH_URL.AUTH));    
    setPassword('');        
  }, [dispatch, email, password]);

  
  return (
    <React.Fragment>
      <div className={errorMessageClassName}>
        <p className='errorMessage__text'>Ошибка {error.errorCode}</p>
        <p className='errorMessage__text'> Пожалуйста, убедитесь в правильности заполнения полей.<br/>{error.errorDescription?.join(' ') ?? ''} </p>
        <button className='btnErrorMessageClose' onClick={handleOnClickErrorBtn}>OK</button>
      </div>
      <h3 className='center-text'>Заходите!</h3>        
      <form className='form__auth' onSubmit={handleSubmit} name='auth'>
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
