// Translation of messages for the Snackbar - German
const messages = {
  success: {
    orders: {
      delete: 'Auftrag erfolgreich gelöscht',
      complete: 'Auftrag erfolgreich abgeschlossen',
      reactivate: 'Auftrag erfolgreich reaktiviert',
    },
    capacity: {
      save: 'Sprints erfolgreich gespeichert.',
      cancel: 'Änderungen wurden verworfen.',
      delete: 'Kapazität erfolgreich gelöscht.',
    },
    daysOff: {
      save: 'Freie Tage erfolgreich gespeichert.',
    },
    iterations: {
      planCapacity: 'Verplane Kapazität um leere Sprints zu speichern.',
      new: 'Sprint(s) erfolgreich hinzugefügt',
    },
    roles: {
      create: 'Rolle erfolgreich erstellt.',
      delete: 'Rolle erfolgreich gelöscht.',
      patch: 'Rolle erfolgreich bearbeitet.',
    },
    common: {
      save: 'Erfolgreich gespeichert.',
      delete: 'Erfolgreich gelöscht.',
      new: 'Erfolgreich erstellt.',
    },
  },
  error: {
    orders: {
      delete: 'Feher beim Löschen des Auftrags',
      complete: 'Fehler beim Abschließen des Auftrags',
      reactivate: 'Fehler beim Reaktivieren des Auftrags',
      duplicate: 'Auftrag existiert bereits. Prüfe Auftragsname oder Auftragsnummer.',
    },
    capacity: {
      save: 'Fehler beim Speichern der Sprints',
      cancel: 'Änderungen konnten nicht verworfen werden.',
      delete: 'Kapazität konnte nicht gelöscht werden.',
    },
    iterations: {
      delete: 'Es sind Kapazitäten in dem Sprint vorhanden.',
      new: 'Fehler beim Hinzufügen der Sprint(s)',
    },
    daysOff: {
      save: 'Fehler beim Speichern der freien Tage.',
      overlap: 'Freie Tage dürfen sich nicht mit anderen freien Tagen oder Urlaub überschneiden.',
    },
    roles: {
      create: 'Fehler beim Erstellen der Rolle.',
      delete: 'Fehler beim Löschen der Rolle.',
      patch: 'Fehler beim Bearbeiten der Rolle.',
    },
    generic: 'Es ist ein Fehler aufgetreten.',
    common: {
      save: 'Fehler beim Speichern.',
      new: 'Fehler beim Erstellen.',
      delete: 'Fehler beim Löschen.',
      missingValues: 'Es fehlen leider noch Angaben! Rote Umrandungen markieren Pflichtfelder.',
      notLoaded: 'Daten konnten nicht geladen werden.',
    },
  },
}

export default messages;
