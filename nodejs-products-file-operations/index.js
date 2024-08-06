// task
// read file or products, edit product by id, add product, delete poduct by id

const f = require('fs').promises;
taskPath = './products.json';
products = [
    {id: 1, name: 'product 1', price: 10},
    {id: 2, name: 'product 2', price: 20},
    {id: 3, name: 'product 3', price: 30}
];


// Read products from file
async function readProducts() {
    const data = await f.readFile(taskPath, 'utf8');
    productsArr = JSON.parse(data);
    // console.log(productsArr);
    return productsArr;
}

// Add new product
async function addProduct(newProduct) {
    const products = await readProducts();
    products.push(newProduct);
    await f.writeFile(taskPath, JSON.stringify(products));
}

// Edit product by ID
async function editProductById(id, updatedProduct) {
    const products = await readProducts();
    const index = products.findIndex(product => product.id === id);
    products[index].name = updatedProduct.name;
    products[index].price = updatedProduct.price;
    await f.writeFile(taskPath, JSON.stringify(products));
    
}

// Delete product by ID
async function deleteProductById(id) {
    const products = await readProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    await f.writeFile(taskPath, JSON.stringify(updatedProducts));
}


async function main(){
    // save product in a file
    await f.writeFile(taskPath, JSON.stringify(products));
    console.log("initial products", await readProducts());

    // adding new product
    let newProduct = {id: 4, name: 'product 4', price: 40};
    await addProduct(newProduct)
    console.log("after adding product", await readProducts());

    // updating product by id
    const updatedProduct = { name: 'updated product 2', price: 25 };
    await editProductById(2, updatedProduct);
    console.log('after editing product:', await readProducts());

    // deleting product by id
    await deleteProductById(1);
    console.log('after deleting product:', await readProducts());

}
main();