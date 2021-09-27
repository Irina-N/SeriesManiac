import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';
import { logout } from '../../store/actions/currentUser';
import { UserAvatar } from '../common/Avatar/Avatar';

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

    const handleToMyMovies = () => {
        history.push('/user/movies');
    }

    const handleToRecommendations = () => {
        history.push('/user/recommendations');
    }

    return (
        <div className='content'> 
            <Header/>            
        	<div className='profile__container'>
                <h4 className='profile__title'>Профиль пользователя </h4>
                <div className='profile__main-content bg-dark'>
                    <div className='profile_user-block'>
                        <UserAvatar
                            size="160"
                            name={user.login}
                            src={null}
                            round={true}
                            className="userAvatar"
                            showTooltip={false}
                        />
                        <h3 className='user-name'>{user.login}</h3>
                    </div>
                    <div className='buttons-block'>
                        <button 
                            className='btn btn-success'                    
                            onClick={handleToMovies}
                            id='movies_btn'
                        >
                            Все сериалы
                        </button> 

                        <button 
                            className='btn btn-success'                    
                            onClick={handleToMyMovies}
                            id='movies_btn'
                        >
                            Мои сериалы
                        </button> 

                        <button 
                            className='btn btn-success'                    
                            onClick={handleToRecommendations}
                            id='movies_btn'
                        >
                            Рекомендации
                        </button>

                        <button 
                            className='btn btn-warning'                    
                            onClick={handleLogout}
                            id='logout_btn'
                        >
                            Выйти
                        </button>
                    </div>
                </div>
            </div>                         
        </div>         
    );
}
