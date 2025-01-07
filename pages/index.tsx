import styles from '../styles/index.module.scss'
import { Typography, Grid, Avatar } from '@material-ui/core';
import FallingDownArrow from '../components/FallingDownArrow';
import Chip from '@material-ui/core/Chip';
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/Layout';
import Header from '../components/header';
import { getContributers } from '../utils/getContributers';

// import fs from 'fs'
// import path from 'path'

export async function getStaticProps() {
  let contributors = await getContributers()
  // await Promise.all(contributors)
  contributors = await Promise.all(contributors)
  // console.log(contributors)
  return {
    props: {
      contributors
    },
    revalidate: 1
  }
}
const Home = ({ contributors }): JSX.Element => (
  <Layout noAppBar>
    <Head>
      <title>Season of Commits</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <Grid className={styles.welcomeGridWrapper} container>
   {/* <Header/> */}
   <div>

   <img  className='logo'src='/soc.png'></img>
   </div>
      <Typography variant={"h1"} className={styles.welcomeText}>Let's change the world together with Open source!</Typography>
      <Typography variant={"h2"} className={styles.welcomeSubText}>FOSS Clubs GEC Palakkad is open to everyone whether you're new to development, a student or a long-time contributor. Open your first pull request and generate a personalized music certificate 
      <a className={styles.githubLink} href="https://github.com/FOSS-Cell-GECPKD/SPRINT" target="_blank">HERE</a>
      </Typography>
    </Grid>
    <Grid container className={styles.arrowContainer}>
      <FallingDownArrow />
    </Grid>
    <Grid container className={styles.contributorsListContainer}>
      <Typography className={styles.contributorsTitle}>{contributors.length} contributors:</Typography>
      <Typography className={styles.contributorsSubTitle}>Tip: 👉 Click on an username to view their personalized music certificate.</Typography>
      {
        contributors && contributors.map((item, index) => {
          return (
            <Link href="/contributors/[slug]" key={index} as={`/contributors/${item["github-username"]}`}>
              <Chip
                style={{
                  background: `${item["favourite-color"]}`
                }}
                className={styles.userName}
                classes={{ avatar: styles.chipAvatar }}
                avatar={<Avatar>{item["favourite-emoji"]}</Avatar>}
                label={item["github-username"]}
              />
            </Link>
          )
        })
      }
            <Typography className={styles.contributorsSubTitle}>Credits: This webapp was adapted from <a href='https://github.com/bluelearn-open-source/SPRINT'>Bluelearn Open Source Sprint.</a></Typography>

    </Grid>
  </Layout>
)

export default Home
