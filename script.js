const colores = [
"Blanco","Amarillo","Celeste","Violeta","Azul","Verde","Naranja",
"Rosa","Rojo","Negro","Natural","Fuccia","Verde Fluo","Amarillo fluo",
"Naranja Fluo","Violeta Fluo","Verde pastel","Violeta pastel",
"Rosa pastel","Celeste pastel"
];

let pedidoGuardado = [];

function crearColores(){

const cont = document.getElementById("coloresUnico");

colores.forEach(color=>{

const opcionesTapa = colores.map(c=>{
return `<option value="${c}" ${c===color ? "selected":""}>${c}</option>`
}).join("");

const div = document.createElement("div");
div.className="colorItem";

div.innerHTML=`

<div class="colorLinea">

<span>${color}</span>

<div class="contador">
<button onclick="restar(this)">-</button>
<span class="numero">0</span>
<button onclick="sumar(this)">+</button>
</div>

</div>

<select class="tapaColor" data-default="${color}" style="display:none">
${opcionesTapa}
</select>

`;

cont.appendChild(div);

});

}

crearColores();

function controlarModoGlitter(){

const tipo = document.querySelector(".tipo").value;

document.querySelectorAll(".tapaColor").forEach(select=>{

if(tipo==="Glitter"){

select.style.display="none";

}else{

const item = select.closest(".colorItem");
const cantidad = parseInt(item.querySelector(".numero").innerText);

if(cantidad>0) select.style.display="block";

}

});

}

function sumar(btn){

const item = btn.closest(".colorItem");

const num = item.querySelector(".numero");

num.innerText = parseInt(num.innerText)+1;

const tipo = document.querySelector(".tipo").value;

const select = item.querySelector(".tapaColor");

if(parseInt(num.innerText)>0 && tipo!=="Glitter"){
select.style.display="block";
}

}

function restar(btn){

const item = btn.closest(".colorItem");

const num = item.querySelector(".numero");

let val = parseInt(num.innerText);

if(val>0){

val--;

num.innerText=val;

if(val===0){
item.querySelector(".tapaColor").style.display="none";
}

}

}

function cambiarTapa(){

const tam = document.getElementById("tamano").value;
const tapa = document.getElementById("tapaSelect");

tapa.innerHTML="";

if(tam==="400"){

tapa.innerHTML=`
<option value="">Sin tapa</option>
<option value="Tapa lisa">Tapa lisa</option>
<option value="Tapa domo">Tapa domo</option>
<option value="Tapa pelota">Tapa pelota</option>
`;

}else{

tapa.innerHTML=`
<option value="">Sin tapa</option>
<option value="Tapa plana">Tapa plana</option>
`;

}

}

function guardarPedido(){

let bloque="";
let subtotal=0;

const tam=document.getElementById("tamano").value;
const tipo=document.querySelector(".tipo").value;
const tapa=document.getElementById("tapaSelect").value;

document.querySelectorAll(".colorItem").forEach(item=>{

const cant=parseInt(item.querySelector(".numero").innerText);

if(cant>0){

if(bloque===""){

bloque+=`Vasos ${tam}ml`;

if(tipo!=="Comun") bloque+=` (${tipo})`;

if(tapa) bloque+=` - ${tapa}`;

bloque+="\n";

}

const color=item.querySelector("span").innerText;
const tapaColor=item.querySelector(".tapaColor").value;

if(tipo==="Glitter"){

bloque+=`• ${cant} cajas tapa ${color}\n`;

}else if(tapa===""){

bloque+=`• ${cant} cajas ${color}\n`;

}else{

bloque+=`• ${cant} cajas ${color} - tapa ${tapaColor}\n`;

}

subtotal+=cant;

}

});

if(bloque===""){

mostrarModal("No agregaste nada");
return;

}

pedidoGuardado.push({
texto:bloque,
subtotal:subtotal
});

actualizarLista();
resetear();

}

function actualizarLista(){

const lista=document.getElementById("listaPedido");

lista.innerHTML="";

if(pedidoGuardado.length===0){

lista.innerText="Aún no hay productos";
return;

}

let total=0;

pedidoGuardado.forEach((p,i)=>{

total+=p.subtotal;

const div=document.createElement("div");

div.className="pedidoBox";

div.innerText=`Pedido ${i+1}\n${p.texto}\nSubtotal: ${p.subtotal} cajas`;

lista.appendChild(div);

});

const totalDiv=document.createElement("div");

totalDiv.className="total";

totalDiv.innerText=`TOTAL: ${total} cajas`;

lista.appendChild(totalDiv);

}

function resetear(){

document.querySelectorAll(".colorItem").forEach(item=>{

item.querySelector(".numero").innerText="0";

const select=item.querySelector(".tapaColor");

select.value=select.dataset.default;

select.style.display="none";

});

}

function borrarPedido(){

pedidoGuardado=[];

actualizarLista();

}

function enviarWhatsApp(){

if(pedidoGuardado.length===0){

mostrarModal("No hay pedido");
return;

}

let mensaje="PEDIDO MAYORISTA\n\n";

let total=0;

pedidoGuardado.forEach((p,i)=>{

mensaje+=`Pedido ${i+1}\n`;

mensaje+=p.texto;

mensaje+=`Subtotal: ${p.subtotal} cajas\n\n`;

total+=p.subtotal;

});

mensaje+=`TOTAL: ${total} cajas`;

window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(mensaje)}`);

}

function mostrarModal(texto){

const modal=document.getElementById("modal");

document.getElementById("modalTexto").innerText=texto;

modal.classList.add("activo");

document.getElementById("modalAceptar").onclick=()=>{
modal.classList.remove("activo");
};

document.getElementById("modalCancelar").onclick=()=>{
modal.classList.remove("activo");
};

}
