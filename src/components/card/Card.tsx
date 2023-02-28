import {CardSize} from "@/shared";
import Image from "next/image";

import {motion} from "framer-motion"
import styles from './Card.module.css';
import {SyntheticEvent, useState} from "react";

const standardImg = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80';

type Props = {
  size?: CardSize;
  imgUrl: string;
  id: string;
}

const Card = ({size = CardSize.MEDIUM, imgUrl, id}: Props) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const handleOnError = () => {
    setImgSrc(standardImg);
  }

  const scale = id === 0 ? {scaleY: 1.1} : {scale: 1.1};
  return (
    <div className={styles.container}>
      <motion.div
        className={`${styles[size]} ${styles.imgMotionWrapper}`}
        whileHover={{...scale}}
      >
        <Image
          className={styles.cardImg}
          src={imgSrc}
          alt={'image'}
          fill
          onError={handleOnError}
        />
      </motion.div>
    </div>
  )
}

export default Card;