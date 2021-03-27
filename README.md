# product-app

Next.js + TypeScript / Prisma + Serverless Framework

## Skill Stack

- FrontEnd
  - Next.js
  - React.js
  - TypeScript
  - Material-UI
- MiddleEnd
  - Prisma
  - Serverless Framework
  - AWS Lambda
  - AWS API Gateway
- BackEnd
  - AWS Aurora/MySQL
- Hosting
  - Vercel

## Framework (Next.js)

### Create Next-App

```bash
yarn create next-app --example with-typescript app
cd app
mkdir src
mv pages/ src/pages/
```

### Module resolve

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

### Directory Structure

```bash
src
├── components
├── foundations
├── layouts
├── interfaces
├── pages
└── styles
```

### Pages Global Config

```bash
# If it doesn't exist...
touch src/pages/_app.tsx src/pages/_document.tsx
```

## ORM (Prisma + AWS Aurora/MySQL)

### Install

```bash
yarn add @prisma/client prisma
npx prisma init
npx prisma generate
npx prisma migrate dev --name init
```

## API (Serverless Framework + AWS Lambda)

test
