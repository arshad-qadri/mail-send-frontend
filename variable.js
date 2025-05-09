const environments = {
  local: "http://localhost:5000",
  production: "https://mail-send-backend.vercel.app",
};
// [local, production]
const environment = "production";

export const baseUrl = environments[environment];
