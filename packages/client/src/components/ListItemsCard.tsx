import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useQuery } from 'urql';
import { Item } from '../types';
import { ListItemsQuery } from '../queries';

function ListItemsCard() {
  const [result, reexecuteQuery] = useQuery({
    query: ListItemsQuery,
    requestPolicy: 'network-only',
  });

  const { data, fetching, error } = result;

  return (
    <Card variant="outlined">
      <CardContent>
        <Button variant="contained" onClick={() => reexecuteQuery()}>
          Refresh
        </Button>
        {!fetching &&
          !error &&
          data?.items?.map((item: Item) => (
            <Card
              key={item._id}
              variant="outlined"
              style={{ width: '40%', marginTop: '2%' }}
            >
              <CardContent>
                <Typography variant="body1">ID: {item._id}</Typography>
                <Typography variant="body1">Name: {item.name}</Typography>
                <Typography variant="body1">Value: {item.value} $</Typography>
                <Typography variant="body1">
                  Height: {item.height} cm
                </Typography>
                <Typography variant="body1">Width: {item.width} cm</Typography>
                <Typography variant="body1">
                  Length: {item.length} cm
                </Typography>
                <Typography variant="body1">Weight: {item.weight} g</Typography>
                <Typography variant="body1">
                  Volume: {item.volume} cm³
                </Typography>
                <Typography variant="body1">
                  Quantity: {item.quantity}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </CardContent>
    </Card>
  );
}

export default ListItemsCard;
