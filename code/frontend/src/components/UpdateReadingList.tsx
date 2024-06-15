import { useReactiveVar } from "@apollo/client";
import { bookReadingList } from "../graphql/BookListCache";
import Button from "@mui/material/Button/Button";
type bookProps = {
            author: string;
            coverPhotoURL: string;
            readingLevel: string;
            title: string;
            add : boolean
        
  };
export default function UpdateReadingList(item: bookProps) {
   
    const readerBooks = useReactiveVar(bookReadingList);
  // const readerBooks = bookReadingList();
  
  let title = item.title;
  
    //check if current book is in list
    let isInList = readerBooks.some((book: bookProps) => (book.title === title && book.readingLevel === item.readingLevel));

    let removeAdd = isInList
      ? readerBooks.filter(
          (book: bookProps) =>
            book.title !== title || book.readingLevel !== item.readingLevel
        )
      : [...readerBooks, item];

    return (
      <>
    

        {/* if book is in reading list add Remove button */}
        {isInList && !item.add ? (
          <Button
            size="small"
            style={{ backgroundColor: "#F76434", color: "#FFFFFF" }}
            onClick={() => {
              bookReadingList(removeAdd);
            }}
          >
            Remove book
          </Button>
        ) : (
          ""
        )}

        {/* if book is not reading list add Add button */}
        {!isInList && item.add ? (
          <Button
            size="small"
            style={{ backgroundColor: "#28B8B8", color: "#FFFFFF" }}
            onClick={() => {
              bookReadingList(removeAdd);
            }}
          >
            Add book
          </Button>
        ) : (
          ""
        )}
      </>
    );
}