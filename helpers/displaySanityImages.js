
import imageUrlBuilder from "@sanity/image-url"
import client from "utils/client";

const imgBuilder = imageUrlBuilder(client)
const urlFor = (source) => imgBuilder.image(source);
export default urlFor;