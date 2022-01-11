import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'urql';
import { FindByIdQuery } from '../queries';

// Find all items and find item by id
function FindItemCard() {
  const [id, setId] = useState('');
  const [fetched, setFetched] = useState(false);
  const [result, reexecuteQuery] = useQuery({
    query: FindByIdQuery,
    variables: { id },
    pause: true,
  });

  const { data, fetching } = result;

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
                  reexecuteQuery();
                }
              }}
            >
              Find
            </Button>
          </Grid>
        </Grid>
        {!fetching && !data && fetched && (
          <Card variant="outlined" style={{ width: '40%', marginTop: '2%' }}>
            <CardContent>
              <Typography variant="body1">No item matches this id.</Typography>
            </CardContent>
          </Card>
        )}
        {!fetching && data && (
          <Card variant="outlined" style={{ width: '40%', marginTop: '2%' }}>
            <CardContent>
              <Typography variant="body1">ID: {data.item._id}</Typography>
              <Typography variant="body1">Name: {data.item.name}</Typography>
              <Typography variant="body1">
                Value: {data.item.value} $
              </Typography>
              <Typography variant="body1">
                Height: {data.item.height} cm
              </Typography>
              <Typography variant="body1">
                Width: {data.item.width} cm
              </Typography>
              <Typography variant="body1">
                Length: {data.item.length} cm
              </Typography>
              <Typography variant="body1">
                Weight: {data.item.weight} g
              </Typography>
              <Typography variant="body1">
                Volume: {data.item.volume} cm³
              </Typography>
              <Typography variant="body1">
                Quantity: {data.item.quantity}
              </Typography>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

export default FindItemCard;
