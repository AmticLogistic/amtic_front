import { useEffect, useState } from "react";
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
import Api from './../../../utils/query/api';
import { useNavigate } from "react-router-dom";

const List = () => {

    const [age, setAge] = useState('10');
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await Api.GetMateriales()
            if (response)
                setProducts(response.data)
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    }

    return (
        <>
            <Card>
                <CardHeader
                    title="Lista de Productos"
                    subheader="Lista completa de productos en el almacen"
                    avatar={
                        <Avatar aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <Button variant="contained" sx={{ mt: 1 }} endIcon={<ArrowForwardIosIcon />} onClick={() => { navigate("/almacen/productos/nuevo"); }}>
                            Añadir producto
                        </Button>
                    }
                ></CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <TextField id="outlined-basic" label="Producto" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" sx={{ mt: 1 }}>Buscar</Button>
                        </Grid>
                        <Grid item xs={5} sx={{ textAlign: 'right' }}>
                            <FormControl sx={{ width: 180 }}>
                                <InputLabel id="demo-simple-select-label">Marca</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Marca"
                                    onChange={handleChange}
                                    sx={{ textAlign: 'center' }}
                                >
                                    <MenuItem value={10}>Todos</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
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
                            <TableCell align="left">MATERIAL</TableCell>
                            <TableCell align="center">IMG</TableCell>
                            <TableCell align="left">UND</TableCell>
                            <TableCell align="left">CATEGORIA</TableCell>
                            <TableCell align="left">MARCA</TableCell>
                            <TableCell align="center">STOCK</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row.id}</TableCell>
                                <TableCell align="left">{row.material}</TableCell>
                                <TableCell align="center">
                                    <AddAPhotoIcon />
                                </TableCell>
                                <TableCell align="left">{row.unidad_nombre}</TableCell>
                                <TableCell align="left">{row.categoria_nombre}</TableCell>
                                <TableCell align="center">{row.marca_nombre}</TableCell>
                                <TableCell align="center">{row.stock}</TableCell>
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
export default List