export default class CreateDOM {
  create(config) {
    const elem = document.createElement(config.type);

    if (config.content) {
      elem.textContent = config.content;
    }

    if (config.classes) {
      elem.className = config.classes;
    }

    if (config.attribute) {
      elem.setAttribute(config.attribute.name, config.attribute.value);
    }

    return elem;
  }
}
