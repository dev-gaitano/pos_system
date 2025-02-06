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

  updateTotalItemsCost();
  updateSubtotal();
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
      <p>${product.price}</p>
      <p>${product.currentStock}</p>
      <p>${product.openningStock}</p>
      <p>${product.quantity}</p>
      <p>${product.totalCost}</p>
    `;
    itemCart.appendChild(row);
  });

  updateTotalItemsCost();
  updateSubtotal();
};

// Additional Costs' class
class AdditionalCosts {
  constructor(costName, costPrice) {
    this.costName = costName;
    this.costPrice = costPrice;
  }
}

// Additional Cost instances
const additionalCosts = [
  new AdditionalCosts("Transportation", 100),
  new AdditionalCosts("Packaging", 50),
];

// Populate Additional Cost dropdown
const populateAdditionalCostDropdown = () => {
  const additionalCostDropdown = document.getElementById(
    "additional_cost_dropdown"
  );

  // Clear existing options
  additionalCostDropdown.innerHTML = "";

  additionalCosts.forEach((cost) => {
    const option = document.createElement("option");
    option.value = cost.costName;
    option.textContent = cost.costName;
    additionalCostDropdown.appendChild(option);
  });
};

const displayCostPrice = () => {
  const additionalCostDropdown = document.getElementById(
    "additional_cost_dropdown"
  );
  const selectedCostName = additionalCostDropdown.value;
  const additionalCostPrice = document.getElementById("additional_cost_price");

  const selectedCost = additionalCosts.find(
    (cost) => cost.costName === selectedCostName
  );

  if (selectedCost) {
    additionalCostPrice.innerHTML = `
      <p>${selectedCost.costPrice}</p>
    `;
  } else {
    additionalCostPrice.innerHTML = `
      <p>0</p>
    `;
  }
};

// Calculate total cost of additional cost
const calculateTotalAdditionalCost = () => {
  const costQuantity = Number(document.getElementById("cost_quantity").value);
  const costDropdown = document.getElementById("additional_cost_dropdown");
  const selectedCostName = costDropdown.value;
  const totalCostElement = document.getElementById("total_additional_cost");

  const selectedCost = additionalCosts.find(
    (cost) => cost.costName === selectedCostName
  );

  if (selectedCost) {
    const totalAdditionalCost = costQuantity * selectedCost.costPrice;

    totalCostElement.innerHTML = `
      <p>${totalAdditionalCost}</p>`;
  } else {
    totalCostElement.innerHTML = `<p>0</p>`;
  }

  updateTotalAdditionalCosts();
  updateSubtotal();
};

// Discounts' class
class Discounts {
  constructor(discountName, discountPrice) {
    this.discountName = discountName;
    this.discountPrice = discountPrice;
  }
}

// discount instances
const discounts = [
  new Discounts("Good will", 100),
  new Discounts("Credit", 50),
];

// Populate discount dropdown
const populateDiscountDropdown = () => {
  const discountDropdown = document.getElementById("discount_dropdown");

  // Clear existing options
  discountDropdown.innerHTML = "";

  discounts.forEach((discount) => {
    const option = document.createElement("option");
    option.value = discount.discountName;
    option.textContent = discount.discountName;
    discountDropdown.appendChild(option);
  });
};

const displayDiscountPrice = () => {
  const discountDropdown = document.getElementById("discount_dropdown");
  const selectedDiscountName = discountDropdown.value;
  const discountPrice = document.getElementById("discount_price");

  const selectedDiscount = discounts.find(
    (discount) => discount.discountName === selectedDiscountName
  );

  if (selectedDiscount) {
    discountPrice.innerHTML = `
      <p>${selectedDiscount.discountPrice}</p>
    `;
  } else {
    discountPrice.innerHTML = `
      <p>0</p>
    `;
  }
};

// Calculate total cost of discount
const calculateTotalDiscount = () => {
  const discountQuantity = Number(
    document.getElementById("discount_quantity").value
  );
  const discountDropdown = document.getElementById("discount_dropdown");
  const selectedDiscountName = discountDropdown.value;
  const totalCostElement = document.getElementById("total_discount");

  const selectedDiscount = discounts.find(
    (discount) => discount.discountName === selectedDiscountName
  );

  if (selectedDiscount) {
    const totalDiscountCost = discountQuantity * selectedDiscount.discountPrice;

    totalCostElement.innerHTML = `
      <p>${totalDiscountCost}</p>`;
  } else {
    totalCostElement.innerHTML = `<p>0</p>`;
  }

  updateTotalDiscountsOffers();
  updateSubtotal();
};

// Update total item cost
const updateTotalItemsCost = () => {
  const totalItemsCostElement = document.getElementById("total_items_cost");
  const totalItemsCost = formValues.reduce(
    (total, item) => total + Number(item.totalCost),
    0
  );
  totalItemsCostElement.innerHTML = totalItemsCost;
};

// Update total additional costs
const updateTotalAdditionalCosts = () => {
  const totalAdditionalCostsElement = document.getElementById(
    "total_additional_costs"
  );
  const totalAdditionalCosts = additionalCosts.reduce(
    (total, cost) => total + cost.costPrice,
    0
  );
  totalAdditionalCostsElement.innerHTML = totalAdditionalCosts;
};

// Update total discounts/offers
const updateTotalDiscountsOffers = () => {
  const totalDiscountsOffersElement = document.getElementById(
    "total_discounts_offers"
  );
  const totalDiscountsOffers = discounts.reduce(
    (total, discount) => total + discount.discountPrice,
    0
  );
  totalDiscountsOffersElement.innerHTML = totalDiscountsOffers;
};

// Update subtotal
const updateSubtotal = () => {
  const totalItemsCost = Number(
    document.getElementById("total_items_cost").innerText
  );
  const totalAdditionalCosts = Number(
    document.getElementById("total_additional_costs").innerText
  );
  const totalDiscountsOffers = Number(
    document.getElementById("total_discounts_offers").innerText
  );
  const subtotalElement = document.getElementById("subtotal");
  const subtotal = totalItemsCost + totalAdditionalCosts - totalDiscountsOffers;
  subtotalElement.innerHTML = subtotal;
};

// Ensure the DOM is fully loaded before running the script
window.onload = () => {
  // Populate the dropdown when the DOM content is fully loaded
  populateProductDropdown();

  // Add event listener to display product details when an option is selected
  document
    .getElementById("product_name_dropdown")
    .addEventListener("change", displayProductDetails);

  document.getElementById("product_details").innerHTML = `<p>0</p>
  <p>0</p>
  <p>0</p>
  <p>0</p>`;

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

  // Populate the Additional cost dropdown when the DOM content is fully loaded
  populateAdditionalCostDropdown();

  // Add event listener to display cost price when an option is selected
  document
    .getElementById("additional_cost_dropdown")
    .addEventListener("change", displayCostPrice);

  document.getElementById("additional_cost_price").innerHTML = `<p>0</p>`;

  // Add event listener to calculate total additional cost when quantity is entered
  document
    .getElementById("cost_quantity")
    .addEventListener("input", calculateTotalAdditionalCost);

  document.getElementById("total_additional_cost").innerHTML = `<p>0</p>`;

  // Populate the Discount dropdown when the DOM content is fully loaded
  populateDiscountDropdown();

  // Add event listener to display cost price when an option is selected
  document
    .getElementById("discount_dropdown")
    .addEventListener("change", displayDiscountPrice);

  document.getElementById("discount_price").innerHTML = `<p>0</p>`;

  // Add event listener to calculate total discount cost when quantity is entered
  document
    .getElementById("discount_quantity")
    .addEventListener("input", calculateTotalDiscount);

  document.getElementById("total_discount").innerHTML = `<p>0</p>`;

  // Initialize total item cost, additional costs, discounts/offers, and subtotal to 0
  document.getElementById("total_items_cost").innerHTML = `0`;
  document.getElementById("total_additional_costs").innerHTML = `0`;
  document.getElementById("total_discounts_offers").innerHTML = `0`;
  document.getElementById("subtotal").innerHTML = `0`;
};

// Add inputs to invoice list array, to their respective indices

// Deduct quantity of items sold from inventory array

// Add data to respective sections in the dashboard
