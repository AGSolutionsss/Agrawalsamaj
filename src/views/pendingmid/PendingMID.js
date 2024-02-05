import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import {baseURL} from "../../api/index";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Moment from 'moment';
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

const PendingMID = () => {
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


        fetch(baseURL+'/fetch-web-pending-mid', requestOptions)
        .then(response => response.json())
        .then(data => {
            let res = data.pending_mid;
            let tempRows = [];
            for (let i = 0; i < res.length; i++) {
          
                tempRows.push([
                    i+1,
                    res[i]["priceaga"],
                    res[i]["name"],
                    res[i]["user_mobile_number"],
                    res[i]["f_mintroby"],
                    Moment(res[i]["reg_date"]).format('DD-MM-YYYY'),
                    res[i]["member_type"]+'#'+res[i]["id"],
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
        "Amount",
        "Full Name",
        "Mobile",
        "Intro By",
        "Reg Date",
        {
            name: "Actions",
            options:{
                filter: false,
                print:false,
                download:false,
                customBodyRender: (value) => {
                    const id = value.substr(value.indexOf("#")+1);
                    return(
                        <div>
                            <Tooltip title="Assign MID" placement="top">
                                 <IconButton aria-label="Assign MID">
                                    <Link to={"new-mid-assign?id="+id}>
                                        <EditIcon/>
                                    </Link>
                                 </IconButton>
                            </Tooltip>
                            <Tooltip title="View" placement="top">
                                 <IconButton aria-label="View">
                                    <Link to={"member-view?id="+id}>
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

export default PendingMID;
