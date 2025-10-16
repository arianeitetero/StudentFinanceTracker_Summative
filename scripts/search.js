// shereby i handle regex search and highlighting in the app

export function compileRegex(input, flags='i') {
    try {
      return input ? new RegExp(input, flags) : null;
    } catch {
      return null;
    }
  }
  
  // Highlight matches in a string using <mark> (for accessibility)
  export function highlight(text, re) {
    if (!re) return text;
    return text.replace(re, m => `<mark>${m}</mark>`);
  }