require("dotenv").config();
require("reflect-metadata");
import { server } from "./server"

import { log } from "./utils/logger";

const { PORT = 3000 } = process.env;

server.listen(PORT, () => {
  log(`🚀 Application started on: ${PORT}`);
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
});
