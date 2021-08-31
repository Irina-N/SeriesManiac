import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Header from '../Header/Header';
import './Profile.css';
import { changeProfileInState } from '../../actions/profile';

function Profile () {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.profileReducer);
    
    
    useEffect(() => {        
    if (!user.hasOwnProperty('id')) {          
        history.push('/');      
        } 
    }, []);

    const handleOnClick = () => {
        fetch('/logout')
        .then(response => {
            if (response.ok) {
                dispatch(changeProfileInState({}));
                history.push('/');                
            } 
        })
        .catch(err => {
            console.log('Logout error:', err);
        })
    }



    return (
        <div className='content'> 
        <Header/>            
        	<div>
                <h4>Профиль пользователя </h4>
                <p>login: {user.login}</p>
                <p>id: {user.id}</p>
            </div>
         
         <Button 
                color='primary' 
                id='logout_btn'
                variant='contained'
                onClick={handleOnClick}>        
        Выйти
        </Button> 
                         
        </div>         
    );
}

export default Profile;