"use client";
import Container from "@components/container";
import { getStaticPage, queries } from "@data";
import Providers from "context/Providers";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Success = ({ data }) => {
  const { site, page } = data;
  return (
    <Providers>
      <Container site={site} page={page}>
        <main className="">
          <div className=" py-32 md:py-48 px-6 md:px-32 flex flex-col">
            <div className="relative">
              <DotLottieReact
                src="https://lottie.host/4ce90877-036d-453f-9752-566e7c4c8177/sfy9RvPWpI.json"
                loop
                autoplay
                className="w-full h-1/3"
                style={
                  {
                    //maxWidth: "600px"
                  }
                }
              />
              <div className="absolute top-1/3 left-[25%]">
                <h1 className="font-semibold text-center">
                  Payment Successful
                </h1>
                <h5 className="md:text-center  font-normal">
                  Your items have been placed. We would send you more details
                  about your order.
                </h5>
              </div>
            </div>
          </div>
          <div className="px-6 md:px-32 md:w-[70%] py-32"></div>
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

export default Success;
