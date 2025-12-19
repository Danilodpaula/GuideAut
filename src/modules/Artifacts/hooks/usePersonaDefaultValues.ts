import { useState } from "react";

const usePersonaDefaultValues = ({
  defaultOptions,
}: {
  defaultOptions: { en: string; pt: string }[];
}) => {
  const [defaultValues, setDefaultValues] = useState(defaultOptions);

  const filterValues = (selectedOptions: string[]) => {
    const filtered = defaultOptions.filter((o) => {
      return !selectedOptions.includes(o.en) && !selectedOptions.includes(o.pt);
    });
    setDefaultValues(filtered);
  };

  return {
    defaultValues,
    filterValues,
  };
};

export default usePersonaDefaultValues;
