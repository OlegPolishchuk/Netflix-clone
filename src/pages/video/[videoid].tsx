import {useRouter} from "next/router";
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css';
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {getYouTubeVideoById} from "@/lib/videos";
import {VideoById} from "@/types/video";
import Navbar from "@/components/nav/Navbar";
import {Like} from "@/components/icons/Like";
import {Dislike} from "@/components/icons/DislikeIcon";

Modal.setAppElement('#__next');

type Props = {
  video: VideoById;
}

const Video: NextPage<Props> = (video) => {
  const router = useRouter();

  const {videoid} = router.query;
  const {id, snippet, statistics} = video.video;
  const {description, publishedAt, channelId, title, channelTitle} = snippet;
  const {viewCount} = statistics;

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
             <button>
               <div className={styles.btnWrapper}>
                 <Like/>
               </div>
             </button>
           </div>

            <button>
              <div className={styles.btnWrapper}>
                <Dislike/>
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