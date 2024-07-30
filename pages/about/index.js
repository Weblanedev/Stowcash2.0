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
      hasTransparentHeader: false
    }}>
        <main className="">
          <div className="pt-[150px] sm:pt-[200px] text-white relative">
            <video autoPlay muted playsInline loop id="myVideo">
              <source src="https://res.cloudinary.com/dqew5naa7/video/upload/v1722258766/m5ieadkylfjoshpwwotp.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
            <div className="flex flex-col justify-center gap-10 items-center lg:mt-[200px] relative z-10">
              <h1 className="text-[28px] leading-[36px] text-center lg:text-[48px] lg:leading-[48px] font-normal">Stowcash</h1>
            </div>
          </div>
          <Marquee className={`bg-purple-20 py-[20px] text-purple-10 font-[600] mt-[600px] sm:mt-[680px] md:mt-[600px] lg:mt-[400px] 2xl:mt-[800px] border-b-pageText border-b-[1px]`} autoFill>
            <div className="flex gap-[100px] ">
              <div className='relative w-[80px] md:w-[150px] h-[80px] md:h-[150px] '>
                <Image src={"https://res.cloudinary.com/dqew5naa7/image/upload/v1722260385/103a4c3c2e365f5500df458c5edfeabf-removebg-preview_vdr3ue.png"} alt={"logo"} layout="fill" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-t-md object-cover object-bottom scale-[1.5]" />
              </div>
              <div className='relative w-[80px] md:w-[150px] h-[80px] md:h-[150px] '>
                <Image src={"https://res.cloudinary.com/dqew5naa7/image/upload/v1722260384/547e320261cff5b328543e9d9f3be2d9-removebg-preview_rz8qf5.png"} alt={"logo"} layout="fill" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-t-md object-cover object-bottom scale-[1.5]" />
              </div>
              <div className='relative w-[80px] md:w-[150px] h-[80px] md:h-[150px] '>
                <Image src={"https://res.cloudinary.com/dqew5naa7/image/upload/v1722260384/1a045c5483eb2cc3c3471365232f6569-removebg-preview_ge1qmc.png"} alt={"logo"} layout="fill" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-t-md object-cover object-bottom scale-[1.5]" />
              </div>
              <div className='relative w-[80px] md:w-[150px] h-[80px] md:h-[150px] '>
                <Image src={"https://res.cloudinary.com/dqew5naa7/image/upload/v1722260641/625104f0661e59d847c32384dd90ae35-removebg-preview_cpaxzs.png"} alt={"logo"} layout="fill" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-t-md object-cover object-bottom scale-[1.5]" />
              </div>
            </div>
          </Marquee>
          <div className="flex w-[60%] lg:w-[50%] py-[80px] mx-auto">
            <p className="text-[28px] lg:text-[40px]">Discover a new way to buy and sell with ease. At Stowcash, we connect sellers with buyers in a seamless, secure, and user-friendly platform.
              Whether you're looking to declutter your home, find unique items, or start a small business, Stowcash is the perfect place for you.</p>
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
