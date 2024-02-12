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

# Build and Test
TODO: Describe and show how to build your code and run the tests. 

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)