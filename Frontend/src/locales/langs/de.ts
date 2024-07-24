import common from './de/common';
import errorPages from './de/errorPages';
import messages from './de/messages';
import task from './de/task';
import types from './de/types';

const de = {
  // common translations useable across all applications
  common: common, // common translations
  errorPages: errorPages, // error pages
  types: types, // types like 'suffix', 'prefix', 'currency
  messages: messages, // snackbar messages

  // application specific translations
  task,

  // Pilot message
  pilotWarning: {
    title: 'Achtung Pilotierung!',
    text: 'Die neue Kapa-Planung ist aktiv und befindet sich in der Pilotierung. Solltest du Funktionen der Anwendung nutzen wollen, halte Rücksprache mit dem Entwicklungsteam und prüfe stets, ob alle Angaben korrekt sind. Du kannst nach wie vor die alte Kapa-Planung in OKAbrechnung nutzen.',
  },
};

export default de;
