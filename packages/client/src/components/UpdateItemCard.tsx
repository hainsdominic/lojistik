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
import { UpdateItem } from '../queries';

function UpdateItemCard() {
  const [fetched, setFetched] = useState(false);
  const [updateUpdateItemResult, updateItem] = useMutation(UpdateItem);
  const [id, setId] = useState('');
  const [name, setName] = useState<string | null>(null);
  const [value, setValue] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [length, setLength] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);

  const { error } = updateUpdateItemResult;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} style={{ width: '40%' }}>
          <Grid item xs={12}>
            <TextField
              label="ID"
              onChange={(e) => setId(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              onChange={(e) => {
                if (e.target.value !== '') {
                  setName(e.target.value);
                }
              }}
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
              label="Weight (in cm)"
              onChange={(e) => setWeight(parseInt(e.target.value))}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => {
                setFetched(true);
                updateItem({
                  input: {
                    _id: id,
                    name,
                    value,
                    height,
                    width,
                    length,
                    weight,
                  },
                });
              }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
        {error && fetched && (
          <Card variant="outlined" style={{ width: '40%', marginTop: '2%' }}>
            <CardContent>
              <Typography variant="body1">
                Could not update item. Is the ID valid?
              </Typography>
            </CardContent>
          </Card>
        )}
        {!error && fetched && (
          <Card variant="outlined" style={{ width: '40%', marginTop: '2%' }}>
            <CardContent>
              <Typography variant="body1">Updated successfully.</Typography>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

export default UpdateItemCard;
