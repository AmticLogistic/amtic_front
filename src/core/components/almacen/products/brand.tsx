import { Avatar, Button, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Api from './../../../utils/query/api'
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";

const Brand = () => {

    const [data, setData] = useState([])
    const [name, setName] = useState("")

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await Api.GetMarcas()
            if (response)
                setData(response.data)
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    };

    const saveData = async () => {
        let data = {
            nombre: name,
            estado: 1
        }
        const response = await Api.SaveMarcas(data)
        if (response) {
            Swal.fire('Exito!', 'Marca creada exitosamente.', 'success')
            fetchData()
            setName("")
        } else {
            Swal.fire('Alerta', 'No se pudo registrar la marca.', 'error')
        }


    }

    const deleteData = async (row) => {
        const data = {
            id: row.id,
            nombre: row.marca,
            estado: 0
        }
        Swal.fire({
            title: 'Estas seguro?',
            text: "Eliminaras la de forma permanente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await Api.EditMarcas(data)
                if (response) {
                    Swal.fire('Exito!', 'Marca eliminada exitosamente.', 'success')
                    fetchData()
                } else {
                    Swal.fire('Alerta', 'No se pudo eliminada la marca.', 'error')
                }
            }
        })
    }


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader
                            title="Crea una Marca"
                            subheader="Formulario de marcas"
                            avatar={
                                <Avatar aria-label="recipe">
                                    C
                                </Avatar>
                            }
                        ></CardHeader>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <TextField id="outlined-basic" label="Marca" variant="outlined" fullWidth onChange={(e) => { setName(e.target.value) }} /><br /><br />
                            <Button variant="contained" sx={{ mt: 1 }} startIcon={<AddIcon />} onClick={saveData}>
                                Guardar
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Card>
                        <CardHeader
                            title="Lista de Marcas"
                            subheader="Lista completa de Marcas"
                            avatar={
                                <Avatar aria-label="recipe">
                                    L
                                </Avatar>
                            }
                        ></CardHeader>
                        <CardContent>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" >#</TableCell>
                                        <TableCell align="left">Nombre</TableCell>
                                        <TableCell align="center" width={80}>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.marca}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" color="error" onClick={() => { deleteData(row) }}>
                                                    <DeleteIcon fontSize="small" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </>
    )
}
export default Brand