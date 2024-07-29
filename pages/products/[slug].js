import Image from "next/image";
import Container from "@components/container";
import { getStaticPage, queries } from "@data";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import urlFor from "helpers/displaySanityImages";
import React, { useEffect, useState } from "react";
import { formatAmount } from "utils";
import htm from "htm";
import vhtml from "vhtml";
import { toHTML, uriLooksSafe } from "@portabletext/to-html";
import ProductImages from "@components/productImages";
import AddToCart from "@components/addCart";
import Providers from "context/Providers";
import { HiXMark } from "react-icons/hi2";
import { AiOutlinePlus } from "react-icons/ai";

const Product = () => {
  const router = useRouter();
  const slug = router?.query?.slug;
  const [data, setdata] = useState();
  const [product, setproduct] = useState();
  const [selected, setselected] = useState(0);
  const fetchData = async () => {
    await getStaticPage(
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
      `
    ).then((res) => {
      setdata(res);
    });
  };
  const fetchProduct = async () => {
    await getStaticPage(
      `
        *[_type == "product" && _id == "${slug}"] 
      `
    ).then((res) => {
      setproduct(res?.page?.[0]);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const html = htm.bind(vhtml);
  const myPortableTextComponents = {
    types: {
      image: ({ value }) => html`<img src="${value.imageUrl}" />`,
      callToAction: ({ value, isInline }) =>
        isInline
          ? html`<a href="${value.url}">${value.text}</a>`
          : html`<div class="callToAction">${value.text}</div>`,
    },
    marks: {
      link: ({ children, value }) => {
        const href = value.href || "";
        if (uriLooksSafe(href)) {
          const rel = href.startsWith("/") ? undefined : "noreferrer noopener";
          return html`<a href="${href}" rel="${rel}">${children}</a>`;
        }
        return children;
      },
    },
  };
  const [docu, setdocu] = React.useState();
  function removeHtmlTags(str) {
    var div = docu?.createElement("div");
    if (docu) {
      div.innerHTML = str;
      var text = div.textContent || div.innerText || "";
      div.remove();
    }
    return text;
  }
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      setdocu(document);
    }
  }, []);
  const arr = [
    {
      no: "Delivery Information",
      text: `
  <p>At Omyrehub, we offer flexible shipping options to suit your needs:</p>
  <ul>
    <li><strong>Shipping Options:</strong></li>
    <ol>
      <li><strong>Standard Shipping:</strong> Estimated delivery within 3-7 business days.</li>
      <li><strong>Express Shipping:</strong> Estimated delivery within 1-3 business days.</li>
    </ol>
    <br />
    <li><strong>Tracking:</strong> A tracking number will be provided once your order is shipped, allowing you to monitor your delivery status in real-time.</li>
    <br />
    <li><strong>Shipping Costs:</strong> Costs are calculated at checkout based on your location and chosen shipping method.</li>
    <br />
    <li><strong>International Shipping:</strong> We also offer international shipping with delivery times varying by destination.</li>
  </ul>
  <p>For further details, please visit our <a className="underline cursor-pointer" href="https://www.omyrehub.com/products/60c56e97-71ec-4cfd-aa53-7179e9a82fa1">contact page</a>.</p>
`,
    },
    {
      no: "Returns & Refunds",
      text: `<p>You can return products within 30 days of delivery if they are unused, in original packaging, and in the same condition as received, along with proof of purchase. Perishable goods, custom products, and personal care items cannot be returned. Once your return is received and inspected, we will notify you about the approval or rejection of your refund. Approved refunds will be processed to your original payment method within a certain number of days. We only replace defective or damaged items. Customers are responsible for return shipping costs unless the item is defective or incorrect. </p>`,
    },
    {
      no: "Shipping",
      text: `<p>At Omyrehub, we offer several shipping options to cater to your needs. Standard Shipping typically takes 3-7 business days, while Express Shipping delivers within 1-3 business days. You will receive a tracking number once your order is shipped, allowing you to monitor its status in real-time. Shipping costs are calculated at checkout based on your location and selected shipping method. We also provide international shipping with delivery times varying by destination. For more details, visit our Shipping Information page.
</p>`,
    },
  ];

  if (data?.site) {
    return (
      <Providers>
        <Container site={data?.site} page={data?.page}>
          <main
            className={`flex flex-col lg:flex-row py-[50px] lg:py-[20px] px-[20px] 2xl:px-[100px]`}
          >
            <div className="w-full">
              <p
                className={`flex gap-[10px] cursor-pointer`}
                onClick={() => window.history.back()}
              >
                <ArrowLeft /> Back
              </p>
              <div
                className={
                  "flex flex-col md:flex-row md:justify-between w-full gap-4"
                }
              >
                <div className="md:w-[48%]">
                  <ProductImages images={product?.ProductImages} />
                </div>
                <section className={"md:w-[47%]"}>
                  {/* <p className={`font-semibold text-[#8c8c8c] -mt-8 md:mt-0`}>
                  <span className="">Category - </span>
                  <span className="uppercase">{product?.ProductCategory}</span>
                </p> */}
                  <h3>{product?.ProductName}</h3>
                  <h2 className={"font-bold"}>
                    ₦ {formatAmount(product?.ProductPrice)}
                  </h2>
                  <h4 className="!mt-20 mb-16 font-semibold text-[#8c8c8c]">
                    {"Product description"}
                  </h4>
                  <p>
                    {removeHtmlTags(
                      `${toHTML(product?.ProductDescription, {
                        components: myPortableTextComponents,
                      })}`
                    )}
                  </p>
                  <AddToCart product={product} />
                </section>
              </div>
            </div>
          </main>
          <div className="mt-20 mb-52 w-full px-[20px] 2xl:px-[100px] ">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full bg-pageText mb-16">
              {arr.map((e, index) => {
                return (
                  <div
                    key={index}
                    className={`border border-pageBG w-full px-10 py-10 cursor-pointer hover:scale-y-[1.05]  ${
                      selected === index ? "bg-primary" : "bg-pageText"
                    }`}
                    onClick={() => setselected(index)}
                  >
                    <h5 className="font-semibold text-pageBG">{e.no}</h5>
                  </div>
                );
              })}
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: arr[selected].text }}
              className=""
            />
          </div>
        </Container>
      </Providers>
    );
  }
};

export default Product;
