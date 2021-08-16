import React from 'react';
import { Button } from '@material-ui/core';
import { Link  } from 'react-router-dom';
import FormLogIn from './FormLogIn';
import Header from '../Header/Header';
import './Start.css';

function Start() {

    return (
        <div className='content'> 
        <Header/>
            <h3 className='center-text'>Заходите!</h3>
            <FormLogIn/> 
            <h3 className='center-text'>Ещё нет аккаунта?</h3>
            <div className='content-back'>
            <Button 
                color='primary' 
                component={Link} 
                to='/singup'
                id='singup_btn'
                variant='contained'>        
            Зарегистрироваться
            </Button>
            </div>             
        </div>         
    );
}

export default Start;

{/*             <form className='form__auth' name='authorization' action='action.php' encType='multipart/form-data' method='post'> 
                <TextField
                    required
                    id='input_email_auth'
                    label='email'
                    variant='outlined'
                />            
                <TextField
                    required
                    id='input_password_auth'
                    label='пароль'
                    type='password'
                    autoComplete='current-password'
                    variant='outlined'
                />
                <Button 
                    id='login_btn'
                    variant='contained'
                    onClick={handleLogIn}>
                    Войти
                </Button>
            </form>    */}   