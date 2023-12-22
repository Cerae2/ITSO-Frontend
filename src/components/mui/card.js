// MultiActionAreaCard.js
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard({ image, title, description }) {
  return (
    <Card sx={{ maxWidth: 350, marginTop: 25, marginLeft: 3 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="Image Alt Text"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.dark">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          More
        </Button>
      </CardActions>
    </Card>
  );
}
