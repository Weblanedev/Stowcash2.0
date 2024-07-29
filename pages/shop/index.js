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
        <Container site={site} page={page}>
          <main className={`py-[50px] lg:py-[20px] px-[20px]`}>
            <h1>Welcome to Our Shop</h1>
            <p className="!mt-10 md:w-[60%] !mb-40">
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
            <div className="flex flex-row flex-wrap"></div>
          </main>
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
// const [activePage, setPage] = React.useState(1)
// const [value, setValue] = React.useState(eventtypeoptions[0].value)
// const [sort, setSort] = React.useState(sortByOption[0].value)
// const dispatch = useDispatch()
// const { products, searchTerm } = useAppSelector(selectProducts);
// const [productss, setProducts] = useState<any>({})

// useEffect(() => {
//   dispatch(getFetchProducts({
//       query: searchTerm,
//       brand: "",
//       category: "",
//       type: "",
//       amount: "",
//       priceRange: "",
//       tags: "",
//       page: activePage,
//       perPage: ""
//   }))
// }, [dispatch, searchTerm])

// return (
//   <DefaultLayout>
//       <div className='pt-[50px] lg:pt-[20px] 2xl:pt-[110px] pb-[50px] overflow-x-hidden' id="top">
//           <h1 className={`${ebGaramond.className} font-light text-[24px] lg:text-[32px] text-center`}>ALL <span className={`${montserrat.className} font-[700]`}>PRODUCTS</span></h1>
//           <div className='pt-[50px] pb-[100px] hidden lg:flex items-center justify-between px-[20px]'>
//               <div className='flex gap-[10px] items-end'>
//                   <div className="w-[258px]">
//                       <SelectInput
//                           inputLabel='FILTER'
//                           id="ticketQty"
//                           options={eventtypeoptions}
//                           placeholder=""
//                           value={value}
//                           className="border border-black-10 text-black-10"
//                           hasOnChange={true}
//                           handleOnchage={(evt) => {
//                               setValue(evt);
//                           }}
//                       />
//                   </div>
//                   <div className="w-[258px]">
//                       <SelectInput
//                           id="ticketQty"
//                           options={eventtypeoptions}
//                           placeholder=""
//                           value={value}
//                           className="border border-black-10 text-black-10"
//                           hasOnChange={true}
//                           handleOnchage={(evt) => {
//                               setValue(evt);
//                           }}
//                       />
//                   </div>
//               </div>
//               <div>
//                   <div className="w-[258px] text-end">
//                       <SelectInput
//                           inputLabel='SORT BY'
//                           id="ticketQty"
//                           options={sortByOption}
//                           placeholder=""
//                           value={sort}
//                           className="border border-black-10 text-black-10"
//                           hasOnChange={true}
//                           handleOnchage={(evt) => {
//                               setSort(evt);
//                           }}
//                       />
//                   </div>
//               </div>
//           </div>
//           <div className="pt-[50px] pb-[30px] px-[20px] lg:hidden">
//               <h1 className={`${montserrat.className} flex items-center gap-[6px] text-[12px] leading-[18px]`}><SlidersHorizontal /> FILTER</h1>
//           </div>
//           <div className="grid grid-cols-2 gap-x-[25px] 2xl:gap-[50px] lg:grid-cols-3 gap-y-[30px] lg:gap-y-[50px] px-[20px]">
//               {(items && products.page === activePage) && (
//                   <MantineProvider
//                       withCssVariables
//                   >
//                       {items}
//                   </MantineProvider>
//               )}
//           </div>
//           {products.page !== activePage &&
//               <div className="hidden xl:grid grid-cols-2 gap-x-[25px] md:gap-[50px] lg:grid-cols-3 gap-y-[30px] lg:gap-y-[50px] px-[20px]">
//                   <ProductCardLoading />
//                   <ProductCardLoading />
//                   <ProductCardLoading />
//                   <ProductCardLoading />
//                   <ProductCardLoading />
//                   <ProductCardLoading />
//               </div>}
//           {products.page !== activePage &&
//               <div className="grid xl:hidden grid-cols-2 gap-x-[25px] md:gap-[50px] lg:grid-cols-3 gap-y-[30px] lg:gap-y-[50px] px-[20px]">
//                   <ProductCardLoadingAllProducts></ProductCardLoadingAllProducts>
//                   <ProductCardLoadingAllProducts></ProductCardLoadingAllProducts>
//                   <ProductCardLoadingAllProducts></ProductCardLoadingAllProducts>
//               </div>}
//           <div className="flex pl-[20px] xl:pl-0 xl:justify-end xl:pr-[20px]">
//               <Pagination
//                   className="pt-[50px] xl:pt-[100px] w-fit gap-[20px]"
//                   total={products?.totalPages}
//                   value={activePage}
//                   onChange={handlePageChange}
//                   color="black"
//                   radius="xs"
//                   size="md"

//               />
//           </div>
//       </div>
//   </DefaultLayout>
// )

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
