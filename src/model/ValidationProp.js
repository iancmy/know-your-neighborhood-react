export default class ValidationProp {
  #name;
  #value;
  #rules;

  constructor({ name = "", value = "" }) {
    this.#name = name;
    this.#value = value;
    this.#rules = {
      required: {
        set: false,
        message: "",
      },
      minLength: {
        set: false,
        message: "",
        length: 0,
      },
      maxLength: {
        set: false,
        message: "",
        length: 0,
      },
      pattern: {
        set: false,
        message: "",
        regex: null,
      },
      custom: [],
    };
  }

  validate(value) {
    let validateValue = value || this.value;

    if (this.#rules.required.set && validateValue === "") {
      return {
        valid: false,
        message: this.#rules.required.message,
      };
    }

    if (
      this.#rules.minLength.set &&
      validateValue?.length < this.#rules.minLength.length
    ) {
      return {
        valid: false,
        message: this.#rules.minLength.message,
      };
    }

    if (
      this.#rules.maxLength.set &&
      validateValue?.length > this.#rules.maxLength.length
    ) {
      return {
        valid: false,
        message: this.#rules.maxLength.message,
      };
    }

    if (
      this.#rules.pattern.set &&
      !this.#rules.pattern.regex.test(validateValue)
    ) {
      return {
        valid: false,
        message: this.#rules.pattern.message,
      };
    }

    for (let i = 0; i < this.#rules.custom.length; i++) {
      const rule = this.#rules.custom[i];

      if (!rule.callback(validateValue)) {
        return {
          valid: false,
          message: rule.message,
        };
      }
    }

    return {
      valid: true,
      message: "",
    };
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }

  setRequired({ message = "This field is required!" }) {
    this.#rules.required.set = true;
    this.#rules.required.message = message;
  }

  setMinLength({ length = 0, message = "This field is too short!" }) {
    this.#rules.minLength.set = true;
    this.#rules.minLength.message = message;
    this.#rules.minLength.length = length;
  }

  setMaxLength({ length = 0, message = "This field is too long!" }) {
    this.#rules.maxLength.set = true;
    this.#rules.maxLength.message = message;
    this.#rules.maxLength.length = length;
  }

  setPattern({ regex = null, message = "This field is invalid!" }) {
    this.#rules.pattern.set = true;
    this.#rules.pattern.message = message;
    this.#rules.pattern.regex = regex;
  }

  addCustomRule({ message = "", callback = null }) {
    this.#rules.custom.push({
      message,
      callback,
    });
  }

  isRequired() {
    return this.#rules.required.set;
  }

  getMinLength() {
    return this.#rules.minLength.length;
  }

  getMaxLength() {
    return this.#rules.maxLength.length;
  }

  getPattern() {
    return this.#rules.pattern.regex;
  }
}
