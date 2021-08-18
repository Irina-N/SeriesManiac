import React, { useState } from 'react';
import './FormLogIn.css';

const FormLogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const user = {email, password};
    fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(answer => {
            console.log(answer);            
        })
        .catch(err => {            
            console.log('Something wrong', err);
        }); 
        
    setEmail('');
    setPassword('');    
  };

  return (        
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
  );
};

export default FormLogIn;
