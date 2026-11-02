import { createServer } from "node:http";
import { sendJson } from "./utils/sendJson.js";
const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    sku: "WM-001",
    quantity: 25,
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    sku: "KB-001",
    quantity: 4,
  },
];

const server = createServer(( req, res) => {
  const { url, method } = req;
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathParts = requestUrl.pathname.split("/");
  if (url === "/api/health" && method === "GET") {
    sendJson(res, 200, { status: "ok" });
    return;
  }

  if(url === "/api/products" && method === "GET"){
    sendJson(res, 200, products);
    return;
  }

  if (
  method === "GET" &&
  pathParts[1] === "api" &&
  pathParts[2] === "products" &&
  pathParts.length === 4
) {
  const productId = Number(pathParts[3]);

  if (!Number.isInteger(productId) || productId <= 0) {
    sendJson(res, 400, { message: "Product ID must be a positive integer" });
    return;
  }

  const product = products.find((product) => product.id === productId);

  if (!product) {
    sendJson(res, 404, { message: "Product not found" });
    return;
  }

  sendJson(res, 200, product);
  return;
}

  sendJson(res, 404, { message: "Route not found" });
    
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

