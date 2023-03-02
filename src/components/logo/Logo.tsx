import Image from "next/image";
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <a className={styles.logoLink} href={'/'}>
      <div className={styles.logoWrapper}>
        <Image
          src={'/static/netflix.svg'}
          alt={'logo'}
          width={128}
          height={34}
        />
      </div>
    </a>
  )
}

export default Logo;