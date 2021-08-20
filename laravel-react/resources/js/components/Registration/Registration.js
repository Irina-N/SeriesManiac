import React from 'react';
import Header from '../Header/Header';
import FormSingUp from './FormSingUp';
import { Button } from '@material-ui/core';
import { Link  } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
  
  return (
    <div className='content'> 
      <Header/>
      <h3 className='center-text'>Регистрация</h3>
      <FormSingUp/> <h3 className='center-text'>Уже есть аккаунт?</h3>
            <div className='content-back'>
            <Button 
                color='primary' 
                component={Link} 
                to='/'
                id='login_btn'
                variant='contained'>        
            Войти
            </Button>           

            </div>      
    </div>
  );
};

export default Registration;
