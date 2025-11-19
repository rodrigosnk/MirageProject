import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AuthForm.css';
import { loginApi, registerApi, setAuthToken } from '../../services/useTilapiaApi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ErrorText = styled.div`
  color: red;
  font-size: 0.875em;
  margin-top: 0.25em;
`;

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: isRegister ? Yup.string().min(2, 'Mínimo 2 caracteres').required('Nome é obrigatório') : Yup.string(),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string().min(6, 'Senha mínimo 6 caracteres').required('Senha é obrigatória'),
    confirmPassword: isRegister ? Yup.string().oneOf([Yup.ref('password'), null], 'Senhas não conferem').required('Confirme a senha') : Yup.string()
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (isRegister) {
        const res = await registerApi(values.name, values.email, values.password);
        setSuccess(res?.message || 'Cadastro realizado com sucesso!');
      } else {
        const res = await loginApi(values.email, values.password);
        console.log('Login response:', res);
        if (res?.token.token) {
          setAuthToken(res.token.token);
        }
        setSuccess(res?.message || 'Login realizado com sucesso!');
        // redirect to user page after successful login
        navigate('/user');
      }
    } catch (err) {
      console.error('Auth error:', err);
      // prefer server message if available
      const msg = err?.response?.data?.message || err.message || 'Ocorreu um erro. Tente novamente.';
      setError(msg);
    } finally {
      setLoading(false);
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-card">
        <h2>{isRegister ? 'Registrar' : 'Entrar'}</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
            {({ isSubmitting }) => (
              <Form>
                {isRegister && (
                  <label className="field">
                    <span>Nome</span>
                    <Field type="text" name="name" placeholder="Seu nome" />
                    <div className="error"><ErrorMessage name="name" /></div>
                  </label>
                )}

                <label className="field">
                  <span>Email</span>
                  <Field type="email" name="email" placeholder="email@exemplo.com" />
                  <div className="error"><ErrorMessage name="email" /></div>
                </label>

                <label className="field">
                  <span>Senha</span>
                  <Field type="password" name="password" placeholder="Senha" />
                  <div className="error"><ErrorMessage name="password" /></div>
                </label>

                {isRegister && (
                  <label className="field">
                    <span>Confirmar senha</span>
                    <Field type="password" name="confirmPassword" placeholder="Confirme a senha" />
                    <div className="error"><ErrorMessage name="confirmPassword" /></div>
                  </label>
                )}

                {error && <ErrorText>{error}</ErrorText>}
                {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}

                <button type="submit" className="btn primary" disabled={isSubmitting}>
                  {isSubmitting || loading ? 'Enviando...' : isRegister ? 'Cadastrar' : 'Entrar'}
                </button>

                <div className="auth-switch">
                  <button type="button" className="btn link" onClick={() => {
                    setIsRegister(!isRegister);
                    setError(null);
                    setSuccess(null);
                  }}>
                    {isRegister ? 'Já tem conta? Entrar' : 'Ainda não tem conta? Registrar'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
