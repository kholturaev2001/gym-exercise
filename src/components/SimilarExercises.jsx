import { Box, Stack, Typography } from "@mui/material"
import HorizontalScrollbar from "./HorizontalScrollBar"
import Loader from "./Loader"

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <Box sx={{ mt: { lg: '100', xs: '' } }}>
      <Typography variant='h3'>
        Exercises that target the same muscle group

        <Stack direction='row' sx={{ p: '2', position: 'relative' }}>
          {
            targetMuscleExercises.length ? <HorizontalScrollbar data={targetMuscleExercises} /> : <Loader />
          }

        </Stack>
      </Typography>
    </Box>
  )
}

export default SimilarExercises