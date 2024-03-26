import common from "./de/common";
import errorPages from "./de/errorPages";
import messages from "./de/messages";
import todoList from "./de/todoList";
import types from "./de/types";

const de = {
  // common translations useable across all applications
  common: common, // common translations
  errorPages: errorPages, // error pages
  types: types, // types like 'suffix', 'prefix', 'currency
  messages: messages, // snackbar messages
  todoList: todoList,


  // application specific translations
  


  // Pilot message
  pilotWarning: {
    title: 'Achtung Pilotierung!',
    text: 'Die neue Kapa-Planung ist aktiv und befindet sich in der Pilotierung. Solltest du Funktionen der Anwendung nutzen wollen, halte Rücksprache mit dem Entwicklungsteam und prüfe stets, ob alle Angaben korrekt sind. Du kannst nach wie vor die alte Kapa-Planung in OKAbrechnung nutzen.',
  },

};

export default de;
