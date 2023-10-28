import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddchartIcon from "@mui/icons-material/Addchart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { CardHeader } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Line from "./line";
import CircleChart from "./circle";
import ListData from "./list";

const Content = () => {
  const [dataHeader, setDataHeader] = useState([
    {
      icon: <InventoryIcon />,
      name: "Exactitud de inventario",
      value: "97%",
      color: "red",
    },
    {
      icon: <AddchartIcon />,
      name: "Nivel de Cumplimiento de pedido",
      value: "98%",
      color: "green",
    },
    {
      icon: <ShoppingBagIcon />,
      name: "Total Compras",
      value: 1750,
      color: "blue",
    },
    {
      icon: <WidgetsIcon />,
      name: "Total productos Registrados",
      value: 950,
      color: "tomato",
    },
  ]);
  return (
    <>
      <Grid container spacing={2} sx={{ pb: 20 }}>
        {dataHeader.map((row) => (
          <Grid item sm={3}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item sm={5} style={styles.centerContent}>
                    <div style={styles.iconContainer}>{row.icon}</div>
                  </Grid>
                  <Grid item sm={7}>
                    <p style={styles.textNumber}>{row.value}</p>
                    <p style={styles.textTitle}>{row.name}</p>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item sm={9}>
          <Card>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "#4F3981" }} aria-label="recipe">
                  I
                </Avatar>
              }
              title="Inventario Valorizado"
              subheader="Reporte anual"
            />
            <CardContent>
              <Line />
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={3}>
          <Card>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "#4F3981" }} aria-label="recipe">
                  T
                </Avatar>
              }
              title="Total Inversion"
              subheader="Reporte General"
            />
            <CardContent>
              <CircleChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12}>
          <ListData />
        </Grid>
      </Grid>
    </>
  );
};
export default Content;

const styles = {
  container: {
    marginTop: 50,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    background: "#5637b094",
    margin: "auto",
  },
  centerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#5637b0",
  },
  textNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textTitle: {
    fontSize: 16,
    height: 20,
  },
};
