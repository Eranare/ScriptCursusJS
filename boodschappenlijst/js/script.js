
document.addEventListener('DOMContentLoaded', function(){
    
    const productTableBody = document.querySelector(`#productTable tbody`);
    const grandTotalPriceElement = document.getElementById('total-price');

    
    document.getElementsByClassName("product-quantity");
    fetch('../Data/products.txt')
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n').map(line => line.trim()).filter(line => line.length >0);
       // const headers = lines[0].split(',');
        
        const productData = lines.slice(1).map(line=>{
            const values = line.split(',');
            return {
                name: values[0],
                unitPrice: parseFloat(values[1]),
                quantity:0
            };
        })
    

    function renderTable(){
        productData.forEach((data, index) =>{
            const row = document.createElement('tr');
            row.innerHTML =       `          <td class="tableCell product-name" >${data.name}</td>
            <td class="tableCell product-price">€${data.unitPrice.toFixed(2)}</td>
            <td class="tableCell"><input class="product-quantity" type="number" min="0" value="${data.quantity}"></input></td>
            <td class="tableCell product-total-price">€0.00</td> `;
            productTableBody.appendChild(row);
        });
    }
    renderTable();

    const rows = productTableBody.querySelectorAll('tbody tr');


    function updateGrandTotal(){
        let grandTotal = 0;
        products.forEach(product => {
            grandTotal += product.getProductTotalPrice();
        });
        grandTotalPriceElement.textContent= `€${grandTotal.toFixed(2)}`; 
    }
    const products = [];
    rows.forEach((row, index) => {
        const product = new Product(row, updateGrandTotal, productData[index]);
        products.push(product);
    } );
    updateGrandTotal();
    })
    .catch(error => console.error('Couldnt fetch data', error));
});



class Product {
    constructor(row, updateGrandTotalCallback, data){
        this.row= row;
        this.productNameElement = row.querySelector('.product-name');
        this.unitPriceElement = row.querySelector('.product-price');
        this.quantityInputElement = row.querySelector('.product-quantity');
        
        this.totalPriceElement = row.querySelector('.product-total-price');
        this.updateGrandTotalCallback = updateGrandTotalCallback;
        this.data=data;


        this.quantityInputElement.addEventListener("change", () => { 
            this.updateTotal();
            this.updateGrandTotalCallback();
        });
        this.updateTotal();
    }

    updateTotal(){
        const quantity = parseInt(this.quantityInputElement.value) || 0;
        const productName= this.productNameElement.textContent;

        console.log(`${productName}: ${quantity}`);
        this.data.quantity = quantity;
        const totalPrice = this.data.unitPrice * quantity;
        this.totalPriceElement.textContent = `€${totalPrice.toFixed(2)}`;
    }

    getProductTotalPrice(){
        return parseFloat(this.totalPriceElement.textContent.replace("€", ''))||0;
    }
}
