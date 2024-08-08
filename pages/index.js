import React from "react";
import Error from "next/error";
import Link from "next/link";
import Image from "next/image";
import { getStaticPage, queries } from "@data";
import Layout from "@components/layout";
import { Module } from "@components/modules";
import Providers from "context/Providers";
import Container from "@components/container";
import { useTheme } from 'next-themes';

const Home = ({ data }) => {
  const { theme, setTheme } = useTheme();
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
      <Container site={site} page={{
      hasTransparentHeader: true
    }}>
        <div className='home pt-[150px] sm:pt-[200px]'>
          <div className={`flex flex-col justify-center gap-10 items-center ${theme.name === "light" ? "text-pageBG" : "text-pageText"} mt-[200px]`}>
            <h1 className="text-[28px] leading-[36px]  text-center lg:text-[48px] lg:leading-[56px]">
              Embrace the convenience of online selling</h1>
            <p className="text-[20px]">Sign up today and turn your items into cash, all while enjoying a hassle-free experience.</p>
          </div>
        </div>
        <div className="border-pageText border-b-[1px]">
          <div className="flex  flex-col w-[80%] lg:w-[80%] text-current py-[80px] mx-auto">
            <p className="text-[24px] text-pageText lg:text-[32px]">
              From electronics to fashion, home goods to collectibles, Stowcash offers a wide variety of categories to explore.
              Join a community of like-minded individuals. Our customer support team is always ready to assist you with any questions or concerns.
            </p>
            <div className="flex justify-center">
              <Link href="/shop">
                  <button className="w-fit mt-[30px] py-[15px] px-[40px] text-[20px] border-[1px] text-pageText border-pageText bg-transparent rounded-full">
                  Start Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="xl:w-[1440px] xl:mx-auto">
          <div className="flex justify-center items-center gap-[0px] py-[50px]">
            <div className="w-[100%]">
              <div className='relative w-[500px] h-[600px]'>
                <Image src={"https://res.cloudinary.com/dqew5naa7/image/upload/v1722263161/charlesdeluvio-_4K7BwaHUGc-unsplash_vlesw2.jpg"} alt={"image of a store"} layout="fill" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-t-md object-contain scale-[1.2]" />
              </div>
            </div>
            <div className="w-[100%] px-[20px]">
              <h1 className="text-center">Why Us</h1>
              <p className="text-[20px] text-center">
                At Stowcash, we believe in the power of community and the convenience of online commerce.
                Our platform was created to bring buyers and sellers together in a secure, user-friendly environment.
              </p>
              <div className="flex justify-center ">
                <Link href="/about">
                  {/* <button className="w-[100%] mt-[30px] py-[15px] px-[40px] text-[20px] border text-pageBG bodrer-pageText bg-transparent rounded-full">
                    Our Story
                  </button> */}
                  <button className="w-fit mt-[30px] py-[15px] px-[40px] text-[20px] border text-pageText border-pageText bg-transparent rounded-full"
                    > {false ? <div className="loader ease-linear rounded-full border-4 border-t-4 border-blacks-four h-[25px] w-[25px]"></div> : "Our Story"}</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </Container>
      {/* </Layout> */}
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
