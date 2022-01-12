import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Slider, Typography } from '@mui/material';
import { useQuery } from 'urql';
import { Item } from '../types';
import { ListItemsQuery } from '../queries';

function ListItemsCard() {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const [maxValue, setMaxValue] = useState<number>(100);
  const [maxQuantity, setMaxQuantity] = useState<number>(100);
  const [maxVolume, setMaxVolume] = useState<number>(100);

  const [value, setValue] = useState<number[]>([0, maxValue]);
  const [quantity, setQuantity] = useState<number[]>([0, maxQuantity]);
  const [volume, setVolume] = useState<number[]>([0, maxVolume]);

  const [result] = useQuery({
    query: ListItemsQuery,
    variables: {
      filter: {
        minValue: !firstLoad ? value[0] : null,
        maxValue: !firstLoad ? value[1] : null,
        minQuantity: !firstLoad ? quantity[0] : null,
        maxQuantity: !firstLoad ? quantity[1] : null,
        minVolume: !firstLoad ? volume[0] : null,
        maxVolume: !firstLoad ? volume[1] : null,
      },
    },
  });

  const { data, fetching, error } = result;

  const handleValueChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleQuantityChange = (event: any, newValue: any) => {
    setQuantity(newValue);
  };

  const handleVolumeChange = (event: any, newValue: any) => {
    setVolume(newValue);
  };

  useEffect(() => {
    if (!error && !fetching && data?.filterItems?.length > 0 && firstLoad) {
      setFirstLoad(false);
      const newMaxValue = Math.max.apply(
        Math,
        data.filterItems.map(function (item: Item) {
          return item.value;
        })
      );

      const newMaxQuantity = Math.max.apply(
        Math,
        data.filterItems.map(function (item: Item) {
          return item.quantity;
        })
      );

      const newMaxVolume = Math.max.apply(
        Math,
        data.filterItems.map(function (item: Item) {
          return item.volume;
        })
      );

      setMaxValue(newMaxValue);
      setMaxQuantity(newMaxQuantity);
      setMaxVolume(newMaxVolume);

      setValue([0, newMaxValue]);
      setQuantity([0, newMaxQuantity]);
      setVolume([0, newMaxVolume]);
    }
  }, [data, fetching, firstLoad]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6">Filters</Typography>
          </Grid>
        </Grid>
        <Card
          variant="outlined"
          style={{ width: '40%', marginTop: '2%', marginBottom: '2%' }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography gutterBottom>Value (in $USD)</Typography>
                <Slider
                  value={value}
                  min={0}
                  max={maxValue}
                  onChange={handleValueChange}
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography gutterBottom>Quantity</Typography>
                <Slider
                  value={quantity}
                  min={0}
                  max={maxQuantity}
                  onChange={handleQuantityChange}
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography gutterBottom>Volume (in cm³)</Typography>
                <Slider
                  value={volume}
                  min={0}
                  max={maxVolume}
                  onChange={handleVolumeChange}
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {!error &&
          data?.filterItems?.map((item: Item) => (
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
