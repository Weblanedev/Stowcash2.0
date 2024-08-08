"use client";
import Container from "@components/container";
import { getStaticPage, queries } from "@data";
import Providers from "context/Providers";
import FormInput from '@components/input';
import React from "react";

const Contact = ({ data }) => {
  const { site, page } = data;
  return (
    <Providers>
      <Container site={site} page={page}>
        <main className="lg:min-h-[75vh]">
          <div className="container mx-auto">
            <div className="flex justify-between pt-[50px] pb-[100px]">
              <div className="w-[100%]">
                <h1 className="text-[32px] font-[400] leading-[38px] pb-[30px] uppercase">
                  Reach Out – Let's Connect!
                </h1>
                <p className="w-[70%]">
                  We’d love to hear from you! Whether you have questions,
                  feedback, or a partnership idea, drop us a message. If you
                  need help with an order or have a product inquiry, our
                  customer support team is here to assist you.
                </p>
              </div>
              <div className="w-[100%] flex flex-col gap-[30px]">
                <FormInput
                  placeholder="Your Name"
                  className="border border-[#9e9e9e] p-[20px] outline-none"
                />
                <FormInput
                  placeholder="Your Email"
                  className="border border-[#9e9e9e] p-[20px] outline-none"
                />
                <textarea
                  placeholder="Your Message"
                  className="flex w-full font-[400] control--pot text-base text-pageBG border-b text-[18px] py-[10px] border-pageText bg-transparent transition-colors file:border-0 file:bg-transparent text-gray-900 file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-[234px]"
                />
                <button className="w-[100%] mt-[30px] py-[15px] px-[40px] text-[20px] border text-pageText border-pageText bg-transparent rounded-full"> 
                  {false ? <div className="loader ease-linear rounded-full border-4 border-t-4 border-blacks-four h-[25px] w-[25px]"></div> : "Send Message"}</button>
              </div>
            </div>
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

export default Contact;
