const fs = require('fs');
const path = require('path');

class Contenedor {
    constructor(file){
        this.file = file;
    }

    async leerFile() {
        const data = await fs.promises.readFile(this.file, 'utf-8');
        return JSON.parse(data);
    
    }

    async saveProduct (products) {
        const data = JSON.stringify(products, null, '\t')
        await fs.promises.writeFile(this.file, data)
    }

    save = async (data) =>{
        if (!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw new Error ('Datos invalidos');
        const products = await this.leerFile();
        const newProduct ={
            title : data.title,
            price : data.price,
            thumbnail : data.thumbnail,
            id : products[products.length -1].id +1
        }
        products.push(newProduct);
        await this.saveProduct(products);
        console.log(newProduct.id);
    }

    getById = async (id) =>{
        const products = await this.leerFile();
        const index = products.findIndex((aProduct)=> aProduct.id === id);
    
        if (index < 0){
            throw new Error('null');
        }
        console.log(products[index]);
    }

    getAll = async () => {
        const products = await this.leerFile();
        console.log(products);
    
    }
    
    deleteAll = async () => {
        await this.saveProduct([]);
    }

    deleteById = async (id) => {
        const products = await this.leerFile();

        const index = products.findIndex((aProduct)=> aProduct.id === id);

        if (index < 0){
            return;
        }
        products.splice(index,1);

        this.saveProduct(products);
    }
}

const archivo1 = new Contenedor ('productos.json');
async function prueba (){
    await archivo1.getById(2);
    await archivo1.getAll();
    await archivo1.deleteById(4);
    await archivo1.save({
        title : "motosierra",
        price : 15555.21,
        thumbnail : 'https://nogalpark.com/archivos/recortes/motosierra-stihl-ms170-nogalpark.jpg'
    });
    await archivo1.deleteAll();
}
prueba();








