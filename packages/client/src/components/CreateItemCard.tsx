import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useMutation } from 'urql';
import { CreateItem } from '../queries';

function CreateItemCard() {
  const [fetched, setFetched] = useState(false);
  const [updateCreateItemResult, createItem] = useMutation(CreateItem);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [value, setValue] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [length, setLength] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);

  const { error } = updateCreateItemResult;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} style={{ width: '40%' }}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Value (in $USD)"
              onChange={(e) => setValue(parseInt(e.target.value))}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Height (in cm)"
              onChange={(e) => setHeight(parseInt(e.target.value))}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Width (in cm)"
              onChange={(e) => setWidth(parseInt(e.target.value))}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Length (in cm)"
              onChange={(e) => setLength(parseInt(e.target.value))}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Weight (in grams)"
              onChange={(e) => setWeight(parseInt(e.target.value))}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => {
                setFetched(true);
                createItem({
                  input: {
                    name,
                    value,
                    height,
                    width,
                    length,
                    weight,
                    quantity,
                  },
                }).then((result) => {
                  setId(result?.data?.createItem?._id);
                });
              }}
            >
              Create
            </Button>
          </Grid>
        </Grid>
        {error && fetched && (
          <Card variant="outlined" style={{ width: '40%', marginTop: '2%' }}>
            <CardContent>
              <Typography variant="body1">
                Could not create item. Please try again by filling all fields.
              </Typography>
            </CardContent>
          </Card>
        )}
        {!error && fetched && (
          <Card variant="outlined" style={{ width: '40%', marginTop: '2%' }}>
            <CardContent>
              <Typography variant="body1">Created item ID: {id}</Typography>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

export default CreateItemCard;
