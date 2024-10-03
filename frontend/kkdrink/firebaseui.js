import { getAuth, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import { auth } from "./firebase";

import "firebaseui/dist/firebaseui.css";

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      scopes: ["https://www.googleapis.com/auth/contacts.readonly"],
      requireDisplayName: false,
    },
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
    },
  ],
  tosUrl: "/terms-of-service", // 服務條款 URL
  privacyPolicyUrl: "/privacy-policy", // 隱私政策 URL
};

const ui = new firebaseui.auth.AuthUI(auth);

export { ui, uiConfig };
