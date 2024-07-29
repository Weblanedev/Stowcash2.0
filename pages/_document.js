import Document, { Html, Head, Main, NextScript } from "next/document";
import Providers from "../context/Providers";
import Script from "next/script";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  //   const description = "Welcome to Omyrehub, your ultimate online destination for all things stylish and chic. Discover a curated selection of quality products to enhance your lifestyle. Explore Omyrehub today."
  // export const metadata: Metadata = {
  //   title: "Omyrehub",
  //   description: description,
  //   keywords: "PT&K category, Household items, Decorations, Gadgets, Kids products, Home decor, Kitchen essentials, Tech gadgets, Children's toys, Family-friendly products, Unique gifts, Lifestyle accessories, Trendy home goods, Outdoor gear, Baby essentials",
  //   openGraph: {
  //       url: "https://www.omyre.com/",
  //       siteName: "Omryehub",
  //       images: "/logo.png",
  //       type: "website",
  //       countryName: "Nigeria",
  //       title: "Omryehub",
  //       description: description,
  //       locale: "en_NG"
  //   },
  //   twitter: {
  //       images: "/logo.png"
  //   }
  // };

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Providers>
            <Main />
            <NextScript />
            <div id="drawer" />
          </Providers>
        </body>
        <script src="https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js" />
      </Html>
    );
  }
}

export default MyDocument;
