/**
 * Module 3 note: can use a downloaded service account JSON in project root + .gitignore it.
 * Set FIREBASE_KEY_FILE=my-key.json (path relative to project root or absolute).
 *
 * Or use .env vars like Assignment 5 (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY).
 */

import fs from "fs";
import path from "path";
import {
  initializeApp,
  cert,
  getApps,
  App,
  AppOptions,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

const loadFromKeyFile = (): AppOptions | null => {
  const rel = process.env.FIREBASE_KEY_FILE;
  if (!rel || rel.trim() === "") {
    return null;
  }
  const full = path.isAbsolute(rel) ? rel : path.join(process.cwd(), rel);
  if (!fs.existsSync(full)) {
    throw new Error(`FIREBASE_KEY_FILE not found: ${full}`);
  }
  const json = JSON.parse(fs.readFileSync(full, "utf8")) as ServiceAccount;
  return {
    credential: cert(json),
  };
};

const loadFromEnv = (): AppOptions => {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
    process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error(
      "Missing Firebase config: set FIREBASE_KEY_FILE to your service account JSON, or set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env",
    );
  }

  const serviceAccount: ServiceAccount = {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };

  return {
    credential: cert(serviceAccount),
  };
};

const initializeFirebaseAdmin = (): App => {
  const existingApp: App = getApps()[0];
  if (existingApp) {
    return existingApp;
  }
  const fromFile = loadFromKeyFile();
  if (fromFile) {
    return initializeApp(fromFile);
  }
  return initializeApp(loadFromEnv());
};

const app: App = initializeFirebaseAdmin();

const db: Firestore = getFirestore(app);

const auth: Auth = getAuth(app);

export { db, auth };
