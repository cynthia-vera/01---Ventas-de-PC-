const selectorVendedoras = document.getElementById("selector-vendedora");
const selectorComponentes = document.getElementById("selector-componentes");
const selectorSucursal = document.getElementById("selector-sucursal");
const hiddenValue = document.getElementById("deleteItem");
const btnDelete = document.getElementById("borrarItem");
const botonAgregar = document.getElementById("agregar-venta");
let nuevaVenta = {
    componentes: []
};

const remove = (id) =>{
    hiddenValue.value =id
}

btnDelete.addEventListener("click",()=>{
    local = {...local,ventas: local.ventas.filter((venta)=>{
        return Number(hiddenValue.value) !== venta.id
    })}
    
    $('#eliminar-venta').modal('hide');
    crearTablaVentas();
})


const crearTablaVentas = ()=>{
    const tablaVentas = document.querySelector("#ventas tbody");
    let html = '';

    local.ventas.forEach((venta)=>{
        const precio = precioMaquina(venta.componentes);
        const fecha = `${venta.fecha.getDay()}/${venta.fecha.getMonth()}/${venta.fecha.getFullYear()}`


        html += `
            <tr>
                <td>${fecha}</td>
                <td>${venta.nombreVendedora}</td>
                <td>${venta.sucursal}</td>
                <td>${venta.componentes}</td>
                <td>${precio}</td>
                <td>
                    <a onclick="remove(${venta.id})" href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-target="#eliminar-venta">
                        <i class="material-icons" data-toggle="tooltip" title="Delete"></i>
                    </a>
                </td>
            </tr>
        `
    })

    tablaVentas.innerHTML = html;
}


const crearTablaVentasPorSucursal = ()=>{
    const tablaVentasPorSucursal = document.querySelector("#ventas-por-sucursal tbody");
    const sucursales = obtenerSucursales();
    let html = '';

    sucursales.forEach((sucursal)=>{
        const ventas = ventasSucursal(sucursal);

        html += `
            <tr>
                <td>${sucursal}</td>
                <td>${ventas}</td>
            </tr>
        `
    })

    tablaVentasPorSucursal.innerHTML = html;
}

const crearResumen = ()=>{
    const resumen = document.querySelector("#resumen");
    const componenteEstrella = componenteMasVendido();
    const vendedoraEstrella = mejorVendedora();

    resumen.innerHTML = `
        <p>
            Producto Estrella:
            <strong>${componenteEstrella}</strong>
        </p>
        <p>
            Vendedora que mas ingresos genero:
            <strong>${vendedoraEstrella}</strong>
        </p>
    `

}

selectorVendedoras.addEventListener("change",(event)=>{
    nuevaVenta.nombreVendedora = event.target.value ;
});
 
selectorComponentes.addEventListener("change",(event)=>{
    nuevaVenta.componentes.push(event.target.value);
});

selectorSucursal.addEventListener("change",(event)=>{
    nuevaVenta.sucursal = event.target.value ;
});

botonAgregar.addEventListener("click",()=>{
    nuevaVenta.fecha = new Date();
    nuevaVenta.id = local.ventas.length + 1 ;

    local.ventas.push(nuevaVenta);
    $('#nueva-venta').modal('hide');
    crearTablaVentas();

});













crearTablaVentas();
crearTablaVentasPorSucursal();
crearResumen();