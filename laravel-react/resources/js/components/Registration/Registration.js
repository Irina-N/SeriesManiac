import React from 'react';
import { useHistory  } from 'react-router-dom';

import Header from '../Header/Header';
import FormRegister from './FormRegister';

import './Registration.css';

export default function Registration () {
  const history = useHistory();

    const handleOnClick = () => {
        history.push('/'); 
    }
  
  return (
    <div className='content'> 
      <Header/>
      <h3 className='center-text'>Регистрация</h3>
      <FormRegister/> 
      <h3 className='center-text'>Уже есть аккаунт?</h3>
      <div className='content-back bg-dark'>
        <button 
        className='btn btn-warning'                    
        onClick={handleOnClick}
        id='login_btn'>
        Войти
        </button>           
      </div>      
    </div>
  );
};

