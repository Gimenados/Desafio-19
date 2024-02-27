document.getElementById('search').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const nameProduct = document.getElementById('nameProduct').value;

    try {
        const product = await seachProduct(nameProduct);
        mostrarResultado(product);
    } catch (error) {
        mostrarError(error);
    }

});


//Funcion buscar producto
async function seachProduct(nameProduct) {
    const response = await fetch('https://github.com/Gimenados/Desafio-19-JSON/blob/main/db.json');
    if (!response.ok) {
        throw new Error ('No se pudo completar lo solicitado');
    }

    const data = await response.json();
    return data.filter(product => product.nombre.toLowerCase().includes(nameProduct.toLowerCase()));
}

//Funcion mostrar el producto  
function showsProduct(products) {
    const seachResults = document.getElementById('seachResults');

    if (products.length > 0) {
        const lisProduct = document.createElement('ul');
        products.forEach(function(product) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${product.nombre} <span>Precio: ${product.precio}</span>`;
            lisProduct.appendChild(listItem);
        });
        seachResults.innerHTML = '';
        seachResults.appendChild(lisProduct);
    } else {
        seachResults.innerHTML = 'Este producto no ha sido encontrado'
    }
}

//Funcion error 
function showError(error) {
    const seachResults = document.getElementById('seachResults');
    seachResults.innerHTML = `Error: ${error.message}`;
}