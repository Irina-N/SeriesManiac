import React from 'react';
import { Button } from '@material-ui/core';
import { Link  } from 'react-router-dom';
import FormAuth from './FormAuth';
import Header from '../Header/Header';
import './Auth.css';

export default function Auth() {

    return (
        <div className='content'> 
            <Header/>            
            <FormAuth/> 
            <h3 className='center-text'>Ещё нет аккаунта?</h3>
            <div className='content-back'>
                <Button 
                    color='primary' 
                    component={Link} 
                    to='/register'
                    id='singup_btn'
                    variant='contained'>        
                Зарегистрироваться
                </Button>         
            </div>             
        </div>         
    );
}


