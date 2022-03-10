import { GetServerSideProps } from "next";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { ChangeEvent } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const data = await response.json();
  return {
    props: {
      pokemon: data,
    }, // will be passed to the page component as props
  };
};
type Post = {
  id: number;
  name: string;
  image: string;
};
type PageProps = {
  pokemon: Post[];
};
export default function Home({ pokemon }: PageProps) {
  const [searchPokemon, setSeachPokemon] = useState<string>("");
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSeachPokemon(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
        value={searchPokemon}
      />
      <div className={styles.grid}>
        {pokemon
          .filter((val) => {
            if (searchPokemon == "") {
              return val;
            } else if (val.name.toLocaleLowerCase().includes(searchPokemon)) {
              return val;
            }
          })
          .map((pokemon) => (
            <div className={styles.card} key={pokemon.id}>
              <Link href={`/pokemon/${pokemon.id}`}>
                <a>
                  <img
                    src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                    alt={pokemon.name}
                  />
                  <h3>{pokemon.name}</h3>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
