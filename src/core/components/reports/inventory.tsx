import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Avatar, Button, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import Api from './../../utils/query/api'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'categoria_nombre',
    headerName: 'Categoria',
    width: 150,
  },
  {
    field: 'material',
    headerName: 'Descripción',
    flex: 1,
  },
  {
    field: 'marca_nombre',
    headerName: 'Marca',
    width: 150,
  },
  {
    field: 'unidad_nombre',
    headerName: 'UND',
    type: 'number',
    width: 110,
  },
  {
    field: 'stock',
    headerName: 'Saldo Actual',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    align:'center',
    width: 100,
  },
];


const Inventory = () => {

  const [rows, setRows] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseMaterials = await Api.GetMateriales()
      if (responseMaterials)
        setRows(responseMaterials.data)
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

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
        <Box sx={{ height: 850, width: '100%', overflow:'auto' }}>
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
            pageSizeOptions={[25,50, 100]}
            disableRowSelectionOnClick
          />
        </Box>
      </CardContent>
    </Card>

  );
}
export default Inventory