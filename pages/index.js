import React from "react";
import Error from "next/error";
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
        {page.modules?.map((module, key) => (
          <Module key={key} index={key} data={module} />
        ))}
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