import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Avatar, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  Autocomplete,
  Grid,
  MenuItem
} from "@mui/material";
import moment from "moment";

interface FormularioHeaderProps{
  providers: any[]
  transport: any[]
  dataHeader: (values: any) => void;
}

const FormularioHeader: React.FC<FormularioHeaderProps> = ({ providers, transport, dataHeader }) => {
  
  const [date, setDate] = useState<string>(moment().format("YYYY-MM-DD"));
  const [provider, setProvider] = useState<any | null>(null);
  const [pay, setPay] = useState<string>("1");
  const [puesto, setPuesto] = useState<string>("TIENDA");
  const [trans, setTrans] = useState<any | null>(null);
  const [revisado, setRevisado] = useState<string>("");
  const [serie, setSerie] = useState<string>("");
  const [correlativo, setCorrelativo] = useState<string>("");
  const [observation, setObservation] = useState<string>("");

  const captureData = () => {
    const data = {
      fecha: date,
      puestoEn: puesto,
      guiaRemision: null,
      serieComprobante: serie,
      correlativoComprobante: correlativo,
      observacion: observation,
      Proveedores_id: provider,
      Transportistas_id: trans,
      Monedas_id: pay
    }
    dataHeader(data)
  }

  return (
    <Card>
      <CardHeader
        title="Registrar nueva entrada"
        subheader="Ingresa una nueva orden de Compra"
        avatar={<Avatar aria-label="recipe">R</Avatar>}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              type="date"
              id="date"
              value={date}
              label="Fecha Emisión"
              variant="outlined"
              fullWidth
              onChange={(e) => {setDate(e.target.value); captureData()}}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              value={provider}
              onChange={(_, newValue) => {setProvider(newValue);captureData()}}
              options={providers}
              getOptionLabel={(option) => `${option.numDocIdentificacion} - ${option.razonSocial}`}
              renderInput={(params) => <TextField {...params} label="Proveedor" />}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="pay-label">Moneda</InputLabel>
              <Select
                labelId="pay-label"
                id="pay"
                value={pay}
                onChange={(e) => {setPay(e.target.value);captureData()}}
              >
                <MenuItem value={"1"}>SOLES</MenuItem>
                <MenuItem value={"2"}>DOLAR</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="puesto-label">Puesto en</InputLabel>
              <Select
                labelId="puesto-label"
                id="puesto"
                value={puesto}
                onChange={(e) => {setPuesto(e.target.value);captureData()}}
              >
                <MenuItem value={"TIENDA"}>TIENDA</MenuItem>
                <MenuItem value={"OBRA"}>OBRA</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              value={trans}
              onChange={(_, newValue) => {setTrans(newValue);captureData()}}
              options={transport}
              getOptionLabel={(option) => `${option.numDocIdentificacion} - ${option.razonSocial}`}
              renderInput={(params) => <TextField {...params} label="Transportista" />}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="revisado"
              value={revisado}
              onChange={(e) => {setRevisado(e.target.value);captureData()}}
              label="Remitente"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="serie"
              value={serie}
              onChange={(e) => {setSerie(e.target.value);captureData()}}
              label="Serie"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="correlativo"
              value={correlativo}
              onChange={(e) => {setCorrelativo(e.target.value);captureData()}}
              label="Correlativo"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Observaciones"
              multiline
              fullWidth
              value={observation}
              onChange={(e) => {setObservation(e.target.value);captureData()}}
              rows={2}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default FormularioHeader;
