const colores = [
"Blanco","Amarillo","Celeste","Violeta","Azul","Verde","Naranja",
"Rosa","Negro","Natural","Fuccia","Verde Fluo","Amarillo fluo",
"Naranja Fluo","Violeta Fluo","Verde pastel","Violeta pastel",
"Rosa pastel","Celeste pastel"
];

function crearColores(id){
const cont = document.getElementById(id);

colores.forEach(color=>{
const div = document.createElement("div");
div.className="colorItem";

div.innerHTML=`
<span class="nombreColor">${color}</span>
<div class="contador">
<button onclick="restar(this)">-</button>
<span class="numero">0</span>
<button onclick="sumar(this)">+</button>
</div>
`;

cont.appendChild(div);
});
}

crearColores("colores400");
crearColores("colores500");

function sumar(btn){
const num = btn.parentElement.querySelector(".numero");
num.innerText = parseInt(num.innerText)+1;
}

function restar(btn){
const num = btn.parentElement.querySelector(".numero");
let val = parseInt(num.innerText);
if(val>0) num.innerText = val-1;
}

function enviarWhatsApp(){

let mensaje="🛒 PEDIDO MAYORISTA\n";
mensaje+="⚠️ 1 unidad = 1 caja\n\n";

document.querySelectorAll(".producto").forEach(prod=>{
const nombre = prod.dataset.nombre;
const tipo = prod.querySelector(".tipo").value;
const tapa = prod.querySelector(".tapa")?.value || "";

let agregado=false;

prod.querySelectorAll(".colorItem").forEach(item=>{
const cantidad = item.querySelector(".numero").innerText;

if(cantidad>0){
if(!agregado){
mensaje+=`*${nombre}*`;
if(tipo!=="Comun") mensaje+=` (${tipo})`;
if(tapa && nombre==="Vasos 400cc") mensaje+=` - ${tapa}`;
mensaje+="\n";
agregado=true;
}

const color = item.querySelector(".nombreColor").innerText;
mensaje+=`• ${cantidad} cajas ${color}\n`;
}
});

if(agregado) mensaje+="\n";
});

if(mensaje==="🛒 PEDIDO MAYORISTA\n⚠️ 1 unidad = 1 caja\n\n"){
alert("Agregá productos antes de enviar");
return;
}

// 📲 ENVIA A LOS 2 NUMEROS
const num1="5491134505374";
const num2="5491165032943";

const url1=`https://api.whatsapp.com/send?phone=${num1}&text=${encodeURIComponent(mensaje)}`;
const url2=`https://api.whatsapp.com/send?phone=${num2}&text=${encodeURIComponent(mensaje)}`;

window.open(url1,"_blank");
setTimeout(()=>{window.open(url2,"_blank");},800);
}
