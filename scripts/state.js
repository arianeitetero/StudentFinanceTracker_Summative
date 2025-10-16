// this one holds transactions and settings, and updates them
import { loadTxns, saveTxns, loadSettings, saveSettings } from "./storage.js";

export let txns = loadTxns();
export let settings = loadSettings();

export function addTxn(txn) {
  txn.id = txn.id || ("txn_" + (Date.now() + Math.floor(Math.random()*1000)));
  txn.createdAt = txn.createdAt || new Date().toISOString();
  txn.updatedAt = new Date().toISOString();
  txns.push(txn);
  saveTxns(txns);
}

export function editTxn(id, update) {
  const idx = txns.findIndex(t => t.id === id);
  if (idx !== -1) {
    txns[idx] = { ...txns[idx], ...update, updatedAt: new Date().toISOString() };
    saveTxns(txns);
  }
}

export function deleteTxn(id) {
  txns = txns.filter(t => t.id !== id);
  saveTxns(txns);
}

export function setSettings(upd) {
  settings = { ...settings, ...upd };
  saveSettings(settings);
}

export function resetTxns(newArr) {
  txns = newArr;
  saveTxns(txns);
}