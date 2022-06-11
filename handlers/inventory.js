
let products = new Map()
let warehouses = new Map()

module.exports = {
    addProduct,
    addWareHouse,
    addStock,
    unStock,
    listProducts,
    listWareHouses,
    warehouseInfo
}

async function addProduct(productname, sku){
    sku = String(sku);
    if(products.has(sku))
    {
        return `ERROR ADDING PRODUCT PRODUCT with SKU ${sku} ALREADY EXISTS`
    }else{
        products.set(sku,productname)
    }

    return products;
}

async function addWareHouse(warehousenum,limit){
    if(isNaN(warehousenum))
    {
        return `warehouse must be a number`
    }
    if(warehouses.has(warehousenum))
    {
        return `ERROR ADDING WAREHOUSE WAREHOUSE - ${warehousenum} ALREADY EXISTS`
    }else{
        let value = {limit:limit,products:[]}
        warehouses.set(warehousenum, value)
    }
    return warehouses
}

async function addStock(sku,warehousenum,qty){
    sku = sku.replace(/^\s+|\s+$/gm,'');
    if(isNaN(warehousenum))
    {
        return `warehouse must be a number`
    }
    if(warehouses.has(warehousenum))
    {
        let value = warehouses.get(warehousenum);

        if(products.has(sku))
        {
            let product = {qty:value.limit,productname:products.get(sku), sku:sku}
            if(value.limit === undefined)
            {
                product.qty = qty
            }else if(qty < value.limit)
            {
                value.products.push(product)
            }else{
                product.qty = qty
                value.products.push(product)
            }
            value.products.push(product)
            warehouses.set(warehousenum,value)
        }

    }else{
        return `Invalid warehouse number`
    }

    return warehouses;
}

async function unStock(sku, warehousenum, qty){
    if(isNaN(warehousenum))
    {
        return `warehouse must be a number`
    }
    if(warehouses.has(warehousenum))
    {
        let value = warehouses.get(warehousenum);
        let product;
        let len = value.products.length;
        for(let i=0; i<len ;i++)
        {
            if(value.products[i].sku === sku)
            {
                product = value.products[i];
                if(product.qty < qty)
                {
                    product.qty = 0;
                }else{
                    product.qty = product.qty - qty;
                }
                break;
            }else{
                return `Do not have any products to unstock`
            }
        }
    }else{
        return `Invalid warehouse number`
    }
}

async function listProducts()
{
    let list = []
    for (const [key, value] of products) {
        let temp = [key,value];
        list.push(temp)
    }
    return list
}

async function listWareHouses()
{
    let list = []
    for (const [key, value] of warehouses) {
        list.push(key)
    }
    return list
}

async function warehouseInfo(warehousenum)
{
    if(isNaN(warehousenum))
    {
        return `warehouse must be a number`
    }

    if(warehouses.has(warehousenum))
    {
        return warehouses.get(warehousenum)
    }else{
        return `warehouse can't be found`
    }
}



