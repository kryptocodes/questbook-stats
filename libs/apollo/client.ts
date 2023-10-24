import { ApolloClient, InMemoryCache } from "@apollo/client";

import { OPTIMISIM,POLYGON,CELO } from "./endPoints";

const optimismClient = new ApolloClient({
  uri: OPTIMISIM,
  cache: new InMemoryCache(),
});

const polygonClient = new ApolloClient({
  uri: POLYGON,
  cache: new InMemoryCache(),
});

const celoClient = new ApolloClient({
  uri: CELO,
  cache: new InMemoryCache(),
});




export {
    optimismClient,
    polygonClient,
    celoClient
}
