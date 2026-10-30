import { createServer } from "node:http";

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
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ status: "ok" }));
        return;
    }

    if(url === "/api/products" && method === "GET"){
        res.setHeader("content-Type", "application/json");
        res.end(JSON.stringify(products));
        return;
    }

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "StockFlow API is running" }));
    
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

