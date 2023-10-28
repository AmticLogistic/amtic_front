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

import moment from "moment";
import { useNavigate } from "react-router-dom";

const Transports = () => {

    const navigate = useNavigate();

    const [filter, setFilter] = useState(" ")

    const products = [
        { ruc: '2012321443', phone:"9478437834", id: '02344', mail: 'OBRA', razonSocial: 'JUAN MIRANBDA' },
        { ruc: '2012321443', phone:"9478437834", id: '02314', mail: 'OFICINA', razonSocial: 'PEDRO SALAS' },
        { ruc: '2012321443', phone:"9478437834", id: '02354', mail: 'OBRA', razonSocial: 'MARCO LOPEZ' },
        { ruc: '2012321443', phone:"9478437834", id: '023124', mail: 'OBRA', razonSocial: 'ELIZABET RAMOS' },
        { ruc: '2012321443', phone:"9478437834", id: '0234414', mail: 'OBRA', razonSocial: 'PP' }
    ]

    return (
        <>
            <Card>
                <CardHeader
                    title="Lista de Transportistas"
                    subheader="Lista de transportistas registrados"
                    avatar={
                        <Avatar aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <Button variant="contained" sx={{ mt: 1 }} endIcon={<ArrowForwardIosIcon />} onClick={() => { navigate("/empresas/transportistas/nuevo"); }}>
                            Nuevo Proveedor
                        </Button>
                    }
                ></CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <TextField id="outlined-basic1" label="Filtro" value={filter} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" sx={{ mt: 1 }}>Buscar</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">RUC</TableCell>
                            <TableCell align="left">RAZON SOCIAL</TableCell>
                            <TableCell align="left">CORREO</TableCell>
                            <TableCell align="left">TELEFONO</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.ruc}</TableCell>
                                <TableCell align="left">{row.razonSocial}</TableCell>
                                <TableCell align="left">{row.mail}</TableCell>
                                <TableCell align="left">{row.phone}</TableCell>
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
export default Transports