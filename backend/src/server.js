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

    if (url === "/api/health" && method === "GET") {
      sendJson(res, 200, { status: "ok" });
      return;
    }

    if(url === "/api/products" && method === "GET"){
      sendJson(res, 200, products);
      return;
    }

    sendJson(res, 404, { message: "Route not found" });
    
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

