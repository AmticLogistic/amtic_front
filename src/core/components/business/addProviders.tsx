import { useState } from "react";
import { Avatar, Card, CardHeader, CardContent, Grid, TextField, Button, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, ButtonGroup, Dialog, DialogTitle, DialogContent, useTheme } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import Fab from '@mui/material/Fab';

import moment from "moment";

import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const AddProvider = () => {

    const theme = useTheme();
    const [open, setOpen] = useState(false)
    const [product, setProduct] = useState("")

    const [marca, setMarca] = useState("0")
    const [unidad, setUnidad] = useState("0")

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [materials, setMaterials] = useState([
        { id: '0023', material: "TUBO DESAGUE 2' x 3MT", unid: "UND", marca: "PLASTISUR", cantidad: "120" },
        { id: '0024', material: "TUBO DESAGUE 2.3' x 3MT", unid: "UND", marca: "PLASTISUR", cantidad: "120" },
        { id: '0025', material: "TUBO DESAGUE 2.0' x 3MT", unid: "UND", marca: "PLASTISUR", cantidad: "120" },
    ])


    const handleModal = (state: boolean) => {
        setOpen(state);
    };

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
                        <Grid item xs={3}>
                            <TextField id="outlined-basic" label="RUC" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={1}>
                            <Fab color="primary" aria-label="add">
                                <SearchIcon />
                            </Fab>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="outlined-basic" label="RAZON SOCIAL" variant="outlined" defaultValue={" "} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="DIRECCION" variant="outlined" defaultValue={" "} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="CORREO" variant="outlined" defaultValue={" "} fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="TELEFONO" variant="outlined" defaultValue={" "} fullWidth />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="outlined-basic" label="REPRESENTANTE LEGAL" variant="outlined" defaultValue={" "} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="ACTIVIDAD ECONOMICA" variant="outlined" defaultValue={" "} fullWidth />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Button variant="contained" startIcon={<AddIcon />} sx={{mt:3}}>
                                Guardar Proveedor
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}
export default AddProvider