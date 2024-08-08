"use client";
import Image from "next/image";
import Container from "@components/container";
import { getStaticPage, queries } from "@data";
import Providers from "context/Providers";
import React from "react";
import Marquee from "react-fast-marquee";

const About = ({ data }) => {
  const { site, page } = data;
  return (
    <Providers>
      <Container site={site} page={{
        hasTransparentHeader: true
      }}>
        <main className="">
        <div id="about" className={`flex flex-row items-center h-[70vh] justify-center px-10`}>
            <h1 className="text-white font-bold text-5xl">STOWCASH</h1>
            
          </div>

        <div>
            <Marquee className="bg-purple-20 py-[20px] text-purple-10 font-[600] border-pageText border-b-[1px]" autoFill>
              <div className="flex gap-[50px] sm:gap-[100px]">
                <div className='relative w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] xl:w-[150px] xl:h-[150px]'>
                  <Image src={"https://res.cloudinary.com/dqew5naa7/image/upload/v1722260385/103a4c3c2e365f5500df458c5edfeabf-removebg-preview_vdr3ue.png"} alt={"logo"} layout="fill" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-t-md object-cover object-bottom scale-[1.5]" />
                </div>
                <div className='relative w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] xl:w-[150px] xl:h-[150px]'>
                  <Image src={"https://res.cloudinary.com/dqew5naa7/image/upload/v1722260384/547e320261cff5b328543e9d9f3be2d9-removebg-preview_rz8qf5.png"} alt={"logo"} layout="fill" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-t-md object-cover object-bottom scale-[1.5]" />
                </div>
                <div className='relative w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] xl:w-[150px] xl:h-[150px]'>
                  <Image src={"https://res.cloudinary.com/dqew5naa7/image/upload/v1722260384/1a045c5483eb2cc3c3471365232f6569-removebg-preview_ge1qmc.png"} alt={"logo"} layout="fill" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-t-md object-cover object-bottom scale-[1.5]" />
                </div>
                <div className='relative w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] xl:w-[150px] xl:h-[150px]'>
                  <Image src={"https://res.cloudinary.com/dqew5naa7/image/upload/v1722260641/625104f0661e59d847c32384dd90ae35-removebg-preview_cpaxzs.png"} alt={"logo"} layout="fill" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-t-md object-cover object-bottom scale-[1.5]" />
                </div>
              </div>
            </Marquee>
          </div>

          <div className="flex flex-col items-center w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[60%] py-[40px] sm:py-[60px] lg:py-[80px] mx-auto">
            <p className="text-[20px] sm:text-[24px] lg:text-[28px] xl:text-[32px] leading-relaxed text-center">Discover a new way to buy and sell with ease. At Stowcash, we connect sellers with buyers in a seamless, secure, and user-friendly platform. Whether you're looking to declutter your home, find unique items, or start a small business, Stowcash is the perfect place for you.</p>
          </div>
        </main>

      </Container>
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

export default About;
