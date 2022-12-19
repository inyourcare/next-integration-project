import HomeCard from '@components/cards/Home';
import BaseLayout from '@components/layouts/base/layout';
import { logger } from '@core/logger';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

export default function Home({ ogImage }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        {/* <meta name="og:image" content={`${router.basePath}`} /> */}
        <meta name="og:image" content={`${ogImage}`} />
      </Head>
      <BaseLayout>
        <HomeCard />
      </BaseLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  logger.debug('index:getServerSideProps', req?.headers.host)
  const ogImage = `http://${req?.headers.host}/api/og`
  return {
    props: { ogImage }
  };
}