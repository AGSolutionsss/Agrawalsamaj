import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Card, CardContent  } from '@material-ui/core';
import {baseURL} from "../../api/index";
import {gridSpacing} from '../../store/constant';
import { useHistory } from "react-router-dom";
import axios from "axios";
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



const Developer = () => {
    const classes = useStyles();
    let history = useHistory();
    const [developer, setDeveloper] = useState([]);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

            axios({
                url: baseURL+"/fetch-web-developer",
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                setDeveloper(res.data.developerdata);
            });
        }
    }, []);

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Card >
                        <CardContent>
                            <form id="addIndiv" autoComplete="off">
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing} style={{justifyContent:'center'}}>
                                    <Grid item lg={12} md={12} sm={12} xs={12} style={{textAlign:'center'}}>
                                        <img src={"https://agrawalsamaj.co/public/app_images/developer/"+developer.company_logo} alt="logo"/>
                                    </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            Company : <span style={{fontWeight:'400',color:'#000'}}>{developer.company_name}</span>
                                        </Grid>
                                        <Grid item lg={8} md={6} sm={6} xs={12}>
                                            Address : <span style={{fontWeight:'400',color:'#000'}}>{developer.company_address}</span>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            Mobile : <span style={{fontWeight:'400',color:'#000'}}><a href={"tel:"+developer.company_mobile}>{developer.company_mobile}</a></span>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            Email : <span style={{fontWeight:'400',color:'#000'}}><a href={"mailto:"+developer.company_email}>{developer.company_email}</a></span>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            Website : <span style={{fontWeight:'400',color:'#000'}}><a href={developer.company_website} target="_blank">{developer.company_website}</a></span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default Developer;
