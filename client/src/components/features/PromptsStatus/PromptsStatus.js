import React from "react";

const PromptsStatus = ({ promptsAllowed, usedPrompts }) => {
  const checkStatus = (promptsAllowed, usedPrompts) => {
    if (isNaN(usedPrompts)) {
      if (promptsAllowed) return <>Podpowiedzi: dostępne</>;
      else return <>Podpowiedzi: niedostępne</>;
    } else return <>{`Wykorzystane podpowiedzi: ${usedPrompts}`}</>;
  };
  return <div>{checkStatus(promptsAllowed, usedPrompts)}</div>;
};

export default PromptsStatus;
