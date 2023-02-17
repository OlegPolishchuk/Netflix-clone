import styles from './Banner.module.css';
import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  imgUrl: string;
}

const Banner = ({imgUrl, subtitle, title}: Props) => {

  const handlePlay = () => {
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subtitle}</h3>

          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handlePlay}>
              <Image
                src={'/static/play_arrow.svg'}
                alt={'play icon'}
                width={32}
                height={32}
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl}`,
        }}
      ></div>
    </div>
  )
}

export default Banner;