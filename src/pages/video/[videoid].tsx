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
        <div>Modal body</div>
      </Modal>
    </div>
  )
}

export default Video;