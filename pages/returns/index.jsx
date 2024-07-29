"use client";
import Container from "@components/container";
import { getStaticPage, queries } from "@data";
import Providers from "context/Providers";
import React from "react";

const Returns = ({ data }) => {
  const { site, page } = data;
  return (
    <Providers>
      <Container site={site} page={page}>
        <main className="">
          <div className="border-b-black border-b-[1px] py-32 md:py-48 px-6 md:px-32 flex flex-col md:flex-row md:justify-between md:items-center">
            <h1 className="md:w-[60%] font-semibold">Returns + Exchanges</h1>
            <h5 className="md:w-[35%] md:text-center  font-normal">
              Not satisfied with your purchase? No worries! We offer hassle-free
              returns within 30 days. Contact our support team to start the
              process.
            </h5>
          </div>
          <div className="px-6 md:px-32 md:w-[70%] py-32">
            <p>
              <h5 className="font-semibold ">How do I start a return?</h5>
              Reach out to support
              <br />
              <br />
              Follow the instructions and select the items you want to return
              <br />
              Once your request is approved, you will get a confirmation email
              with shipping guidelines.
              <br />
              You will be responsible for paying for your own shipping costs for
              returning your item. Shipping costs are non-refundable.
              <br />
              <br />
              <h5 className="font-semibold ">What are the refund options?</h5>We
              unfortunately do not offer refunds. For more enquiries, please
              contact support
              <br />
              <br />
              <h5 className="font-semibold ">Can the items be exchanged?</h5>You
              may request an exchange of the same item if its still available
              <br />
              <br />
              <h5 className="font-semibold ">What items are returnable?</h5>
              Within 30 days from the date of receipt. If an item is received
              after the 30 days has passed, you'll be charged a 50% restocking
              fee.
              <br />
              <br />
              <h5 className="font-semibold ">
                In unused and resellable condition
              </h5>
              In the original packaging with all the tags intact.
              <br />
              <br />
              <h5 className="font-semibold ">What items are not returnable?</h5>
              <b>Final sale /Clearance items.</b> We do not accept returns on
              clearance items (final sale), they will be sent back to you, or
              you'll be charge a 50% restocking fee. There’s a return card in
              your package with return information and instruction. If you no
              longer have the return card you can print it here. The item I
              received is damaged! If the purchased product is faulty, reach out
              to us at support@omyrehub.com with photos within 7 days of the
              delivered date.
              <br />
              <br />
            </p>
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

export default Returns;
