import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface MaterialTableProps {
    cart: any[],
    onPrintValues: (values: any[]) => void;
    setTotal: (values: any) => void;
}

const MaterialTable: React.FC<MaterialTableProps> = ({ cart, onPrintValues, setTotal }) => {
    
    const [total, setTotals] = useState(0);

    useEffect(() => {
        calculateTotal();
    }, [cart]);

    const handleChange = (event: any, index: number) => {
        const updatedCart = [...cart]
        updatedCart[index][event.target.name] = event.target.value
        const cantidad = parseFloat(updatedCart[index].cantidad) || 0
        const precioUnitario = parseFloat(updatedCart[index].precioUnitario) || 0
        updatedCart[index].subtotal = cantidad * precioUnitario
        calculateTotal(updatedCart)
    }

    const calculateTotal = (updatedCart?: any[]) => {
        const cartToUse = updatedCart || cart
        const newTotal = cartToUse.reduce((acc, item) => acc + (item.subtotal || 0), 0)
        setTotals(newTotal)
        setTotal(newTotal)
        handlePrintValues()
    }

    const handlePrintValues = () => {
        onPrintValues(cart);
    };

    return (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableCell align="left">Material</TableCell>
                    <TableCell align="left">Unidad</TableCell>
                    <TableCell align="left">Cantidad</TableCell>
                    <TableCell align="left">P/U</TableCell>
                    <TableCell align="left">SubTotal</TableCell>
                    <TableCell align="left"></TableCell>
                </TableHead>
                <TableBody>
                    {cart && cart.length > 0 ? (
                        cart.map((row, index) => (
                            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell align="left">{row.unidad}</TableCell>
                                <TableCell align="left">
                                    {row.material} {row.marca_nombre}
                                </TableCell>
                                <TableCell align="left" width={100}>
                                    <TextField
                                        id={`cantidad-${index}`}
                                        name="cantidad"
                                        value={row.cantidad}
                                        label="Cantidad"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(event) => handleChange(event, index)}
                                    />
                                </TableCell>
                                <TableCell align="left" width={120}>
                                    <TextField
                                        id={`precioUnitario-${index}`}
                                        name="precioUnitario"
                                        value={row.precioUnitario}
                                        label="Precio unitario"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(event) => handleChange(event, index)}
                                    />
                                </TableCell>
                                <TableCell align="left" width={120}>
                                    {row.subtotal}
                                </TableCell>
                                <TableCell align="center" width={100}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => {
                                            // Implementa la lógica de eliminación del elemento en el carrito.
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                component="th"
                                scope="row"
                                colSpan={7}
                                sx={{ textAlign: "center", p: 6 }}
                            >
                                Selecciona materiales
                            </TableCell>
                        </TableRow>
                    )}
                    <TableRow sx={{ fontWeight: "bold" }}>
                        <TableCell colSpan={4} align="right">
                            Total:
                        </TableCell>
                        <TableCell align="left">S/ {total}</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MaterialTable;
