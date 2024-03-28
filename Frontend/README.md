# Introduction

OKTemplate-Mono is a template for a SPA (single page application). It can be used to create new applications. The template uses vite v5.

# Getting Started

1. The usual, first run `npm install` or `npm i` to fetch dependencies.

2. Then you can do `npm run dev` to start the application.

If you get an authentification error that you couldn't be redirected, this may be because `npm run dev` opens `https://127.0.0.1:3000/`.
Open `https://localhost:3000` instead, and it should work.

You may need to be given some access in AzureAd goups to actually show up some data. 
If thats the case go to your local Projectleader.

# Getting Started with JSON-Server

To get started with a local JSON-Server to simulate a REST-API follow these steps:

1. Run `npm i`
2. Run `npm i -g json-server@0.17.4`
   On later versions I got some problems with cors, so I used this version for now.
3. Change the Backend-Url (VITE_AZURE_BACKEND_API_URL) in `/src/env/.env.development-local` to `http://localhost:8080`
4. Run `json-server db.json --routes routes.json --port 8080`
5. Start the website with `npm run dev`
6. The website should now use the local JSON-Server

# Azure Resources

- The Azure resource group needs to be configured.
- A storage account for the development build and deployment needs to be configured


