export default class ToastProps {
  constructor({ type = "success", message = "Default message." }) {
    this.type = type;
    this.message = message;
  }
}
