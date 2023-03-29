import {useRouter} from "next/router";
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css';
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {getYouTubeVideoById} from "@/lib/videos";
import {VideoById} from "@/types/video";
import Navbar from "@/components/nav/Navbar";
import {Like} from "@/components/icons/Like";
import {Dislike} from "@/components/icons/DislikeIcon";
import {useEffect, useState} from "react";

Modal.setAppElement('#__next');

type Props = {
  video: VideoById;
}

const Video: NextPage<Props> = (video) => {
  const router = useRouter();

  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);

  const {videoid} = router.query;
  const {id, snippet, statistics} = video.video;
  const {description, publishedAt, channelId, title, channelTitle} = snippet;
  const {viewCount} = statistics;

  const runRatingService = async (favourited: number) => {
    return await fetch('/api/stats', {
      method: 'POST',
      body: JSON.stringify({
        videoId: videoid,
        favourited,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const handleToggleLike = async () => {
    const val = !toggleLike;
    const favourite = val ? 1 : 0;

    setToggleLike(val)
    setToggleDislike(toggleLike)

    return await runRatingService(favourite)
  }

  const handleToggleDislike = async () => {
    const val = !toggleDislike;
    const favourite = val ? 0 : 1;

    setToggleDislike(val)
    setToggleLike(toggleDislike)

    return await runRatingService(favourite)
  }

  useEffect(() => {
    fetch(`/api/stats?videoId=${videoid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        const videos = data.findVideo;

       if (videos) {
         const favourited =videos[0]?.favourited;

         if (favourited === 1) {
           setToggleLike(true)
         } else {
           setToggleDislike(true)
         }
       }
      })
  }, [])

  return (
    <div className={styles.container}>
      <Navbar/>

      <Modal
        isOpen
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div>
          <iframe
            className={styles.videoPlayer}
            id="ytplayer"
            width="100%"
            height="360"
            frameBorder={0}
            src={`https://www.youtube.com/embed/${videoid}?autoplay=0&controls=0&origin=http://example.com&rel=0`}
          />

          <div className={styles.likeDislikeBtnWrapper}>
            <div className={styles.likeBtnWrapper}>
              <button onClick={handleToggleLike}>
                <div className={styles.btnWrapper}>
                  <Like selected={toggleLike}/>
                </div>
              </button>
            </div>

            <button onClick={handleToggleDislike}>
              <div className={styles.btnWrapper}>
                <Dislike selected={toggleDislike}/>
              </div>
            </button>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.modalBodyContent}>
              <div className={styles.col1}>
                <p className={styles.publishTime}>{publishedAt}</p>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
              </div>

              <div className={styles.col2}>
                <p className={`${styles.subText} ${styles.subTextWrapper}`}>
                  <span className={styles.textColor}>Cast: </span>
                  <span className={styles.channelTitle}>{channelTitle}</span>
                </p>

                <p className={`${styles.subText} ${styles.subTextWrapper}`}>
                  <span className={styles.textColor}>View Count: </span>
                  <span className={styles.channelTitle}>{viewCount}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Video;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const {videoid} = context.params as { videoid: string };
  const video = await getYouTubeVideoById(videoid);

  return {
    props: {
      video
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const listOfVideos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'KCPEHsAViiQ'];
  const paths = listOfVideos.map(video => ({params: {videoid: video}}))

  return {
    paths,
    fallback: 'blocking',
  }
}