# Introduction

OKBuchhaltung is a SPA (single page application) to show, search and filter invoices from salesorders and to handle there specific state. 

# Getting Started

1. The usual, first run `npm install` to fetch dependencies.

2. Then you can do `npm run dev` to start the application.

If you get an authentification error that you couldn't be redirected, this may be because `npm run dev` opens `https://127.0.0.1:3000/`.
Open `https://localhost:3000` instead, and it should work.

You may need to be given some access in AzureAd goups to actually show up some data. 
If thats the case go to your local Projectleader.

# Azure Resources

- We use the `rg-okbuchhaltung-d` Azure resource group.
- We use the `okbuchhaltung-d` Azure subscription / service principal.
- Created a storage account `stokbuchhaltungd` for the development build and deploy. (`automation/pipelines/deploy.yml` writes blobs here.)

# Doku

You can find more documentation in the following link https://dev.azure.com/ok-objektkultur/OKPlattform/_wiki/wikis/OKPlattform.wiki/459/Motivation-Anforderungen
