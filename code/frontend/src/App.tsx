import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import ListBooks from './components/ListBooks';
import SearchBookByTitle from './components/SearchBookByTitle';
import Container from '@mui/material/Container';

//error handling for graphQL
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message,locations, path }) => {
      alert(`Graphql error ${message}`);
    })
  }
})

//create new apollo client 
const link = from([
  errorLink,
  new HttpLink({ uri:'http://localhost:4000/' })
]);

const client = new ApolloClient({
   cache: new InMemoryCache(),
  link: link, //GraphQL server URL
});

function App() {
  return (
    <div className="App">
      {
        <ApolloProvider client={client}>
          <Container maxWidth="xl">

            <SearchBookByTitle />

            {/*"ListBooks" Displays all books uncomment to see*/}
            {/* <ListBooks/> */}
          </Container>
        </ApolloProvider>
      }
    </div>
  );
}

export default App;
