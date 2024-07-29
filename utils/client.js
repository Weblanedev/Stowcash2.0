import { createClient } from "@sanity/client"
const client = createClient({
  projectId: `sfpive8k`,
  dataset: "production",
  apiVersion: "2023-03-22",
  useCdn: false
});
export default client;