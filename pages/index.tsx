import type { InferGetServerSidePropsType, NextPage } from "next";
import absoluteUrl from "next-absolute-url";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { origin } = absoluteUrl(context.req);
  const res = await fetch(`${origin}/api/names`);
  const data: { names: string[] } = await res.json();

  return {
    props: {
      names: data.names,
    },
  };
};

const Home: NextPage = ({
  names,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [data, setData] = useState<string[]>(names);
  const [selectedName, setSelectedName] = useState<string>("");

  const handleSelecteName = () => {
    const randomName = data[Math.floor(Math.random() * data.length)];
    setSelectedName(randomName);
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      <Head>
        <title>Fish Name</title>
        <meta
          name="description"
          content="Generate random name for your fish."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative grid gap-4 place-content-center">
        <div className="absolute top-6 left-0 w-full h-80 z-[-1] opacity-50">
          <Image src="/illustration.png" alt="illustration" layout="fill" />
        </div>
        <h1 className="text-xl underline">
          Have a fish ? <br /> But don&apos;t have any name ?
        </h1>
        <p className="text-lg">Click to get a name for your lovely fish.</p>
        {selectedName && (
          <strong className="my-8 text-4xl text-orange-600">{selectedName}</strong>
        )}
        <button
          onClick={handleSelecteName}
          className="px-8 py-2 text-white bg-pink-600 rounded-lg place-self-center"
        >
          Get Name
        </button>
      </main>
    </div>
  );
};

export default Home;
