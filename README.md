# Deploy
```javascript
npm run build // Build
npm start // Run services
```

# Front
```javascript
@na7ank ➜ /workspaces/ReactForm (main) $ npm create vite@latest
Need to install the following packages:
create-vite@6.0.1
Ok to proceed? (y) y


> npx
> create-vite

✔ Project name: … front
✔ Select a framework: › React
✔ Select a variant: › JavaScript

Scaffolding project in /workspaces/ReactForm/front...

Done. Now run:

  cd front
  npm install
  npm run dev

npm notice
npm notice New major version of npm available! 10.8.2 -> 11.0.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.0.0
npm notice To update run: npm install -g npm@11.0.0
npm notice
@na7ank ➜ /workspaces/ReactForm (main) $ 
```

# Backend
```
npm init -y
mkdir backend
cd backend
touch index.js
touch database.js

npm i express
npm install mongodb dotenv cors
npm install --save-dev vite
npm install react-input-mask

Adicione esse script:
"start": "node server/index.js"
```
# Global package.json
```javascript
  "scripts": {
    "start": "npm run start-server && npm run start-client",
    "start-server": "node backend/index.js",
    "start-client": "cd showcase && npm run preview"
  },
```