import Head from "next/head";
import Logo from "@/components/logo/Logo";
import styles from '../styles/Login.module.css';
import {ChangeEvent, useState, KeyboardEvent} from "react";
import {useRouter} from "next/router";

const Login = () => {
  const [userMessage, setUserMessage] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();

  const handleLogin = () => {
    if (email) {
      router.push('/');
    } else {
      setUserMessage('Enter a valid email address')
    }
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setUserMessage('');
    setEmail(event.target.value)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerWrapper}>
            <Logo />
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.mainWrapper}>
            <h1 className={styles.signInHeader}>Sign in</h1>

            <input
              className={styles.emailInput}
              type='text'
              value={email}
              placeholder='Email address'
              onChange={handleChangeEmail}
              onKeyDown={handleKeyPress}
            />
            <p className={styles.userMessage}>
              {userMessage}
            </p>

            <button
              className={styles.loginBtn}
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </main>
      </div>
    </>
  )
}

export default Login;