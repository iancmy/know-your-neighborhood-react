import { Input, Textarea, Tooltip } from "@material-tailwind/react";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export default function FormInput({
  variant,
  size,
  color,
  label,
  icon,
  labelProps,
  containerProps,
  className,
  shrink,
  inputRef,
  onChange,
  type,
  value,
  name,
  validation,
}) {
  const [openAlert, setOpenAlert] = useState(false);
  const [isValid, setIsValid] = useState({
    message: "",
    success: false,
    error: false,
  });

  const handleOnChange = (e) => {
    if (onChange) {
      onChange(e);
    }

    // Validation
    const { value } = e.target;

    if (validation) {
      let success = false;
      let error = false;

      validation.value = value;

      const { valid, message } = validation.validate();

      if (!valid) {
        error = true;
      } else {
        success = true;
      }

      setIsValid({ message, success, error });
    }
  };

  let element = (
    <Input
      variant={variant}
      size={size}
      color={color}
      label={`${label} ${validation?.isRequired() ? "*" : ""}`}
      error={isValid.error}
      success={isValid.success}
      icon={icon}
      labelProps={labelProps}
      containerProps={containerProps}
      className={`${className}`}
      shrink={shrink}
      inputRef={inputRef}
      onFocus={() => setOpenAlert(true)}
      onBlur={() => setOpenAlert(false)}
      onChange={handleOnChange}
      type={type}
      value={value}
      name={name}
    />
  );

  if (type === "textarea") {
    element = (
      <Textarea
        variant={variant}
        size={size}
        color={color}
        label={`${label} ${validation?.isRequired() ? "*" : ""}`}
        error={isValid.error}
        success={isValid.success}
        icon={icon}
        labelProps={labelProps}
        className={`${className}`}
        shrink={shrink}
        ref={inputRef}
        onFocus={() => setOpenAlert(true)}
        onBlur={() => setOpenAlert(false)}
        onChange={handleOnChange}
        type={type}
        value={value}
        name={name}
      />
    );
  }

  return (
    <Tooltip
      content={
        <div>
          <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
          <span>{isValid.message}</span>
        </div>
      }
      placement="bottom-start"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: -25 },
      }}
      open={openAlert}
      className={`${isValid.message ? "block" : "hidden"}`}
    >
      {element}
    </Tooltip>
  );
}
