"use client";
import Container from "@components/container";
import { getStaticPage, queries } from "@data";
import Providers from "context/Providers";
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
                <input
                  placeholder="Your Name"
                  className="border border-[#9e9e9e] p-[20px] outline-none"
                />
                <input
                  placeholder="Your Email"
                  className="border border-[#9e9e9e] p-[20px] outline-none"
                />
                <textarea
                  placeholder="Your Message"
                  className="border border-[#9e9e9e] p-[20px] outline-none resize-none h-[234px]"
                />
                <button className="bg-[#141414] text-white py-[20px]">
                  Send Message
                </button>
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
