import React, { useState } from 'react';
import './FormLogIn.css';

const FormLogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(email, password);    
  };

  return (        
      <form className='form__login' onSubmit={handleSubmit} name='log_in' action='/action_page.php'  encType='multipart/form-data' method='post'>
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
  );
};

export default FormLogIn;
