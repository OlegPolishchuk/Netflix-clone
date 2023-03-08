import {useRouter} from "next/router";
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css';

Modal.setAppElement('#__next');

const Video = () => {
  const router = useRouter();

  const {videoid} = router.query;


  return (
    <Modal
      isOpen
      contentLabel="Watch the video"
      onRequestClose={()=> router.back()}
      overlayClassName={styles.overlay}
    >
     <div>Modal body</div>
    </Modal>
  )
}

export default Video;