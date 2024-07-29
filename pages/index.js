import React from "react";
import Error from "next/error";
import Image from "next/image";
import { getStaticPage, queries } from "@data";
import Layout from "@components/layout";
import { Module } from "@components/modules";
import Providers from "context/Providers";
import Container from "@components/container";

const Home = ({ data }) => {
  const { site, page } = data;

  //console.log(site, '<-- SITE ON HOME')
  if (!page) {
    return (
      <Error
        title={`"Home Page" is not set in Sanity, or the page data is missing`}
        statusCode="Data Error"
      />
    );
  }

  return (
    <Providers>
      <Layout site={site} page={page}>
        {/* {page.modules?.map((module, key) => (
          <Module key={key} index={key} data={module} />
        ))} */}
        <div className='home pt-[150px] sm:pt-[200px]'>
          <div className="flex flex-col justify-center gap-10 items-center mt-[35px] text-white">
            <h1 className="text-[28px] leading-[36px] text-center lg:text-[40px] lg:leading-[56px] font-bold">
              Embrace the convenience of online selling with Stowcash. </h1>
            <p className="text-[20px]">Sign up today and turn your items into cash, all while enjoying a hassle-free experience.</p>
          </div>
        </div>

        <div className="flex w-[60%] lg:w-[60%] py-[80px] mx-auto border-b border-black">
          <p className="text-[28px] lg:text-[40px]">
          Ready to start selling? Creating an account is quick and easy. List your items, set your prices, and reach a wide audience of potential buyers. Whether you're an individual looking to sell a few items or a business aiming to expand your reach, Stowcash provides the tools and support you need to succeed.
          </p>
          
        </div>
      </Layout>
    </Providers>
  );
};

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getStaticPage(
    `
    *[_type == "page" && _id == ${queries.homeID}] | order(_updatedAt desc)[0]{
      "id": _id,
      hasTransparentHeader,
      modules[]{
        defined(_ref) => { ...@->content[0] {
          ${queries.modules}
        }},
        !defined(_ref) => {
          ${queries.modules},
        }
      },
      title,
      seo
    }
  `,
    {
      active: preview,
      token: previewData?.token,
    }
  );

  return {
    props: {
      data: pageData,
    },
  };
}

export default Home;
