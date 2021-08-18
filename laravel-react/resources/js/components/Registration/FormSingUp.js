import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import Header from '../Header/Header';
import './FormSingUp.css';

const FormSingUp = () => {
  const [email, setEmail] = useState('');  
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
/* 
  const emailRegEx = /^[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
  const loginRegEx = /^[A-zА-я0-9._-]{3,20}$/;
  const passwordRegEx = '';
 */
  

  const handleSubmit = e => {
    e.preventDefault();
    const newUser = {email, login, password, passwordConfirmation};
    fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(answer => {
            console.log(answer);            
        })
        .catch(err => {            
            console.log('Something wrong', err);
        });    
    
    setEmail('');
    setLogin('');
    setPassword(''); 
    setPasswordConfirmation('');
  };

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
/* 
<form className='form__auth' onSubmit={handleSubmit} name='sing_up' action='action.php' encType='multipart/form-data' method='post'>      
        <TextField
            label='email'
            variant='outlined'
            type='email'
            required
            value={email}
            onChange={e => setEmail(e.target.value)}                    
        />
        <TextField
            id='input_username_reg'
            label='логин'
            variant='outlined'
            required
            value={login}
            onChange={e => setLogin(e.target.value)}                    
        />
        <TextField
            error
            id='input_password_reg'
            label='пароль'
            variant='outlined'
            type='password'
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
        <TextField
            error
            id='input_password_conf_reg'
            label='повторите пароль'
            variant='outlined'
            type='password'
            required
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
        />

        <Button 
            id='singup_btn'
            type='submit' 
            variant='contained'>
            Зарегистрироваться
        </Button> 
    </form> */