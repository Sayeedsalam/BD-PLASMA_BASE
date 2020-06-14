import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';

import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SearchIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Donor Search
        </Typography>
        <form className={classes.form} noValidate>
            <Grid container spacing={2}>

            <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Blood Group</InputLabel>
                    <Select
                        value={age}
                        onChange={handleChange}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                    >
                        <MenuItem value={"A+"}>A+</MenuItem>
                        <MenuItem>O+</MenuItem>
                        <MenuItem>B+</MenuItem>
                        <MenuItem>AB+</MenuItem>
                        <MenuItem>A-</MenuItem>
                        <MenuItem>O-</MenuItem>
                        <MenuItem>B-</MenuItem>
                        <MenuItem>AB-</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Search
          </Button>
        </form>
      </div>
    </Container>
  );
}