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
// Add inputs to invoice list array, to their respective indices

// Deduct quantity of items sold from inventory array

// Add data to respective sections in the dashboard
