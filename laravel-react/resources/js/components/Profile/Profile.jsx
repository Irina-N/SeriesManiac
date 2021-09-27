import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';
import { logout } from '../../store/actions/currentUser';

import './Profile.css';

export default function Profile() {
    const history = useHistory();
    const dispatch = useDispatch();    
    const { user } = useSelector((state) => state.currentUserReducer);
    
    useEffect(() => {
        if (!user.id) {     
            history.push('/');
        } 
    }, [user]);

    const handleLogout = () => {
        dispatch(logout());        
    }

    const handleToMovies = () => {
        history.push('/movies');
    }

    return (
        <div className='content'> 
            <Header/>            
        	<div className='profile__container'>
                <h4 className='profile__title'>Профиль пользователя </h4>
                <div className='profile__main-content bg-dark'>
                    <p>login: {user.login}</p>

                    <button 
                        className='btn btn-success'                    
                        onClick={handleToMovies}
                        id='movies_btn'
                    >
                        Все сериалы
                    </button> 

                    <button 
                        className='btn btn-success'                    
                        onClick={handleLogout}
                        id='logout_btn'
                    >
                        Выйти
                    </button>
                </div>
            </div>                         
        </div>         
    );
}