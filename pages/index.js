import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
  const response = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const data = await response.json();
  return {
    props: {
      pokemon: data,
    }, // will be passed to the page component as props
  };
}

export default function Home({ pokemon }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
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
