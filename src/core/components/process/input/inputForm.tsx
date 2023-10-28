import { useState, useEffect } from "react";
import { Avatar, Button, ButtonGroup, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loading from "core/utils/components/Loading";
import Api from './../../../utils/query/api'

import moment from "moment";
import { useNavigate } from "react-router-dom";

const InputForm = () => {

    const navigate = useNavigate();
    const [dateInit, setDateInit] = useState(moment().format('YYYY-MM-DD'))
    const [dateEnd, setDateEnd] = useState(moment().format('YYYY-MM-DD'))
    const [provider, setProvider] = useState("0")
    const [products, setProducts] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                await setLoad(true)
                const response = await Api.obtenerEntradas();
                if (response) {
                    await setProducts(response)
                    await setLoad(false)
                }
            } catch (error) {
                console.error('Error al cargar datos:', error)
                await setLoad(false)
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, []);


    const handleChangep = (event: SelectChangeEvent) => {
        setProvider(event.target.value as string);
    }

    return (
        <>
            <Card>
                <CardHeader
                    title="Lista de Entradas"
                    subheader="Lista de Entradas registrados"
                    avatar={
                        <Avatar aria-label="recipe">
                            C
                        </Avatar>
                    }
                // action={
                //     <Button variant="contained" sx={{ mt: 1 }} endIcon={<ArrowForwardIosIcon />} onClick={() => { navigate("/operaciones/entradas/nuevo"); }}>
                //         Nueva Entrada
                //     </Button>
                // }
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
                                <TableCell align="left">PROVEEDOR</TableCell>
                                <TableCell align="left">FECHA</TableCell>
                                <TableCell align="left">TRANSPORTISTA</TableCell>
                                <TableCell align="left">MONEDA</TableCell>
                                <TableCell align="left">PUESTO EN</TableCell>
                                <TableCell align="left">TOTAL</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                products && products.length > 0 &&
                                products.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{row.id} </TableCell>
                                        <TableCell align="left">{row.proveedor}</TableCell>
                                        <TableCell align="left">{row.fecha}</TableCell>
                                        <TableCell align="left">{row.transportista}</TableCell>
                                        <TableCell align="left">{row.moneda}</TableCell>
                                        <TableCell align="left">{row.puestoEn}</TableCell>
                                        <TableCell align="center" width={130}>S/ {row.total}</TableCell>
                                        <TableCell align="center" width={100}>
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
export default InputForm