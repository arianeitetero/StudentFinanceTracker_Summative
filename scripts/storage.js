const KEY_TXNS = "finance:txns";
const KEY_SETTINGS = "finance:settings";

// Load all transactions from localStorage (or return an empty array)
export function loadTxns() {
  return JSON.parse(localStorage.getItem(KEY_TXNS) || "[]");
}

// Save all transactions to localStorage
export function saveTxns(txns) {
  localStorage.setItem(KEY_TXNS, JSON.stringify(txns));
}

// Load app settings from localStorage (or return an empty object)
export function loadSettings() {
  return JSON.parse(localStorage.getItem(KEY_SETTINGS) || "{}");
}

// Save app settings to localStorage
export function saveSettings(settings) {
  localStorage.setItem(KEY_SETTINGS, JSON.stringify(settings));
}

// Import transactions from a JSON string (validate structure)
export function importJSON(json) {
  try {
    const arr = JSON.parse(json);
    if (!Array.isArray(arr)) throw new Error("Not an array");
    for (const o of arr) {
      if (!o.id || !o.description || !o.amount || !o.category || !o.date) throw new Error("Missing fields");
    }
    saveTxns(arr);
    return true;
  } catch {
    return false;
  }
}

// Export transactions as a JSON string
export function exportJSON() {
  return localStorage.getItem(KEY_TXNS) || "[]";
}