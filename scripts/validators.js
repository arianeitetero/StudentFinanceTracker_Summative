// the validation rules I used for the app using regular expressions

export const regexRules = {
    description: /^\S(?:.*\S)?$/, 
    amount: /^(0|[1-9]\d*)(\.\d{1,2})?$/, 
    date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, 
    category: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/, 
    duplicateWord: /\b(\w+)\s+\1\b/, 
  };
  
  export function validate(field, value) {
    if (field === "description") {
      if (!regexRules.description.test(value)) return "No leading/trailing spaces";
      if (regexRules.duplicateWord.test(value)) return "Duplicate words not allowed";
      return "";
    }
    if (field === "amount") {
      if (!regexRules.amount.test(value)) return "Enter a valid amount";
      return "";
    }
    if (field === "date") {
      if (!regexRules.date.test(value)) return "Date format YYYY-MM-DD";
      return "";
    }
    if (field === "category") {
      if (!regexRules.category.test(value)) return "Letters/spaces/hyphens only";
      return "";
    }
    return "";
  }