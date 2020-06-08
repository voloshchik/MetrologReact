import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
  },
}))
const Search = ({value, onChange}) => {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="Search"
        value={value}
        onChange={onChange}
      />
    </form>
  )
}

export default Search
