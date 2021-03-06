import React from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Button
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import isEmpty from 'is-empty';
import Template from '../../../components/template';
import Title from '../../../components/template/titleComponent'
import BookCard from '../../../components/library/book/bookCard';
import Filter from '../../../components/library/filter';
import LoadContent from '../../../components/loaders/loadContent'
import { connect } from 'react-redux';

function Books(props) {
  const { books } = props;

  return (
    <Template>
      <Box display="flex" flexDirection="column" height="100%">
        <Title title="Livros" />
        <Box mb={3} display="flex" justifyContent="space-between">
          <Typography variant="h4" component="h2">
            Livros
          </Typography>
          <Button
            component={Link}
            to="/contribute/book"
            variant="outlined"
            color="secondary">
            <AddIcon style={{ marginRight: '10px' }} />
            Contribuir
          </Button>
        </Box>

        <Filter type="book" />

        <LoadContent loading={books.loading}>
          {!isEmpty(books.allItems.items) ? (
            <Grid container spacing={2}>
              {books.allItems.items.map((book, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <BookCard book={book} user={props.user} />
                </Grid>
              ))}
            </Grid>
          ) : (
              <Paper>
                <Box p={2}>
                  Nenhum livro encontrado.
              </Box>
              </Paper>
            )}
        </LoadContent>
      </Box>
    </Template>
  );
}

const mapStateToProps = state => ({
  books: state.items,
  user: state.auth.user
});
export default connect(mapStateToProps)(Books);
