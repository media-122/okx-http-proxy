const express = require("express");
const fetch = require("node-fetch");

const app = express();

// 🔹 OKX API کو HTTP میں Convert کرنے کے لیے Proxy
app.get("/api/okx", async (req, res) => {
    let url = "https://www.okx.com/api/v5/market/candles?" + req.url.split("?")[1];

    try {
        let response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        let data = await response.json();
        
        res.set("Access-Control-Allow-Origin", "*");
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// 🔹 Server کو HTTP پر چلانے کے لیے
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 HTTP Proxy Running on Port ${PORT}`));
