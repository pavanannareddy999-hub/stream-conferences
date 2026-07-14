import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base is "/" because the site is served from the root of a custom domain
// (streamconference.com). If you ever move back to a plain
// username.github.io/repo-name/ URL with NO custom domain, change this to
// "/repo-name/" instead — otherwise assets will 404 and the page goes blank.
export default defineConfig({
  plugins: [react()],
  base: "/",
});
