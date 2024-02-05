import React, { useEffect, useState } from "react";
import { Grid, makeStyles, FormControl, InputLabel, OutlinedInput, Box, Button, Card, CardContent,TextField, TextareaAutosize  } from '@material-ui/core';
import {baseURL} from "../../api/index";
import {gridSpacing} from '../../store/constant';
import Moment from 'moment';
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

const span = {
    color:'#000',
}

const MemberView = () => {
    const classes = useStyles();
    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const [profile, setProfile] = useState([]);
    const [profileSub, setProfileSub] = useState([]);
    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

            axios({
                url: baseURL+"/fetch-web-family-member-view/"+id,
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                setProfile(res.data.userdata);
                setProfileSub(res.data.familydata);
                
            });

        }
    }, []);
    
       
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
                                    <Grid container spacing={gridSpacing} style={{justifyContent:'center'}}>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                                <h3>Person Information</h3>
                                                <h3>MID : <span style={span}>{profile.user_mid}</span></h3>
                                            </div>
                                            <hr/>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Full Name : <span style={span}>{profile.name}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Gender : <span style={span}>{profile.user_gender}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Gotra : <span style={span}>{profile.gotra}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>State : <span style={span}>{profile.state}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Mobile No : <span style={span}>{profile.user_mobile_number}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Email Id : <span style={span}>{profile.email}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>DOB : <span style={span}>{Moment(profile.user_dob).format('DD-MM-YYYY')}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Blood Group : <span style={span}>{profile.user_blood}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Qualification : <span style={span}>{profile.user_qualification}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Proof Identification : <span style={span}>{profile.user_proof_identification}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <img src={"https://agsdev.online/public/app_images/members/"+profile.agrawal_image} style={{width:'40px',height:'40px'}}/>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <img src={"https://agsdev.online/public/app_images/documents/"+profile.agrawal_image} style={{width:'40px',height:'40px'}}/>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <h3>Family Information</h3>
                                            <hr/>
                                        </Grid>
                                        <Grid item lg={12} md={6} sm={6} xs={12}>
                                            <label>Are you married : <span style={span}>{profile.married}</span></label>
                                        </Grid>
                                        {
                                            profile.married == "Yes" ?
                                            <>
                                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                                    <label>Anniversery Date : <span style={span}>{Moment(profile.f_mannidate).format('DD-MM-YYYY')}</span></label>
                                                </Grid>
                                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                                    <label>Spouse Name : <span style={span}>{profile.spouse_name}</span></label>
                                                </Grid>
                                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                                    <label>Spouse Mobile No : <span style={span}>{profile.spouse_mobile}</span></label>
                                                </Grid>
                                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                                    <label>Spouse Date of Birth : <span style={span}>{Moment(profile.spouse_dob).format('DD-MM-YYYY')}</span></label>
                                                </Grid>
                                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                                    <label>Spouse Blood : <span style={span}>{profile.spouse_blood_group}</span></label>
                                                </Grid>
                                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                                    <label>Spouse Qualification : <span style={span}>{profile.spouse_qualification}</span></label>
                                                </Grid>
                                            </>
                                        : ""}
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Father Name : <span style={span}>{profile.father_name}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Father DOB : <span style={span}>{Moment(profile.father_dob).format('DD-MM-YYYY')}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Father Mobile No : <span style={span}>{profile.father_mobile}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Native Place : <span style={span}>{profile.native_place}</span></label>
                                        </Grid>
                                        
                                        {
                                            profile.no_of_family > "0" ?
                                            <>
                                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                                    <h3>Family Member Information</h3>
                                                    <hr/>
                                                </Grid>
                                                {profileSub.map((option) => (
                                                    <>
                                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                                            <label>Member Name : <span style={span}>{option.family_member_name}</span></label>
                                                        </Grid>
                                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                                            <label>Relation : <span style={span}>{option.family_member_relation}</span></label>
                                                        </Grid>
                                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                                            <label>Gender : <span style={span}>{option.family_member_gender}</span></label>
                                                        </Grid>
                                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                                            <label>DOB : <span style={span}>{Moment(option.family_member_dob).format('DD-MM-YYYY')}</span></label>
                                                        </Grid>
                                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                                            <label>Qualification : <span style={span}>{option.family_member_qualification}</span></label>
                                                        </Grid>
                                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                                            <label>Occupation : <span style={span}>{option.family_member_occupation}</span></label>
                                                        </Grid>
                                                    </>
                                                ))}
                                            </>
                                            : ""
                                        }
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <h3>Contact Information</h3>
                                            <hr/>
                                        </Grid>
                                        <Grid item lg={12} md={6} sm={6} xs={12}>
                                            <label>Residential Address : <span style={span}>{profile.residential_add}</span></label>
                                        </Grid>
                                        <Grid item lg={7} md={6} sm={6} xs={12}>
                                            <label>Landmark : <span style={span}>{profile.residential_landmark}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>City : <span style={span}>{profile.residential_city}</span></label>
                                        </Grid>
                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                            <label>Pincode : <span style={span}>{profile.residential_pin}</span></label>
                                        </Grid>
                                        <Grid item lg={12} md={6} sm={6} xs={12}>
                                            <label>Office Address : <span style={span}>{profile.office_add}</span></label>
                                        </Grid>
                                        <Grid item lg={5} md={6} sm={6} xs={12}>
                                            <label>Landmark : <span style={span}>{profile.office_landmark}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>City : <span style={span}>{profile.office_city}</span></label>
                                        </Grid>
                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                            <label>Pincode : <span style={span}>{profile.office_pin}</span></label>
                                        </Grid>
                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                            <label>Office Phone : <span style={span}>{profile.office_phone}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Whats App : <span style={span}>{profile.whats_app}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Mail Address : <span style={span}>{profile.mailaddress}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Resident in Bangalore (Year) : <span style={span}>{profile.user_resident_to_bang_since}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <label>Donate Blood : <span style={span}>{profile.donate_blood}</span></label>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <h3>Introduction Information</h3>
                                            <hr/>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <label>Introducd By (Member Name) : <span style={span}>{profile.f_mintroby}</span></label>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <label>Membership No. of Introducer : <span style={span}>{profile.f_mmemno}</span></label>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <label>Phone No. of Introducer : <span style={span}>{profile.f_mintrophone}</span></label>
                                        </Grid>
                                        <Grid item lg={9} md={6} sm={6} xs={12}>
                                            <label>Address of Introducer : <span style={span}>{profile.f_mintroadd}</span></label>
                                        </Grid>
                                        <Grid item lg={3} md={3} sm={6} xs={12}>
                                            <label>Member of Other Organizations : <span style={span}>{profile.f_motherorga}</span></label>
                                        </Grid>
                                        {
                                            profile.f_motherorga == "Yes" ?
                                            <>
                                                <Grid item lg={4} md={3} sm={6} xs={12}>
                                                    <label>Organizations Name : <span style={span}>{profile.org_name}</span></label>
                                                </Grid>
                                                <Grid item lg={4} md={3} sm={6} xs={12}>
                                                    <label>Organizations Type : <span style={span}>{profile.org_type}</span></label>
                                                </Grid>
                                                <Grid item lg={4} md={3} sm={6} xs={12}>
                                                    <label>Organizations Product : <span style={span}>{profile.org_product}</span></label>
                                                </Grid>
                                            </>
                                        : ""}
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

export default MemberView;
