import { createClient } from "@sanity/client"
const client = createClient({
  projectId: `dht06soa`,
  dataset: "production",
  apiVersion: "2023-03-22",
  useCdn: false
});
export default client;