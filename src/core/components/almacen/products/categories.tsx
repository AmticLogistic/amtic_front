import { useEffect, useState } from "react";
import { Avatar, Button, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material"
import Swal from 'sweetalert2'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Api from './../../../utils/query/api'

const Categories = () => {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await Api.GetCategorias()
            if (response)
                setCategories(response.data)
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    };

    const saveData = async () => {
        let data = {
            nombre: name,
            estado: 1
        }
        const response = await Api.SaveCategorias(data)
        if (response) {
            Swal.fire('Exito!', 'Categoria creada exitosamente.', 'success')
            fetchData()
            setName("")
        } else {
            Swal.fire('Alerta', 'No se pudo registrar la categoria.', 'error')
        }


    }

    const deleteData = async (row) => {
        const data = {
            id: row.id,
            nombre: row.categoria,
            estado: 0
        }
        Swal.fire({
            title: 'Estas seguro?',
            text: "Eliminaras el elemento de forma permanente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await Api.EditCategorias(data)
                if (response) {
                    Swal.fire('Exito!', 'Categoria modificada exitosamente.', 'success')
                    fetchData()
                } else {
                    Swal.fire('Alerta', 'No se pudo modificar la categoria.', 'error')
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
                            title="Crea un Categoria"
                            subheader="Formulario categorias"
                            avatar={
                                <Avatar aria-label="recipe">
                                    C
                                </Avatar>
                            }
                        ></CardHeader>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <TextField id="outlined-basic" label="Categoria" variant="outlined" fullWidth onChange={(e) => { setName(e.target.value) }} /><br /><br />
                            <Button variant="contained" sx={{ mt: 1 }} startIcon={<AddIcon />} disabled={!name} onClick={saveData}>
                                Guardar
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Card>
                        <CardHeader
                            title="Lista de Categorias"
                            subheader="Lista completa de categorias"
                            avatar={
                                <Avatar aria-label="recipe">
                                    L
                                </Avatar>
                            }
                        ></CardHeader>
                        <CardContent>
                            <Table sx={{ height: 500, overflow: 'auto' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" >#</TableCell>
                                        <TableCell align="left">Nombre</TableCell>
                                        <TableCell align="center" width={80}>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categories.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.categoria}
                                            </TableCell>
                                            <TableCell align="center" >
                                                <Button variant="contained" color="error" onClick={(e) => { deleteData(row) }}>
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
export default Categories