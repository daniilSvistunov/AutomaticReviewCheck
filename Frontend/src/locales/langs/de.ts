const de = {
  all: 'Alle',
  dense: 'Kompakt',
  isRequired: 'ist erforderlich',
  batchProcessing: 'Stapelverarbeitung',
  download: 'Download',
  remove: 'Entfernen',
  apply: 'Übernehmen',

  clear: 'Zurücksetzen',

  mode: {
    view: 'Anzeigen',
    edit: {
      label: 'Bearbeiten',
      active: 'In Bearbeitung',
    },
  },

  errorBoundaryDefault:
    'Etwas ist schief gelaufen und die Aktion konnte nicht abgeschlossen werden.',

  form: {
    submit: {
      action: { isDirty: 'Keine Änderung' },
    },
  },

  messages: {
    success: {
      capacity: {
        save: 'Sprints erfolgreich gespeichert.',
      },
      daysOff: {
        save: 'Freie Tage erfolgreich gespeichert.',
      },
      iterations: {
        planCapacity: 'Verplane Kapazität um leere Sprints zu speichern.',
      },
    },
    error: {
      capacity: {
        save: 'Fehler beim Speichern der Sprints',
      },
      iterations: {
        delete: 'Es sind Kapazitäten in dem Sprint vorhanden.',
      },
      daysOff: {
        save: 'Fehler beim Speichern der freien Tage.',
        overlap: 'Freie Tage dürfen sich nicht mit anderen freien Tagen oder Urlaub überschneiden.',
      },
      generic: 'Es ist ein Fehler aufgetreten.',
    },
  },

  save: {
    success: 'Erfolgreich gespeichert',
    error: 'Fehler beim Speichern',
    label: 'Speichern',
    reset: 'Zurücksetzen',
    abort: 'Abbrechen',
    newLabel: 'Erstellen',
    successNew: 'Erfolgreich erstellt',
    errorNew: 'Fehler beim Erstellen',
    errorDuplication: 'Auftrag exisiert bereits. Prüfe Auftragsname oder Auftragsnummer',
    errorSalesOpportunity: 'Es fehlen noch Angaben: ',
    missingValues: 'Es fehlen leider noch Angaben! Rote Umrandungen markieren Pflichtfelder.',
    dialog: {
      unsavedChanges: {
        title: 'Bearbeitungsmodus verlassen?',
        content: 'Es liegen ungespeicherte Änderungen vor.',
        disagree: 'Abbrechen',
        agree: 'Weiter ohne Speichern',
      },
    },
  },

  orders: {
    nav: {
      orders: 'Aufträge',
      newOrder: 'Vertragsauswahl',
      list: 'Liste',
    },
    newOrder: {
      button: 'Neuer Auftrag',
      title: 'Neuer Auftrag',
      back: 'Schritt zurück',
      selectContractType: 'Vertragsart auswählen',
      editNewOrder: 'Neuen Auftrag bearbeiten',
    },

    contractType: {
      label: 'Vertragsart',
      text: {
        support: 'Wartung',
        performance: 'Dienstleistung',
        fixedPrice: 'Festpreis',
        internal: 'Intern',
        planning: 'Planung',
        investment: 'Investment',
      },
    },
    invoicingCycle: {
      monthlyInAdvance: 'Monatlich Voraus',
      monthlyInArrears: 'Monatlich Ende',
      quarterlyInAdvance: 'Quartal Voraus',
      quarterlyMid: 'Quartal Mitte',
      quarterlyInArrears: 'Quartal Ende',
      yearly: 'Jährlich Voraus',
    },
    billingOption: {
      user: 'Mitarbeiter',
      team: 'Team',
      role: 'Rolle',
      feature: 'Feature',
    },
    unitAmountOfWork: {
      manDays: 'PT',
      quantity: 'STK',
      hours: 'Stunden',
    },
    list: {
      title: 'Auftragsliste',
      tableTabs: {
        searchPlaceholder: 'Suche',
        filter: 'Filter',
        size: 'Größe',
        export: 'Export',
        showActive: 'Nur aktive Aufträge anzeigen',
        newSalesorder: 'Neuer Auftrag',
      },
      tableHead: {
        projectNumber: 'Projektnummer',
        name: 'Auftragsname',
        company: 'Kunde',
        endUser: 'Endkunde',
        businessUnit: 'Business-Unit',
        orderType: 'Auftragsart',
        totalAmount: 'Gesamtbetrag',
        owner: 'Besitzer',
        coProjectLeader: 'Co-Besitzer',
        salesWorker: 'Vertriebsmitarbeiter',
        status: 'Status',
      },
      tableFooter: {
        selected: 'Ausgewählt',
      },
    },

    details: {
      title: 'Auftragsverwaltung',
      header: {
        volume: 'Auftragsvolumen',
        remainingVolume: 'Ausstehendes Volumen',
        planned: 'Geplant',
        billed: 'Abgerechnet',
        pending: 'Nicht abgerechnet',
        contractType: 'Auftragsart',
        travelCost: 'Reisekosten',
      },
      toolbar: {
        edit: 'Bearbeiten',
        delete: {
          label: 'Auftrag löschen',
          success: 'Auftrag erfolgreich gelöscht',
          error: 'Fehler beim Löschen des Auftrags',
        },
        complete: {
          label: 'Auftrag abschließen',
          success: 'Auftrag erfolgreich abgeschlossen',
          error: 'Fehler beim Abschließen des Auftrags',
        },
        reactivate: {
          label: 'Auftrag reaktivieren',
          success: 'Auftrag erfolgreich reaktiviert',
          error: 'Fehler beim Reaktivieren des Auftrags',
        },
        addRole: 'Rollen',
      },
      label: {
        customer: 'Kunde',
        orderDetail: 'Auftragsdetail',
        invoice: 'Rechnung',
        billing: 'Abrechnung',
      },
      tabs: {
        basicdata: 'Basisdaten',
        capacity: 'Kapazitäten',
        milestones: '{{name}}',
        roles: 'Rollen',
        supportMilestones: 'Wartungseinheiten',
      },
      content: {
        customer: {
          name: 'Kundename',
          number: 'Kundennummer',
          shortName: 'Kundenname Kurz',
          targetCustomer: 'Endkunde',
          orderNumber: 'Kundenauftragsnummer',
        },
        detail: {
          contractType: 'Vertragsart',
          team: 'Team',
          number: 'Auftragsnummer',
          projectLeader: 'Besitzer',
          coProjectLeader: 'Co-Besitzer',
          name: 'Auftragsname',
          volume: 'Gesamtbetrag',
          volumeInitial: 'Auftragseingangsbetrag',
          activityReport: 'Leistungsnachweis',
          opportunityNumber: 'Verkaufschancennummer',
          productGroup: 'Themenbereich',
        },
        invoice: {
          receiverLineOne: 'Rechnungsanschrift Z1',
          receiverLineTwo: 'Rechnungsanschrift Z2',
          receiverLineThree: 'Rechnungsanschrift Z3',
          dueDate: 'Zahlungsziel',
          tax: 'Steuer',
          additionalText: 'Interne Rechnungsinformation',
          line1: 'Adresse',
          zip: 'Postleitzahl',
          city: 'Stadt',
          country: 'Land',
          additionalReference: 'Betreffzusatz',
          adressPreview: 'Vorschau der Rechnungsanschrift',
        },
        billing: {
          billingOption: 'Abrechnungsart',
          invoicingCycle: 'Abrechnungszyklus',
          unitAmountOfWork: 'Abrechnungseinheit',
          activityReport: 'Leistungsnachweis',
          volume: 'Auftragsvolumen',
          isActivityReportRequired_required: 'Erforderlich',
          isActivityReportRequired_notRequired: 'Nicht erforderlich',
          travelAllowance: 'Reisekostenpauschale',
        },
      },

      capacities: {
        employeeTable: {
          planned: {
            header: {
              employee: 'Mitarbeiter',
              role: 'Rolle',
              unitPrice: 'Tagessatz',
              capacity: 'Kapazität',
              daysOff: 'Freie Tage',
              totalPrice: 'Gesamtumsatz',
            },
            body: {
              assignedEmployees: 'Verplante Mitarbeiter',
              vacation: 'Urlaub',
              manDaysIteration: 'PT/Sprint',
              calculatedValue: '! Berechnet: {{value}} €',
            },
          },
          unplanned: {
            title: 'Nicht verplante Mitarbeiter',
            body: {
              info: 'Werte werden für alle ausgewählten Mitarbeiter übernommen:',
              chipInfo: 'Mindestens einen Mitarbeiter auswählen um mit der Planung zu beginnen',
              tooltip: 'Mitarbeiter in OKTeams verwalten',
              noEmployees: 'Alle Mitarbeiter sind bereits für diese Iteration verplant',
            },
            toolbar: {
              addEmployees: 'Weitere Mitarbeiter planen',
              save: 'Planung übernehmen',
              cancel: 'Abbrechen',
            },
          },
        },
        workdays: 'Arbeitstage',
        sprintKpi: {
          subtitle: {
            subtitle_other: '{{count}} Arbeitstage, {{startDate}} - {{endDate}}',
            subtitle_one: '{{count}} Arbeitstag, {{startDate}}',
          },
          percentageVolume: 'Anteil von Auftragsvolumen (€)',
          sumVacation: '∑ Urlaub',
          sum: '∑',
        },
        toolbar: {
          save: 'Speichern',
          sprints: 'Sprints',
        },
        modals: {
          selectSprints: 'Sprint(s) auswählen',
          newSprint: 'Sprint(s) hinzufügen',
          plannedCapacity: 'Kapazitäten geplant',
          tabs: {
            past: 'Vergangen',
            current: 'Aktuell',
            upcoming: 'Zukünftig',
          },
          daysOff: {
            header: 'Projektfreie Tage von {{employee}}',
            sum: {
              withSum_one: '∑ {{count}} Tag',
              withSum_other: '∑ {{count}} Tage',
              noSum_one: '{{count}} Tag',
              noSum_other: '{{count}} Tage',
            },
            from: 'Von',
            to: 'Bis',
            add: 'Hinzufügen',
            vacation: {
              vacation_one: 'Urlaub am {{start, short}} | {{count}} Tag',
              vacation_other: 'Urlaub vom {{start, short}} - {{end, short}} | {{count}} Tage',
            },
          },
          newSprintModal: {
            info: 'Sprint(s) werden auf Teamebene hinzugefügt und stehen in allen verknüpften Aufträgen zur Verfügung',
            dateRange: 'Länge {{weekdays}} Tage, davon {{workdays}} Arbeitstage',
            sprintRange: 'Erzeugt {{sprintName}} mit einer Länge von {{weekdays}} Tagen',
            createSprintButton: '{{sprintAmounts}} {{sprintWord}} hinzufügen',
            createSprints: 'Erzeugt automatisch {{sprintAmounts}} {{sprintWord}} mit einer Länge von jeweils {{sprintDuration}}',
            divider: 'ODER',
          },
        },
      },
      milestones: {
        labels: {
          milestone_one: 'Meilenstein',
          milestone_other: 'Meilensteine',
          maintenancePosition_one: 'Wartungsposition',
          maintenancePosition_other: 'Wartungspositionen',
        },
        toolbar: {
          createNew: '{{name}}',
          teams: 'Gehe zu OKTeams',
          accounting: 'Buchhaltung',
        },
        list: {
          tableHead: {
            name: 'Name',
            customerOrderNumber: 'Kundenauftragsnummer',
            volume: 'Betrag',
            completedOn: 'Fertigstellungsdatum',
            dailyRateSold: 'Kalkulierter Tagessatz',
            status: 'Status',
          },
          filter: {
            all: 'Alle',
            isBilled: 'Abgerechnet',
            notBilled: 'Nicht abgerechnet',
          },
          gotoAccounting: 'Gehe zu OKBuchhaltung',
        },
        modals: {
          labels: {
            new: '{{name}} anlegen',
            edit: 'Meilenstein bearbeiten',
          },
          content: {
            textFields: {
              title: 'Titel',
              customerOrderNumber: 'Kundenauftragsnummer',
              amount: 'Betrag',
              completedOn: 'Fertigstellungsdatum',
              calculatedRate: 'Kalkulierter Tagessatz',
            },
          },
        },
        expandTable: {
          edit: '{{name}} bearbeiten',
          delete: 'Meilenstein löschen',
          teamIterationTitle: 'Sprints',
          featureTitle: 'Features',
          selectTeamIterations: 'Sprints auswählen',
          selectFeatures: 'Features auswählen',
          showPastTeamIterations: 'Alte Sprints anzeigen',
          placeholderFeature: 'Noch kein Feature ausgewählt',
          placeholderIteration: 'Noch keinen Sprint ausgewählt',
          placeholderFeatureOptions: 'Keine Features vorhanden',
          placeholderIterationOptions: 'Keine Sprints vorhanden',
          planning: 'Planung',
          booked: 'Gebucht',
          estimated: 'Schätzung',
          revenue: 'Umsatz',
        },
        state: {
          billed: 'Abgerechnet',
          partialBilling: 'Teilabgerechnet',
          open: 'Offen',
          planned: 'Geplant',
          active: 'Aktiv',
          faulty: 'Fehlerhaft',
        },
      },
      roles: {
        list: {
          tableHead: {
            role: 'Rolle',
            dailyRate: 'Tagessatz',
            quantity: 'Anzahl',
            customerOrderNumber: 'Kundenbestellnummer',
            quantityTravelAllowanc: 'Erlaubte Reisetage',
            rateTravelAllowance: 'Reisekostensatz',
          },
          row: {
            more: { edit: 'Bearbeiten', delete: 'Löschen' },
          },
        },
        toolbar: {
          create: {
            label: 'Rolle erstellen',
            success: 'Rolle erfolgreich erstellt',
            error: 'Fehler beim erstellen der Rolle',
          },
          delete: {
            label: 'Rolle löschen',
            success: 'Rolle erfolgreich gelöscht',
            error: 'Fehler beim Löschen der Rolle',
          },
          patch: {
            label: 'Rolle bearbeiten',
            success: 'Rolle erfolgreich bearbeitet',
            error: 'Fehler beim bearbeiten der Rolle',
          },
        },
        modals: {
          labels: {
            newConsultingRole: 'Rolle anlegen',
            patchConsultingRole: 'Rolle bearbeiten',
          },
          content: {
            textFields: {
              roleName: 'Rollenname',
            },
          },
        },
      },
    },

    edit: {
      title: 'Bearbeitung',
      invoice: {
        nameInvoiceRecipient: 'Name Rechnungsempfänger',
        street: 'Straße',
        location: 'Ort',
      },
      order: {
        number: 'Wird automatisch generiert',
      },
      discard: 'Verwerfen',
      save: 'Speichern',
      error: {
        required: 'Dieses Feld wird benötigt.',
        number: 'Bitte geben Sie eine gültige Zahl ein.',
        date: 'Bitte geben Sie ein gültiges Datum ein.',
        minNumber: 'Bitte geben Sie eine Zahl größer als ${min} ein.',
        maxNumber: 'Bitte geben Sie eine Zahl kleiner als ${max} ein.',
        maxString: 'Die Eingabe darf höchstens ${max} Zeichen umfassen.',
        minString: 'Die Eingabe muss mindestens ${min} Zeichen umfassen.',
      },
    },

    salesOpportunity: {
      opportunity: 'Verkaufschance',
      number: 'Nummer',
      error: 'Daten konnten nicht abgerufen werden',
      loading: 'Daten werden geladen',
      planningOrder: 'Planauftrag',
    },
  },

  enums: {
    teamIterationFilter: {
      past: 'Vergangene',
      current: 'Aktuelle',
      upcoming: 'Zukünftige',
    },
  },

  error: {
    '403': {
      title: '403',
      header: 'Keine Berechtigung',
      message:
        'Die Seite, auf die Sie zugreifen möchten, hat eingeschränkten Zugriff. Wenden Sie sich bitte an Ihren Systemadministrator.',
    },
  },
};

export default de;
