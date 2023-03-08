import {useRouter} from "next/router";

const Video = () => {
  const router = useRouter();

  const {videoid} = router.query;


  return (
    <div>Video page {videoid}</div>
  )
}

export default Video;