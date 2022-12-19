import HomeCard from '@components/cards/Home';
import BaseLayout from '@components/layouts/base/layout';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
      </Head>
      <BaseLayout>
        <HomeCard />
      </BaseLayout>
    </>
  )
}