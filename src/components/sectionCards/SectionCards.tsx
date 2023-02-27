import React from "react";
import styles from './SectionCards.module.css';
import Card from "@/components/card/Card";
import {CardSize} from "@/shared";
import {Videos} from "@/pages";

type Props = {
  title: string;
  videos: Videos[];
  size: CardSize;
}
const SectionCards = ({title, videos, size}: Props) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.cardWrapper}>

        {videos.map((video, index) => (
          <Card
            key={index}
            imgUrl={video.imgUrl}
            size={size}
            id={index}
          />
        ))}

      </div>
    </section>
  )
}

export default SectionCards;