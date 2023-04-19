import React, { useEffect } from 'react'
import { userStore } from '../store';
import router from 'next/router';

const ProtectedRoute = ({ children }: { children: any }) => {
    const user = userStore(state => state.email)
    useEffect(() => {
        console.log(user)
        if (!user) {
            router.push('/')
        }
    }, [])

  return (
    <>
        { user ? children : null}
    </>
  ) 
}

export default ProtectedRoute