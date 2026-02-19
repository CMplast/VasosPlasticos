// LINK DE TU API (EL LARGO)
const API_URL = "https://script.google.com/macros/s/AKfycbyVN26C5xYgC1huaXwegzGBQd_pMCLwl6nwa2dHdflxaLHhUz8bGL-MtWosQbbw6fG_pw/exec";

let stock = {};

// cargar stock desde google sheets
async function cargarStock() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        stock = data;
        console.log("Stock cargado:", stock);
    } catch (error) {
        console.error("Error cargando stock", error);
    }
}

// sumar cajas
function cambiarCantidad(color, cambio) {
    let input = document.getElementById("cantidad-" + color);
    let valor = parseInt(input.value) || 0;

    valor += cambio;
    if (valor < 0) valor = 0;

    input.value = valor;
}

// crear lista de colores
function cargarColores() {
    const colores = [
        "Rojo","Azul","Negro","Blanco","Amarillo","Celeste","Violeta",
        "Verde","Naranja","Rosa","Natural",
        "Rosa Fluo","Verde Fluo","Amarillo Fluo","Naranja Fluo","Violeta Fluo",
        "Verde Pastel","Violeta Pastel","Rosa Pastel","Celeste Pastel"
    ];

    const contenedor = document.getElementById("colores");

    colores.forEach(color => {
        contenedor.innerHTML += `
        <div class="color-item">
            <span>${color}</span>
            <button onclick="cambiarCantidad('${color}', -1)">-</button>
            <input type="number" id="cantidad-${color}" value="0">
            <button onclick="cambiarCantidad('${color}', 1)">+</button>
        </div>
        `;
    });
}

// iniciar
cargarStock();
cargarColores();









