using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OKTodoListReactTS.DataLayer;
using OKTodoListReactTS.DataLayer.Entities;

namespace OKTodoListReactTS.DataLayer.Helpers
{
    public class MockDataGenerator : IMockDataGenerator
    {
        private readonly ToDoDbContext _context;

        public static readonly string ProjectWithoutData = "ProjectWithoutData";

        public static readonly IReadOnlyList<string> Content = new List<string>
            {
                "Sam Green hat nicht Geburtstag. Er war schon immer da",
                "Die Schweiz ist nur deshalb neutral, weil sie noch nicht weiß, auf welcher Seite Sam Green steht",
                "Sam Green braucht keine Fernbedienung, der Fernseher schaltet aus Angst um",
                "Sam Green schläft mit einem Kopfkissen unter seiner Waffe",
                "Wenn Sam Green puzzeln will, kauft er sich eine Tüte Paniermehl und baut die Semmeln wieder zusammen",
                "Sam Green kann Hardware downloaden",
                "Einmal wurde Sam Green auf Latein beleidigt. Seitdem gilt es als tote Sprache",
                "Sam Green war einmal in eine Messerstecherei verwickelt. Das Messer hat verloren",
                "Das Auto von Sam Green braucht kein Benzin, es fährt aus Respekt",
                "Sam Green kann ein Feuer entfachen, indem er zwei Eiswürfel aneinander reibt.",
            };

        public static readonly IReadOnlyList<Guid> teamObjectIds = new List<Guid>
            {
                Guid.Parse("13CF8D7E-CBFF-40F5-BDBC-6644FBC1F4DA"), //Pascal
                Guid.Parse("564BC730-BFD4-41E7-A43C-536D14767C09"), //Duska
                Guid.Parse("C5FCEE43-08B6-4ED7-9F62-8B939E80F8C2"), //Ricardo
                Guid.Parse("50BD1AAF-BBE4-40EA-A18F-B30F74A86587"), //Stefan
                Guid.Parse("66e4dc77-61d6-485f-a5bb-6cfb28b38504"), //Vulong
                Guid.Parse("ab5863dd-4811-4516-b2b8-741d933f5b77"), //Jannik
                Guid.Parse("d1212013-2824-4381-b912-4453695a46f0"), //Martin
                Guid.Parse("86da380b-688b-49fc-8825-1852a051f114"), //Leon
            };

        public static readonly IReadOnlyList<string> paths = new List<string>
            {
                "scopereports/","qualityreports/","projectprofile/","teamprojectsettings"
            };

        public MockDataGenerator(ToDoDbContext context)
        {
            _context = context;
        }

        /// <inheritdoc />
        public async Task GenerateDemoDataAsync(bool dropData = false)
        {
            if (dropData)
            {
                const string query = @"                   
                            DELETE FROM[dbo].[Application];
                            DELETE FROM[dbo].[Event];
                            DELETE FROM[dbo].[EventType];
                ";

                await _context.Database.ExecuteSqlRawAsync(query);
            }

            await GenerateApplicationsAsync();
            await GenerateEventTypeAsync();
        }

        private async Task GenerateApplicationsAsync()
        {
            List<Application> data = new()
            {
                new()
                {
                    AppName = "PQC"
                },

                new()
                {
                    AppName = "OKAbrechnung"
                },

                new()
                {
                    AppName = "OKZeit"
                }
            };

            _context.Application.AddRange(data);
            await _context.SaveChangesAsync();
        }

        private async Task GenerateEventTypeAsync()
        {
            List<EventType> data = new();
            var applications = await _context.Application.AsNoTracking().ToListAsync();
            data.Add(new()
            {
                EventTypeName = "PL Commitment zurück gezogen",
                ApplicationId = applications[0].Id,
            });

            data.Add(new()
            {
                EventTypeName = "PL Commitment abgegeben",
                ApplicationId = applications[0].Id,
            });

            data.Add(new()
            {
                EventTypeName = "BU Commitment zurückgezogen",
                ApplicationId = applications[0].Id,
            });

            data.Add(new()
            {
                EventTypeName = "BU Commitment abgegeben",
                ApplicationId = applications[0].Id,
            });

            data.Add(new()
            {
                EventTypeName = "Projektziel geändert und dadurch PL Commitment zurückgezogen",
                ApplicationId = applications[0].Id,
            });

            _context.EventType.AddRange(data);
            await _context.SaveChangesAsync();
        }
    }
}