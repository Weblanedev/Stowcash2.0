"use client";
import Container from "@components/container";
import { getStaticPage, queries } from "@data";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { formatAmount } from "utils";
import { useRouter } from "next/router";
import Providers from "context/Providers";
import ProductCard from "@components/card";

const Shop = ({ data }) => {
  const { site, page } = data;
  const [products, setproducts] = React.useState([]);
  const router = useRouter();
  const [imageToShow, setImageToShow] = React.useState(0);
  React.useEffect(() => {
    (async () =>
      await axios
        .get(
          "https://dht06soa.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22product%22%5D%7B%0A%20%20_id%2C%20%0A%20%20ProductCategory%2C%0A%20%20ProductDescription%2C%0A%20%20AdditionalDetails%2C%0A%20%20ProductName%2C%0A%20%20ProductPrice%2C%0A%20%20ProductImages%2C%0A%20%20_type%2C%0A%20%20Image%0A%7D"
        )
        .then((res) => {
          setproducts(res.data.result);
        }))();
  }, []);

  if (products?.length > 0) {
    return (
      <Providers>
        <Container site={site} page={page} noFullScreen>
          <div id="shop" className={`flex flex-row items-center h-[70vh] justify-center px-10`}>
            <h1 className="text-white font-bold text-5xl">COMING SOON</h1>
            {/* <p className="!mt-10 md:w-[60%] !mb-40">
              Explore our wide range of household items and more! Discover
              quality products for your home, from kitchen essentials to home
              décor, all at unbeatable prices. Shop now and enjoy convenient
              online shopping with fast and reliable delivery.
            </p>
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
              {products?.map((e, index) => {
                return (
                  <ProductCard product={e} key={index} />
                );
              })}
            </div>
            <div className="flex flex-row flex-wrap"></div> */}
          </div>
        </Container>
      </Providers>
    );
  }
};

const eventtypeoptions = [
  {
    value: "NGN",
    label: "NGN",
  },
  {
    value: "USD",
    label: "USD",
  },
];

const sortByOption = [
  {
    value: "Price: low to high",
    label: "Price: low to high",
  },
  {
    value: "Price: high to low",
    label: "Price: high to high",
  },
];

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
export default Shop;
