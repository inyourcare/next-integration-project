import MultiLangTest from '@components/cards/TestHomeCard';
import BaseLayout from '@components/layouts/base/layout';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
      </Head>
      <BaseLayout>
        <MultiLangTest />
      </BaseLayout>
    </>
  )
}