import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Banner from "@/components/banner/Banner";
import Navbar from "@/components/nav/Navbar";
import {CardSize} from "@/shared";
import SectionCards from "@/components/sectionCards/SectionCards";
import {getPopularVideos, getVideos} from "@/lib/videos";
import {GetServerSideProps, NextPage} from "next";
import {Video} from "@/types";


type Props = {
  disneyVideos: Video[];
  popularVideos: Video[];
  productivityVideos: Video[];
  travelVideos: Video[];

}
const Home: NextPage<Props> = ({
                                 disneyVideos,
                                 productivityVideos,
                                 travelVideos,
                                 popularVideos
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
        <Navbar />

        <Banner
          title={'Clifford the red dog'}
          subtitle={'a very cute dog'}
          imgUrl={'/static/clifford.webp'}
          videoId={startVideoId}
        />

        <div className={styles.sectionWrapper}>
          <SectionCards size={CardSize.LARGE} title={'Disney'} videos={disneyVideos}/>
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
  const disneyVideos = await getVideos('disney trailers');
  const productivityVideos = await getVideos('productivity');
  const travelVideos = await getVideos('travel');
  const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      productivityVideos,
      travelVideos,
      popularVideos,
    }
  }
}