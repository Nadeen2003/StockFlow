import { createServer } from "node:http";
const server = createServer(( req, res) => {
    res.end("StockFlow API is running");
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

