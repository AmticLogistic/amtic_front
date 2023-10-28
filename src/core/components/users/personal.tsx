import { useState } from "react";
import { Avatar, Button, ButtonGroup, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { useNavigate } from "react-router-dom";

const PersonalList = () => {

    const navigate = useNavigate();

    const personals = [
        {id:"0001", nombres:"VICTOR",paterno:"APAZA",materno:"AP",dni:"781209312",phone:"9123123123",mail:"CORREO@GMAIL.COM"},
        {id:"0002", nombres:"CARLOS",paterno:"ZAPATA",materno:"AP",dni:"781209312",phone:"9123123123",mail:"CORREO@GMAIL.COM"},
        {id:"0003", nombres:"JOSE",paterno:"MANRRIQUE",materno:"AP",dni:"781209312",phone:"9123123123",mail:"CORREO@GMAIL.COM"},
        {id:"0004", nombres:"MARIA COS",paterno:"CORNEJO",materno:"AP",dni:"781209312",phone:"9123123123",mail:"CORREO@GMAIL.COM"},
        {id:"0005", nombres:"TERESA",paterno:"PEREX",materno:"AP",dni:"781209312",phone:"9123123123",mail:"CORREO@GMAIL.COM"},
        {id:"0006", nombres:"PEPE",paterno:"AREAS",materno:"AP",dni:"781209312",phone:"9123123123",mail:"CORREO@GMAIL.COM"},

    ];

    return (
        <>
            <Card>
                <CardHeader
                    title="Lista de Personal"
                    subheader="Lista completa de personal de la empresa"
                    avatar={
                        <Avatar aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <Button variant="contained" sx={{ mt: 1 }} endIcon={<ArrowForwardIosIcon />} onClick={ ()=>{  navigate("/usuarios/personal/nuevo");}}>
                            Nuevo Personal
                        </Button>
                    }
                ></CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <TextField id="outlined-basic" label="Nombre de personal" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" sx={{ mt: 1 }}>Buscar</Button>
                        </Grid>
                        <Grid item xs={5} sx={{ textAlign: 'right' }}>
                            
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">NOMBRES</TableCell>
                            <TableCell align="left">APELLIDOS</TableCell>
                            <TableCell align="center">FOTO</TableCell>
                            <TableCell align="left">DNI</TableCell>
                            <TableCell align="left">TELEFONO</TableCell>
                            <TableCell align="left">CORREO</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            personals &&
                            personals.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row.id}</TableCell>
                                <TableCell align="left">{row.nombres}</TableCell>
                                <TableCell align="left">{row.paterno} {row.materno}</TableCell>
                                <TableCell align="center">
                                    <AddAPhotoIcon />
                                </TableCell>
                                <TableCell align="left">{row.dni}</TableCell>
                                <TableCell align="left">{row.phone}</TableCell>
                                <TableCell align="left">{row.mail}</TableCell>
                                <TableCell align="center" width={100}>
                                    <ButtonGroup>
                                        <Button variant="contained" color="warning"><EditIcon fontSize="small" /></Button>
                                        <Button variant="contained" color="error"><DeleteIcon fontSize="small" /></Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )

}
export default PersonalList