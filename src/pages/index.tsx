import Head from 'next/head'
import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Banner from "@/components/banner/Banner";
import Navbar from "@/components/nav/Navbar";
import {CardSize} from "@/shared";
import SectionCards from "@/components/sectionCards/SectionCards";
import {getVideos} from "@/lib/videos";
import {GetServerSideProps, NextPage} from "next";
import {Video} from "@/types";

const inter = Inter({ subsets: ['latin'] })

type Props = {
  disneyVideos: Video[];
}
const Home: NextPage<Props> = ({disneyVideos}) => {
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar username={'Oleg@mail.com'}/>

      <Banner
        title={'Clifford the red dog'}
        subtitle={'a vary cure dog'}
        imgUrl={'/static/clifford.webp'}
      />

      <div className={styles.sectionWrapper}>
        <SectionCards size={CardSize.LARGE} title={'Disney'} videos={disneyVideos}/>
      </div>
    </>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const disneyVideos = getVideos();

  return {
    props: {
      disneyVideos
    }
  }
}