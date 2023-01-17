import GraphQlCard from "@components/cards/graphql/GraphQlCard";
import BaseLayout from "@components/layouts/base/layout";
import { gql } from "@apollo/client";
import apollo from "apollo";
import { GetStaticPaths, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";

export default function GraphQl({
  countries,
// }: InferGetStaticPropsType<typeof getStaticProps>) {
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <BaseLayout>
      <GraphQlCard countries={countries}></GraphQlCard>
    </BaseLayout>
  );
}

// export async function getStaticProps() {
//   const { data } = await apollo.query({
//     query: gql`
//       query Countries {
//         countries {
//           code
//           name
//           emoji
//         }
//       }
//     `,
//   });

//   return {
//     props: {
//       countries: data.countries.slice(0, 4),
//     },
//   };
// }

// export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };

export async function getServerSideProps() {
  const { data } = await apollo.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries.slice(0, 4),
    },
  };
}
