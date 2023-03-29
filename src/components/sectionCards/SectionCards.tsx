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
  wrap?: boolean;
  shouldScale?: boolean;
}
const SectionCards = ({title, videos, size, wrap = false, shouldScale=true}: Props) => {
  const shouldWrapClassName = wrap ? 'wrap' : '';

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <div className={`${styles.cardWrapper} ${styles[shouldWrapClassName]}`}>

        {videos.map((video, index) => {
          const videoId = typeof video.id === 'string' ? video.id : video.id.videoId;

          return (
            <Link href={`/video/${videoId}`} key={index}>
              <Card
                imgUrl={video.imgUrl}
                size={size}
                id={videoId}
                shouldScale={shouldScale}
              />
            </Link>
          )
        })}

      </div>
    </section>
  )
}

export default SectionCards;