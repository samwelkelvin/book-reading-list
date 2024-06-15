import React, {useEffect, useState } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";
import { LOAD_BOOKS } from "../graphql/Queries";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { bookReadingList } from "../graphql/BookListCache";
import BooksInReadingList from "./BooksInReadingList";
import UpdateReadingList from "./UpdateReadingList";

export default function SearchBookByTitle() {
  type bookProps = {
    _typename: string;
    author: string;
    coverPhotoURL: string;
    readingLevel: string;
    title: string;
  };
  
  //graphql query
  const { error, loading, data } = useQuery(LOAD_BOOKS);

  //state
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");

  const handleTitleFilterChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  //react hook
  useEffect(() => {
    if (data) {
      setBooks(data.books);
    }
  }, [data]);
    
  //get reading book List
    const readerBooks = useReactiveVar(bookReadingList);

    if (error) return <h5>Error loading Books!</h5>;
  //filter object array by title
  const filterBookByTitle = (title: string) => {
    return books.filter((book: bookProps) => book.title === title);
    };
    
    const newBooks = books.filter((obj: bookProps, index) => {
      return index === books.findIndex((o: bookProps) => obj.title === o.title);
    });



  const filteredBooks = filterBookByTitle(title);
 
  return (
    <>
      <h4>Search Book by Title</h4>
      <Autocomplete
        onChange={(event, value) => {
          if (value) handleTitleFilterChange(value.title);
        }}
        id="select-book-title"
        sx={{ maxWidth: 400 }}
        autoHighlight
        options={newBooks || []}
        getOptionLabel={(option: {
          author: string;
          coverPhotoURL: string;
          readingLevel: string;
          title: string;
        }) => option.title}
        renderOption={(props, option, obj) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            key={obj.index}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`${option.coverPhotoURL}`}
              src={`${option.coverPhotoURL}`}
              alt=""
            />
            {option.title}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Book title"
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />

      <Grid
        marginTop={5}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 9, md: 12 }}
      >
        {(loading ? Array.from(new Array(16)) : filteredBooks).map(
          (bookDetails: bookProps, index) => (
            <Grid xs={10} sm={3} md={2} key={index}>
              <Card>
                {bookDetails ? (
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={bookDetails.coverPhotoURL}
                  />
                ) : (
                  <Skeleton
                    variant="rectangular"
                    style={{ maxWidth: 345, height: 140 }}
                  />
                )}
                {bookDetails ? (
                  <div>
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
                        <strong>Study Level</strong>{" "}
                        {`${bookDetails.readingLevel}`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <UpdateReadingList
                        author={bookDetails.author}
                        coverPhotoURL={bookDetails.coverPhotoURL}
                        readingLevel={bookDetails.readingLevel}
                        title={bookDetails.title}
                        add={true}
                      />
                    </CardActions>
                  </div>
                ) : (
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                )}
              </Card>
            </Grid>
          )
        )}
      </Grid>

      {!loading && filteredBooks.length === 0 ? (
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
                  No search results found
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        ""
      )}

      {/* Show reading list */}
      <BooksInReadingList />
    </>
  );
};

