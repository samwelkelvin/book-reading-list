import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_BOOKS } from "../graphql/Queries";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";


export default function ListBooks() {
  type bookProps = {
    _typename: string;
    author: string;
    coverPhotoURL: string;
    readingLevel: string;
    title: string;
  };

  const { error, loading, data } = useQuery(LOAD_BOOKS);

  const [book, setBook] = useState([]);

  //react hook
  useEffect(() => {
    if (data) {
      setBook(data.books);
    }
  }, [data]);

  //JSX Formmat => Javascript XML
  // if (loading) {
  //   return (
  //     <div>
       
  //       <h5>Fetching Books</h5>
  //     </div>
  //   );
  // }
 
  if (error) return <h5>Error loading Books!</h5>;
  
  return (
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 9, md: 12 }}
      >
        {(loading ? Array.from(new Array(16)) : book).map(
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

    //if no data found otherwise render data found

    // (book && book.length === 0) ? (
    //   <h4>No data found</h4>
    // ) : ( <h4> data found</h4>)
  );

 }
