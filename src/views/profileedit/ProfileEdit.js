import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Button, Card, CardContent,TextField, Box  } from '@material-ui/core';
import {baseURL} from "../../api/index";
import {gridSpacing} from '../../store/constant';
import { useHistory } from "react-router-dom";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const blood = [
    {
        value: "A +",
        label: "A +",
    },
    {
        value: "A -",
        label: "A -",
    },
    {
        value: "B +",
        label: "B +",
    },
    {
        value: "B -",
        label: "B -",
    },
    {
        value: "O +",
        label: "O +",
    },
    {
        value: "O -",
        label: "O -",
    },
    {
        value: "AB +",
        label: "AB +",
    },
    {
        value: "AB -",
        label: "AB -",
    },
];

const identification = [
    {
      value: "Aadhar",
      label: "Aadhar",
    },
    {
      value: "PassPort",
      label: "PassPort",
    },
    {
        value: "PanCard",
        label: "PanCard",
      },
];

const married = [
    {
        value: "Yes",
        label: "Yes",
    },
    {
        value: "No",
        label: "No",
    },
];

const mailaddress = [
    {
        value: "Residence",
        label: "Residence",
    },
    {
        value: "Office",
        label: "Office",
    },
];

const ProfileEdit = () => {
    const classes = useStyles();
    let history = useHistory();
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [selectedFiledoc, setSelectedFileDoc] = React.useState(null);
    const [profile, setProfile] = useState({
        user_gender: "",
        name: "",
        user_mobile_number: "",
        email: "",
        gotra: "",
        state: "",
        user_dob: "",
        user_blood: "",
        user_qualification: "",
        user_proof_identification: "",
        agrawal_image: "",
        agrawal_images: "",
        user_proof_doc: "",
        user_proof_docs: "",
        married: "",
        f_mannidate: "",
        spouse_name: "",
        spouse_mobile: "",
        spouse_dob: "",
        spouse_blood_group: "",
        spouse_qualification: "",
        father_name: "",
        father_mobile: "",
        father_dob: "",
        native_place: "",
        residential_add: "",
        residential_landmark: "",
        residential_city:"",
        residential_pin: "",
        office_add: "",
        office_landmark: "",
        office_city: "",
        office_pin: "",
        office_phone: "",
        mailaddress: "",
        user_resident_to_bang_since: "",
        donate_blood:"",
        whats_app: "",
        f_mintroby:"",
        f_mmemno: "",
        f_mintrophone: "",
        f_mintroadd: "",
        f_motherorga: "",
        org_name: "",
        org_type: "",
        org_product: "",
        
    });

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

            axios({
                url: baseURL+"/fetch-web-register-user-edit",
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                
                setProfile(res.data.userdata);
            });

        }
    }, []);

    const [gottras, setGotras] = useState([]);
    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        var theLoginToken = localStorage.getItem('login');       
            
        const requestOptions = {
                method: 'GET', 
                headers: {
                'Authorization': 'Bearer '+theLoginToken
                }             
        };     


        fetch(baseURL+'/fetch-web-gotra', requestOptions)
        .then(response => response.json())
        .then(data => setGotras(data.gotradata)); 
    }, []);

    const [states, setStates] = useState([]);
    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        var theLoginToken = localStorage.getItem('login');       
            
        const requestOptions = {
                method: 'GET', 
                headers: {
                'Authorization': 'Bearer '+theLoginToken
                }             
        };     


        fetch(baseURL+'/fetch-web-state', requestOptions)
        .then(response => response.json())
        .then(data => setStates(data.statedata)); 
    }, []);

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if (inputtxt.match(phoneno) || inputtxt.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    const validateOnlyText = (inputtxt) => {

        var re = /^[A-Za-z ]+$/;
        if (inputtxt === "" || re.test(inputtxt)) {
            return true;
        } else {
            return false;
        }
    }

    const onInputChange = (e) => {
        if (e.target.name == "user_mobile_number") {
            if (validateOnlyDigits(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "appli_name") {
            if (validateOnlyText(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "spouse_name") {
            if (validateOnlyText(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "spouse_mobile") {
            if (validateOnlyDigits(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "father_name") {
            if (validateOnlyText(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "father_mobile") {
            if (validateOnlyDigits(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "native_place") {
            if (validateOnlyText(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "residential_city") {
            if (validateOnlyText(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "office_city") {
            if (validateOnlyText(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "residential_pin") {
            if (validateOnlyDigits(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "office_pin") {
            if (validateOnlyDigits(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "office_phone") {
            if (validateOnlyDigits(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "whats_app") {
            if (validateOnlyDigits(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "user_resident_to_bang_since") {
            if (validateOnlyDigits(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "f_mintroby") {
            if (validateOnlyText(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "f_mintrophone") {
            if (validateOnlyDigits(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "org_name") {
            if (validateOnlyText(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else{
            setProfile({
                ...profile,
                [e.target.name]: e.target.value,
            });
        }
    };

    
    const onUpdate = (e) => {
        const data = new FormData();
        data.append("appli_name", profile.name);
        data.append("user_gender", profile.user_gender);
        data.append("user_mobile_number", profile.user_mobile_number);
        data.append("user_qualification", profile.user_qualification);
        data.append("user_proof_identification", profile.user_proof_identification);
        data.append("email", profile.email);
        data.append("f_mgotra", profile.gotra);
        data.append("f_mdob", profile.user_dob);
        data.append("f_mblood", profile.user_blood);
        data.append("f_mstate", profile.state);
        data.append("agrawal_images", selectedFile);
        data.append("user_proof_docs", selectedFiledoc);
        data.append("married", profile.married);
        data.append("f_mannidate", profile.f_mannidate);
        data.append("spouse_name", profile.spouse_name);
        data.append("spouse_mobile", profile.spouse_mobile);
        data.append("spouse_dob", profile.spouse_dob);
        data.append("spouse_blood_group", profile.spouse_blood_group);
        data.append("spouse_qualification", profile.spouse_qualification);
        data.append("father_name", profile.father_name);
        data.append("father_mobile", profile.father_mobile);
        data.append("father_dob", profile.father_dob);
        data.append("native_place", profile.native_place);
        data.append("residential_add", profile.residential_add);
        data.append("residential_landmark", profile.residential_landmark);
        data.append("residential_city", profile.residential_city);
        data.append("residential_pin", profile.residential_pin);
        data.append("office_add", profile.office_add);
        data.append("office_landmark", profile.office_landmark);
        data.append("office_city", profile.office_city);
        data.append("office_pin", profile.office_pin);
        data.append("office_phone", profile.office_phone);
        data.append("mailaddress", profile.mailaddress);
        data.append("user_resident_to_bang_since", profile.user_resident_to_bang_since);
        data.append("donate_blood", profile.donate_blood);
        data.append("whats_app", profile.whats_app);
        data.append("f_mintroby", profile.f_mintroby);
        data.append("f_mmemno", profile.f_mmemno);
        data.append("f_mintrophone", profile.f_mintrophone);
        data.append("f_mintroadd", profile.f_mintroadd);
        data.append("f_motherorga", profile.f_motherorga);
        data.append("org_name", profile.org_name);
        data.append("org_type", profile.org_type);
        data.append("org_product", profile.org_product);
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/update-web-register?_method=PUT",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                toast.success("Data updated Successfully", {
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
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="name"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.name}
                                                label='Full Name'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="user_gender"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.user_gender}
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
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="gotra"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.gotra}
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                label='Gotra'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {gottras.map((option) => (
                                                <MenuItem key={option.gotra_name} value={option.gotra_name}>
                                                    {option.gotra_name}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="state"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.state}
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                label='State'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {states.map((option) => (
                                                <MenuItem key={option.state_name} value={option.state_name}>
                                                    {option.state_name}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="user_mobile_number"
                                                required
                                                inputProps={{ maxLength: 10,minLength: 10  }}
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.user_mobile_number}
                                                label='Mobile No'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="email"
                                                required
                                                type="email"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.email}
                                                label='Email Id'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="user_dob"
                                                required
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                type="date"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.user_dob}
                                                label='DOB'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="user_blood"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.user_blood}
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                label='Blood'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {blood.map((option) => (
                                                <MenuItem key={option.label} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="user_qualification"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.user_qualification}
                                                label='Qualification'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="user_proof_identification"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.user_proof_identification}
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                label='Proof Identification'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {identification.map((option) => (
                                                <MenuItem key={option.label} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="agrawal_images"
                                                type="file"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                                value={profile.agrawal_images}
                                                label='User Image'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={1} md={6} sm={6} xs={12}>
                                            <img src={"https://agsdev.online/public/app_images/members/"+profile.agrawal_image} style={{width:'40px',height:'40px'}}/>
                                        </Grid>
                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="user_proof_docs"
                                                type="file"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => setSelectedFileDoc(e.target.files[0])}
                                                value={profile.user_proof_docs}
                                                label='User Image'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={1} md={6} sm={6} xs={12}>
                                            <img src={"https://agsdev.online/public/app_images/documents/"+profile.agrawal_image} style={{width:'40px',height:'40px'}}/>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <h3>Family Information</h3>
                                            <hr/>
                                        </Grid>
                                        <Grid item lg={12} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="married"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.married}
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                label='Are you married'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {married.map((option) => (
                                                <MenuItem key={option.label} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </Grid>
                                        {
                                            profile.married == "Yes" ?
                                        <>
                                        
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="f_mannidate"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                type="date"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.f_mannidate}
                                                label='Anniversery Date'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="spouse_name"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.spouse_name}
                                                label='Spouse Name'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="spouse_mobile"
                                                onChange={(e) => onInputChange(e)}
                                                inputProps={{ maxLength: 10  }}
                                                value={profile.spouse_mobile}
                                                label='Spouse Mobile No'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="spouse_dob"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                type="date"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.spouse_dob}
                                                label='Spouse Date of Birth'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="spouse_blood_group"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.spouse_blood_group}
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                label='Spouse Blood'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {blood.map((option) => (
                                                <MenuItem key={option.label} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="spouse_qualification"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.spouse_qualification}
                                                label='Spouse Qualification'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        
                                    </>: ""}
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="father_name"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.father_name}
                                                label='Father Name'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="father_dob"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                required
                                                type="date"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.father_dob}
                                                label='Father DOB'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="father_mobile"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.father_mobile}
                                                inputProps={{ maxLength: 10 }}
                                                label='Father Mobile No'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="native_place"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.native_place}
                                                label='Native Place'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <h3>Contact Information</h3>
                                            <hr/>
                                        </Grid>
                                        <Grid item lg={12} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="residential_add"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.residential_add}
                                                label='Residential Address'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={7} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="residential_landmark"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.residential_landmark}
                                                label='Landmark'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="residential_city"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.residential_city}
                                                label='City'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="residential_pin"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.residential_pin}
                                                inputProps={{ maxLength: 6,minLength: 6  }}
                                                label='Pincode'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="office_add"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.office_add}
                                                label='Office Address'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={5} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="office_landmark"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.office_landmark}
                                                label='Landmark'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="office_city"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.office_city}
                                                label='City'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="office_pin"
                                                onChange={(e) => onInputChange(e)}
                                                inputProps={{ maxLength: 6 }}
                                                value={profile.office_pin}
                                                label='Pincode'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="office_phone"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.office_phone}
                                                label='Office Phone'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="whats_app"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                inputProps={{ maxLength: 10,minLength: 10  }}
                                                value={profile.whats_app}
                                                label='Whats App'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="mailaddress"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.mailaddress}
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                label='Mail Address'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {mailaddress.map((option) => (
                                                <MenuItem key={option.label} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="user_resident_to_bang_since"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                inputProps={{ maxLength: 4  }}
                                                value={profile.user_resident_to_bang_since}
                                                label='Since Resident in Bangalore (Year)'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="donate_blood"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.donate_blood}
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                label='Donate Blood'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {married.map((option) => (
                                                <MenuItem key={option.label} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <h3>Introduction Information</h3>
                                            <hr/>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="f_mintroby"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.f_mintroby}
                                                label='Introducd By (Member Name)'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="f_mmemno"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                inputProps={{ maxLength: 4  }}
                                                value={profile.f_mmemno}
                                                label='Membership No. of Introducer'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="f_mintrophone"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.f_mintrophone}
                                                inputProps={{ maxLength: 10,minLength: 10  }}
                                                label='Phone No. of Introducer'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={9} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="f_mintroadd"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.f_mintroadd}
                                                label='Address of Introducer'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="f_motherorga"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.f_motherorga}
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                label='Member of any Other Organizations'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {married.map((option) => (
                                                <MenuItem key={option.label} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </Grid>
                                        {
                                            profile.f_motherorga == "Yes" ?
                                            <>
                                            
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="org_name"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.org_name}
                                                label='Organizations Name'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="org_type"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.org_type}
                                                label='Organizations Type'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="org_product"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.org_product}
                                                label='Organizations Product'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        </>
                                       : "" }
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
                                                    onClick={(e) => onUpdate(e)}
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
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default ProfileEdit;
