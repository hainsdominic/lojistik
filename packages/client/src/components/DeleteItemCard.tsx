import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'urql';
import { DeleteById } from '../queries';

function DeleteItemCard() {
  const [id, setId] = useState('');
  const [fetched, setFetched] = useState(false);
  const [updateDeleteByIdResult, deleteById] = useMutation(DeleteById);

  const { fetching, error } = updateDeleteByIdResult;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="ID"
              onChange={(e) => setId(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => {
                if (id) {
                  setFetched(true);
                  deleteById({ id });
                }
              }}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
        {!fetching && error && fetched && (
          <Card variant="outlined" style={{ width: '40%', marginTop: '2%' }}>
            <CardContent>
              <Typography variant="body1">ID is not valid</Typography>
            </CardContent>
          </Card>
        )}
        {!fetching && !error && fetched && (
          <Card variant="outlined" style={{ width: '40%', marginTop: '2%' }}>
            <CardContent>
              <Typography variant="body1">Item deleted</Typography>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

export default DeleteItemCard;
