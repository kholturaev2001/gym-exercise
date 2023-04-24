import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { fetchData } from '../utils/fetchData'
import { exerciseOptions } from '../utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollBar'




const SearchExercises = ({ setExercises, setBodyPart, bodyPart }) => {
  const [search, setSearch] = useState('')
  const [bodyParts, setBodyParts] = useState([])

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions
      )
      // console.log("🚀 ~ file: SearchExercises.jsx:21 ~ fetchExercisesData ~ bodyPartsData:", bodyPartsData)
      setBodyParts(['all', ...bodyPartsData])
    }
    fetchExercisesData()

  }, [])

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions
      )
      const searchedExercises = exercisesData.filter(
        (exercise) => exercise.name.toLowerCase().includes(search)
          || exercise.target.toLowerCase().includes(search)
          || exercise.equipment.toLowerCase().includes(search)
          || exercise.bodyPart.toLowerCase().includes(search)
      )

      setSearch('')
      setExercises(searchedExercises)
    }
  }


  return (
    <Stack
      alignItems='center'
      mt='37px'
      justifyContent='center'
      p='20px'
    >
      <Typography
        component='span'
        display='block'
        fontWeight={700}
        sx={{
          fontSize: { lg: '44px', xs: '30px' }
        }}
        mb='50px'
        textAlign='center'
      >
        Awesome Exercises You <br /> Should Know
      </Typography>

      <Box position='relative' mb='72px'>
        <TextField
          autoComplete='off'
          sx={{
            input: {
              fontWeight: "700",
              border: 'none',
            },
            width: { lg: "800px", xs: '350px' },
            backgroundColor: "#fff",
            borderRadius: '40px'
          }}
          height='76px'
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder='Search Exercises'
          type='text'
        />
        <Button className='search-btn'
          sx={{
            bgcolor: '#ff2625',
            color: 'white',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: '0'
          }}
          onClick={handleSearch}
        >
          Search
        </Button>

      </Box>

      <Box
        sx={{ position: 'relative', width: '100%', p: '20px' }}
      >
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts={true}
        />

      </Box>
    </Stack>
  )
}

export default SearchExercises