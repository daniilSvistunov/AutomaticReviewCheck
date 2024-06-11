EF Core Migration (Nuget CMD):
1. OKTemplate.API als Startprojekt in Solution festlegen
3. OKTemplate.Model in der Konsole festlegen
4. Add-Migration _MIGRATION_NAME_
5. Update-Database
6. To remove the last migration: Remove-Migration
7. Revert migration to specific migration: Update-Database LastGoodMigration

FOR SEEDING set ENV: $env:ASPNETCORE_ENVIRONMENT='Development'
