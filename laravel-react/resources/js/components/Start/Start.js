import React from 'react';
import { TextField, Button } from '@material-ui/core';
import './Start.css';

function Start() {

const handleLogIn = () => {console.log('Log in')}

    return (
        <div className="container"> 
            <form className="form__auth" name="authorization" action="action.php" encType="multipart/form-data" method="post"> 
                <TextField
                    required
                    id="input_email_auth"
                    label="email"
                    variant="outlined"
                />            
                <TextField
                    required
                    id="input_password_auth"
                    label="пароль"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                />
                <Button 
                    id="login_btn"
                    variant="contained"
                    onClick={handleLogIn}>
                    Войти
                </Button>
            </form>        
        </div>         
    );
}

export default Start;
