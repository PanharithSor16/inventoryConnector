import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import apiService from '../api/apiService';


const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [authState, setAuthstate] = useLocalStorage('authState',{
        isAuthentication: false,
        token: null,
    })
    
    const login = async(username, password) => {
        try{
            const response = await apiService.post('login', {username, password});
            const token = response.data.accessToken;
            setAuthstate({
                isAuthentication: true,
                token
            })  
        }catch (error){
            console.error('Login failed', error);
            return false;
        }
    }
    const logout = () => {
        setAuthstate({
            isAuthentication: false,
            token: null
        })
    }
    const isTokenExpired = (token) => {
        if(!token) return true;
        const {exp} = jwtDecode(token);
        return Date.now() >= exp * 1000;
    }
    useEffect(()=> {
        if(authState.token && isTokenExpired(authState.token)){
            logout();
        }
    }, [authState.token])
  return (
    <AuthContext.Provider value={{authState, login, logout, isTokenExpired}}>
        {children}
    </AuthContext.Provider>
  );
};        
export {AuthContext, AuthProvider};