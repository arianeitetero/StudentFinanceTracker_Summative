import { txns, settings, addTxn, editTxn, deleteTxn, setSettings, resetTxns } from "./state.js";
import { validate } from "./validators.js";
import { compileRegex, highlight } from "./search.js";
import { importJSON, exportJSON } from "./storage.js";

// All DOM access and event logic wrapped inside DOMContentLoaded for reliability
document.addEventListener("DOMContentLoaded", () => {
  // Get all elements using DOM
  const recordsTable = document.getElementById("recordsTable").querySelector("tbody");
  const cardsDiv = document.getElementById("cards");
  const form = document.getElementById("txnForm");
  const errDesc = document.getElementById("errDesc");
  const errAmt = document.getElementById("errAmt");
  const errCat = document.getElementById("errCat");
  const errDate = document.getElementById("errDate");
  const cancelEditBtn = document.getElementById("cancelEdit");
  const dashboardStats = document.getElementById("stats");
  const capStatus = document.getElementById("capStatus");
  const trendText = document.getElementById("trendText");
  const searchInput = document.getElementById("search");
  const caseInsensitiveCheckbox = document.getElementById("caseInsensitive");
  const settingsForm = document.getElementById("settingsForm");

  // Table rendering (desktop)
  function renderTable(records, re) {
    recordsTable.innerHTML = "";
    records.forEach(t => {
      let tr = document.createElement("tr");
      tr.tabIndex = 0;
      tr.innerHTML = `
        <td>${t.date}</td>
        <td>${re ? highlight(t.description, re) : t.description}</td>
        <td>${t.amount.toFixed(2)}</td>
        <td>${t.category}</td>
        <td>
          <button data-edit="${t.id}" aria-label="Edit ${t.description}">Edit</button>
          <button data-del="${t.id}" aria-label="Delete ${t.description}">Delete</button>
        </td>
      `;
      recordsTable.appendChild(tr);
    });
  }

  // Card rendering (mobile)
  function renderCards(records, re) {
    cardsDiv.innerHTML = "";
    records.forEach(t => {
      let card = document.createElement("div");
      card.className = "card";
      card.tabIndex = 0;
      card.innerHTML = `
        <div><strong>${t.date}</strong></div>
        <div>${re ? highlight(t.description, re) : t.description}</div>
        <div>${t.amount.toFixed(2)} ${settings.baseCurrency||"USD"}</div>
        <div>${t.category}</div>
        <div>
          <button data-edit="${t.id}" aria-label="Edit ${t.description}">Edit</button>
          <button data-del="${t.id}" aria-label="Delete ${t.description}">Delete</button>
        </div>
      `;
      cardsDiv.appendChild(card);
    });
  }

  // Decide table or cards based on window width
  function renderRecords(re=null) {
    let isMobile = window.innerWidth <= 768;
    if (isMobile) {
      recordsTable.parentElement.style.display = "none";
      cardsDiv.style.display = "grid";
      renderCards(txns, re);
    } else {
      recordsTable.parentElement.style.display = "";
      cardsDiv.style.display = "none";
      renderTable(txns, re);
    }
  }

  // Dashboard stats
  function renderStats() {
    let total = txns.reduce((sum,t)=>sum+t.amount,0);
    let count = txns.length;
    let catCounts = {};
    txns.forEach(t => catCounts[t.category]= (catCounts[t.category]||0)+t.amount);
    let topCat = Object.keys(catCounts).sort((a,b)=>catCounts[b]-catCounts[a])[0]||"—";
    let today = new Date();
    let days = [];
    for (let i=6; i>=0; i--) {
      let d = new Date(today);
      d.setDate(today.getDate() - i);
      let dStr = d.toISOString().slice(0,10);
      let dayTotal = txns.filter(t => t.date === dStr).reduce((a,b)=>a+b.amount,0);
      days.push({ date: dStr, amount: dayTotal});
    }
    let last7Sum = days.reduce((a,b)=>a+b.amount,0);

    dashboardStats.innerHTML = `
      <div>Total Spent<br><strong>${total.toFixed(2)} ${settings.baseCurrency||"USD"}</strong></div>
      <div>Transactions<br><strong>${count}</strong></div>
      <div>Top Category<br><strong>${topCat}</strong></div>
      <div>Last 7 days<br><strong>${last7Sum.toFixed(2)}</strong></div>
    `;

    // Show a text trend for last 7 days
    let trendList = days.map(day => {
      let d = new Date(day.date);
      let dayName = d.toLocaleDateString(undefined, { weekday:'short' });
      return `${dayName}: ${day.amount.toFixed(2)}`;
    }).join(" | ");
    trendText.textContent = trendList;
  }

  // Cap/target status
  function renderCapStatus() {
    let cap = Number(settings.cap) || 0;
    let month = new Date().toISOString().slice(0,7);
    let spent = txns.filter(t=>t.date.startsWith(month)).reduce((a,b)=>a+b.amount,0);
    if (cap) {
      let msg = spent > cap ?
        `Over cap by ${(spent-cap).toFixed(2)}!` :
        `Remaining: ${(cap-spent).toFixed(2)}`;
      capStatus.textContent = msg;
      capStatus.className = spent > cap ? "over" : "";
      capStatus.setAttribute("aria-live", spent > cap ? "assertive" : "polite");
    } else {
      capStatus.textContent = "";
    }
  }

  // Redraw everything
  function refreshUI(re=null) {
    renderRecords(re);
    renderStats();
    renderCapStatus();
  }

  // Reset the add/edit form
  function resetForm() {
    form.reset();
    document.getElementById("txnId").value = "";
  }

  // Save transaction via form
  form.addEventListener("submit", function(e){
    e.preventDefault();
    let id = document.getElementById("txnId").value;
    let desc = form.desc.value.trim().replace(/\s{2,}/g," ");
    let amt = form.amt.value;
    let cat = form.cat.value;
    let date = form.date.value;
    let valid = true;
    errDesc.textContent = validate("description", desc);
    errAmt.textContent = validate("amount", amt);
    errCat.textContent = validate("category", cat);
    errDate.textContent = validate("date", date);
    if (errDesc.textContent || errAmt.textContent || errCat.textContent || errDate.textContent) valid = false;
    if (!valid) return;
    let txn = { id, description: desc, amount: Number(amt), category: cat, date };
    if (id) editTxn(id, txn);
    else addTxn(txn);
    resetForm();
    refreshUI();
    window.location.hash = "#records"; // After save, go back to transaction list
  });

  cancelEditBtn.addEventListener("click", e => {
    resetForm();
    window.location.hash = "#records"; // After cancel, go back to transactions
  });

  // Edit/Delete events for table and cards
  function handleEditOrDelete(e) {
    if (e.target.dataset.edit) {
      let t = txns.find(x => x.id === e.target.dataset.edit);
      form.desc.value = t.description;
      form.amt.value = t.amount;
      form.cat.value = t.category;
      form.date.value = t.date;
      document.getElementById("txnId").value = t.id;
      window.location.hash = "#add"; // Go to Add/Edit section!
    }
    if (e.target.dataset.del) {
      if (confirm("Delete transaction?")) {
        deleteTxn(e.target.dataset.del);
        refreshUI();
      }
    }
  }
  recordsTable.addEventListener("click", handleEditOrDelete);
  cardsDiv.addEventListener("click", handleEditOrDelete);

  window.addEventListener("resize", () => refreshUI());

  document.getElementById("sortDate").addEventListener("click", function(){
    txns.sort((a,b)=>a.date.localeCompare(b.date));
    refreshUI();
  });
  document.getElementById("sortDesc").addEventListener("click", function(){
    txns.sort((a,b)=>a.description.localeCompare(b.description));
    refreshUI();
  });
  document.getElementById("sortAmt").addEventListener("click", function(){
    txns.sort((a,b)=>a.amount-b.amount);
    refreshUI();
  });

  searchInput.addEventListener("input", updateSearch);
  caseInsensitiveCheckbox.addEventListener("change", updateSearch);

  function updateSearch() {
    let val = searchInput.value;
    let flags = caseInsensitiveCheckbox.checked ? "i" : "";
    let re = compileRegex(val, flags);
    refreshUI(re);
  }

  settingsForm.addEventListener("submit", function(e){
    e.preventDefault();
    let baseCurrency = document.getElementById("baseCurrency").value;
    let currRates = document.getElementById("currRates").value;
    let cap = document.getElementById("cap").value;
    let categories = document.getElementById("categories").value;
    let cats = categories.split(",").map(s=>s.trim()).filter(Boolean);
    setSettings({
      baseCurrency,
      currRates: currRates ? JSON.parse(currRates) : {},
      cap,
      categories: cats.length ? cats : undefined
    });
    refreshUI();
  });

  document.getElementById("importJson").addEventListener("click", () => {
    document.getElementById("importFile").click();
  });
  document.getElementById("importFile").addEventListener("change", function(e){
    let file = e.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = function(ev){
      let ok = importJSON(ev.target.result);
      if (ok) {
        resetTxns(JSON.parse(ev.target.result));
        refreshUI();
        alert("Import successful!");
      } else {
        alert("Import failed: invalid structure.");
      }
    };
    reader.readAsText(file);
  });
  document.getElementById("exportJson").addEventListener("click", function(){
    let blob = new Blob([exportJSON()],{type:"application/json"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "transactions.json";
    a.click();
  });

  // Set categories dropdown and draw UI on startup
  let cats = (settings.categories && settings.categories.length) ? settings.categories : ["Food","Books","Transport","Entertainment","Fees","Other"];
  let catSel = document.getElementById("cat");
  catSel.innerHTML = cats.map(c=>`<option>${c}</option>`).join("");
  refreshUI();
});