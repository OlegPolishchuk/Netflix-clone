import styles from './Navbar.module.css';
import {useRouter} from "next/router";
import Link from "next/link";
import {useEffect, useState} from "react";
import Image from "next/image";
import Logo from "@/components/logo/Logo";
import {magic} from "@/lib/magic-client";

const Navbar = () => {
  const [user, setUser] = useState('');
  const [didToken, setDidToken] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

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

  const handleSignout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

  useEffect(() => {
    (async () => {
      if (magic) {
        const { email, issuer } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken();
        setUser(email || '');
        setDidToken(didToken);
      }
    })()
  }, []);

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
              <p className={styles.username}>{user}</p>

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
                  <Link
                    href={'/login'}
                    className={styles.linkName}
                    onClick={handleSignout}
                  >
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