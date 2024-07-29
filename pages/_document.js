import Document, { Html, Head, Main, NextScript } from "next/document";
import Providers from "../context/Providers";
import Script from "next/script";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

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
