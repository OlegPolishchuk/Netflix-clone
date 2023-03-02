import Head from "next/head";
import Logo from "@/components/logo/Logo";
import styles from '../styles/Login.module.css';

const Login = () => {
  const handleLogin = () => {
    console.log('bg')
  };

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
              placeholder='Email address'
            />
            <p className={styles.userMessage}></p>

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