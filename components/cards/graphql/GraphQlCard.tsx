import Link from "@components/wrapper/link";
import styles from "./GraphQl.module.css";
import { useQuery as apolloUseQuery, gql } from "@apollo/client";

const QUERY = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;

export default function GraphQlCard({ countries }: any) {
  const { data: fetchData, loading, error } = apolloUseQuery(QUERY);
  if (loading) {
    return (
      <h2>
        <a href="#loading" aria-hidden="true" id="loading">
          <svg
            aria-hidden="true"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fill-rule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Loading...
      </h2>
    );
  }

  if (error) {
    console.error(error);
    return null;
  }
  const fetchedContries = fetchData.countries.slice(0, 4);

  return (
    <div className={styles.container}>
      GraphQl<Link href={"/"}>home</Link>
      <div>
        {countries.map((country: any) => (
          <div key={country.code}>
            <h3>
              <a href="#country-name" aria-hidden="true" id="country-name">
                <svg
                  aria-hidden="true"
                  height="16"
                  version="1.1"
                  viewBox="0 0 16 16"
                  width="16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
                  ></path>
                </svg>
              </a>
              {country.name}
            </h3>
            <p>
              {country.code} - {country.emoji}
            </p>
          </div>
        ))}
      </div>
      <div>
        Fetched
        {fetchedContries.map((country: any) => (
          <div key={country.code} className={styles.card}>
            <h3>
              <a href="#country-name" aria-hidden="true" id="country-name">
                <svg
                  aria-hidden="true"
                  height="16"
                  version="1.1"
                  viewBox="0 0 16 16"
                  width="16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
                  ></path>
                </svg>
              </a>
              {country.name}
            </h3>
            <p>
              {country.code} - {country.emoji}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
