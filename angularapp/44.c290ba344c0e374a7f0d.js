(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{"5J7H":function(e,t,r){"use strict";r.r(t);var a=r("Valr"),d=r("DUip"),o=r("MnXN"),i=r("pW6c"),s=r("R7Hv"),n=r("EUZL"),l=r("SddC"),p=r("TYT/"),c=r("NVKa"),u=r("QJY3"),m=r("KLty"),y=r("Wjhp");function $(e,t){if(1&e){var r=p["\u0275\u0275getCurrentView"]();p["\u0275\u0275elementStart"](0,"div",57),p["\u0275\u0275elementStart"](1,"mat-slide-toggle",58),p["\u0275\u0275listener"]("toggleChange",(function(){return p["\u0275\u0275restoreView"](r),p["\u0275\u0275nextContext"]().triggerOperacionNegocio()})),p["\u0275\u0275elementStart"](2,"span",59),p["\u0275\u0275text"](3," Operaci\xf3n de tu comercio "),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](4,"label",60),p["\u0275\u0275text"](5," Activa o desactiva tu comercio para recibir o dejar de recibir pedidos "),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"]()}if(2&e){var a=p["\u0275\u0275nextContext"]();p["\u0275\u0275advance"](1),p["\u0275\u0275property"]("checked",4!=a.currentUser$.negocio.status&&5!=a.currentUser$.negocio.status)}}var f=[{path:"",component:function(){function e(e,t){this.dataService=e,this.authenticationService=t,this.heading="Estad\xedsticas de Delivery",this.subheading="Informaci\xf3n de gesti\xf3n de pedidos.",this.icon="pe-7s-plane icon-gradient bg-tempting-azure",this.param={value:"world"},this.pedidosArrayExcel$=[],this.mainArray2$=[],this.slideConfig6={className:"center",infinite:!0,slidesToShow:1,speed:500,adaptiveHeight:!0,dots:!0},this.datasets=[{label:"My First dataset",data:[65,59,80,81,46,55,38,59,80],datalabels:{display:!1}}],this.datasets2=[{label:"My First dataset",data:[46,55,59,80,81,38,65,59,80],datalabels:{display:!1}}],this.datasets3=[{label:"My First dataset",data:[65,59,80,81,55,38,59,80,46],datalabels:{display:!1}}],this.lineChartColors=[{backgroundColor:"rgba(247, 185, 36, 0.2)",borderColor:"#f7b924",borderCapStyle:"round",borderDash:[],borderWidth:4,borderDashOffset:0,borderJoinStyle:"round",pointBorderColor:"#f7b924",pointBackgroundColor:"#fff",pointHoverBorderWidth:4,pointRadius:6,pointBorderWidth:5,pointHoverRadius:8,pointHitRadius:10,pointHoverBackgroundColor:"#fff",pointHoverBorderColor:"#f7b924"}],this.lineChartColors2=[{backgroundColor:"rgba(48, 177, 255, 0.2)",borderColor:"#30b1ff",borderCapStyle:"round",borderDash:[],borderWidth:4,borderDashOffset:0,borderJoinStyle:"round",pointBorderColor:"#30b1ff",pointBackgroundColor:"#ffffff",pointHoverBorderWidth:4,pointRadius:6,pointBorderWidth:5,pointHoverRadius:8,pointHitRadius:10,pointHoverBackgroundColor:"#ffffff",pointHoverBorderColor:"#30b1ff"}],this.lineChartColors3=[{backgroundColor:"rgba(86, 196, 121, 0.2)",borderColor:"#56c479",borderCapStyle:"round",borderDash:[],borderWidth:4,borderDashOffset:0,borderJoinStyle:"round",pointBorderColor:"#56c479",pointBackgroundColor:"#fff",pointHoverBorderWidth:4,pointRadius:6,pointBorderWidth:5,pointHoverRadius:8,pointHitRadius:10,pointHoverBackgroundColor:"#fff",pointHoverBorderColor:"#56c479"}],this.options={layout:{padding:{left:0,right:8,top:20,bottom:0}},scales:{yAxes:[{ticks:{display:!1,beginAtZero:!0},gridLines:{display:!1}}],xAxes:[{ticks:{display:!1},gridLines:{display:!1}}]},legend:{display:!1},responsive:!0,maintainAspectRatio:!1},this.profitPedidos$=0,this.profitPedidosCompletados$=0,this.profitPedidosEnCurso$=0,this.profitPedidosCancelados$=0,this.clientesArray$=[],this.pedidosArray$=[],this.pedidosCompletadosArray$=[],this.pedidosEnCursoArray$=[],this.pedidosCanceladosArray$=[],this.pedidosSucursalesArray$=[],this.pedidosArrayGrafica$=[],this.pedidosArrayGrafica_Dataset$=[{label:"",data:[],datalabels:{display:!1}}],this.labels=[],this.filtros$=new l.a}return e.prototype.triggerOperacionNegocio=function(){var e=this,t=4;4!==this.currentUser$.negocio.status&&5!==this.currentUser$.negocio.status||(t=1),this.dataService.useService("actualizar_negocio_estatus",{data:{status:t},negocio:this.currentUser$.negocio}).subscribe((function(r){e.dataService.generalAlert(r),e.currentUser$.negocio.status=t,e.authenticationService.setUserNoRedirect(e.currentUser$)}),(function(t){e.dataService.generalAlert(t)}))},e.prototype.exportarXls=function(){var e=n.utils.json_to_sheet(this.pedidosArrayExcel$);n.writeFile({Sheets:{data:e},SheetNames:["data"]},"registros.xlsx")},e.prototype.groupByDates=function(e){var t=e.reduce((function(e,t){var r=t.fecha_alta.split("T")[0];return e[r]||(e[r]=[]),e[r].push(t),e}),{});return Object.keys(t).map((function(e){return{date:e,games:t[e]}}))},e.prototype.cambioFecha=function(e){console.log("cambioFecha"),console.log(e),console.log(this.filtros$),this.labels=[],this.pedidosArray$=[],this.pedidosCompletadosArray$=[],this.pedidosEnCursoArray$=[],this.pedidosCanceladosArray$=[],this.pedidosSucursalesArray$=[],this.pedidosArrayGrafica$=[],this.pedidosArrayExcel$=[],this.pedidosArrayGrafica_Dataset$[0].data=[],this.profitPedidos$=0,this.profitPedidosCompletados$=0,this.profitPedidosEnCurso$=0,this.profitPedidosCancelados$=0,this.getPedidos()},e.prototype.getClientes=function(){var e=this;this.dataService.useService("get_usuarios_clientes",{data:this.currentUser$}).subscribe((function(t){e.clientesArray$=t.data}),(function(t){e.dataService.generalAlert(t)}))},e.prototype.getPedidos=function(){var e=this;"5c4050f358209844a83c8622"===this.currentUser$.tipo_usuario_id?this.dataService.useService("get_pedidos_administracion_dashboard",{data:this.currentUser$,filtro:this.filtros$}).subscribe((function(t){e.pedidosArray$=t.data,console.log(e.pedidosArray$);for(var r=0;r<e.pedidosArray$.length;r++){4!==e.pedidosArray$[r].status&&5!==e.pedidosArray$[r].status||(e.pedidosCompletadosArray$.push(e.pedidosArray$[r]),e.profitPedidosCompletados$=e.profitPedidosCompletados$+e.pedidosArray$[r].total),1!==e.pedidosArray$[r].status&&2!==e.pedidosArray$[r].status&&3!==e.pedidosArray$[r].status||(e.pedidosEnCursoArray$.push(e.pedidosArray$[r]),e.profitPedidosEnCurso$=e.profitPedidosEnCurso$+e.pedidosArray$[r].total),15===e.pedidosArray$[r].status&&(e.pedidosCanceladosArray$.push(e.pedidosArray$[r]),e.profitPedidosCancelados$=e.profitPedidosCancelados$+e.pedidosArray$[r].total),15!=e.pedidosArray$[r].status&&(e.profitPedidos$=e.profitPedidos$+e.pedidosArray$[r].total);for(var a=!1,d=0,o=0;o<e.pedidosSucursalesArray$.length;o++)e.pedidosArray$[r].negocio._id===e.pedidosSucursalesArray$[o].negocio_id&&(a=!0,d=o);a||e.pedidosSucursalesArray$.push({negocio_id:e.pedidosArray$[r].negocio._id,nombre:e.pedidosArray$[r].negocio.nombre,total_confirmados:0,total_pendientes:0,total_cancelados:0,total_todos:0,pedidos_confirmados:[],pedidos_pendientes:[],pedidos_cancelados:[],pedidos_total:[]}),4!==e.pedidosArray$[r].status&&5!==e.pedidosArray$[r].status||(e.pedidosSucursalesArray$[d].pedidos_confirmados.push(e.pedidosArray$[r]),e.pedidosSucursalesArray$[d].total_confirmados=e.pedidosSucursalesArray$[d].total_confirmados+e.pedidosArray$[r].total),1!==e.pedidosArray$[r].status&&2!==e.pedidosArray$[r].status&&3!==e.pedidosArray$[r].status||(e.pedidosSucursalesArray$[d].pedidos_pendientes.push(e.pedidosArray$[r]),e.pedidosSucursalesArray$[d].total_pendientes=e.pedidosSucursalesArray$[d].total_pendientes+e.pedidosArray$[r].total),15===e.pedidosArray$[r].status&&(e.pedidosSucursalesArray$[d].pedidos_cancelados.push(e.pedidosArray$[r]),e.pedidosSucursalesArray$[d].total_cancelados=e.pedidosSucursalesArray$[d].total_cancelados+e.pedidosArray$[r].total),e.pedidosSucursalesArray$[d].pedidos_total.push(e.pedidosArray$[r]),e.pedidosSucursalesArray$[d].total_todos=e.pedidosSucursalesArray$[d].total_todos+e.pedidosArray$[r].total,e.pedidosArray$[r].comision=0,e.currentUser$.negocio.comision&&(e.pedidosArray$[r].comision=e.pedidosArray$[r].total*e.currentUser$.negocio.comision/100),e.pedidosArrayExcel$.push({identificador:e.pedidosArray$[r]._id,fecha_alta:e.pedidosArray$[r].fecha_alta,sucursal:e.pedidosArray$[r].negocio.nombre,cliente:e.pedidosArray$[r].usuario.nombre,forma_pago:e.pedidosArray$[r].forma_pago.descripcion,total:e.pedidosArray$[r].total?e.pedidosArray$[r].total.toFixed(2):0,comision:e.pedidosArray$[r].comision?e.pedidosArray$[r].comision.toFixed(2):0,platillos:e.pedidosArray$[r].platillos.length,estado:1===e.pedidosArray$[r].status?"Preparando pedido":2===e.pedidosArray$[r].status&&1===e.pedidosArray$[r].tipo_servicio?"Buscando tu auto":2===e.pedidosArray$[r].status&&2===e.pedidosArray$[r].tipo_servicio?"Rumbo a tu domicilio":3===e.pedidosArray$[r].status?"Pedido entregado":10===e.pedidosArray$[r].status?"Esperando confirmaci\xf3n":15===e.pedidosArray$[r].status?"Pedido cancelado":"Desconocido"})}for(e.pedidosArrayGrafica$=e.groupByDates(e.pedidosArray$),r=0;r<e.pedidosArrayGrafica$.length;r++)e.pedidosArrayGrafica_Dataset$[0].data.push(e.pedidosArrayGrafica$[r].games.length),e.labels.push(e.pedidosArrayGrafica$[r].date);console.log("Pedidos"),console.log(e.pedidosSucursalesArray$)}),(function(t){e.dataService.generalAlert(t)})):this.dataService.useService("get_pedidos_negocio_dashboard",{data:this.currentUser$,filtro:this.filtros$}).subscribe((function(t){e.pedidosArray$=t.data,console.log(e.pedidosArray$);for(var r=0;r<e.pedidosArray$.length;r++){4!==e.pedidosArray$[r].status&&5!==e.pedidosArray$[r].status||(e.pedidosCompletadosArray$.push(e.pedidosArray$[r]),e.profitPedidosCompletados$=e.profitPedidosCompletados$+e.pedidosArray$[r].total),1!==e.pedidosArray$[r].status&&2!==e.pedidosArray$[r].status&&3!==e.pedidosArray$[r].status||(e.pedidosEnCursoArray$.push(e.pedidosArray$[r]),e.profitPedidosEnCurso$=e.profitPedidosEnCurso$+e.pedidosArray$[r].total),15===e.pedidosArray$[r].status&&(e.pedidosCanceladosArray$.push(e.pedidosArray$[r]),e.profitPedidosCancelados$=e.profitPedidosCancelados$+e.pedidosArray$[r].total),15!=e.pedidosArray$[r].status&&(e.profitPedidos$=e.profitPedidos$+e.pedidosArray$[r].total);for(var a=!1,d=0,o=0;o<e.pedidosSucursalesArray$.length;o++)e.pedidosArray$[r].negocio._id===e.pedidosSucursalesArray$[o].negocio_id&&(a=!0,d=o);a||e.pedidosSucursalesArray$.push({negocio_id:e.pedidosArray$[r].negocio._id,nombre:e.pedidosArray$[r].negocio.nombre,total_confirmados:0,total_pendientes:0,total_cancelados:0,total_todos:0,pedidos_confirmados:[],pedidos_pendientes:[],pedidos_cancelados:[],pedidos_total:[]}),4!==e.pedidosArray$[r].status&&5!==e.pedidosArray$[r].status||(e.pedidosSucursalesArray$[d].pedidos_confirmados.push(e.pedidosArray$[r]),e.pedidosSucursalesArray$[d].total_confirmados=e.pedidosSucursalesArray$[d].total_confirmados+e.pedidosArray$[r].total),1!==e.pedidosArray$[r].status&&2!==e.pedidosArray$[r].status&&3!==e.pedidosArray$[r].status||(e.pedidosSucursalesArray$[d].pedidos_pendientes.push(e.pedidosArray$[r]),e.pedidosSucursalesArray$[d].total_pendientes=e.pedidosSucursalesArray$[d].total_pendientes+e.pedidosArray$[r].total),15===e.pedidosArray$[r].status&&(e.pedidosSucursalesArray$[d].pedidos_cancelados.push(e.pedidosArray$[r]),e.pedidosSucursalesArray$[d].total_cancelados=e.pedidosSucursalesArray$[d].total_cancelados+e.pedidosArray$[r].total),e.pedidosSucursalesArray$[d].pedidos_total.push(e.pedidosArray$[r]),e.pedidosSucursalesArray$[d].total_todos=e.pedidosSucursalesArray$[d].total_todos+e.pedidosArray$[r].total,e.pedidosArray$[r].comision=0,e.currentUser$.negocio.comision&&(e.pedidosArray$[r].comision=e.pedidosArray$[r].total*e.currentUser$.negocio.comision/100),e.pedidosArrayExcel$.push({identificador:e.pedidosArray$[r]._id,fecha_alta:e.pedidosArray$[r].fecha_alta,sucursal:e.pedidosArray$[r].negocio.nombre,cliente:e.pedidosArray$[r].usuario.nombre,forma_pago:e.pedidosArray$[r].forma_pago.descripcion,total:e.pedidosArray$[r].total?e.pedidosArray$[r].total.toFixed(2):0,comision:e.pedidosArray$[r].comision?e.pedidosArray$[r].comision.toFixed(2):0,platillos:e.pedidosArray$[r].platillos.length,estado:1===e.pedidosArray$[r].status?"Por confirmar":2===e.pedidosArray$[r].status?"Preparando tu pedido":3===e.pedidosArray$[r].status?"Pedido listo":4===e.pedidosArray$[r].status?"Pedido recogido":5===e.pedidosArray$[r].status?"Pedido calificado":10===e.pedidosArray$[r].status?"Por confirmar":15===e.pedidosArray$[r].status?"Pedido cancelado":"Desconocido"})}for(e.pedidosArrayGrafica$=e.groupByDates(e.pedidosArray$),r=0;r<e.pedidosArrayGrafica$.length;r++)e.pedidosArrayGrafica_Dataset$[0].data.push(e.pedidosArrayGrafica$[r].games.length),e.labels.push(e.pedidosArrayGrafica$[r].date);console.log("Pedidos"),console.log(e.pedidosSucursalesArray$)}),(function(t){e.dataService.generalAlert(t)}))},e.prototype.exportarProductosXls=function(){var e=n.utils.json_to_sheet(this.mainArray2$);n.writeFile({Sheets:{data:e},SheetNames:["data"]},"registros.xlsx")},e.prototype.getProductos=function(){var e=this;this.mainArray2$=[],this.dataService.useService("get_platillos_admin",{}).subscribe((function(t){for(var r=0;r<t.data.length;r++)e.mainArray2$.push({identificador:t.data[r]._id,fecha_alta:t.data[r].fecha_alta,nombre:t.data[r].nombre,descripcion:t.data[r].descripcion,costo:t.data[r].costo,disponible:t.data[r].disponible,categoria:t.data[r].categoria.nombre,categoria_identificador:t.data[r].categoria._id})}),(function(t){e.dataService.generalAlert(t)}))},e.prototype.ngOnInit=function(){var e=new Date;this.filtros$.de_fecha=new Date(e.getFullYear(),0,1),this.filtros$.hasta_fecha=new Date(e.getFullYear(),11,31),this.currentUser$=this.authenticationService.currentUserValue,console.log(this.currentUser$.negocio),this.getPedidos()},e.\u0275fac=function(t){return new(t||e)(p["\u0275\u0275directiveInject"](s.a),p["\u0275\u0275directiveInject"](i.a))},e.\u0275cmp=p["\u0275\u0275defineComponent"]({type:e,selectors:[["app-analytics"]],features:[p["\u0275\u0275ProvidersFeature"]([{provide:o.b,useClass:o.c}])],decls:120,vars:31,consts:[[3,"heading","subheading","icon"],["class","col-12 text-center",4,"ngIf"],[1,"mb-3"],[1,"card-header-tab","card-header",2,"border","none"],[1,"row",2,"width","100%"],[1,"col-sm-5"],[1,"mt-2",2,"font-size","12px","position","relative","width","100%","pointer-events","all","margin-bottom","5px","text-align","left"],[1,"input-group"],["placeholder","yyyy-mm-dd","name","de_fecha","ngbDatepicker","",1,"form-control",3,"ngModel","dateSelect","ngModelChange"],["d","ngbDatepicker"],[1,"input-group-append"],["type","button",1,"btn","btn-danger","calendar",3,"click"],[1,"fa","text-white","fa-calendar","pr-1","pl-1"],[1,"input-group","mb-3"],["placeholder","yyyy-mm-dd","name","hasta_fecha","ngbDatepicker","",1,"form-control",3,"ngModel","ngModelChange"],["d2","ngbDatepicker"],[1,"no-gutters","row"],[1,"col-sm-12","col-lg-12","mt-3"],[1,"card"],[1,"p-0","card-body"],[1,"p-1","slick-slider-sm","mx-auto"],[1,"widget-chart","widget-chart2","text-left","p-0"],[1,"widget-chat-wrapper-outer"],[1,"widget-chart-content","widget-chart-content-lg","pb-0"],[1,"widget-numbers"],[1,"widget-chart-flex"],[1,"text-warning"],[1,"widget-chart-wrapper","he-auto","opacity-10","m-0"],[1,"d-block"],["baseChart","",1,"chart",3,"datasets","labels","colors","options","chartType"],[1,"text-muted","text-uppercase","font-size-md","opacity-5","pl-3","pr-3","pb-1","font-weight-normal"],[1,"list-group","list-group-flush"],[1,"p-3","bg-transparent","list-group-item"],[1,"widget-content","p-0"],[1,"widget-content-outer"],[1,"widget-content-wrapper"],[1,"widget-content-left"],[1,"widget-heading"],[1,"widget-content-right"],[1,"widget-numbers","text-success"],[1,"widget-progress-wrapper"],[1,"progress-bar-sm","progress-bar-animated-alt","progress"],["role","progressbar","aria-valuenow","43","aria-valuemin","0","aria-valuemax","100",1,"progress-bar","bg-primary",2,"width","43%"],[1,"progress-sub-label"],[1,"sub-label-left"],[1,"sub-label-right"],[1,"text-center","d-block","p-3"],[1,"mt-3","btn-pill","btn-shadow","btn-wide","fsize-1","btn","btn-success","btn-lg",3,"click"],[1,"mr-2","opacity-7"],[1,"icon","icon-anim-pulse","ion-ios-analytics-outline"],[1,"mr-1"],[1,"card","mb-3"],[1,"col-md-12","col-lg-4"],[1,"bg-transparent","list-group-item"],[1,"widget-subheading"],[1,"widget-numbers","text-warning"],[1,"widget-numbers","text-danger"],[1,"col-12","text-center"],[3,"checked","toggleChange"],[2,"font-family","codigeekfont"],[2,"font-size","8px","color","#d92550"]],template:function(e,t){if(1&e){var r=p["\u0275\u0275getCurrentView"]();p["\u0275\u0275element"](0,"app-page-title",0),p["\u0275\u0275template"](1,$,6,1,"div",1),p["\u0275\u0275elementStart"](2,"div",2),p["\u0275\u0275elementStart"](3,"div",3),p["\u0275\u0275elementStart"](4,"div",4),p["\u0275\u0275elementStart"](5,"div",5),p["\u0275\u0275elementStart"](6,"label",6),p["\u0275\u0275text"](7," De fecha: "),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](8,"div",7),p["\u0275\u0275elementStart"](9,"input",8,9),p["\u0275\u0275listener"]("dateSelect",(function(){return t.cambioFecha(t.filtros$.de_fecha)}))("ngModelChange",(function(e){return t.filtros$.de_fecha=e})),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](11,"div",10),p["\u0275\u0275elementStart"](12,"button",11),p["\u0275\u0275listener"]("click",(function(){return p["\u0275\u0275restoreView"](r),p["\u0275\u0275reference"](10).toggle()})),p["\u0275\u0275element"](13,"i",12),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](14,"div",5),p["\u0275\u0275elementStart"](15,"label",6),p["\u0275\u0275text"](16," Hasta fecha: "),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](17,"div",13),p["\u0275\u0275elementStart"](18,"input",14,15),p["\u0275\u0275listener"]("ngModelChange",(function(){return t.cambioFecha(t.filtros$.hasta_fecha)}))("ngModelChange",(function(e){return t.filtros$.hasta_fecha=e})),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](20,"div",10),p["\u0275\u0275elementStart"](21,"button",11),p["\u0275\u0275listener"]("click",(function(){return p["\u0275\u0275restoreView"](r),p["\u0275\u0275reference"](19).toggle()})),p["\u0275\u0275element"](22,"i",12),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](23,"div",16),p["\u0275\u0275elementStart"](24,"div",17),p["\u0275\u0275elementStart"](25,"div",18),p["\u0275\u0275elementStart"](26,"div",19),p["\u0275\u0275elementStart"](27,"div",20),p["\u0275\u0275elementStart"](28,"div",21),p["\u0275\u0275elementStart"](29,"div",22),p["\u0275\u0275elementStart"](30,"div",23),p["\u0275\u0275elementStart"](31,"div",24),p["\u0275\u0275elementStart"](32,"div",25),p["\u0275\u0275elementStart"](33,"div"),p["\u0275\u0275elementStart"](34,"span",26),p["\u0275\u0275text"](35),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](36,"div",27),p["\u0275\u0275elementStart"](37,"div",28),p["\u0275\u0275element"](38,"canvas",29),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](39,"h6",30),p["\u0275\u0275text"](40," Pedidos "),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](41,"ul",31),p["\u0275\u0275elementStart"](42,"li",32),p["\u0275\u0275elementStart"](43,"div",33),p["\u0275\u0275elementStart"](44,"div",34),p["\u0275\u0275elementStart"](45,"div",35),p["\u0275\u0275elementStart"](46,"div",36),p["\u0275\u0275elementStart"](47,"div",37),p["\u0275\u0275text"](48," Ganancia "),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](49,"div",38),p["\u0275\u0275elementStart"](50,"div",39),p["\u0275\u0275elementStart"](51,"small"),p["\u0275\u0275text"](52,"$"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275text"](53),p["\u0275\u0275pipe"](54,"number"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](55,"div",40),p["\u0275\u0275elementStart"](56,"div",41),p["\u0275\u0275element"](57,"div",42),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](58,"div",43),p["\u0275\u0275elementStart"](59,"div",44),p["\u0275\u0275text"](60," Crecimiento "),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](61,"div",45),p["\u0275\u0275text"](62,"100%"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](63,"div",46),p["\u0275\u0275elementStart"](64,"button",47),p["\u0275\u0275listener"]("click",(function(){return t.exportarXls()})),p["\u0275\u0275elementStart"](65,"span",48),p["\u0275\u0275element"](66,"i",49),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](67,"span",50),p["\u0275\u0275text"](68," Descargar pedidos "),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](69,"div",51),p["\u0275\u0275elementStart"](70,"div",16),p["\u0275\u0275elementStart"](71,"div",52),p["\u0275\u0275elementStart"](72,"ul",31),p["\u0275\u0275elementStart"](73,"li",53),p["\u0275\u0275elementStart"](74,"div",33),p["\u0275\u0275elementStart"](75,"div",34),p["\u0275\u0275elementStart"](76,"div",35),p["\u0275\u0275elementStart"](77,"div",36),p["\u0275\u0275elementStart"](78,"div",37),p["\u0275\u0275text"](79," Pedidos completados "),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](80,"div",54),p["\u0275\u0275text"](81),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](82,"div",38),p["\u0275\u0275elementStart"](83,"div",39),p["\u0275\u0275elementStart"](84,"small"),p["\u0275\u0275text"](85,"$"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275text"](86),p["\u0275\u0275pipe"](87,"number"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](88,"li",53),p["\u0275\u0275elementStart"](89,"div",33),p["\u0275\u0275elementStart"](90,"div",34),p["\u0275\u0275elementStart"](91,"div",35),p["\u0275\u0275elementStart"](92,"div",36),p["\u0275\u0275elementStart"](93,"div",37),p["\u0275\u0275text"](94," Pedidos en curso "),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](95,"div",54),p["\u0275\u0275text"](96),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](97,"div",38),p["\u0275\u0275elementStart"](98,"div",55),p["\u0275\u0275elementStart"](99,"small"),p["\u0275\u0275text"](100,"$"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275text"](101),p["\u0275\u0275pipe"](102,"number"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](103,"div",52),p["\u0275\u0275elementStart"](104,"ul",31),p["\u0275\u0275elementStart"](105,"li",53),p["\u0275\u0275elementStart"](106,"div",33),p["\u0275\u0275elementStart"](107,"div",34),p["\u0275\u0275elementStart"](108,"div",35),p["\u0275\u0275elementStart"](109,"div",36),p["\u0275\u0275elementStart"](110,"div",37),p["\u0275\u0275text"](111," Pedidos cancelados "),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](112,"div",54),p["\u0275\u0275text"](113),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](114,"div",38),p["\u0275\u0275elementStart"](115,"div",56),p["\u0275\u0275elementStart"](116,"small"),p["\u0275\u0275text"](117,"$"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275text"](118),p["\u0275\u0275pipe"](119,"number"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"]()}2&e&&(p["\u0275\u0275property"]("heading",t.heading)("subheading",t.subheading)("icon",t.icon),p["\u0275\u0275advance"](1),p["\u0275\u0275property"]("ngIf",5!=t.currentUser$.negocio.status),p["\u0275\u0275advance"](8),p["\u0275\u0275property"]("ngModel",t.filtros$.de_fecha),p["\u0275\u0275advance"](9),p["\u0275\u0275property"]("ngModel",t.filtros$.hasta_fecha),p["\u0275\u0275advance"](17),p["\u0275\u0275textInterpolate1"](" ",t.pedidosArray$.length," "),p["\u0275\u0275advance"](3),p["\u0275\u0275property"]("datasets",t.pedidosArrayGrafica_Dataset$)("labels",t.labels)("colors",t.lineChartColors)("options",t.options)("chartType","line"),p["\u0275\u0275advance"](15),p["\u0275\u0275textInterpolate1"](" ",p["\u0275\u0275pipeBind2"](54,19,t.profitPedidos$,"1.2-2")," "),p["\u0275\u0275advance"](28),p["\u0275\u0275textInterpolate1"](" Pedidos: ",t.pedidosCompletadosArray$.length," "),p["\u0275\u0275advance"](5),p["\u0275\u0275textInterpolate1"](" ",p["\u0275\u0275pipeBind2"](87,22,t.profitPedidosCompletados$,"1.2-2")," "),p["\u0275\u0275advance"](10),p["\u0275\u0275textInterpolate1"](" Pedidos: ",t.pedidosEnCursoArray$.length," "),p["\u0275\u0275advance"](5),p["\u0275\u0275textInterpolate1"](" ",p["\u0275\u0275pipeBind2"](102,25,t.profitPedidosEnCurso$,"1.2-2")," "),p["\u0275\u0275advance"](12),p["\u0275\u0275textInterpolate1"](" Pedidos: ",t.pedidosCanceladosArray$.length," "),p["\u0275\u0275advance"](5),p["\u0275\u0275textInterpolate1"](" ",p["\u0275\u0275pipeBind2"](119,28,t.profitPedidosCancelados$,"1.2-2")," "))},directives:[c.a,a.NgIf,o.e,u.d,u.l,u.o,m.a,y.a],pipes:[a.DecimalPipe],encapsulation:2}),e}()}],g=function(){function e(){}return e.\u0275mod=p["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=p["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[d.g.forChild(f)],d.g]}),e}(),h=r("d2mR"),A=r("cbv1");r.d(t,"AnalyticsNegocioModule",(function(){return S}));var S=function(){function e(){}return e.\u0275mod=p["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=p["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[a.CommonModule,g,h.a,A.b]]}),e}()}}]);