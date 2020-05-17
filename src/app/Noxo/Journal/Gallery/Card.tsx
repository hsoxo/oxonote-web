import React, { FunctionComponent } from 'react'
import {
  Box,
  CardActionArea,
  CardMedia,
  Divider,
  Paper,
  Typography
} from '@material-ui/core'
import { NoteSummaryObject } from '@/types/note'
import { Link } from 'react-router-dom'

const GalleryCard: FunctionComponent<NoteSummaryObject> = props => {
  return (
    <Paper>
      <Link to={`/o/editor/${props._id}`} key={props._id}>
        <CardActionArea>
          <CardMedia
            style={{ height: 120 }}
            image="/static/images/channel.png"
            title="Contemplative Reptile"
          />
          <Divider />
          <Box padding={1}>
            <Typography variant="body1">
              {`${props.titleIcon || '📄'} ${props.title}`}
            </Typography>
          </Box>
        </CardActionArea>
      </Link>
    </Paper>
  )
}

export default GalleryCard
