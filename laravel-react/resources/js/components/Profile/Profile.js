import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory, Link} from 'react-router-dom';
import { Button } from '@material-ui/core';
import Header from '../Header/Header';
import './Profile.css';
import { fetchLogout } from '../../store/actions/currentUser';

export default function Profile() {
    const history = useHistory();
    const dispatch = useDispatch();    
    const {user} = useSelector(state => state.currentUserReducer);
    
    
    useEffect(() => {      
        if (!user.id) {     
            history.push('/');      
        } 
    });

    const handleOnClick = () => {
        dispatch(fetchLogout());        
    }



    return (
        <div className='content'> 
            <Header/>            
        	<div className='profile__container'>
                <h4>Профиль пользователя </h4>
                <p>login: {user.login}</p>
                <p>id: {user.id}</p>            

                <Button 
                    className='btn'
                    color='primary' 
                    component={Link} 
                    to='/movies'
                    id='moviesp_btn'
                    variant='contained'>        
                    Все сериалы
                </Button> 

                <Button 
                    className='btn'
                    color='primary' 
                    id='logout_btn'
                    variant='contained'
                    onClick={handleOnClick}>        
                    Выйти
                </Button> 
            </div>
                         
        </div>         
    );
}
