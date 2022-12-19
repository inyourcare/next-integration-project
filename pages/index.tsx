import { logger } from '@core/logger';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css'

export default function Home({ ogImage }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        {/* <meta name="og:image" content={`${router.basePath}`} /> */}
        <meta name="og:image" content={`${ogImage}`} />
      </Head>
      Home
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  logger.debug('index:getServerSideProps', req?.headers.host)
  const ogImage = `${req?.headers.host}/api/og`
  return {
    props: { ogImage }
  };
}