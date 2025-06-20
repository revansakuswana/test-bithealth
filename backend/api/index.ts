import express from "express";

const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.listen(3000, () => {
  console.log("Server ready on port 3000.");
});

export default app;
