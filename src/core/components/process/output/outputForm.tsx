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

const OutputForm = () => {
    const navigate = useNavigate();

    const [dateInit, setDateInit] = useState(moment().format('YYYY-MM-DD'))
    const [dateEnd, setDateEnd] = useState(moment().format('YYYY-MM-DD'))
    const [provider, setProvider] = useState("0")

    const products = [
        { fecha: '2023/08/16', id: '02344', personal: 'JUAN MIRANBDA', cc:"A57" },
        { fecha: '2023/08/16', id: '02314', personal: 'PEDRO SALAS', cc:"A58" },
        { fecha: '2023/08/16', id: '02354', personal: 'MARCO LOPEZ', cc:"A51" },
        { fecha: '2023/08/16', id: '023124', personal: 'ELIZABET RAMOS', cc:"A52" },
        { fecha: '2023/08/16', id: '0234414', personal: 'PP', cc:"A51" },
    ]

    const handleChangep = (event: SelectChangeEvent) => {
        setProvider(event.target.value as string);
    }

    return (
        <>
            <Card>
                <CardHeader
                    title="Lista de Salidas"
                    subheader="Lista de Salidas registradas"
                    avatar={
                        <Avatar aria-label="recipe">
                            C
                        </Avatar>
                    }
                    action={
                        <Button variant="contained" sx={{ mt: 1 }} endIcon={<ArrowForwardIosIcon />} onClick={() => { navigate("/operaciones/ordencompras/nuevo"); }}>
                            Nueva Salida
                        </Button>
                    }
                ></CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField type="date" id="outlined-basic" label="Fecha Inicial" value={dateInit} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField type="date" id="outlined-basic" label="Fecha Final" variant="outlined" value={dateEnd} fullWidth />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" sx={{ mt: 1 }}>Buscar</Button>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'right'}}>
                            <FormControl sx={{width:160}}>
                                <InputLabel id="demo-simple-select-label1">Proveedor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={provider}
                                    label="Proveedor"
                                    onChange={handleChangep}
                                    sx={{ textAlign: 'center' }}
                                >
                                    <MenuItem value={0}>Seleccione</MenuItem>
                                    <MenuItem value={1}>cat 1</MenuItem>
                                    <MenuItem value={2}>cat 2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">FECHA</TableCell>
                            <TableCell align="left">PERSONAL/TRABAJADOR</TableCell>
                            <TableCell align="left">CENTRO DE COSTOS</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.id} </TableCell>
                                <TableCell align="left">{row.fecha}</TableCell>
                                <TableCell align="left">{row.personal}</TableCell>
                                <TableCell align="left">{row.cc}</TableCell>
                                <TableCell align="center" width={100}>
                                    <ButtonGroup>
                                        <Button variant="contained" color="info"><VisibilityIcon fontSize="small" /></Button>
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
export default OutputForm