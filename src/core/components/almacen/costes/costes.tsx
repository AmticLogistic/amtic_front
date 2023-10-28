import { useState } from "react";
import { Avatar, Button, ButtonGroup, Card, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
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
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import moment from "moment";
import { useNavigate } from "react-router-dom";

const Costes = () => {

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [filtro, setFiltro] = useState(" ")
    const [provider, setProvider] = useState("0")

    const products = [
        { id: '02344', nombre: 'MODELO A', code: "0012" },
        { id: '02314', nombre: 'MODELO B', code: "0013" },
        { id: '02354', nombre: 'MODELO C', code: "0014" },
        { id: '023124', nombre: 'MODELO D', code: "0015" },
        { id: '0234414', nombre: 'MODELO R', code: "0016" },
    ]

    const handleChangep = (event: SelectChangeEvent) => {
        setProvider(event.target.value as string);
    }

    const handleModal = (state: boolean) => {
        setOpen(state);
    }

    return (
        <>
            <Card>
                <CardHeader
                    title="Lista de Centro de Costos"
                    subheader="Lista de SCentro de Costos registradas"
                    avatar={
                        <Avatar aria-label="recipe">
                            L
                        </Avatar>
                    }
                    action={
                        <Button variant="contained" sx={{ mt: 1 }} endIcon={<ArrowForwardIosIcon />} onClick={() => { handleModal(true) }}>
                            Agregar
                        </Button>
                    }
                ></CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <TextField id="outlined-basic" label="Filtro" value={filtro} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" sx={{ mt: 1 }}>Buscar</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">#</TableCell>
                            <TableCell align="left">ID</TableCell>
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
                                <TableCell component="th" scope="row">{row.code} </TableCell>
                                <TableCell align="left">{row.nombre}</TableCell>
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
            <Dialog onClose={handleModal} open={open}>
                <DialogTitle sx={{ textAlign: 'center', mt: 3 }}>Agregar Producto o Servicio</DialogTitle>
                <DialogContent sx={{ p: 5 }}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" value={" "} label="Nombre de Centro de Costos" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: 'center' }}>
                            <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 3 }}>
                                Agregar
                            </Button>
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: 'center' }}>
                            <Button variant="contained" color="error" startIcon={<CloseIcon />} sx={{ mt: 3 }} onClick={() => { handleModal(false) }}>
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>

            </Dialog>
        </>
    )


}
export default Costes