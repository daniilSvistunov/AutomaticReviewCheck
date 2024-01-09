function subscribe(eventName: Events, listener: any) {
  window.addEventListener(eventName, listener);
}

function unsubscribe(eventName: Events, listener: any) {
  window.removeEventListener(eventName, listener);
}

function publish(eventName: Events, data?: any) {
  const event = new CustomEvent(eventName, {
    detail: data,
  });
  window.dispatchEvent(event);
}

export type Events = 'onChangeTheme' | 'onChangeLanguage' | 'onChangeEntity';

export { publish, subscribe, unsubscribe };
