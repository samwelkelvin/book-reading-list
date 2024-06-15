import { makeVar, InMemoryCache } from "@apollo/client";
  
export const bookReadingList = makeVar<any>([]); 

export const CustomInMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        books: {
          read() {
            return bookReadingList();
          }
        }
      }
    }
  }
});


