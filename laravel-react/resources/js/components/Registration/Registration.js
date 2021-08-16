import React from 'react';
import Header from '../Header/Header';
import FormSingUp from './FormSingUp';
import './Registration.css';

const Registration = () => {
  
  return (
    <div className='content'> 
      <Header/>
      <h3 className='center-text'>Регистрация</h3>
      <FormSingUp/>     
    </div>
  );
};

export default Registration;
