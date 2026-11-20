export const signupFields = [
  {
    name: "name",
    label: "Navn",
    type: "text",
    placeholder: "Dit fornavn",
    autoComplete: "given-name",
  },
  {
    name: "email",
    label: "E-mail",
    type: "email",
    placeholder: "dig@eksempel.dk",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Adgangskode",
    type: "password",
    placeholder: "Mindst 6 tegn",
    autoComplete: "new-password",
    minLength: 6,
  },
];
