const vorpal = require('vorpal')();
const inventory = require('./handlers/inventory')


vorpal
  .command('ADD PRODUCT <productname> <id>')
  .action(async(args) => {
        const {product, productname, id} = args
        let res = await inventory.addProduct(productname, id)
        if(!(res instanceof Map))
        {
            console.log(res);
        }
    })

vorpal
    .command('ADD WAREHOUSE <warehousename> [limit]')
    .action(async (args) => {
        const {warehouse, warehousename, limit} = args
        let res = await inventory.addWareHouse(warehousename, limit)
        if(!(res instanceof Map))
        {
            console.log(res);
        }
    });

vorpal
      .command('STOCK <sku> <warehousename> <qty>')
      .action(async(args) => {
            const {sku, warehousename, qty} = args
            let res = await inventory.addStock(sku, warehousename, qty)
            if(!(res instanceof Map))
            {
                console.log(res);
            }
        })

vorpal
    .command('UNSTOCK <sku> <warehousename> <qty>')
    .action(async(args) => {
            const {sku, warehousename, qty} = args
            let res = await inventory.unStock(sku, warehousename, qty)
            if(!(res instanceof Map))
            {
                console.log(res);
            }
        })

vorpal
    .command('LIST PRODUCTS')
    .action(async() => {
            console.log(await inventory.listProducts());
        })

vorpal
    .command('LIST WAREHOUSES')
    .action(async() => {
            console.log("WAREHOUSES \n",await inventory.listWareHouses());
        })

vorpal
    .command('LIST WAREHOUSE <warehousenum>')
    .action(async(args) => {
            const {warehousenum} = args
            console.log(await inventory.warehouseInfo(warehousenum));
        })

vorpal
  .delimiter('>')
  .show();