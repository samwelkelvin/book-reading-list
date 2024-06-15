
import Grid from "@mui/material/Unstable_Grid2";
import { Card, CardActions, CardContent,CardMedia,Typography } from "@mui/material";

import UpdateReadingList from "./UpdateReadingList";
import { bookReadingList } from "../graphql/BookListCache";

export default function BooksInReadingList() {
  type bookProps = {
    _typename: string;
    author: string;
    coverPhotoURL: string;
    readingLevel: string;
    title: string;
  };

  //call reading list variable
  const readerBooks = bookReadingList();

  return (
    <>
      <h4>Books Reading List</h4>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 9, md: 12 }}
        sx={{ bgcolor: "#CFFAFA", height: "auto" }}
      >
        {readerBooks.map((bookDetails: bookProps, index: number) => (
          <Grid xs={10} sm={3} md={2} key={index}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={bookDetails.coverPhotoURL}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{ fontWeight: "medium" }}
                >
                  {bookDetails.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  marginBottom={1}
                  sx={{ fontWeight: "regular" }}
                  fontSize={14}
                >
                  By {bookDetails.author}
                </Typography>
                <Typography
                  display="block"
                  variant="caption"
                  color="text.secondary"
                  fontSize={13}
                  marginTop={1}
                >
                  <strong>Study Level</strong> {`${bookDetails.readingLevel}`}
                </Typography>
              </CardContent>
              <CardActions>
                <UpdateReadingList
                  author={bookDetails.author}
                  coverPhotoURL={bookDetails.coverPhotoURL}
                  readingLevel={bookDetails.readingLevel}
                  title={bookDetails.title}
                  add={false}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
  
      {/* if no data */}
      {readerBooks.length === 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 9, md: 12 }}
        >
          <Grid xs={10} sm={3} md={2}>
            <Card>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{ fontWeight: "medium" }}
                >
                  No books in reading list
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </>
  );
}
