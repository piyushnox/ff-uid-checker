const express = require("express");
const path = require("path");
const freefire = require("freefirejs");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/date/:uid", async (req, res) => {
  const uid = req.params.uid;

  if (!/^\d{6,12}$/.test(uid)) {
    return res.status(400).json({ error: "UID sirf numbers ka hona chahiye (6 se 12 digits)." });
  }

  try {
    const result = await freefire.getAccountCreationDate(uid);
    res.json({ uid, result });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: "Date nahi mil payi. UID check karo ya thodi der baad try karo." });
  }
});

app.listen(PORT, () => {
  console.log("Website chal rahi hai: http://localhost:" + PORT);
});
