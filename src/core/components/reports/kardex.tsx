import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Avatar, Button, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import Api from './../../utils/query/api'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'fecha', headerName: 'fecha', width: 120 },
    {
        field: 'tipoDocumento',
        headerName: 'Tipo de Documento',
        width: 150,
    },
    {
        field: 'nDocumento',
        headerName: 'N° Documento',
        width: 150,
    },
    {
        field: 'material',
        headerName: 'Concepto',
        flex: 1,
    },
    {
        field: 'doc',
        headerName: 'RUC/DNI',
        type: 'number',
        width: 110,
    },
    {
        field: 'entrada',
        headerName: 'Entrada',
        type: 'number',
        width: 110,
    },
    {
        field: 'salida',
        headerName: 'Salida',
        type: 'number',
        width: 110,
    },
    {
        field: 'saldo',
        headerName: 'Saldo',
        type: 'number',
        width: 110,
    },
];


const Kardex = () => {

    const [rows, setRows] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responseMaterials = await Api.Getkardex()
            if (responseMaterials)
                setRows(responseMaterials.data)
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "purple" }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <Button variant="contained" startIcon={<FileDownloadIcon />} color='error'>
                        Exporta PDF
                    </Button>
                }
                title="Reporte de inventario"
                subheader="Octubre 01, 2016"
            />
            <CardContent>
                <Box sx={{ height: 850, width: '100%', overflow: 'auto' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        autoHeight
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 12,
                                },
                            },
                        }}
                        pageSizeOptions={[25, 50, 100]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </CardContent>
        </Card>
    );
}
export default Kardex