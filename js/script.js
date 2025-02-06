// Listen for user completes order

// Dislay payment pop-up

// Process and confirm the payment

// Submit new invoice data

// Get inputs from new invoice recorded
const getClientInfo = () => {
  const clientName = document.querySelector("#client_name").value;
  const clientOrganization = document.querySelector("#client_org").value;
  const clientPhone = document.querySelector("#client_tel").value;
  const clientEmail = document.querySelector("#client_email").value;
  const clientAddress = document.querySelector("#client_address").value;
  const shipTo = document.querySelector("#ship_to").value;

  console.log(
    clientName,
    clientOrganization,
    clientPhone,
    clientEmail,
    clientAddress,
    shipTo
  );
};

// Products' class
class Products {
  constructor(productName, productId, price, currentStock, openningStock) {
    this.productName = productName;
    this.productId = productId;
    this.price = price;
    this.currentStock = currentStock;
    this.openningStock = openningStock;
  }
}

// Product instances
const products = [
  new Products("Tea White", "A001", 30, 30, 30),
  new Products("Chapati White", "A002", 30, 60, 60),
  new Products("Chapati Brown", "A003", 30, 60, 60),
];

const formValues = [];

// Populate product dropdown
const populateProductDropdown = () => {
  const productDropdown = document.getElementById("product_name_dropdown");

  // Clear existing options
  productDropdown.innerHTML = "";

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.productName;
    option.textContent = product.productName;
    productDropdown.appendChild(option);
  });
};

// Display product details
const displayProductDetails = () => {
  const productDropdown = document.getElementById("product_name_dropdown");
  const selectedProductName = productDropdown.value;
  const productDetails = document.getElementById("product_details");

  const selectedProduct = products.find(
    (product) => product.productName === selectedProductName
  );

  if (selectedProduct) {
    productDetails.innerHTML = `
      <p>${selectedProduct.productId}</p>
      <p>KES. ${selectedProduct.price}</p>
      <p>${selectedProduct.currentStock}</p>
      <p>${selectedProduct.openningStock}</p>
    `;
  } else {
    productDetails.innerHTML = `
      <p>0</p>
      <p>0</p>
      <p>0</p>
      <p>0</p>
    `;
  }
};

// Calculate total cost of item
const calculateTotalCost = () => {
  const productQuantity = Number(
    document.getElementById("product_quantity").value
  );
  const productDropdown = document.getElementById("product_name_dropdown");
  const selectedProductName = productDropdown.value;
  const totalCostElement = document.getElementById("total_cost");

  const selectedProduct = products.find(
    (product) => product.productName === selectedProductName
  );

  if (selectedProduct) {
    const totalCost = productQuantity * selectedProduct.price;

    totalCostElement.innerHTML = `
      <p>${totalCost}</p>`;
  } else {
    totalCostElement.innerHTML = `<p>0</p>`;
  }
};

// Add new item form
const addNewItem = (event) => {
  event.preventDefault();
  const currentForm = document.getElementById("add_new_item_form");
  const itemCart = document.getElementById("item_cart");

  // Store current form values
  const productDropdown = currentForm.querySelector("#product_name_dropdown");
  const productQuantity = currentForm.querySelector("#product_quantity").value;
  const totalCost = currentForm.querySelector("#total_cost").innerText;

  const selectedProduct = products.find(
    (product) => product.productName === productDropdown.value
  );

  if (selectedProduct) {
    formValues.push({
      productName: selectedProduct.productName,
      productId: selectedProduct.productId,
      price: selectedProduct.price,
      currentStock: selectedProduct.currentStock,
      openningStock: selectedProduct.openningStock,
      quantity: productQuantity,
      totalCost: totalCost,
    });
  }

  console.log(formValues);

  // Clear existing rows
  itemCart.innerHTML = "";

  // Append each item in formValues as a row
  formValues.forEach((product) => {
    const row = document.createElement("div");
    row.className = "item_row";
    row.innerHTML = `
      <p id="cart_product_name">${product.productName}</p>
      <p>${product.productId}</p>
      <p>KES. ${product.price}</p>
      <p>${product.currentStock}</p>
      <p>${product.openningStock}</p>
      <p>${product.quantity}</p>
      <p>${product.totalCost}</p>
    `;
    itemCart.appendChild(row);
  });
};

// Ensure the DOM is fully loaded before running the script
window.onload = () => {
  // Populate the dropdown when the DOM content is fully loaded
  populateProductDropdown();

  // Add event listener to display product details when an option is selected
  document
    .getElementById("product_name_dropdown")
    .addEventListener("change", displayProductDetails);

  // Add event listener to calculate total cost when quantity is entered
  document
    .getElementById("product_quantity")
    .addEventListener("input", calculateTotalCost);

  // Initialize total cost to 0
  document.getElementById("total_cost").innerHTML = `<p>0</p>`;

  // Add event listener to add new item form when the button is clicked
  document
    .getElementById("add_item_icon")
    .addEventListener("click", addNewItem);
};

// Add inputs to invoice list array, to their respective indices

// Deduct quantity of items sold from inventory array

// Add data to respective sections in the dashboard
