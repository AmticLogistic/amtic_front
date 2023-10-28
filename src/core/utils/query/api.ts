
// const api_external = "http://localhost:8000/api"
const api_external = `${process.env.REACT_APP_API_URL}/api`

const GetCategorias = async () => {
    return fetch(`${api_external}/almacen/listCategorias`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}
const SaveCategorias = async (data) => {
    return fetch(`${api_external}/almacen/saveCategorias`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}
const EditCategorias = async (data) => {
    return fetch(`${api_external}/almacen/editCategorias`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}
const GetMarcas = async () => {
    return fetch(`${api_external}/almacen/listMarcas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}
const SaveMarcas = async (data) => {
    return fetch(`${api_external}/almacen/saveMarcas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}
const EditMarcas = async (data) => {
    return fetch(`${api_external}/almacen/editMarcas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}
const GetMateriales = async () => {
    return fetch(`${api_external}/almacen/listMateriales`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}
const GetServicios = async () => {
    return fetch(`${api_external}/almacen/listServicios`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const SaveMateriale = async (data) => {
    return fetch(`${api_external}/almacen/saveMaterial`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const GetUtils = async () => {
    return fetch(`${api_external}/almacen/utils`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const getPersons = async () => {
    return fetch(`${api_external}/utils/getPersons`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const getProviders = async () => {
    return fetch(`${api_external}/utils/getProviders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const getTrans = async () => {
    return fetch(`${api_external}/utils/getTransport`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const SaveRequerimiento = async (data) => {
    return fetch(`${api_external}/process/saveRequerimiento`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const ListRequerimientos = async () => {
    return fetch(`${api_external}/process/listRequerimientos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const SaveOrden = async (data) => {
    return fetch(`${api_external}/process/saveOrden`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const SaveInput = async (data) => {
    return fetch(`${api_external}/process/saveInput`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const obtenerEntradas = async () => {
    return fetch(`${api_external}/process/obtenerEntradas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const getDataOrder = async (id) => {
    return fetch(`${api_external}/utils/getOrderOne/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}

const ListOrdenes = async () => {
    return fetch(`${api_external}/process/listOrden`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .catch((err) => {
            console.log(err.message);
        });
}


export default {
    GetCategorias,
    SaveCategorias,
    EditCategorias,
    GetMarcas,
    SaveMarcas,
    EditMarcas,
    GetMateriales,
    GetUtils,
    SaveMateriale,
    GetServicios,
    getPersons,
    SaveRequerimiento,
    ListRequerimientos,
    getProviders,
    SaveOrden,
    ListOrdenes,
    getTrans,
    SaveInput,
    obtenerEntradas,
    getDataOrder
}