import React from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import './auth.css'

const Auth = () => {
  return (
    <main className="page auth-page">
      <div className="page-inner">
        <AuthForm />
      </div>
    </main>
  )
}

export default Auth
