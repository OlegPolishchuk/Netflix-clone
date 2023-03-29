import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Banner from "@/components/banner/Banner";
import Navbar from "@/components/nav/Navbar";
import {CardSize} from "@/shared";
import SectionCards from "@/components/sectionCards/SectionCards";
import {getPopularVideos, getVideos, getWatchedAgainVideos} from "@/lib/videos";
import {GetServerSideProps, NextPage} from "next";
import {Video} from "@/types";


type Props = {
  disneyVideos: Video[];
  popularVideos: Video[];
  productivityVideos: Video[];
  travelVideos: Video[];
  watchedAgainVideos: Video[];

}
const Home: NextPage<Props> = ({
                                 disneyVideos,
                                 productivityVideos,
                                 travelVideos,
                                 popularVideos,
                                 watchedAgainVideos
                               }) => {
  const startVideoId = '4zH5iYM4wJo';

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>

      <div className={styles.main}>
        <Navbar/>

        <Banner
          title={'Clifford the red dog'}
          subtitle={'a very cute dog'}
          imgUrl={'/static/clifford.webp'}
          videoId={startVideoId}
        />

        <div className={styles.sectionWrapper}>
          <SectionCards size={CardSize.LARGE} title={'Disney'} videos={disneyVideos}/>
          <SectionCards size={CardSize.SMALL} title={'Watched Again'} videos={watchedAgainVideos}/>
          <SectionCards size={CardSize.SMALL} title={'Travel'} videos={travelVideos}/>
          <SectionCards size={CardSize.MEDIUM} title={'Productivity'}
                        videos={productivityVideos}/>
          <SectionCards size={CardSize.SMALL} title={'Popular'} videos={popularVideos}/>
        </div>
      </div>
    </>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const userId = 'did:ethr:0x9c821BC37aB21d182454896f25b60CBc76faE0C6';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDljODIxQkMzN2FCMjFkMTgyNDU0ODk2ZjI1YjYwQ0JjNzZmYUUwQzYiLCJwdWJsaWNBZGRyZXNzIjoiMHg5YzgyMUJDMzdhQjIxZDE4MjQ1NDg5NmYyNWI2MENCYzc2ZmFFMEM2IiwiZW1haWwiOiJvbGVnLm1ha2tvcm1AZ21haWwuY29tIiwib2F1dGhQcm92aWRlciI6bnVsbCwicGhvbmVOdW1iZXIiOm51bGwsIndhbGxldHMiOltdLCJpYXQiOjE2Nzk3NTMwMDAsImV4cCI6MTY3OTgxMzQ4MDEsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLXVzZXItaWQiOiJkaWQ6ZXRocjoweDljODIxQkMzN2FCMjFkMTgyNDU0ODk2ZjI1YjYwQ0JjNzZmYUUwQzYifX0.PxA3xsm5hrFiq3I8S_rv6Jp8eQKpAfEXnMIdkFR8mgo';

  const disneyVideos = await getVideos('disney trailers');
  const productivityVideos = await getVideos('productivity');
  const travelVideos = await getVideos('travel');
  const popularVideos = await getPopularVideos();
  const watchedAgainVideos= await getWatchedAgainVideos(userId, token);

  return {
    props: {
      disneyVideos,
      productivityVideos,
      travelVideos,
      popularVideos,
      watchedAgainVideos
    }
  }
}