import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import {baseURL} from "../../api/index";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";

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

const PatronMembers = () => {
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


        fetch(baseURL+'/fetch-web-patron-members', requestOptions)
        .then(response => response.json())
        .then(data => {
            let res = data.patron_member;
            let tempRows = [];
            for (let i = 0; i < res.length; i++) {
          
                tempRows.push([
                    i+1,
                    res[i]["user_mid"],
                    res[i]["name"],
                    res[i]["user_mobile_number"],
                    res[i]["f_mintroby"],
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
        "MID",
        "Full Name",
        "Mobile",
        "Intro By",
        {
            name: "Actions",
            options:{
                filter: false,
                print:false,
                download:false,
                customBodyRender: (value) => {
                    return(
                        <div>
                            <Tooltip title="View" placement="top">
                                 <IconButton aria-label="View">
                                    <Link to={"member-view?id="+value}>
                                        <VisibilityIcon/>
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

export default PatronMembers;
