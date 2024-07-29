'use client';
import Container from '@components/container';
import { getStaticPage, queries } from '@data';
import Providers from 'context/Providers';
import React from 'react';

const Delivery = ({ data }) => {
  const { site, page } = data;
  return (
    <Providers>
    <Container site={site} page={page}>
      <main className=''>
        <div className='border-b-black border-b-[1px] py-32 md:py-48 px-6 md:px-32 flex flex-col md:flex-row md:justify-between md:items-center'>
          <h1 className='md:w-[60%] font-semibold'>Delivery & Shipping</h1>
          <h5 className='md:w-[35%] md:text-center  font-normal'>
            Enjoy fast, reliable shipping with speedy delivery on orders. For
            any questions, our support team is here to help.
          </h5>
        </div>
        <div className='px-6 md:px-32 md:w-[70%] py-32'>
          <p>
            <h5 className='font-semibold '>
              Tentative Processing and Shipping Times
            </h5>
            We ship worldwide from Nigeria Express/Priority orders 1-2 days
            processing and 1-2 days shipping, overall time 2-4 business days (US
            and Canada) 4-7 days shipping, overall time 5-9 business days
            (Europe) 4-7 days shipping, overall time 5-9 business days
            (Australia & International) Weekends and holidays not included
            <br />
            <br />
            <h5 className='font-semibold '>
              Standard International/Expedited orders
            </h5>
            Standard International/Expedited orders 4-8 days shipping, overall
            time 7-13 business days (US and Canada) 4-7 days shipping, overall
            time 7-12 business days (Europe) 4-7 days shipping, overall time
            7-12 business days (Australia & International) Weekends and holidays
            not included Please allow up to 14 business days during holidays and
            sales. We will be shipping all our US and International EXPRESS
            packages with DHL Please check out On Demand Delivery you can use
            this tool to update address, choose delivery time and location etc
            <br />
            <br />
            <h5 className='font-semibold '>Shipping Addresses</h5>
            Please make sure your shipping address is complete and correct. We
            may not be able to accommodate address changes after your order has
            been placed.
            <br />
            Please make sure, apartment numbers are provided and correct.
            <br />
            <br />
            <h5 className='font-semibold '>Shipping rates</h5>
            <b>Rates are calculated at checkout</b>
            <br />
            Free shipping on orders above $300USD ( U.S, Canada and Europe ) and
            $500 for Australia Signature available
            <br />
            <br />
            <h5 className='font-semibold '>Custom Charges</h5>
            All shipments crossing international borders are subject to the
            assessment of duties and taxes imposed by the importing country’s
            government. Omyrehub has no control over these charges as they vary
            between countries. They are your responsibility. Shipping fees do
            not cover duties and taxes, shipping fees are paid to the shipping
            company and duties and taxes are paid to your government. Please
            note that shipping fees are non-refundable and return shipping costs
            are the customer's responsibility. Omyrehub does not provide return
            shipping labels. A handling fee will be assessed on orders that are
            refused by the customer at the time of delivery or returned due to
            an "un-deliverable" or incomplete address.
            <br />
            <br />
            <h5 className='font-semibold '>Pre-Order Items</h5>
            Pre-order item(s) have their "Shipping Starts" date in the item
            description, it is the date they become available to start shipping
            out.
            <br />
            Processing time will start on that date provided and will be 1-2
            business days for express orders and 5-7 business days for standard
            orders. If your order has a pre-order item all the items will ship
            together. If you wish to split up the order, there will be an
            additional shipping cost
            <br />
            <br />
            <h5 className='font-semibold '>Item not delivered?</h5>
            If you have not yet received your order within the estimated
            delivery time, please allow an extra 2-3 days because packages may
            be delayed.
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

export default Delivery;