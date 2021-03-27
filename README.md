# product-app

Product App

## Enviroment

### Next.js

#### Create Next-App

```bash
yarn create next-app --example with-typescript your-app-name
cd your-app-name
mkdir src
mv pages/ src/pages/
```

#### Module resolve

```javascript
// next-env.d.ts
module.exports = {
  webpack(config, _) {
    config.resolve.modules.push(path.resolve("./"));
    config.devtool = "inline-source-map";
    return config;
  },
};
```

#### Directory Structure

```bash
src
├── components
├── foundations
├── layouts
├── pages
└── styles
```

#### Pages Global Config

```bash
# If it doesn't exist...
touch src/pages/_app.tsx src/pages/_document.tsx
```
