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
Zur Vervollständigung des Projektes soll ein eigener Branch erstellt werden, der eueren Namen beinhaltet und auf dem "onboarding"-Branch basiert.

**DISCLAIMER:**
Das Projekt kann man von Anfang an starten.
Es sind mehrere Controller und Services im Projekt, um bisschen das drumherum zu simulieren. Die anderen Controller/Endpunkte sind nicht funktionsfähig.
Man kann sie sich jedoch anschauen. Eventuell kann man sich davon inspirierien lassen.
Wir fokussieren uns auf die ToDo´s.
Es gibt nicht die eine richtige Lösung. Das Ergebnis muss stimmen.

Generell (nicht bei dieser Aufgabe) sollen folgende Richtlinien eingehalten werden: 
[Branches und PR-Richtlinien](https://dev.azure.com/ok-objektkultur/OKPlattform/_wiki/wikis/OKPlattform.wiki/218/Branches-und-PR-Richtlinien)


## 1. Aufgabe (Service-Implementierung)

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

## 2. Aufgabe (Mapping)

Damit die Datenbankobjekte richtig in die Data-Transfer-Objects (DTO) konvertiert werden können (was in Aufgabe 1 bereits passieren sollte/kann), muss das Mapping angepasst werden.
Hierfür wird das Framework AutoMapper eingesetzt: [AutoMapper](https://dev.azure.com/ok-objektkultur/OKPlattform/_wiki/wikis/OKPlattform.wiki/1058/Auto-Mapper).
Das Mapping wird in MappingProfile.cs festgelegt.
Du kannst dir zur Inspiration auch andere Projekte ansehen.


## 3. Aufgabe (Unit-Testing)

Für den erstellten Service müssen UnitTests erstellt werden, um die Funktionalität abzusichern. Der folgende Artikel hilft euch dabei:

[UnitTests](https://dev.azure.com/ok-objektkultur/OKPlattform/_wiki/wikis/OKPlattform.wiki/1015/Unit-Tests)

Ein Unit-Test und die Basis-Struktur wurde schon implementiert und die einige Test(namen) sind schon gegeben. 
Versuche hier den vorhandenen Code oder wende dich an einen Kollegen, falls du nicht weiterkommst.
Anschließend vervollständige die Tests in ToDoServiceTests.cs und ergänze gerne noch weitere Tests, um deine Implementierung optimal abzusichern.
Versuche dabei jede deiner Code-Zeilen und alle möglichen Pfade abzudecken. 
Führe die Tests aus und stelle sicher, dass sie erfolgreich durchlaufen.


## 4. Aufgabe (Endpunkt ergänzen)

Erstelle nun im ToDoController einen neuen Endpunkt, der ein gewisses ToDo nach Id holt und füge die entsprechende Service-Funktion im ToDoService hinzu.

Beispielhafte Task:

```
Hintergrund:

Für die ToDo-Planung wird ein Endpunkt benötigt, der eine ToDo von der Datenbank zieht

Inhalt:

Über einen Endpunkt die ToDo Id mitschickt soll die ToDo-Aufgabe geholt werden.

```

Nach der 4. Aufgabe sollte das Projekt lauffähig sein und die Tests sollten erfolgreich durchlaufen.
Anschließend sollte der Stand mit dem Verantwortlichen besprochen werden.


## 5. Aufgabe (Feld-Erweiterung)

Als nächstes soll der Use-Case noch etwas weiter ausgebaut werden.
Zunächst soll das Modell der ToDos um das Feld Title ergänzt. Hierfür muss sowohl die Klasse ToDoEntry als auch das DTO ToDoDto erweitert werden.
Erweitere hierfür auch deine UnitTests und teste deine Endpunkte gründlich durch.

Fragestellung: Was ist eine Migration und wofür wird sie normalerweise benötigt?
Tipp: Im Wiki unter [Datenbank](https://dev.azure.com/ok-objektkultur/OKPlattform/_wiki/wikis/OKPlattform.wiki/873/Datenbank) kann dazu ein wenig nachgelesen werden, ansonsten kannst du dich auch generell zu Entity Framework Core Migrations informieren.


## 6. Aufgabe (Duplikatserkennung)

Nun muss eine Duplikatsprüfung in den ToDoService eingebaut werden.
Hierbei soll in den Add- und Update-Methoden überprüft werden, ob es bereits ein ToDo mit dem selben Titel und Fälligkeitsdatum gibt.
Falls es bereits ein ToDo mit diesen Eigenschaften gibt, soll eine aussagekräftige Exception geworfen werden.

Bevor du beginnst die Duplikatsprüfung zu implementieren, solltest du dir überlegen, wie du diese testen kannst.
Schreibe hierfür entsprechende UnitTests und führe diese aus. Das Ergebnis sollte natürlich sein, dass diese noch fehlschlagen.
Anschließend kannst du die Duplikatsprüfung implementieren und die Tests erneut ausführen. Diese sollten nun erfolgreich sein.


## 7. Aufgabe (Controller-Tests)

In der folgenden Aufgabe geht es nochmal um UnitTests, doch dieses Mal umd die Tests der ToDoController-Klasse.
Es ist hierbei ratsam, sich mit dem [Moq Framework](https://github.com/devlooped/moq) vertraut zu machen, um die Controller-Tests zu schreiben.
Ein Grundgerüst der Test-Klasse exitsiert bereits, allerdings muss das Moq-Setup und Tests für die weiteren Methoden des Controllers hinzugefügt werden.
Wie viele Test werden benötigt um den Code zu testen? Gibt es Negativtests? Tipp: kannst du velleicht die Verifizierung von Moq nutzen? (Verify)

Nach der 7. Aufgabe sollte der Stand erneut mit dem Verantwortlichen besprochen werden.
