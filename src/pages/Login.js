import React, { useEffect } from 'react';
import { useDispatch, useSelector } from  'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './Login.module.css';

import Logo from '../components/Logo';

import { loginUser } from '../store/action-creators/app';

function Login() {
    const [inputs, setInputs] = React.useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user && user.id) return history.push('/');
    }, [user, history]);

    async function submitLogin(event) {
        event.preventDefault();

        dispatch(loginUser({
            email: inputs.email,
            password: inputs.password,
        }));
    }

    function handleInputChange (event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setInputs({
            ...inputs,
            [name]: value
        });
    }

    return (
        <div className={styles.login}>
            <div className={styles.header}>
                <i className="fas fa-chevron-left"></i>
                qover.me
            </div>

            <div className={styles.content}>
                <div className={styles.container}>
                <Logo />
                
                    <form className={styles.form} onSubmit={(e) => submitLogin(e) }>
                    <h3 className={styles.formHeader}>Welcome at Qover</h3>

                    <label className={styles.formControl}>
                        Email
                        <input type="text" name="email" className={styles.formInput} value={inputs.email} onChange={handleInputChange} />
                    </label>
                    
                    <label className={styles.formControl}>
                        Password
                        <input type="password" name="password" className={styles.formInput} value={inputs.password} onChange={handleInputChange}/>
                    </label>

                    <div className="flex justify-content-between align-items-center" style={{marginBottom: "35px" }}>
                        <label className={`${styles.formControl} flex flex-row align-items-center`}>
                            <input type="checkbox" />
                            Remember me
                        </label>
                    
                        <a href="/login">Forgot your password?</a>
                    </div>

                    { user.errors && <p className={styles.formError}> { user.errors.general } </p> }

                    <button className="btn btn--secondary w-100" type="submit">Sign in to your account</button>
                </form>

                    <button className="btn btn--transparent w-100">Don’t have an account? <span className="underline">Ask access</span></button>
                </div>
            </div>

            <div className={styles.footer}>
                © Qover 2017
            </div>
        </div>
    );
}

export default Login;
