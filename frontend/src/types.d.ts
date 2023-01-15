declare module "*.svg" {
    const content: string;
    export default content;
}

declare module "*.png" {
    const content: string;
    export default content;
}

declare module "*.jpg" {
    const content: string;
    export default content;
}

// Vite env variables.
// Update this as needed
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BACKEND_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}