import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useQuery } from 'urql';
import { Item } from '../types';

const ListItemsQuery = `
  query {
    items {
      _id
      name
      value
      height
      width
      length
      weight
      volume
    }
  }
`;

function ListItemsCard() {
  const [result, reexecuteQuery] = useQuery({
    query: ListItemsQuery,
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
          // data.items?.length > 0 &&
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
              </CardContent>
            </Card>
          ))}
      </CardContent>
    </Card>
  );
}

export default ListItemsCard;
