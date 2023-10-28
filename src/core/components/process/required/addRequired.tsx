import { useEffect, useState } from "react";
import { Avatar, Card, CardHeader, CardContent, Grid, TextField, Button, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, ButtonGroup, Dialog, DialogTitle, DialogContent, useTheme, Autocomplete } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import moment from "moment";
import Api from './../../../utils/query/api'
import Swal from 'sweetalert2'

import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from "@mui/lab/LoadingButton";

const AddRequired = () => {

    const theme = useTheme();
    const [persons, setPersons] = useState([])
    const [open, setOpen] = useState(false)
    const [product, setProduct] = useState("")
    const [observation, setObservation] = useState("Ninguna")
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
    const [area, setArea] = useState("Obra")
    const [person, setPerson] = useState(null)

    const [selectedMaterial, setSelectedMaterial] = useState(null)
    const [material, setMaterial] = useState(null)
    const [marca, setMarca] = useState("")
    const [unidad, setUnidad] = useState("")
    const [cantidad, setCantidad] = useState("0")

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [materials, setMaterials] = useState([])

    const [cart, setCart] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await Api.getPersons()
            if (response) {
                setPersons(response.data)
            }
            const responseMaterials = await Api.GetMateriales()
            if (responseMaterials)
                setMaterials(responseMaterials.data)

        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    };

    const handleChangea = (event: SelectChangeEvent) => {
        setArea(event.target.value as string);
    }

    const handleChangep = (event: SelectChangeEvent) => {
        setPerson(event.target.value as string);
    }

    const handleModal = (state: boolean) => {
        setOpen(state);
    }

    const selectedMarial = (row: any) => {
        console.log(row)
        setMaterial(row)
        setUnidad(row.unidad_nombre)
        setMarca(row.marca_nombre)
    }

    const addCart = async () => {
        const rowCart = {
            cantidad: cantidad,
            observacion: '',
            Material_id: material.id,
        }
        const newRow = { ...material, ...rowCart }
        console.log(newRow)
        const newCart = [...cart, newRow]
        await setCart(newCart)
        await clearModal()
    }

    const clearModal = async () => {
        await setCantidad('0')
        await setMaterial(null)
        await setMarca('')
        await setUnidad('')
        await handleClearTextField()
    }

    const handleClearTextField = () => {
        setSelectedMaterial(null); // Limpia el valor seleccionado
    }

    const handleRemoveItem = (indexToRemove) => {
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);
        setCart(updatedCart);
    }

    const saveData = async () => {
        await setLoad(true)
        const dataSending = {
            fecha: date,
            areaSolicita: area,
            persona_id: person.id,
            observacion: observation,
            detalles: cart
        }
        console.log(dataSending)
        const requestSave = await Api.SaveRequerimiento(dataSending)
        if (requestSave) {
            Swal.fire('Requemiento Generado', 'El requerimiento ingresado fue guardado exitosamente.', 'success')
        } else {
            Swal.fire('Error en procesamiento', 'El requerimiento ingresado no puedo ser procesaro, revisar los datos ingresados.', 'error')
        }
        await setLoad(false)
    }

    return (
        <>
            <Card>
                <CardHeader
                    title="Requerimiento de Material y/o Servicio"
                    subheader="Solicita nuevo requerimiento"
                    avatar={
                        <Avatar aria-label="recipe">
                            R
                        </Avatar>
                    }
                ></CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField type="date" id="outlined-basic" value={date} label="Fecha" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label1">Area Solicitante</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={area}
                                            label="Area Solicitante"
                                            onChange={handleChangea}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <MenuItem value={'Obra'}>Obra</MenuItem>
                                            <MenuItem value={'Taller'}>Taller</MenuItem>
                                            <MenuItem value={'Seguridad'}>Seguridad</MenuItem>
                                            <MenuItem value={'Oficina'}>Oficina</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    {
                                        persons && persons.length > 0 &&
                                        <Autocomplete
                                            onChange={(_, newValue) => { setPerson(newValue) }}
                                            options={persons}
                                            getOptionLabel={(option) => `${option.nombres} ${option.apeMaterno} ${option.apePaterno}`}
                                            renderInput={(params) => <TextField {...params} label="Solicitante" />}
                                            renderOption={(props, option) => (
                                                <li {...props}>
                                                    <span>{option.nombres} {option.apeMaterno} {option.apePaterno}</span>
                                                </li>
                                            )}
                                        />
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" value={observation} onChange={(e)=>{setObservation(e.target.value)}} label="Observaciones" variant="outlined" fullWidth />
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: 'center' }}>
                            <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 3 }} onClick={() => { handleModal(true) }}>
                                Material
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell align="left">Material</TableCell>
                            <TableCell align="left">MARCA</TableCell>
                            <TableCell align="left">UND</TableCell>
                            <TableCell align="center">CANTIDAD</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cart && cart.length > 0 &&
                            cart.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="left">{row.material}</TableCell>
                                    <TableCell align="left">{row.marca_nombre}</TableCell>
                                    <TableCell align="left">{row.unidad_nombre}</TableCell>
                                    <TableCell align="center">{row.cantidad}</TableCell>
                                    <TableCell align="center" width={100}>
                                        <ButtonGroup>
                                            <Button variant="contained" color="error" onClick={() => handleRemoveItem(index)}><DeleteIcon fontSize="small" /></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        {
                            cart.length == 0 &&
                            <TableCell component="th" scope="row" colSpan={6} sx={{ textAlign: 'center', p: 6 }}>
                                Selecciona materiales al requermiento.
                            </TableCell>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <LoadingButton loading={load} variant="contained" sx={{ mt: 4, width: 380, marginLeft: 'auto' }} startIcon={<AddIcon />} onClick={saveData} disabled={!area || !person || cart.length == 0}>
                Registrar Requerimiento
            </LoadingButton>

            <Dialog onClose={handleModal} open={open} fullScreen={fullScreen}>
                <DialogTitle sx={{ textAlign: 'center', mt: 3 }}>Agregar Producto o Servicio</DialogTitle>
                <DialogContent sx={{ p: 5 }}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                       
                        <Grid item xs={9}>
                            {materials && materials.length > 0 && (
                                <Autocomplete
                                    value={selectedMaterial}
                                    onChange={(_, newValue) => { selectedMarial(newValue); setSelectedMaterial(newValue) }}
                                    options={materials}
                                    getOptionLabel={(option) => `${option.categoria_nombre} - ${option.material} - ${option.marca_nombre}`}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Material"
                                            InputProps={{
                                                ...params.InputProps,
                                            }}
                                        />
                                    )}
                                    renderOption={(props, option) => (
                                        <li {...props}>
                                            <span key={`li${option.id}`}>
                                                {option.categoria_nombre} - {option.material} - {option.marca_nombre}
                                            </span>
                                        </li>
                                    )}
                                />
                            )}
                        </Grid>
                        <Grid item xs={3}>
                            <TextField type="numer" id="outlined-basic" value={cantidad} label="Cantidad" variant="outlined" onChange={(e) => { setCantidad(e.target.value) }} fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="numer" id="outlined-basic" value={unidad} label="Unidad" variant="outlined" disabled fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="numer" id="outlined-basic" value={marca} label="Marca" variant="outlined" disabled fullWidth />
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: 'center' }}>
                            <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 3 }} disabled={!cantidad || cantidad == '0'} onClick={addCart}>
                                Agregar
                            </Button>
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: 'center' }}>
                            <Button variant="contained" color="error" startIcon={<CloseIcon />} sx={{ mt: 3 }} onClick={() => { handleModal(false) }}>
                                Cerrar
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>

            </Dialog>
        </>
    )

}
export default AddRequired