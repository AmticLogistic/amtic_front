import React, { useEffect, useState } from "react";
import {
    Avatar,
    Card,
    CardHeader,
    CardContent,
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    MenuItem,
    ButtonGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    useTheme,
    Autocomplete,
    DialogProps,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import Swal from "sweetalert2";

import Api from "./../../../utils/query/api";

import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const AddBuy = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [maxWidth, setMaxWidth] =
        useState<DialogProps["maxWidth"]>("md");

    const [revisado, setRevisado] = useState("");
    const [aprobado, setAprobado] = useState("");
    const [provider, setProvider] = useState("");
    const [providers, setProviders] = useState([]);
    const [sitio, setSitio] = useState("");
    const [product, setProduct] = useState("");

    const [date, setDate] = useState(
        moment().format("YYYY-MM-DD")
    );
    const [area, setArea] = useState("0");
    const [person, setPerson] = useState("0");

    const [pay, setPay] = useState("1");
    const [methoPay, setMethoPay] = useState("1");

    const [marca, setMarca] = useState("");
    const [unidad, setUnidad] = useState("");
    const [observation, setObservation] = useState("");
    const [subtotal, setSubtotal] = useState("");
    const [total, setTotal] = useState(0);

    const fullScreen = useMediaQuery(
        theme.breakpoints.down("md")
    );

    const [cantidad, setCantidad] = useState("0");
    const [material, setMaterial] = useState(null);
    const [materials, setMaterials] = useState([]);

    const [cart, setCart] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState(
        null
    );
    const [load, setLoad] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await Api.getProviders();
            if (response) {
                setProviders(response.data);
            }
            const responseMaterials =
                await Api.GetMateriales();
            if (responseMaterials) {
                setMaterials(responseMaterials.data);
                console.log(materials);
            }
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    };

    const handleChangea = (
        event: SelectChangeEvent
    ) => {
        setArea(event.target.value as string);
    };

    const handleChangep = (
        event: SelectChangeEvent
    ) => {
        setPerson(event.target.value as string);
    };

    const handleModal = (state: boolean) => {
        setOpen(state);
    };

    const selectedMarial = (row: any) => {
        setMaterial(row);
        setUnidad(row.unidad_nombre);
        setMarca(row.marca_nombre);
    };

    const addCart = async () => {
        const rowCart = {
            cantidad: cantidad,
            observacion: "",
            Material_id: material.id,
            pu: subtotal,
            subtotal:
                parseInt(cantidad) * parseFloat(subtotal),
        };
        const newRow = { ...material, ...rowCart };
        const newCart = [...cart, newRow];
        await setCart(newCart);
        await clearModal();
        calcularTotal();
    }
    const clearInputs = () => {
        setRevisado("")
        setAprobado("")
        setProvider("")
        setSitio("")
        setObservation("")
        setProvider(null)
        setCart([])
    }

    const clearModal = async () => {
        await setCantidad("0");
        await setMaterial(null);
        await setMarca("");
        await setUnidad("");
        await setSubtotal("");
        await handleClearTextField();
    };
    const handleClearTextField = () => {
        setSelectedMaterial(null);
    };

    const handleRemoveItem = (indexToRemove) => {
        const updatedCart = cart.filter(
            (_, index) => index !== indexToRemove
        );
        setCart(updatedCart);
        // Calcular el total automáticamente cuando se elimina un objeto del carrito
        calcularTotal();
    };

    const calcularTotal = () => {
        let total = 0;
        for (const item of cart) {
            total += item.subtotal;
        }
        setTotal(total);
    };

    const saveData = async () => {
        await setLoad(true);
        const dataSending = {
            fecha: date,
            total: total, // Usar el total calculado
            sitioEntrega: sitio,
            revisadoPor: revisado,
            aprobadoPor: aprobado,
            observacion: observation,
            Monedas_id: pay,
            Empresas_id: provider["id"],
            MetodosPago_id: methoPay,
            detalles: cart,
        };
        const requestSave = await Api.SaveOrden(dataSending);
        if (requestSave) {
            Swal.fire(
                "Orden de Compra Generado",
                "La orden de compra ingresado fue guardado exitosamente.",
                "success"
            )
            await clearInputs()
        } else {
            Swal.fire(
                "Error en generado Orden de Compra",
                "La orden de compra ingresado no puedo ser procesaro, revisar los datos ingresados.",
                "error"
            );
        }
        await setLoad(false);
    };

    return (
        <>
            <Card>
                <CardHeader
                    title="Crear Orden de Compra"
                    subheader="Ingresa una nueva orden de Compra"
                    avatar={
                        <Avatar aria-label="recipe">R</Avatar>
                    }
                ></CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <TextField
                                type="date"
                                id="outlined-basic"
                                value={date}
                                label="Fecha Emisión"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {providers && providers.length > 0 && (
                                <Autocomplete
                                    onChange={(_, newValue) => {
                                        setProvider(newValue);
                                    }}
                                    options={providers}
                                    getOptionLabel={(option) =>
                                        `${option.numDocIdentificacion} - ${option.razonSocial}`
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} label="Proveedor" />
                                    )}
                                    renderOption={(props, option) => (
                                        <li {...props}>
                                            <span>
                                                {option.numDocIdentificacion} -{" "}
                                                {option.razonSocial}
                                            </span>
                                        </li>
                                    )}
                                />
                            )}
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label1">
                                    Moneda
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pay}
                                    label="Moneda"
                                    onChange={handleChangea}
                                    sx={{ textAlign: "center" }}
                                >
                                    <MenuItem value={"1"}>SOLES</MenuItem>
                                    <MenuItem value={"2"}>DOLAR</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label1">
                                    Metodo de Pago
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={methoPay}
                                    label="Metodo de Pago"
                                    onChange={handleChangep}
                                    sx={{ textAlign: "center" }}
                                >
                                    <MenuItem value={"1"}>AL CONTADO</MenuItem>
                                    <MenuItem value={"2"}>CREDITO</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-basic"
                                value={sitio}
                                onChange={(e) => setSitio(e.target.value)}
                                label="Sitio entrega"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-basic"
                                value={revisado}
                                onChange={(e) => setRevisado(e.target.value)}
                                label="Revisado"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="outlined-basic"
                                value={aprobado}
                                onChange={(e) => setAprobado(e.target.value)}
                                label="Aprobado"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Observacion"
                                multiline
                                fullWidth
                                value={observation}
                                onChange={(e) => setObservation(e.target.value)}
                                rows={2}
                                defaultValue="Ninguna"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Button
                variant="contained"
                color="info"
                startIcon={<AddIcon />}
                sx={{ mt: 3, width: 250 }}
                onClick={() => {
                    handleModal(true);
                }}
            >
                Agregar Material
            </Button>

            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">UND</TableCell>
                            <TableCell align="left">Material</TableCell>
                            <TableCell align="left">CANTIDAD</TableCell>
                            <TableCell align="left">P/U</TableCell>
                            <TableCell align="left">SUBTOTAL</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart && cart.length > 0 ? (
                            cart.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell align="left">
                                        {row.unidad_nombre}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.material} {row.marca_nombre}
                                    </TableCell>
                                    <TableCell align="left">{row.cantidad}</TableCell>
                                    <TableCell align="left" width={120}>
                                        S/ {row.pu}
                                    </TableCell>
                                    <TableCell align="left" width={120}>
                                        S/ {row.subtotal}
                                    </TableCell>
                                    <TableCell align="center" width={100}>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => {
                                                handleRemoveItem(index);
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableCell
                                component="th"
                                scope="row"
                                colSpan={7}
                                sx={{ textAlign: "center", p: 6 }}
                            >
                                Selecciona materiales
                            </TableCell>
                        )}
                        <TableRow sx={{ fontWeight: "bold" }}>
                            <TableCell colSpan={4} align="right">
                                Total:
                            </TableCell>
                            <TableCell align="left">
                                S/ {total}
                            </TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <LoadingButton
                loading={load}
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mt: 4, width: 380, marginLeft: "auto" }}
                onClick={saveData}
                disabled={
                    !sitio ||
                    !provider ||
                    !revisado ||
                    !aprobado ||
                    !observation ||
                    !cart || 
                    cart.length == 0
                }
            >
                Registrar Entrada
            </LoadingButton>
        </>
    );
};
export default AddBuy;
