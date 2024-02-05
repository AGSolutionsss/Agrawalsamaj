import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import {baseURL} from "../../api/index";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import {gridSpacing} from '../../store/constant';
import { Box, Button } from '@material-ui/core';
import Moment from 'moment';

const useStyles = makeStyles((theme) => ({
    active: {
        backgroundColor: theme.palette.purple.main,
        '&:hover': {
            backgroundColor: theme.palette.purple.dark
        }
    },
    inactive: {
        backgroundColor: "green",
        '&:hover': {
            backgroundColor: "darkgreen"
        }
    },
}));

const FamilyMemberList = () => {
    const classes = useStyles();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

        }

        var theLoginToken = localStorage.getItem('login');       
            
        const requestOptions = {
                method: 'GET', 
                headers: {
                'Authorization': 'Bearer '+theLoginToken
                }             
        };     


        fetch(baseURL+'/fetch-web-family-member', requestOptions)
        .then(response => response.json())
        .then(data => {
            let res = data.familydata;
            let tempRows = [];
            for (let i = 0; i < res.length; i++) {
          
                tempRows.push([
                    i+1,
                    res[i]["family_member_name"],
                    res[i]["family_member_gender"],
                    Moment(res[i]["family_member_dob"]).format('DD-MM-YYYY'),
                    res[i]["family_member_relation"],
                    res[i]["family_member_qualification"],
                    res[i]["family_member_occupation"],
                    res[i]["id"]
                ]);
              
            }
            setUserList(tempRows)
        }); 
    }, []);

    const option = {
        filterType: "dropDown",
        selectableRows: false,
        viewColumns : false,
    }

    const columnData = [
        {
            name: "#",
            options: {
              filter: false,
              print:false,
              download:false,
            }
        },
        "Full Name",
        "Gender",
        "DOB",
        "Relation",
        "Qualification",
        "Occupation",
        {
            name: "Actions",
            options:{
                filter: false,
                print:false,
                download:false,
                customBodyRender: (value) => {
                    return(
                        <div>
                            <Tooltip title="Edit" placement="top">
                                 <IconButton aria-label="Edit">
                                    <Link to={"family-member-edit?id="+value}>
                                        <EditIcon/>
                                    </Link>
                                 </IconButton>
                            </Tooltip>
                        </div>
                    );
                },
            },
        },
    ]
       
    return (
        <>
         
            <Grid container>
            <Box mt={2} mb={2}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Link to="family-member-add">
                                <Button
                                    fullWidth
                                    size="large"
                                    type="buton"
                                    variant="contained"
                                    className={classes.login2}
                                    
                                >
                                Add Family Member
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Grid item xs={12}>
                {userList.length > 0 && (
                    <MUIDataTable
                    data={userList}
                    columns={columnData}
                    options={option}
                
                    />
                )}
                {userList.length <= 0 && (
                    <MUIDataTable
                    columns={columnData}
                    options={option}
                    />
                )}
            </Grid>
        </Grid>
        
    </>
    );
};

export default FamilyMemberList;
