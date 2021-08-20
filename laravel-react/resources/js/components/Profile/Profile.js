import React from "react";
import { useParams } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import { Button } from '@material-ui/core';
import { Link  } from 'react-router-dom';
import Header from '../Header/Header';
import './Profile.css';

function Profile (props) {
    //const { userId } = useParams()


    return (
        <div className='content'> 
        <Header/>            

         Профиль пользователя 
         <Button 
                color='primary' 
                component={Link} 
                to='/logout'
                id='logout_btn'
                variant='contained'>        
        Выйти
        </Button> 
                         
        </div>         
    );
}

export default Profile;