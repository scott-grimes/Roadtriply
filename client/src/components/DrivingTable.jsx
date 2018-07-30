import React from 'react';
import {Link} from 'react-router-dom'
import api from '../api';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const DrivingTable = ({data})=>{

  if(!data || !data.length){
    return(<div>No rides yet. Let's change that!</div>)
  }
  console.log(data);
  return(
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell >Departing</TableCell>
            <TableCell >From</TableCell>
            <TableCell >To</TableCell>
            <TableCell >Riders</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell>
                  hi
                </TableCell>
                <TableCell >dude</TableCell>
                <TableCell >lol</TableCell>
                <TableCell >ok</TableCell>
                <TableCell >{n.id}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </div>
  )
  
};
export default DrivingTable;