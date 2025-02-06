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

class Products {
  constructor(productName, productId, price, currentStock, openningStock) {
    this.productName = productName;
    this.productId = productId;
    this.price = price;
    this.currentStock = currentStock;
    this.openningStock = openningStock;
  }
}

const products = [
  new Products("Tea White", "A001", 30, 30, 30),
  new Products("Chapati White", "A002", 30, 60, 60),
  new Products("Chapati Brown", "A003", 30, 60, 60),
];

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

const displayProductDetails = () => {
  const productDropdown = document.getElementById("product_name_dropdown");
  const selectedProductName = productDropdown.value;
  const productDetails = document.getElementById("product_details");

  console.log("Selected product:", selectedProductName); // Debugging log

  const selectedProduct = products.find(
    (product) => product.productName === selectedProductName
  );

  if (selectedProduct) {
    productDetails.innerHTML = `
      <p>Product ID: ${selectedProduct.productId}</p>
      <p>Price: ${selectedProduct.price}</p>
      <p>Current Stock: ${selectedProduct.currentStock}</p>
      <p>Opening Stock: ${selectedProduct.openningStock}</p>
    `;
    console.log("Product details displayed"); // Debugging log
  } else {
    productDetails.innerHTML = "";
    console.log("No product selected"); // Debugging log
  }
};

// Ensure the DOM is fully loaded before running the script
window.onload = () => {
  // Populate the dropdown when the DOM content is fully loaded
  populateProductDropdown();

  // Add event listener to display product details when an option is selected
  document
    .getElementById("product_name_dropdown")
    .addEventListener("change", displayProductDetails);
};
// Add inputs to invoice list array, to their respective indices

// Deduct quantity of items sold from inventory array

// Add data to respective sections in the dashboard
