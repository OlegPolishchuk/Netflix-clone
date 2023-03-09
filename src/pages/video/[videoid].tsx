import {useRouter} from "next/router";
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css';

Modal.setAppElement('#__next');

const Video = () => {
  const router = useRouter();

  const { videoid } = router.query;


  return (
    <div className={styles.container}>
      <Modal
        isOpen
        contentLabel="Watch the video"
        onRequestClose={()=> router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div>
          <iframe id="ytplayer"
                  width="640"
                  height="360"
                  src={`https://www.youtube.com/embed/${videoid}?autoplay=0&controls=0&origin=http://example.com&rel=0`}
          >
          </iframe>
        </div>
      </Modal>
    </div>
  )
}

export default Video;