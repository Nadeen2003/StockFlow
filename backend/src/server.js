import { createServer } from "node:http";
const server = createServer(( req, res) => {
    const { url, method } = req;
    if (url === "/api/health" && method === "GET") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ status: "ok" }));
        return;
    }
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "StockFlow API is running" }));
    
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

