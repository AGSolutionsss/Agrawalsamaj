import React, { useEffect, useState } from "react";
import { Grid, makeStyles,  Box, Button, Card, TextField, CardContent } from '@material-ui/core';
import {baseURL} from "../../api/index";
import {gridSpacing} from '../../store/constant';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


const NewMID = () => {
    const classes = useStyles();
    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const [newMID, setNewMID] = useState({
        user_mid: "",
        mtype: "",
        amount_num: "",
    });

    const [midData, setmidData] = useState([]);

    const [midnewData, setmidNewData] = useState([]);

    const [midnewDatatype, setmidNewDataType] = useState([]);
    
    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{
            axios({
                url: baseURL+"/fetch-web-member-data/"+id,
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                
                setmidData(res.data.member_data);
                setmidNewDataType(res.data.member_data.member_type);
                console.log("debug",res.data.member_data.member_type);
              });
        }
    }, []);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){
            window.location = "/login";
        
        }else{
            axios({
                url: baseURL+"/fetch-web-new-mid/"+midnewDatatype,
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                
                setmidNewData(res.data.new_mid);
                
              });
        }
    }, []);

    const onSubmit = (e) => {

        let data = {
            user_mid: newMID.user_mid,
            mtype: midnewDatatype,
            amount_num: newMID.amount_num,
        }

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/update-web-mid/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                
                toast.success("Mid  updated Successfully", {
                    type: 'Success',
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                
            }else{
                toast.error("Data is not updated", {
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
    };

    const onInputChange = (e) => {
        
        setNewMID({
            ...newMID,
            [e.target.name]: e.target.value,
        });
        
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
                                    <Grid container spacing={gridSpacing} style={{marginTop:'-10px'}}>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            Full Name : <span style={{fontWeight:'400',color:'#000'}}>{midData.name}</span>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            Amount : <span style={{fontWeight:'400',color:'#000'}}>{midData.priceaga}</span>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            Mobile No : <span style={{fontWeight:'400',color:'#000'}}>{midData.user_mobile_number}</span>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                            Email Id : <span style={{fontWeight:'400',color:'#000'}}>{midData.email}</span>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            Member Type : <span style={{fontWeight:'400',color:'#000'}}>{midData.member_type}</span>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            New MID : <span style={{fontWeight:'400',color:'#000'}}>{parseInt(midnewData.numid+1)}</span>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="user_mid"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                inputProps={{ maxLength: 4 }}
                                                value={newMID.user_mid}
                                                label='MID'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={9} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="amount_num"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={newMID.amount_num}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                label='Transaction Details'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
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
                                                Update
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
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default NewMID;
