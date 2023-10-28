import { useState } from "react";
import { Avatar, Card, CardHeader, CardContent, Grid, TextField, Button, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, ButtonGroup, Dialog, DialogTitle, DialogContent, useTheme } from "@mui/material"
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

import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'

const AddOutput = () => {

    const theme = useTheme();
    const [open, setOpen] = useState(false)

    const [revisado, setRevisado] = useState("")
    const [aprobado, setAprobado] = useState("")
    const [provider, setProvider] = useState("")
    const [sitio, setSitio] = useState("")
    const [product, setProduct] = useState("")

    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
    const [area, setArea] = useState("0")
    const [person, setPerson] = useState("0")

    const [marca, setMarca] = useState("0")
    const [unidad, setUnidad] = useState("0")

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [materials, setMaterials] = useState([
        { id: '0023', material: "TUBO DESAGUE 2' x 3MT", unid: "UND", marca: "PLASTISUR", cantidad: "120", pu: "20.00", subtotal: "24000.00" },
        { id: '0024', material: "TUBO DESAGUE 2.3' x 3MT", unid: "UND", marca: "PLASTISUR", cantidad: "120", pu: "20.00", subtotal: "24000.00" },
        { id: '0025', material: "TUBO DESAGUE 2.0' x 3MT", unid: "UND", marca: "PLASTISUR", cantidad: "120", pu: "20.00", subtotal: "24000.00" },
    ])

    const handleChangea = (event: SelectChangeEvent) => {
        setArea(event.target.value as string);
    }

    const handleChangep = (event: SelectChangeEvent) => {
        setPerson(event.target.value as string);
    }

    const handleModal = (state: boolean) => {
        setOpen(state);
    };

    return (
        <>
            <Card>
                <CardHeader
                    title="Generar Orden de Compra"
                    subheader="Ingresa una nueva orden de Compra"
                    avatar={
                        <Avatar aria-label="recipe">
                            R
                        </Avatar>
                    }
                ></CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <TextField type="date" id="outlined-basic" value={date} label="Fecha Emisión" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" value={provider} label="Proveedor" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label1">Moneda</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={area}
                                    label="Moneda"
                                    onChange={handleChangea}
                                    sx={{ textAlign: 'center' }}
                                >
                                    <MenuItem value={0}>Selecciona</MenuItem>
                                    <MenuItem value={1}>cat 1</MenuItem>
                                    <MenuItem value={2}>cat 2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label1">Metodo de Pago</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={person}
                                    label="Metodo de Pago"
                                    onChange={handleChangep}
                                    sx={{ textAlign: 'center' }}
                                >
                                    <MenuItem value={0}>Selecciona</MenuItem>
                                    <MenuItem value={1}>cat 1</MenuItem>
                                    <MenuItem value={2}>cat 2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" value={sitio} label="Sitio entrega" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField id="outlined-basic" value={revisado} label="Revisado" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField id="outlined-basic" value={aprobado} label="Aprobado" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Observacion"
                                multiline
                                fullWidth
                                rows={2}
                                defaultValue="Ninguna"
                            />
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
            <Grid container spacing={2}>
                <Grid item xs={6} sx={{ textAlign: 'center' }}>
                    <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 3 }} onClick={() => { handleModal(true) }}>
                        Agregar Material
                    </Button>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'center' }}>
                    <Button variant="contained" startIcon={<SearchIcon />} sx={{ mt: 3 }} onClick={() => { handleModal(true) }}>
                        Buscar Material
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Material</TableCell>
                            <TableCell align="left">UND</TableCell>
                            <TableCell align="left">MARCA</TableCell>
                            <TableCell align="left">CANTIDAD</TableCell>
                            <TableCell align="left">UNIT</TableCell>
                            <TableCell align="left">SUBTOTAL</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materials.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.material}</TableCell>
                                <TableCell align="left">{row.unid}</TableCell>
                                <TableCell align="left">{row.marca}</TableCell>
                                <TableCell align="left">{row.cantidad}</TableCell>
                                <TableCell align="left">S/ {row.pu}</TableCell>
                                <TableCell align="left">S/ {row.subtotal}</TableCell>
                                <TableCell align="center" width={100}>
                                    <ButtonGroup>
                                        <Button variant="contained" color="error"><DeleteIcon fontSize="small" /></Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog onClose={handleModal} open={open} fullScreen={fullScreen}>
                <DialogTitle sx={{ textAlign: 'center', mt: 3 }}>Agregar Producto o Servicio</DialogTitle>
                <DialogContent sx={{ p: 5 }}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={2}>
                            <TextField type="numer" id="outlined-basic" value={0} label="Cantidad" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField id="outlined-basic" value={product} label="Producto" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label1">Unidad</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={unidad}
                                    label="Unidad"
                                    onChange={handleChangep}
                                    sx={{ textAlign: 'center' }}
                                >
                                    <MenuItem value={0}>Selecciona</MenuItem>
                                    <MenuItem value={1}>cat 1</MenuItem>
                                    <MenuItem value={2}>cat 2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label1">Marca</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={marca}
                                    label="Marca"
                                    onChange={handleChangep}
                                    sx={{ textAlign: 'center' }}
                                >
                                    <MenuItem value={0}>Selecciona</MenuItem>
                                    <MenuItem value={1}>cat 1</MenuItem>
                                    <MenuItem value={2}>cat 2</MenuItem>
                                </Select>
                            </FormControl>
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
export default AddOutput