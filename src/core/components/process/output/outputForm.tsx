import { useState, useEffect } from "react";
import { Avatar, Button, ButtonGroup, Card, CardContent, CardHeader, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Api from './../../../utils/query/api'

import moment from "moment";
import { useNavigate } from "react-router-dom";
import Loading from "core/utils/components/Loading";

const OutputForm = () => {
    const navigate = useNavigate();

    const [dateInit, setDateInit] = useState(moment().format('YYYY-MM-DD'))
    const [dateEnd, setDateEnd] = useState(moment().format('YYYY-MM-DD'))
    const [provider, setProvider] = useState("0")
    const [load, setLoad] = useState(false)
    const [products, setProducts] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)

    const handleChangep = (event: SelectChangeEvent) => {
        setProvider(event.target.value as string);
    }

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoad(true)
                const response = await Api.listOutput();
                if (isMounted) {
                    setProducts(response.data)
                    setLoad(false)
                }
            } catch (error) {
                console.error('Error al cargar datos:', error);
                setLoad(false)
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleMenuClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setMenuAnchorEl(null)
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
                        <Button variant="contained" sx={{ mt: 1 }} endIcon={<ArrowForwardIosIcon />} onClick={() => { navigate("/operaciones/salidas/registro"); }}>
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
                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                            <FormControl sx={{ width: 160 }}>
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
            {
                load &&
                <Loading />
            }
            {
                !load &&
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
                                    <TableCell align="left">{row.paterno} {row.materno} {row.nombre}</TableCell>
                                    <TableCell align="left">{row.cc}</TableCell>
                                    <TableCell align="center" width={100}>
                                        <IconButton aria-label="settings" onClick={handleMenuClick}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={menuAnchorEl}
                                            open={Boolean(menuAnchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleClose}><VisibilityIcon /> &nbsp; Ver Documento</MenuItem>
                                            <MenuItem onClick={handleClose}><EditIcon /> &nbsp; Editar</MenuItem>
                                            <MenuItem onClick={handleClose}><DeleteIcon /> &nbsp; Anular</MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }

        </>
    )


}
export default OutputForm