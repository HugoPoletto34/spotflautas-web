import React from "react";
import { Ipt, IptContainer, AlertText } from "./styles";
import { FaInfoCircle } from "react-icons/fa";

function Input({
  func,
  id,
  name,
  type,
  required,
  placeholder,
  alert,
  link,
  linkText,
}) {
  return (
    <>
      <IptContainer>
        <Ipt
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={func}
          required={required}
        />
        {alert ? (
          <AlertText>
            <FaInfoCircle />
            {alert}
          </AlertText>
        ) : (
          ""
        )}
        {link ? <a href={link}>{linkText}</a> : ""}
      </IptContainer>
    </>
  );
}

export default Input;
