import styles from './Navbar.module.css';
import {useRouter} from "next/router";
import Link from "next/link";

type Props = {
  username: string;
}

const Navbar = ({username}: Props) => {
  const router = useRouter();

  const handleOnclickHome = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    router.push('/');
  };
  const handleOnclickMyList = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    router.push('/browse/my-list')
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink} href={'/'}>
          <div className={styles.logoWrapper}>
            Logo
          </div>
        </a>

        <ul className={styles.navItems}>
          <li
            className={styles.navItem}
            onClick={handleOnclickHome}
          >Home</li>
          <li
            className={styles.navItem2}
            onClick={handleOnclickMyList}
          >My List</li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn}>
              <p className={styles.username}>{username}</p>
            </button>

            <div className={styles.navDropdown}>
              <div>
                <Link href={'/login'} className={styles.linkName}>
                  Sign out
                </Link>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar;