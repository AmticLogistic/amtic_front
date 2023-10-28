import { Avatar, Button, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const AddPersonal = () => {
    return (
        <>
            <Card>
                <CardHeader
                    title="Nuevo personal de trabajo"
                    subheader="Registrar nuevo personal de trabajo"
                    avatar={
                        <Avatar aria-label="recipe">
                            C
                        </Avatar>
                    }
                ></CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Nombres" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" label="Ape. Paterno" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" label="Ape. Materno" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField id="outlined-basic" label="DNI" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField id="outlined-basic" label="Fecha Nacimiento" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" label="Correo" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Dirección" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField id="outlined-basic" label="Telefono" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField id="outlined-basic" label="Cargo" variant="outlined" fullWidth />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'center' }}>
                            <AddAPhotoIcon fontSize="large"sx={{ fontSize: 120, color: '#D9D9D9'}}/>
                            <Button variant="outlined" sx={{ mt: 1 }} startIcon={<AddIcon />}>
                                Cargar Foto
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Button variant="contained" sx={{ mt: 1 }} startIcon={<AddIcon />}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent> 
            </Card>
        </>
    )
}
export default AddPersonal