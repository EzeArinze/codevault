export const HeroCodeSnippet = `import { useCallback, useState } from 'react';

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse };
}
`;

export const languageOptions = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "JSX", value: "jsx" },
  { label: "TSX", value: "TSX" },
];

export const categoryOptions = [
  { label: "Hooks", value: "hooks" },
  { label: "Utils", value: "utils" },
  { label: "Components", value: "components" },
  { label: "Services", value: "services" },
  { label: "Api's", value: "api" },
  { label: "Styles", value: "style" },
  { label: "Config", value: "config" },
  { label: "Other", value: "other" },
];
