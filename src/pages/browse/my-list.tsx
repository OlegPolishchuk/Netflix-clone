import Head from "next/head";
import Navbar from "@/components/nav/Navbar";
import SectionCards from "@/components/sectionCards/SectionCards";
import {CardSize} from "@/shared";

import styles from '@/styles/MyList.module.css';
import {GetServerSideProps, NextPage} from "next";
import {getUserAuthData} from "@/utils/redirectUser";
import {Video} from "@/types";
import {getMyListVideos} from "@/lib/videos";

interface Props {
  myListVideos: Video[];
}

const MyList: NextPage<Props> = ({myListVideos}) => {
  return (
    <>
      <Head>
        <title>My list</title>
      </Head>

      <main className={styles.main}>
        <Navbar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title={'My List'}
            videos={myListVideos}
            size={CardSize.SMALL}
            wrap
            shouldScale={false}
          />
        </div>
      </main>
    </>
  )
}

export default MyList;


export const getServerSideProps: GetServerSideProps<Props> = async ({req}) => {
  const {userId, token} = await getUserAuthData(req);

  const myListVideos = await getMyListVideos(userId, token);

  return {
    props: {
      myListVideos
    }
  }
}