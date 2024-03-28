# Introduction 
Template für neue Projekte.

# Getting Started
**1. Template-Repo kopieren und einrichten**
- [ ]Inhalt von Repo „OKTemplateService“ in neues Repo übertragen 
- [ ]Projekt-Ordner entsprechend dem neuen Namen umbenennen 
- [ ]Projekt-Files (csproj) entsprechend den neuen Verzeichnisnamen umbenennen 
- [ ]Projektmappenfile (sln) anpasseen an neuen Projektdateinamen und -verzeichnisse 
- [ ]API-Projektdatei mit neuer UserSecretId versehen (neue Guid generieren) 
- [ ]Wenn es sich um ein Backend (und keinen Service) handelt, DataLayer-Projekt samt Tests löschen 

**2. App-Registration (API) einrichten (pro Stage)**
- [ ]App-Registration im Azure EntraID anlegen (ClientId notieren) 
- [ ]Authentication für SPA einrichten 
- [ ]API-Permission einrichten (benötigte APIs verknüpfen) 
- [ ]API veröffentlichen einrichten (API-ID festlegen und Scopes anlegen) 
- [ ]App-Rollen konfigurieren 
- [ ]ClientSecret anlegen und im KeyVault ablegen (Secret-Name notieren) 

**3. Service-Principal anlegen**
- [ ]App-Registration im Azure EntraID für Pipeline-Zugriff erstellen (1 pro Komponente) 
- [ ]ClientSecret für Pipeline anlegen 
- [ ]Service-Principal für Ressourcengruppen von allen Stages als Contributor berechtigen 
- [ ]In DevOps ServiceConnection pro Stage anlegen mit Typ „Azure Ressource Manager” und dann “Service principal (manuell)” mit ClientId und Secret (Namen notieren) und SubscriptionId der Stage 

**4. Pipeline erstellen**
- [ ]In Bicep-Template benötigte APIs konfigurieren 
- [ ]In Bicep-Template KeyVault-Secretnamen anpassen 
- [ ]Parameter-File pro Umgebung anpassen 
- [ ]ClientId einfügen 
- [ ]Scopes für benötigte APIs hinzufügen 
- [ ]ServiceConnections in Pipeline-yaml anpassen 
- [ ]Pipeline erstellen (yaml referenzieren) 
- [ ]Pipeline starten 

**5. Frontend einrichten**
- [ ]Client und Tenant IDs und Base URL für die verschiedenen Environments anpassen ('frontend/src/env')
- [ ]Sample-Page für neue Anwendung anpassen ('frontend/src/pages/SamplePage')
- [ ]Redux-Slices für neue Anwendung erstellen und in Store einbinden ('frontend/src/redux')
- [ ]Routen für Pages der Anwendung erstellen ('frontend/src/pages')
- [ ]Port der neuen Anwendung anpassen ('frontend/vite.config.ts')
- [ ]Name der Anwendung in 'frontend/package.json' anpassen
- [ ]Dependencies installieren mit `npm i` muss im Frontend-Ordner ausgeführt werden.

**6. Frontend-Skripte**
- Frontend starten: `npm run dev`
- Frontend bauen: `npm run build:<env>`
- Frontend für Verwendung in Plattform starten: `npm run preview` (muss zuvor gebaut werden)
- Frontend testen: `npm run test`
- Test UI starten: `npm runtest:ui`
- Json-Server für BE-Mocking starten: `json-server db.json --watch --routes routes.json --port 8080`


[(Leitfaden Erstellung neuer APIs)](https://objektkultur365.sharepoint.com/:w:/r/sites/OKPlattformDeveloper/_layouts/15/Doc.aspx?sourcedoc=%7BE0D7AE5F-2E73-4154-8FCE-70F3376CF628%7D&file=Leitfaden%20Erstellung%20neuer%20APIs.docx&wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&action=default&mobileredirect=true)
