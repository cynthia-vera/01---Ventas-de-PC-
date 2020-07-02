const precioMaquina = (componentes) => {
    return local.precios.reduce((total, precio) => {
        if (componentes.includes(precio.componente)) {
            total += precio.precio;
        }
        return total;

    }, 0)
}
const cantidadVentasComponente = (componentes) => {
    return local.ventas.reduce((total, venta) => {
        if (venta.componentes.includes(componentes)) {
            total++;
        }
        return total;
    }, 0);
}

const obtenerVentasPorMes = (mes, anio) => {
    return local.ventas.filter((venta) => {
        return (
            venta.fecha.getMonth() == mes - 1 && venta.fecha.getFullYear() == anio
        );
    });
}

const vendedoraDelMes = (mes, anio) => {
    const ventasPorFecha = obtenerVentasPorMes(mes, anio);

    const ventasPorVendedora = ventasPorFecha.reduce(
        (vendedoras, { nombreVendedora: nombre, componentes }) => {
            if (vendedoras[nombre]) {
                vendedoras[nombre] += precioMaquina(componentes);
            } else {
                vendedoras[nombre] = precioMaquina(componentes);
            }

            return vendedoras;
        },
        {}
    );
    return mayorDeUnObjeto(ventasPorVendedora);
};

// {"ada":¨620,"grace":¨300}
const mayorDeUnObjeto = (objeto) => {
    //[620,300]
    const valores = Object.values(objeto);
    //0
    const indice = valores.indexOf(Math.max(...valores));
    // [ada,grace][0]

    return Object.keys(objeto)[indice];
};

const ventasMes = (mes, anio) =>{
    const ventasPorFecha = obtenerVentasPorMes(mes, anio);

    return ventasPorFecha.reduce((totalVentas, venta)=>{
        totalVentas += venta.componentes.reduce((totalComponentes,componente)=>{
            totalComponentes += precioMaquina(componente)
            return totalComponentes
        },0)
        return totalVentas 
    },0);
};

const obtenerTotalPorTipo = (tipo, valor)=>{
    return local.ventas.reduce((totalTipo,venta)=>{
        if(venta[tipo]===valor) {
            totalTipo += venta.componentes.reduce((totalComponentes,componente)=>{
                totalComponentes += precioMaquina(componente)
                return totalComponentes
            },0);
        }
        return totalTipo;
    },0);
}

const ventasVendedora = (nombre) => {
    return obtenerTotalPorTipo("nombreVendedora", nombre)
    
};

const componenteMasVendido = () =>{
    return local.ventas.reduce((nombreComponente, venta)=>{
        const cantidadPorComponent = venta.componentes.reduce((acumulador, componente) => {
            acumulador[componente] = cantidadVentasComponente(componente);
            return acumulador;
        }, {});

        nombreComponente = mayorDeUnObjeto(cantidadPorComponent);

        return nombreComponente;
    }, "");
};

const huboVentas = (mes, anio) => {
    const ventasPorMes = obtenerVentasPorMes(mes, anio);

    return ventasPorMes.length > 0;
};

const ventasSucursal = (sucursal)=>{
    return obtenerTotalPorTipo("sucursal", sucursal);
}

const obtenerListaPorTipo = (tipo)=>{
    return local.ventas.reduce((lista, venta)=>{
        if(!lista.includes(venta[tipo])) {
            lista.push(venta[tipo]);
        }

        return lista;
    }, [])
}

const obtenerSucursales = () => {
    return obtenerListaPorTipo("sucursal");
}

const obtenerVendedoras = () => {
    return obtenerListaPorTipo("nombreVendedora");
}

const mejorVendedora = ()=>{
    const ventasPorVendedora = local.ventas.reduce(
        (vendedoras, { nombreVendedora: nombre, componentes }) => {
            if (vendedoras[nombre]) {
                vendedoras[nombre] += precioMaquina(componentes);
            } else {
                vendedoras[nombre] = precioMaquina(componentes);
            }

            return vendedoras;
        },
        {}
    );
    return mayorDeUnObjeto(ventasPorVendedora);
}

