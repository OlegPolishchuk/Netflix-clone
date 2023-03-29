import Head from "next/head";
import Navbar from "@/components/nav/Navbar";
import SectionCards from "@/components/sectionCards/SectionCards";
import {CardSize} from "@/shared";

import styles from '@/styles/MyList.module.css';

const MyList = () => {
  return (
    <>
      <Head>
        <title>My list</title>
      </Head>

      <main className={styles.main}>
        <Navbar />
        <div className={styles.sectionWrapper}>
          <SectionCards title={'My List'} videos={[]} size={CardSize.SMALL} />
        </div>
      </main>
    </>
  )
}

export default MyList;