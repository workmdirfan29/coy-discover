import "dotenv/config";
import app from "./src/app.js";
import { seedProfiles } from "./src/data/seed.js";

const PORT = Number(process.env.PORT) || 5000;

// Insert mock profiles before accepting API requests.
seedProfiles();

app.listen(PORT, () => {
  console.log(`COY Discover API running on port ${PORT}`);
});
