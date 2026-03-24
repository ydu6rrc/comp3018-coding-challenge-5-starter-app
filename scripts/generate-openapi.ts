import * as fs from "fs";
import { generateSwaggerSpec } from "../src/config/swaggerOptions";

let spec = generateSwaggerSpec();

fs.writeFileSync("./openapi.json", JSON.stringify(spec, null, 2));

console.log("openapi.json generated");
