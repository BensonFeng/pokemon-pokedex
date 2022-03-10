import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/Details.module.css";
import { GetStaticProps, GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json`
  );
  const pokemons = await response.json();

  const paths = pokemons.map((pokemon: { id: number }) => ({
    params: { id: pokemon.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${context?.params?.id}.json`
  );
  const data = await response.json();
  return {
    props: {
      pokemon: data,
    }, // will be passed to the page component as props
  };
};

type AppProps = {
  pokemon: {
    name: string;
    stats: { name: string; value: number }[];
    type: string[];
    image: string;
  };
};

const Details = ({ pokemon }: AppProps) => {
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>
            {pokemon.type
              .filter(
                (e) =>
                  [
                    "Super awesome",
                    "Crazy awesome",
                    "Mucho crazy awesome",
                  ].indexOf(e) < 0
              )
              .join(", ")}
          </div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Details;
