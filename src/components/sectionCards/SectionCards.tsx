import React from "react";
import styles from './SectionCards.module.css';
import Card from "@/components/card/Card";
import {CardSize} from "@/shared";
import {Video} from "@/types/video";
import Link from "next/link";


type Props = {
  title: string;
  videos: Video[];
  size: CardSize;
}
const SectionCards = ({title, videos, size}: Props) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.cardWrapper}>

        {videos.map((video, index) => {
          const videoId = typeof video.id === 'string' ? video.id : video.id.videoId;

          return (
            <Link href={`/video/${videoId}`} key={index}>
              <Card
                imgUrl={video.imgUrl}
                size={size}
                id={videoId}
              />
            </Link>
          )
        })}

      </div>
    </section>
  )
}

export default SectionCards;