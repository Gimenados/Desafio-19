document.getElementById('search').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nameProduct = document.getElementById('nameProduct').value;

    try {
        const products = await searchProduct(nameProduct); // Corregido el nombre de la función
        showProducts(products); // Corregido el nombre de la función
    } catch (error) {
        showError(error);
    }
});


//Funcion para buscar producto
async function searchProduct(nameProduct) {
    const response = await fetch('https://my-json-server.typicode.com/Gimenados/Desafio-19-JSON/productos');
    if (!response.ok) {
        throw new Error('No se pudo completar lo solicitado');
    }

    const data = await response.json();
    return data.filter(product => 
        product.nombre && product.nombre.toLowerCase().includes(nameProduct.toLowerCase())
    );
}

//Funcion para crear 
function showProducts(products) {
    const searchResults = document.getElementById('searchResults'); // Corregido el nombre de la variable

    if (products.length > 0) {
        const listProducts = document.createElement('ul');
        listProducts.style.listStyle = "none";
        products.forEach(function (product) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${product.nombre} <span>Precio: ${product.precio}</span>`;
            listProducts.appendChild(listItem);
        });
        searchResults.innerHTML = '';
        searchResults.appendChild(listProducts);
    } else {
        searchResults.innerHTML = 'Este producto no ha sido encontrado';
        searchResults.style.margin = "0.8rem"
    }
}

//Funcion mensaje de error
function showError(error) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = `Error: ${error.message}`;
}
