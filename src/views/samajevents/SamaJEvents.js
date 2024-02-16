import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import {baseURL} from "../../api/index";
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

const SamajEvents = () => {
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


        fetch(baseURL+'/fetch-web-events/samaj', requestOptions)
        .then(response => response.json())
        .then(data => {
            let res = data.eventsdata;
            let tempRows = [];
            for (let i = 0; i < res.length; i++) {
          
                tempRows.push([
                    i+1,
                    <img src={(res[i]["event_image"]  === null || res[i]["event_image"] === '' ? "https://agrawalsamaj.co/public/app-images/event/no_image.jpg" : "https://agrawalsamaj.co/public/app-images/event/"+res[i]["event_image"])} style={{width:'40px',height:'40px'}}/>,
                    res[i]["event_name"],
                    res[i]["event_des"],
                    Moment(res[i]["event_date"]).format('DD-MM-YYYY')+' - '+res[i]["event_time"],
                    res[i]["event_address"],
                    res[i]["id"],
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
        {
            name: "",
            options: {
              filter: false,
              print:false,
              download:false,
            }
        },
        "Evnt Name",
        "Description",
        "Date/Time",
        "Address",
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

export default SamajEvents;
