# Projekt Onboarding OKEinarbeitung

## Übersicht
Das Projekt Onboarding für Mitarbeiter zielt darauf ab, einen strukturierten Einstieg für neue Teammitglieder zu gewährleisten.
Es orientiert sich an den bewährten Prinzipien unserer Architektur und dient dazu, die notwendigen Kompetenzen zu vermitteln.
Durch dieses Onboarding-Projekt sollen die neuen Mitarbeiter ein grundlegendes Verständnis für unsere Technologien entwickeln und in der Lage sein, die typischen Aufgaben unseres Teams zu bewältigen.

## Struktur
Die Projektstruktur ist an unsere Projekte angelehnt, um einen nahtlosen Übergang zwischen dem Onboarding-Projekt und den tatsächlichen Arbeitsaufgaben zu ermöglichen.
Die Vertrautheit mit dieser Struktur erleichtert den neuen Mitarbeitern den Zugang zu den Ressourcen und Informationen, die sie benötigen.

Mehr Informationen zur Struktur/Architektur im [Wiki-Architektur](https://dev.azure.com/ok-objektkultur/OKPlattform/_wiki/wikis/OKPlattform.wiki/886/Architektur)

# Aufgaben

Zur Bearbeitung der Aufgaben solltest du das Repository klonen und mit Visual Studio öffnen.
Du startest das Projekt, indem du im Browser localhost+/docs [https://localhost:5002/docs](https://localhost:5002/docs) eingibst.
Dort musst du dich auch authorisieren.
Zur Vervollständigung des Projektes soll ein eigener Branch erstellt werden, der eueren Namen beinhaltet und auf dem "main"-Branch basiert.

**DISCLAIMER:**
Das Projekt kann man von Anfang an starten.
Es sind mehrere Controller und Services im Projekt, um bisschen das drumherum zu simulieren. Die anderen Controller/Endpunkte sind nicht funktionsfähig.
Man kann sie sich jedoch anschauen. Eventuell kann man sich davon inspirierien.
Wir fokussieren uns auf die ToDo´s.
Es gibt nicht die eine richtige Lösung. Das Ergebnis muss stimmen.

Generell (nicht bei dieser Aufgabe) sollen folgende Richtlinien eingehalten werden: 
[Branches und PR-Richtlinien](https://dev.azure.com/ok-objektkultur/OKPlattform/_wiki/wikis/OKPlattform.wiki/218/Branches-und-PR-Richtlinien)


## 1.Aufgabe 

Im Grundgerüst des BusinessLayer-Projektes findet ihr die Klasse ToDoService, die das Interface IToDoService implementieren soll. 
Vervollständigt die Methoden anhand der dort stehenden Kommentare.
Denk auch daran, was passieren soll falls Fehler auftreten bzw. Objekte nicht gefunden werden.
Die Funktionen werden von unseren Controller-Endpunkten (ToDoController.cs) aufgerufen. Schau dir auch die Controller an.
Füge für die Controller auch passende Kommentare in der Summary hinzu.
Versuche die Enpunkte in Swagger aufzurufen. 

### Relevant für die Aufgabe:

[Patterns](https://dev.azure.com/ok-objektkultur/OKPlattform/_wiki/wikis/OKPlattform.wiki/881/Patterns)
[ASP.NET](https://dev.azure.com/ok-objektkultur/OKPlattform/_wiki/wikis/OKPlattform.wiki/908/ASP-.NET)
[Swagger](https://dev.azure.com/ok-objektkultur/OKPlattform/_wiki/wikis/OKPlattform.wiki/894/Swagger)
[Interfaces](https://dev.azure.com/ok-objektkultur/OKPlattform/_wiki/wikis/OKPlattform.wiki/1070/Interfaces)
[Vererbung](https://dev.azure.com/ok-objektkultur/OKPlattform/_wiki/wikis/OKPlattform.wiki/1078/Vererbung)

## 2.Aufgabe

Damit die Datenbankobjekte richtig in die Data-Transfer-Objects (DTO) konvertiert werden können (was in Aufgabe 1 bereits passieren sollte/kann), muss das Mapping angepasst werden.
Hierfür wird das Framework AutoMapper eingesetzt: [AutoMapper](https://dev.azure.com/ok-objektkultur/OKPlattform/_wiki/wikis/OKPlattform.wiki/1058/Auto-Mapper).
Das Mapping wird in MappingProfile.cs festgelegt.
Du kannst dir zur Inspiration auch andere Projekte ansehen.


## 3.Aufgabe

Für den erstellten Service müssen UnitTests erstellt werden, um die Funktionalität abzusichern. Der folgende Artikel hilft euch dabei:

[UnitTests](https://dev.azure.com/ok-objektkultur/OKPlattform/_wiki/wikis/OKPlattform.wiki/1015/Unit-Tests)

Ein Unit-Test und die Struktur drumrum wurde schon implementiert und die benötigten Test(namen) sind schon gegeben. Vervollständige die entsprechenden Tests in ToDoServiceTests.cs



## 4.Aufgabe

Erstelle nun im ToDoController einen neuen Endpunkt, der ein gewisses ToDo nach Id holt und füge die entsprechende Service-Funktion im ToDoService hinzu.

Beispielhafte Task:

```
Hintergrund:

Für die ToDo-Planung wird ein Endpunkt benötigt, der eine ToDo von der Datenbank zieht

Inhalt:

Über einen Endpunkt die ToDo Id mitschickt soll die ToDo-Aufgabe geholt werden.

```
