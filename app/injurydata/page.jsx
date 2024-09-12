'use client'
import {InjuryDataTable } from '../components/InjuryDataTable'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext'
const InjuriesData=()=>{
    const context=useContext(AuthContext);
    useEffect(()=>{
       if(!context?.authuser) window.location.href='/';
    })
    return(
        <div>
            <InjuryDataTable/>
        </div>
    )
}

export default InjuriesData;
