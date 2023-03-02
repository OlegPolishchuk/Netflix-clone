import styles from './Navbar.module.css';
import {useRouter} from "next/router";
import Link from "next/link";
import {useState} from "react";
import Image from "next/image";
import Logo from "@/components/logo/Logo";

type Props = {
  username: string;
}

const Navbar = ({username}: Props) => {
  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleOnclickHome = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    router.push('/');
  };
  const handleOnclickMyList = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    router.push('/browse/my-list')
  };

  const handleShowDropdown = () => {
    setShowDropdown(prevState => !prevState)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
       <Logo />

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
            <button
              className={styles.usernameBtn}
              onClick={handleShowDropdown}
            >
              <p className={styles.username}>{username}</p>

              <Image
                src={'/static/expand_more.svg'}
                alt={'arrow icon'}
                width={24}
                height={24}
              />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href={'/login'} className={styles.linkName}>
                    Sign out
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar;