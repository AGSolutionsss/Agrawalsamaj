import React, { useState } from "react";
import { Grid, makeStyles, Card, CardContent,TextField,Button,Box  } from '@material-ui/core';
import {baseURL} from "../../api/index";
import {gridSpacing} from '../../store/constant';
import { useHistory } from "react-router-dom";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    loginput: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        '& > label': {
            top: '23px',
            left: 0,
            color: theme.palette.grey[500],
            '&[data-shrink="false"]': {
                top: '5px'
            }
        },
        '& > div > input': {
            padding: '30.5px 14px 11.5px !important'
        },
        '& legend': {
            display: 'none'
        },
        '& fieldset': {
            top: 0
        }
    },
    login: {
        backgroundColor: theme.palette.purple.main,
        '&:hover': {
            backgroundColor: theme.palette.purple.dark
        }
    },
    login2: {
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }
    },
}));

const gender = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
];

const FamilyMemberAdd = () => {
    const classes = useStyles();
    let history = useHistory();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var midate = "04/04/2022"
    var todayback = yyyy + "-" + mm + "-" + dd;
    var d = document.getElementById("datefield");
    if (d) {
        document.getElementById("datefield").setAttribute("max", todayback);
    }
    const [familymember, setFamilyMember] = useState({
        no_of_family: "",
        userfamily_sub_data: "",
    });

    const [family_member_count, setCount] = useState(1);

    const useTemplate = {family_member_name:"", family_member_gender:"", family_member_dob:"",family_member_relation:"",family_member_qualification:"",family_member_occupation:""};

    const [users, setUsers] = useState([useTemplate]);

    const addItem = () => {
        setUsers([...users,useTemplate]);
        setCount(family_member_count + 1);
    };

    const onChange = (e, index) =>{
        const updatedUsers = users.map((user, i) => 
        index == i 
        ? Object.assign(user,{[e.target.name]: e.target.value}) 
        : user );
        setUsers(updatedUsers);
    };

    const removeUser = (index) => {
        const filteredUsers = [...users];
        filteredUsers.splice(index, 1);
        setUsers(filteredUsers);
        setCount(family_member_count - 1);
    };

    const onSubmit = (e) => {
        let data = {
            no_of_family: family_member_count,
            userfamily_sub_data:users,
        };
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/create-web-family-member",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                toast.success("Data Created Successfully", {
                    type: 'Success',
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    onClose: () => history.push('/family-member-list')
                });
            }else{
                toast.error("Data  not Created Successfully", {
                    type: 'error',
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            
        });
        }
    }

    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
            <Grid container>
                <Grid item xs={12}>
                    <Card >
                        <CardContent>
                            <form id="addIndiv" autoComplete="off">
                                <Grid item xs={12}>
                                    {
                                        users.map((user, index)=>(
                                            <Grid container mt={2} key={index} spacing={gridSpacing} style={{justifyContent:'center'}}>
                                                <Grid item lg={2} md={6} sm={6} xs={12}>
                                                    <TextField
                                                        name="family_member_name"
                                                        required
                                                        onChange={e => onChange(e, index)}
                                                        value={user.family_member_name}
                                                        label='Member Name'
                                                        className={classes.notchedOutline}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item lg={2} md={6} sm={6} xs={12}>
                                                    <TextField
                                                        name="family_member_relation"
                                                        required
                                                        onChange={e => onChange(e, index)}
                                                        value={user.family_member_relation}
                                                        label='Relation'
                                                        className={classes.notchedOutline}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item lg={1} md={6} sm={6} xs={12}>
                                                    <TextField
                                                        name="family_member_gender"
                                                        required
                                                        onChange={e => onChange(e, index)}
                                                        value={user.family_member_gender}
                                                        select
                                                        SelectProps={{
                                                            MenuProps: {},
                                                        }}
                                                        label='Gender'
                                                        className={classes.notchedOutline}
                                                        fullWidth
                                                    >
                                                    {gender.map((option) => (
                                                        <MenuItem key={option.label} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                    </TextField>
                                                </Grid>
                                                <Grid item lg={2} md={6} sm={6} xs={12}>
                                                    <TextField
                                                        name="family_member_dob"
                                                        required
                                                        type="date"
                                                        id="datefield"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={e => onChange(e, index)}
                                                        value={user.family_member_dob}
                                                        label='DOB'
                                                        className={classes.notchedOutline}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item lg={2} md={6} sm={6} xs={12}>
                                                    <TextField
                                                        name="family_member_qualification"
                                                        onChange={e => onChange(e, index)}
                                                        value={user.family_member_qualification}
                                                        label='Qualification'
                                                        className={classes.notchedOutline}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item lg={2} md={6} sm={6} xs={12}>
                                                    <TextField
                                                        name="family_member_occupation"
                                                        onChange={e => onChange(e, index)}
                                                        value={user.family_member_occupation}
                                                        label='Occupation'
                                                        className={classes.notchedOutline}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item lg={1} md={6} sm={6} xs={12}>
                                                    <IconButton onClick={() => removeUser(index)}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                <Box mt={2}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <Button
                                                    fullWidth
                                                    size="large"
                                                    type="button"
                                                    variant="contained"
                                                    className={classes.login}
                                                    onClick={(e) => addItem(e)}
                                                >
                                                Add More
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box mt={2}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <Button
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    className={classes.login}
                                                    onClick={(e) => onSubmit(e)}
                                                >
                                                Submit
                                                </Button>
                                            </Grid>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <Link to="dashboard">
                                                    <Button
                                                        fullWidth
                                                        size="large"
                                                        type="buton"
                                                        variant="contained"
                                                        className={classes.login2}
                                                        
                                                    >
                                                    Cancel
                                                    </Button>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default FamilyMemberAdd;
