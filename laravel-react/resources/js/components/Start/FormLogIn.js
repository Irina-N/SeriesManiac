import React, {useCallback, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { REQUEST_STATUSES } from '../../common/constants/constants';
import './FormLogIn.css';
import {fetchLogin} from '../../store/actions/login';

const FormLogIn = () => {
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {loginRequestStatus} = useSelector(state => state.loginReducer);
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();    
    const user = {email, password};
    dispatch(fetchLogin(user));    
    setPassword('');        
}, [dispatch, email, password])

  return (
    <React.Fragment>
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
