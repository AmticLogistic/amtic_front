import { useEffect, useState } from "react";
import { Avatar, Button, ButtonGroup, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import EditIcon from '@mui/icons-material/Edit';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Api from './../../../utils/query/api'
import moment from "moment";
import Loading from "core/utils/components/Loading";
import { useNavigate } from "react-router-dom";

import Chip from '@mui/material/Chip';

const ListRequired = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [dateInit, setDateInit] = useState(moment().format('YYYY-MM-DD'))
    const [dateEnd, setDateEnd] = useState(moment().format('YYYY-MM-DD'))
    const [list, setList] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)
    const [load, setLoad] = useState(false)
    const [details, setDetails] = useState([])

    const handleMenuClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setMenuAnchorEl(null)
    }
    const handleClickOpen = async (data:any) => {
        setDetails(data)
        setOpen(true);
    };

    const handleClose2 = () => {
        setOpen(false);
    };

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoad(true)
                const response = await Api.ListRequerimientos();
                if (isMounted) {
                    setList(response.data)
                    setLoad(false)
                }
            } catch (error) {
                console.error('Error al cargar datos:', error);
                setLoad(false)
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, []);


    return (
        <>
            <Card>
                <CardHeader
                    title="Lista de Requerimientos"
                    subheader="Lista completa de requerimientos registrados"
                    avatar={
                        <Avatar aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <Button variant="contained" sx={{ mt: 1 }} endIcon={<ArrowForwardIosIcon />} onClick={() => { navigate("/operaciones/requerimientos/nuevo"); }}>
                            Nuevo Requerimiento
                        </Button>
                    }
                ></CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField type="date" id="outlined-basic" label="Fecha Inicial" value={dateInit} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField type="date" id="outlined-basic" label="Fecha Final" variant="outlined" value={dateEnd} fullWidth />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" sx={{ mt: 1 }}>Buscar</Button>
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
                                <TableCell align="center">Estado</TableCell>
                                <TableCell align="left">Fecha</TableCell>
                                <TableCell align="center">Lista</TableCell>
                                <TableCell align="left">Area Solicitante</TableCell>
                                <TableCell align="left">Persona Solicitante</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                list && list.length > 0 &&
                                list.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                row.Orden_id == '0' &&
                                                <Chip size="small" label="Pendiente" color="info" sx={{ pl: 2, pr: 2 }} />
                                            }
                                            {
                                                row.Orden_id == '-1' &&
                                                <Chip size="small" label="Anulado" color="error" sx={{ pl: 2, pr: 2 }} />
                                            }
                                            {
                                                row.Orden_id != '0' && row.Orden_id != '-1' &&
                                                <Chip icon={<ContentPasteIcon sx={{ fontSize: 28, pl: 1 }} />} label={row.Orden_id.toString().padStart(6, '0')} variant="outlined" />
                                            }
                                        </TableCell>
                                        <TableCell align="left">{moment(row.fecha).format("MMM DD - YYYY")}</TableCell>
                                        <TableCell align="center">
                                            <IconButton aria-label="delete" onClick={ ()=>{handleClickOpen(row.list)} }>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="left">{row.areaSolicita}</TableCell>
                                        <TableCell align="left">{row.nombre} {row.paterno} {row.materno}</TableCell>

                                        <TableCell align="right" width={80}>
                                            <IconButton aria-label="settings" onClick={handleMenuClick}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={menuAnchorEl}
                                                open={Boolean(menuAnchorEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={handleClose}><VisibilityIcon /> &nbsp; Ver Documento</MenuItem>
                                                <MenuItem onClick={handleClose}><EditIcon /> &nbsp; Editar</MenuItem>
                                                <MenuItem onClick={handleClose}><LocalMallIcon /> &nbsp; Generar Orden de Compra</MenuItem>
                                                <MenuItem onClick={handleClose}><DeleteIcon /> &nbsp; Anular</MenuItem>
                                            </Menu>

                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }

            <Dialog
                open={open}
                keepMounted
                onClose={handleClose2}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Lista de Requerimientos"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <ul>
                            {
                                details && details.length > 0 &&
                                details.map((d) => (
                                    <li>[ {d.cantidad} ] - {d.material}</li>
                                ))
                            }
                        </ul>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose2}>Cerrar</Button>
                </DialogActions>
            </Dialog>

        </>
    )

}
export default ListRequired