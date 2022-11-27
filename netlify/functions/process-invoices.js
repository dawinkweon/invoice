exports.handler = async function (event, context) {
  console.log("Received request to process invoices:", event);

  console.log("Reading invoices...");
  const invoices = fetchNewInvoices();
  invoices.forEach((inv) => console.log("Processing invoice: " + inv));

  return {
    statusCode: 200,
  };
};

const fetchNewInvoices = () => {
  return [1, 2, 3];
};
