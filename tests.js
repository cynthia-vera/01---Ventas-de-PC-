describe("ventas de pc", ()=>{
    it('precioMaquina(componentes)', ()=>{
        const componentes =["Monitor GPRS 3000", "Motherboard ASUS 1500"]
        expect(precioMaquina(componentes)).to.be.eql(320)
    }); 

    it("cantidadVentasComponente(componente)", () => {
        const venta = 2;
        expect(cantidadVentasComponente("Monitor ASC 543")).to.be.eql(venta);
    });
    
    it("vendedoraDelMes(mes, anio)",()=>{
        expect(vendedoraDelMes(1, 2019)).to.be.eql("Ada");
    });

    it("ventasMes(mes, anio)",()=>{
        expect(ventasMes(1, 2019)).to.be.eql(1250);
    });
     
    it("ventasVendedora(nombre)",()=>{
        expect(ventasVendedora("Grace")).to.be.eql(900);
    });

    it("componenteMasVendido()",()=>{
        expect(componenteMasVendido()).to.be.eql("Monitor GPRS 3000")
    });

    it("huboVentas(mes, anio)",()=>{
        expect(huboVentas(3, 2019)).to.be.eql(false);
    });

    it("ventasSucursal(sucursal)",()=>{
        expect(ventasSucursal("centro")).to.be.eql(990);
    });
})