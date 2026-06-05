// Ambient declaration for global CSS side-effect imports (e.g.
// `import "@/public/css/TerminalComp.css"`). Next auto-types `*.module.css`
// CSS Modules but not plain global stylesheets imported via the `@/*` alias
// under moduleResolution "bundler".
declare module "*.css";
