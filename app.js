/* ============================================
   ELEMENTAL WARS - APP LOGIC
   ============================================ */

// --- Admin Configuration ---
const ADMIN_USERNAME = "Wenyu";

// --- State ---
let currentUser = null;   // logged-in username
let viewingUser = null;    // whose sheet is displayed (null = own)
let inventoryEditIndex = null;
let userListUnsubscribe = null;
let statusHeartbeat = null;
let allUsernames = [];
let userListData = {};

// --- Emoji map for inventory ---
const EMOJI_MAP = {
  sword: "\u2694\uFE0F", swords: "\u2694\uFE0F", blade: "\u2694\uFE0F", dagger: "\u{1F5E1}\uFE0F", knife: "\u{1F5E1}\uFE0F",
  axe: "\u{1FA93}", pickaxe: "\u26CF\uFE0F", hammer: "\u{1F528}", wrench: "\u{1F527}",
  shield: "\u{1F6E1}\uFE0F", armor: "\u{1F6E1}\uFE0F", armour: "\u{1F6E1}\uFE0F",
  bow: "\u{1F3F9}", arrow: "\u{1F3F9}", crossbow: "\u{1F3F9}",
  wand: "\u{1FA84}", staff: "\u{1FA84}", magic: "\u2728", spell: "\u2728", scroll: "\u{1F4DC}",
  potion: "\u{1F9EA}", elixir: "\u{1F9EA}", flask: "\u{1F9EA}", bottle: "\u{1F37E}",
  gem: "\u{1F48E}", diamond: "\u{1F48E}", crystal: "\u{1F48E}", ruby: "\u{1F48E}", emerald: "\u{1F48E}", sapphire: "\u{1F48E}",
  ring: "\u{1F48D}", necklace: "\u{1F4FF}", amulet: "\u{1F4FF}",
  key: "\u{1F511}", keys: "\u{1F511}", lock: "\u{1F512}",
  coin: "\u{1FA99}", coins: "\u{1FA99}", gold: "\u{1FA99}", money: "\u{1F4B0}", treasure: "\u{1F4B0}",
  heart: "\u2764\uFE0F", health: "\u2764\uFE0F", life: "\u2764\uFE0F",
  star: "\u2B50", stars: "\u2B50",
  fire: "\u{1F525}", flame: "\u{1F525}", blaze: "\u{1F525}",
  ice: "\u2744\uFE0F", frost: "\u2744\uFE0F", snow: "\u2744\uFE0F", cold: "\u2744\uFE0F",
  water: "\u{1F4A7}", rain: "\u{1F327}\uFE0F", wave: "\u{1F30A}",
  lightning: "\u26A1", thunder: "\u26A1", electric: "\u26A1", shock: "\u26A1",
  earth: "\u{1F30D}", rock: "\u{1FAA8}", stone: "\u{1FAA8}", boulder: "\u{1FAA8}",
  wind: "\u{1F32C}\uFE0F", air: "\u{1F32C}\uFE0F", tornado: "\u{1F32A}\uFE0F",
  tree: "\u{1F332}", wood: "\u{1FAB5}", log: "\u{1FAB5}", leaf: "\u{1F343}", plant: "\u{1F331}", flower: "\u{1F33A}", mushroom: "\u{1F344}",
  food: "\u{1F356}", meat: "\u{1F356}", bread: "\u{1F35E}", apple: "\u{1F34E}", fish: "\u{1F41F}", cake: "\u{1F370}",
  bone: "\u{1F9B4}", skull: "\u{1F480}", skeleton: "\u{1F480}",
  crown: "\u{1F451}", helmet: "\u{1FA96}", hat: "\u{1F3A9}", cap: "\u{1F9E2}",
  book: "\u{1F4D6}", books: "\u{1F4DA}", map: "\u{1F5FA}\uFE0F", compass: "\u{1F9ED}",
  bomb: "\u{1F4A3}", dynamite: "\u{1F9E8}", tnt: "\u{1F9E8}",
  chest: "\u{1F9F0}", box: "\u{1F4E6}", bag: "\u{1F45C}", backpack: "\u{1F392}",
  lantern: "\u{1F3EE}", torch: "\u{1DD2D}", candle: "\u{1F56F}\uFE0F", lamp: "\u{1F4A1}",
  rope: "\u{1FAA2}", chain: "\u26D3\uFE0F", net: "\u{1FAA4}",
  horse: "\u{1F40E}", dragon: "\u{1F409}", wolf: "\u{1F43A}", cat: "\u{1F431}", dog: "\u{1F436}", bird: "\u{1F426}", eagle: "\u{1F985}",
  spider: "\u{1F577}\uFE0F", snake: "\u{1F40D}", bat: "\u{1F987}", bear: "\u{1F43B}",
  car: "\u{1F697}", boat: "\u{1F6A3}", ship: "\u{1F6A2}", rocket: "\u{1F680}", plane: "\u2708\uFE0F",
  house: "\u{1F3E0}", castle: "\u{1F3F0}", tent: "\u26FA", door: "\u{1F6AA}",
  flag: "\u{1F3F4}", banner: "\u{1F3F4}",
  clock: "\u23F0", hourglass: "\u231B", time: "\u23F0",
  music: "\u{1F3B5}", bell: "\u{1F514}", horn: "\u{1F4EF}",
  eye: "\u{1F441}\uFE0F", eyes: "\u{1F440}",
  hand: "\u270B", fist: "\u270A", glove: "\u{1F9E4}",
  boot: "\u{1F97E}", boots: "\u{1F97E}", shoe: "\u{1F45F}",
  christmas: "\u{1F384}", present: "\u{1F381}", gift: "\u{1F381}", candy: "\u{1F36C}",
  moon: "\u{1F319}", sun: "\u2600\uFE0F}", cloud: "\u2601\uFE0F",
  feather: "\u{1FAB6}", wing: "\u{1FAB6}",
  pill: "\u{1F48A}", bandage: "\u{1FA79}", medicine: "\u{1F48A}",
  trap: "\u{1FAA4}", cage: "\u{1FAA4}",
  coin: "\u{1FA99}", token: "\u{1F3B2}", dice: "\u{1F3B2}",
  orb: "\u{1F52E}", sphere: "\u{1F52E}",
  spear: "\u{1F531}", trident: "\u{1F531}",
  telescope: "\u{1F52D}", magnifier: "\u{1F50D}", glass: "\u{1F50D}",
  paw: "\u{1F43E}", claw: "\u{1F43E}",
  brush: "\u{1F58C}\uFE0F", paint: "\u{1F3A8}", palette: "\u{1F3A8}",
  anchor: "\u2693", wheel: "\u2638\uFE0F",
  gear: "\u2699\uFE0F", tool: "\u{1F6E0}\uFE0F",
  mask: "\u{1F3AD}", cloak: "\u{1F9E5}", cape: "\u{1F9E5}",
  scale: "\u2696\uFE0F", balance: "\u2696\uFE0F",
  emerald: "\u{1F7E2}", ruby: "\u{1F534}"
};
const FALLBACK_EMOJI = "\u{1F4E6}";

// Extract individual emoji characters from a string
function extractEmojis(str) {
  if (!str) return [];
  const regex = /\p{Emoji_Presentation}|\p{Extended_Pictographic}/gu;
  const matches = str.match(regex);
  return matches || [];
}

function getItemEmoji(text) {
  const lower = text.toLowerCase().replace(/[^a-z\s]/g, "");
  const words = lower.split(/\s+/);
  for (const word of words) {
    if (EMOJI_MAP[word]) return EMOJI_MAP[word];
  }
  for (const [key, emoji] of Object.entries(EMOJI_MAP)) {
    if (lower.includes(key)) return emoji;
  }
  return FALLBACK_EMOJI;
}

// Returns the Firestore user doc ID that edits should target.
// Admin editing another user's sheet → that user. Otherwise → self.
function editTarget() { return viewingUser || currentUser; }

// --- Online status helper ---
function isUserOnline(data) {
  if (!data || !data.online) return false;
  const lastSeen = data.lastSeen;
  if (!lastSeen) return false;
  const seenMs = lastSeen.toMillis ? lastSeen.toMillis() : lastSeen * 1000;
  return (Date.now() - seenMs) < 120000; // 2 minutes
}

// --- Mention rendering helpers ---
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderMentionText(text) {
  const escaped = escapeHtml(text);
  return escaped.replace(/@(\w+)/g, (_, username) => {
    if (username === "everyone") return `<span class="mention mention-everyone">@everyone</span>`;
    const isSelf = username === currentUser;
    return `<span class="mention${isSelf ? ' mention-self' : ''}">@${username}</span>`;
  });
}

function parseInventoryInput(raw) {
  if (!raw || !raw.trim()) return null;
  const trimmed = raw.trim();
  const match = trimmed.match(/^(.+?)\s+(\d+)$/);
  if (match) {
    return { text: match[1].trim(), count: parseInt(match[2], 10) };
  }
  return { text: trimmed, count: null };
}

// --- Hashing ---
async function hashPassword(pw) {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// --- Default profile data ---
function defaultProfile() {
  return {
    level: null,
    tokens: null,
    boosterPoints: null,
    currentHP: 100,
    maxHP: 100,
    meleeWeapon: { name: "", rarity: "", exclusiveNum: "", damage: null, attackSpeed: null, range: null, specialities: "", enchantments: [] },
    defence: { name: "", rarity: "", exclusiveNum: "", defenceLevel: null, currentDurability: null, maxDurability: null, enchantments: [] },
    rangedWeapon: { name: "", rarity: "", exclusiveNum: "", projectileSpeed: null, specialities: "", reload: null, enchantments: [] },
    armour: { name: "", rarity: "", exclusiveNum: "", defenceLevel: null, specialities: "", enchantments: [] },
    artifact: { name: "", rarity: "", exclusiveNum: "", level: null, duration: null, reload: null, effect: "", enchantments: [] },
    transportation: { name: "", rarity: "", exclusiveNum: "", currentHP: null, maxHP: null, weapons: [], enchantments: [] },
    pets: [],
    extensions: [],
    accessories: { necklace: "", necklaceEffect: "", bracelet: "", braceletEffect: "", ring: "", ringEffect: "" },
    gems: [],
    megaGems: [],
    arrows: [],
    spells: [],
    inventory: new Array(32).fill(""),
    abilities: []
  };
}

// --- Screens ---
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ============================================
// AUTH
// ============================================
const authForm = document.getElementById("auth-form");
const authError = document.getElementById("auth-error");
const authSubmitBtn = document.getElementById("auth-submit-btn");
let authMode = "login"; // "login" or "register"

document.querySelectorAll(".auth-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    authMode = tab.dataset.tab;
    authSubmitBtn.textContent = authMode === "login" ? "Log In" : "Register";
    authError.textContent = "";
  });
});

authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  authError.textContent = "";
  const username = document.getElementById("username-input").value.trim();
  const password = document.getElementById("password-input").value;

  if (!username || !password) {
    authError.textContent = "Please fill in both fields.";
    return;
  }

  const pwHash = await hashPassword(password);

  try {
    if (authMode === "register") {
      // Check if username exists
      const userDoc = await db.collection("users").doc(username).get();
      if (userDoc.exists) {
        authError.textContent = "Username already taken.";
        return;
      }
      // Check if password hash already used
      const pwCheck = await db.collection("users").where("passwordHash", "==", pwHash).get();
      if (!pwCheck.empty) {
        authError.textContent = "That password is already in use. Choose a different one.";
        return;
      }
      // Create user
      await db.collection("users").doc(username).set({
        passwordHash: pwHash,
        ...defaultProfile()
      });
      currentUser = username;
      onLogin();
    } else {
      // Login
      const userDoc = await db.collection("users").doc(username).get();
      if (!userDoc.exists) {
        authError.textContent = "User not found.";
        return;
      }
      if (userDoc.data().passwordHash !== pwHash) {
        authError.textContent = "Incorrect password.";
        return;
      }
      currentUser = username;
      onLogin();
    }
  } catch (err) {
    authError.textContent = "Error: " + err.message;
  }
});

function onLogin() {
  localStorage.setItem("ewUser", currentUser);
  viewingUser = null;
  document.getElementById("current-user-display").textContent = currentUser;
  showScreen("dashboard-screen");
  initUserList();
  loadSheet(currentUser, true);
  checkAdmin();
  initChat(); // start notification listener immediately, even before Chat tab is opened
  // Set online status and start heartbeat
  db.collection("users").doc(currentUser).update({
    online: true,
    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
  });
  statusHeartbeat = setInterval(() => {
    if (currentUser) {
      db.collection("users").doc(currentUser).update({
        online: true,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  }, 45000);
}

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  if (currentUser) db.collection("users").doc(currentUser).update({ online: false });
  clearInterval(statusHeartbeat); statusHeartbeat = null;
  if (userListUnsubscribe) { userListUnsubscribe(); userListUnsubscribe = null; }
  localStorage.removeItem("ewUser");
  currentUser = null;
  viewingUser = null;
  isAdmin = false;
  userListData = {};
  allUsernames = [];
  document.getElementById("add-news-btn").classList.add("hidden");
  document.getElementById("username-input").value = "";
  document.getElementById("password-input").value = "";
  authError.textContent = "";
  showScreen("auth-screen");
});

// ============================================
// USER LIST
// ============================================
function renderUserList(filter) {
  const list = document.getElementById("user-list");
  list.innerHTML = "";
  const usernames = Object.keys(userListData).sort((a, b) => a.localeCompare(b));
  const filtered = filter
    ? usernames.filter(u => u.toLowerCase().includes(filter.toLowerCase()))
    : usernames;
  filtered.forEach(u => {
    const li = document.createElement("li");
    const dot = document.createElement("span");
    dot.className = "status-dot " + (isUserOnline(userListData[u]) ? "online" : "offline");
    li.appendChild(dot);
    const nameSpan = document.createElement("span");
    nameSpan.textContent = u + (u === currentUser ? " (you)" : "");
    li.appendChild(nameSpan);
    if ((viewingUser || currentUser) === u) li.classList.add("active");
    li.addEventListener("click", () => {
      if (u === currentUser) {
        viewingUser = null;
        loadSheet(currentUser, true);
      } else {
        viewingUser = u;
        loadSheet(u, isAdmin); // admin gets editable view; others get read-only
      }
      list.querySelectorAll("li").forEach(l => l.classList.remove("active"));
      li.classList.add("active");
    });
    list.appendChild(li);
  });
}

function initUserList() {
  if (userListUnsubscribe) return;
  const searchInput = document.getElementById("user-search");
  userListUnsubscribe = db.collection("users").onSnapshot(snap => {
    userListData = {};
    allUsernames = [];
    snap.forEach(doc => {
      userListData[doc.id] = doc.data();
      allUsernames.push(doc.id);
    });
    allUsernames.sort((a, b) => a.localeCompare(b));
    renderUserList(searchInput.value);
  });
  searchInput.oninput = () => renderUserList(searchInput.value);
}

// ============================================
// SHEET RENDERING
// ============================================
async function loadSheet(username, editable) {
  const doc = await db.collection("users").doc(username).get();
  if (!doc.exists) return;
  const data = doc.data();
  const sheet = document.getElementById("status-sheet");
  const banner = document.getElementById("viewing-banner");

  // Toggle read-only; admin editing another user still shows banner
  if (username === currentUser) {
    sheet.classList.remove("read-only");
    banner.classList.add("hidden");
  } else if (isAdmin) {
    sheet.classList.remove("read-only");
    banner.classList.remove("hidden");
    document.getElementById("viewing-username").textContent = username;
    document.getElementById("banner-verb").textContent = "Editing";
    document.getElementById("banner-mode").textContent = "(admin)";
    document.getElementById("banner-mode").style.color = "var(--accent)";
  } else {
    sheet.classList.add("read-only");
    banner.classList.remove("hidden");
    document.getElementById("viewing-username").textContent = username;
    document.getElementById("banner-verb").textContent = "Viewing";
    document.getElementById("banner-mode").textContent = "(read-only)";
    document.getElementById("banner-mode").style.color = "";
  }

  // Header
  document.getElementById("sheet-username").textContent = username;
  document.getElementById("level-input").value = data.level != null ? data.level : "";
  document.getElementById("tokens-input").value = data.tokens != null ? data.tokens : "";
  document.getElementById("booster-input").value = data.boosterPoints != null ? data.boosterPoints : "";

  // Health
  const curHP = data.currentHP ?? 100;
  const maxHP = data.maxHP ?? 100;
  document.getElementById("hp-current").value = curHP;
  document.getElementById("hp-max").value = maxHP;
  updateHealthBar(curHP, maxHP);

  // Equipment cards
  const categories = ["meleeWeapon", "defence", "rangedWeapon", "armour", "artifact", "transportation"];
  categories.forEach(cat => {
    const card = document.querySelector(`.equip-card[data-category="${cat}"]`);
    const catData = data[cat] || {};

    // Remove old rarity classes
    card.className = card.className.replace(/rarity-\S+/g, "").trim() + " equip-card";
    if (catData.rarity) {
      card.classList.add("rarity-" + catData.rarity);
    }

    card.querySelectorAll("[data-field]").forEach(el => {
      const field = el.dataset.field;
      if (field === "enchantments") return; // handled separately
      const val = catData[field];
      if (el.tagName === "SELECT") {
        el.value = val || "";
      } else if (el.tagName === "TEXTAREA") {
        el.value = val || "";
      } else {
        el.value = val != null ? val : "";
      }
    });

    // Render transportation weapons list
    if (cat === "transportation") {
      renderTransportWeapons(catData.weapons || []);
    }

    // Show/hide exclusive number
    const exclSelect = card.querySelector(".exclusive-num");
    if (catData.rarity === "exclusive") {
      exclSelect.classList.remove("hidden");
    } else {
      exclSelect.classList.add("hidden");
    }

    // Render enchantments list
    renderEnchantments(card, cat, catData.enchantments || []);
  });

  // Power score
  updatePowerDisplay();

  // Lists
  renderPets(data.pets || []);
  renderExtensions(data.extensions || []);
  renderAccessories(data.accessories || { necklace: "", necklaceEffect: "", bracelet: "", braceletEffect: "", ring: "", ringEffect: "" });
  renderGems(data.gems || []);
  renderMegaGems(data.megaGems || []);
  renderArrows(data.arrows || []);
  renderSpells(data.spells || []);

  // Inventory
  renderInventory(data.inventory || new Array(32).fill(""));

  // Abilities
  renderAbilities(data.abilities || []);
}

// ============================================
// POWER SCORE (v1.4.1)
// ============================================
const RARITY_POWER = {
  common: 1, uncommon: 2, rare: 3, epicRare: 4,
  ultraRare: 5, legendary: 6, mythical: 7, elder: 9
};

function updatePowerDisplay() {
  const categories = ["meleeWeapon", "defence", "rangedWeapon", "armour", "artifact", "transportation"];
  let total = 0;
  categories.forEach(cat => {
    const card = document.querySelector(`.equip-card[data-category="${cat}"]`);
    const rarityEl = card ? card.querySelector('[data-field="rarity"]') : null;
    const rarity = rarityEl ? rarityEl.value : "";
    if (!rarity) return;
    if (rarity === "exclusive") {
      const exclEl = card.querySelector('[data-field="exclusiveNum"]');
      total += parseInt(exclEl && exclEl.value) || 0;
    } else {
      total += RARITY_POWER[rarity] || 0;
    }
  });
  const el = document.getElementById("power-display");
  if (el) el.textContent = total > 0 ? total : "—";
}

function updateHealthBar(current, max) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (current / max) * 100)) : 0;
  const fill = document.getElementById("health-bar-fill");
  fill.style.width = pct + "%";
  if (pct > 50) fill.style.background = "var(--health-high)";
  else if (pct > 25) fill.style.background = "var(--health-mid)";
  else fill.style.background = "var(--health-low)";
}

// ============================================
// SAVE HELPERS
// ============================================
function saveField(field, value) {
  if (!currentUser || (viewingUser && !isAdmin)) return;
  db.collection("users").doc(editTarget()).update({ [field]: value });
}

function saveNestedField(category, field, value) {
  if (!currentUser || (viewingUser && !isAdmin)) return;
  db.collection("users").doc(editTarget()).update({
    [`${category}.${field}`]: value
  });
}

// --- Auto-save listeners ---

// Level, tokens, booster (accept integers or ∞)
document.getElementById("level-input").addEventListener("change", function () {
  const v = parseIntOrInf(this.value);
  saveField("level", v);
});
document.getElementById("tokens-input").addEventListener("change", function () {
  const v = parseIntOrInf(this.value);
  saveField("tokens", v);
});
document.getElementById("booster-input").addEventListener("change", function () {
  const v = parseIntOrInf(this.value);
  saveField("boosterPoints", v);
});

// HP (accept integers or ∞)
document.getElementById("hp-current").addEventListener("change", function () {
  const v = parseIntOrInf(this.value);
  if (v !== null) {
    saveField("currentHP", v);
    const maxVal = parseIntOrInf(document.getElementById("hp-max").value);
    updateHealthBar(typeof v === "number" ? v : 100, typeof maxVal === "number" ? maxVal : 100);
  }
});
document.getElementById("hp-max").addEventListener("change", function () {
  const v = parseIntOrInf(this.value);
  if (v !== null) {
    saveField("maxHP", v);
    const curVal = parseIntOrInf(document.getElementById("hp-current").value);
    updateHealthBar(typeof curVal === "number" ? curVal : 0, typeof v === "number" ? v : 100);
  }
});

// Fields that remain as text (not integer)
const TEXT_STAT_FIELDS = new Set(["name", "rarity", "exclusiveNum", "specialities", "enchantments", "effect"]);

// Fields that accept integers, ∞, or % (defence levels)
const INT_PCT_INF_FIELDS = new Set(["defenceLevel"]);

// --- Input filtering: only allow digits and ∞ (and % for defence level fields) ---
document.querySelectorAll(".int-or-inf-input").forEach(input => {
  input.addEventListener("input", function () {
    const val = this.value;
    if (val === "∞" || val === "") return; // always allowed
    // Strip anything that isn't a digit or ∞
    this.value = val.replace(/[^0-9∞]/g, "");
    // If it contains ∞ mixed with other chars, keep only ∞
    if (this.value.includes("∞")) this.value = "∞";
  });
});

document.querySelectorAll(".int-pct-inf-input").forEach(input => {
  input.addEventListener("input", function () {
    const val = this.value;
    if (val === "∞" || val === "") return;
    // Allow digits, ∞, and % (only at end)
    this.value = val.replace(/[^0-9∞%]/g, "");
    if (this.value.includes("∞")) this.value = "∞";
    // Ensure % only appears at the end and only once
    const pctCount = (this.value.match(/%/g) || []).length;
    if (pctCount > 1) {
      this.value = this.value.replace(/%/g, "") + "%";
    }
    if (this.value.includes("%") && !this.value.endsWith("%")) {
      this.value = this.value.replace(/%/g, "") + "%";
    }
  });
});

// Validate an integer-or-infinity input; returns the cleaned value or null
function parseIntOrInf(val) {
  val = val.trim();
  if (val === "" || val === "—") return null;
  if (val === "∞") return "∞";
  const n = parseInt(val, 10);
  return isNaN(n) ? null : n;
}

// Validate integer, ∞, or percentage (e.g. "50%")
function parseIntPctOrInf(val) {
  val = val.trim();
  if (val === "" || val === "—") return null;
  if (val === "∞") return "∞";
  if (/^\d+%$/.test(val)) return val; // e.g. "50%"
  const n = parseInt(val, 10);
  return isNaN(n) ? null : n;
}

// Equipment cards - auto-save on change/blur
document.querySelectorAll(".equip-card").forEach(card => {
  const cat = card.dataset.category;

  card.querySelectorAll(".equip-stats [data-field], .equip-header [data-field]").forEach(el => {
    const field = el.dataset.field;
    if (field === "enchantments") return; // handled by list logic
    if (field === "weapons" && cat === "transportation") return; // handled by list logic
    const event = el.tagName === "SELECT" ? "change" : "blur";

    el.addEventListener(event, () => {
      if (!currentUser || (viewingUser && !isAdmin)) return;

      let value;
      if (TEXT_STAT_FIELDS.has(field)) {
        value = el.value;
      } else if (INT_PCT_INF_FIELDS.has(field)) {
        value = parseIntPctOrInf(el.value);
        if (value === null && el.value.trim() !== "" && el.value.trim() !== "—") {
          el.value = ""; // invalid input, clear it
        }
      } else {
        // Integer or ∞ field
        value = parseIntOrInf(el.value);
        if (value === null && el.value.trim() !== "" && el.value.trim() !== "—") {
          el.value = ""; // invalid input, clear it
        }
      }
      saveNestedField(cat, field, value);

      // Handle rarity change
      if (field === "rarity") {
        card.className = card.className.replace(/rarity-\S+/g, "").trim();
        if (el.value) card.classList.add("rarity-" + el.value);
        const exclSelect = card.querySelector(".exclusive-num");
        if (el.value === "exclusive") {
          exclSelect.classList.remove("hidden");
        } else {
          exclSelect.classList.add("hidden");
          exclSelect.value = "";
          saveNestedField(cat, "exclusiveNum", "");
        }
      }

      // Recalculate power whenever rarity or exclusiveNum changes
      if (field === "rarity" || field === "exclusiveNum") {
        updatePowerDisplay();
      }
    });
  });
});

// Accessories (inputs and textareas)
document.querySelectorAll(".accessory-slot input, .accessory-slot textarea").forEach(inp => {
  inp.addEventListener("blur", () => {
    if (!currentUser || (viewingUser && !isAdmin)) return;
    saveNestedField("accessories", inp.dataset.field, inp.value);
  });
});

// ============================================
// LIST RENDERING & MANAGEMENT
// ============================================

// --- Pets ---
function renderPets(pets) {
  const container = document.getElementById("pets-list");
  container.innerHTML = "";
  pets.forEach((name, i) => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `<span>${escapeHtml(name)}</span><button class="btn-remove" data-index="${i}">&times;</button>`;
    div.querySelector(".btn-remove").addEventListener("click", () => removePet(i));
    container.appendChild(div);
  });
}

document.getElementById("add-pet-btn").addEventListener("click", async () => {
  const input = document.getElementById("pet-name-input");
  const name = input.value.trim();
  if (!name || !currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const pets = doc.data().pets || [];
  pets.push(name);
  await db.collection("users").doc(editTarget()).update({ pets });
  input.value = "";
  renderPets(pets);
});

async function removePet(index) {
  if (!currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const pets = doc.data().pets || [];
  pets.splice(index, 1);
  await db.collection("users").doc(editTarget()).update({ pets });
  renderPets(pets);
}

// --- Extensions ---
function renderExtensions(extensions) {
  const container = document.getElementById("extensions-list");
  container.innerHTML = "";
  extensions.forEach((ext, i) => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `<div class="list-item-info"><span>${escapeHtml(ext.name)}</span><span class="list-item-sub">for ${escapeHtml(ext.appliedTo)}</span></div><button class="btn-remove" data-index="${i}">&times;</button>`;
    div.querySelector(".btn-remove").addEventListener("click", () => removeExtension(i));
    container.appendChild(div);
  });
}

document.getElementById("add-ext-btn").addEventListener("click", async () => {
  const nameInput = document.getElementById("ext-name-input");
  const forInput = document.getElementById("ext-for-input");
  const name = nameInput.value.trim();
  const appliedTo = forInput.value.trim();
  if (!name || !appliedTo || !currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const extensions = doc.data().extensions || [];
  extensions.push({ name, appliedTo });
  await db.collection("users").doc(editTarget()).update({ extensions });
  nameInput.value = "";
  forInput.value = "";
  renderExtensions(extensions);
});

async function removeExtension(index) {
  if (!currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const extensions = doc.data().extensions || [];
  extensions.splice(index, 1);
  await db.collection("users").doc(editTarget()).update({ extensions });
  renderExtensions(extensions);
}

// --- Accessories (inline save via blur, already handled above) ---
function renderAccessories(acc) {
  document.getElementById("acc-necklace").value = acc.necklace || "";
  document.getElementById("acc-necklace-effect").value = acc.necklaceEffect || "";
  document.getElementById("acc-bracelet").value = acc.bracelet || "";
  document.getElementById("acc-bracelet-effect").value = acc.braceletEffect || "";
  document.getElementById("acc-ring").value = acc.ring || "";
  document.getElementById("acc-ring-effect").value = acc.ringEffect || "";
}

// --- Gems ---
function renderGems(gems) {
  const container = document.getElementById("gems-normal-list");
  container.innerHTML = "";
  gems.forEach((name, i) => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `<span>${escapeHtml(name)}</span><button class="btn-remove" data-index="${i}">&times;</button>`;
    div.querySelector(".btn-remove").addEventListener("click", () => removeGem(i));
    container.appendChild(div);
  });
}

document.getElementById("add-gem-btn").addEventListener("click", async () => {
  const input = document.getElementById("gem-name-input");
  const name = input.value.trim();
  if (!name || !currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const gems = doc.data().gems || [];
  gems.push(name);
  await db.collection("users").doc(editTarget()).update({ gems });
  input.value = "";
  renderGems(gems);
});

async function removeGem(index) {
  if (!currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const gems = doc.data().gems || [];
  gems.splice(index, 1);
  await db.collection("users").doc(editTarget()).update({ gems });
  renderGems(gems);
}

// --- Arrows ---
function renderArrows(arrows) {
  const container = document.getElementById("arrows-list");
  container.innerHTML = "";
  arrows.forEach((arr, i) => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `<div class="list-item-info"><span>${escapeHtml(arr.type)}</span><span class="list-item-sub">&times;${arr.count}</span></div><button class="btn-remove" data-index="${i}">&times;</button>`;
    div.querySelector(".btn-remove").addEventListener("click", () => removeArrow(i));
    container.appendChild(div);
  });
}

document.getElementById("add-arrow-btn").addEventListener("click", async () => {
  const nameInput = document.getElementById("arrow-name-input");
  const countInput = document.getElementById("arrow-count-input");
  const type = nameInput.value.trim();
  const count = parseIntOrInf(countInput.value);
  if (!type || count === null || !currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const arrows = doc.data().arrows || [];
  arrows.push({ type, count });
  await db.collection("users").doc(editTarget()).update({ arrows });
  nameInput.value = "";
  countInput.value = "";
  renderArrows(arrows);
});

async function removeArrow(index) {
  if (!currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const arrows = doc.data().arrows || [];
  arrows.splice(index, 1);
  await db.collection("users").doc(editTarget()).update({ arrows });
  renderArrows(arrows);
}

// --- Spells ---
function renderSpells(spells) {
  const container = document.getElementById("spells-list");
  container.innerHTML = "";
  spells.forEach((spell, i) => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `<div class="list-item-info"><span>${escapeHtml(spell.name)}</span><span class="list-item-sub">${escapeHtml(spell.level)}</span></div><button class="btn-remove" data-index="${i}">&times;</button>`;
    div.querySelector(".btn-remove").addEventListener("click", () => removeSpell(i));
    container.appendChild(div);
  });
}

document.getElementById("add-spell-btn").addEventListener("click", async () => {
  const nameInput = document.getElementById("spell-name-input");
  const levelInput = document.getElementById("spell-level-input");
  const name = nameInput.value.trim();
  const level = levelInput.value;
  if (!name || !level || !currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const spells = doc.data().spells || [];
  spells.push({ name, level });
  await db.collection("users").doc(editTarget()).update({ spells });
  nameInput.value = "";
  levelInput.value = "";
  renderSpells(spells);
});

async function removeSpell(index) {
  if (!currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const spells = doc.data().spells || [];
  spells.splice(index, 1);
  await db.collection("users").doc(editTarget()).update({ spells });
  renderSpells(spells);
}

// ============================================
// INVENTORY (v1.2 - with type, rarity, emoji picker, name)
// ============================================

// Build a searchable emoji list from EMOJI_MAP
const EMOJI_SEARCH_LIST = [];
(function buildEmojiSearchList() {
  const seen = new Set();
  for (const [keyword, emoji] of Object.entries(EMOJI_MAP)) {
    const key = keyword + emoji;
    if (!seen.has(key)) {
      seen.add(key);
      EMOJI_SEARCH_LIST.push({ keyword, emoji });
    }
  }
})();

let selectedEmoji = null;

// Sorting helpers for inventory
const TYPE_ORDER = ["meleeWeapon", "defence", "rangedWeapon", "armour", "artifact", "transportation", "food"];
const RARITY_ORDER = ["common", "uncommon", "rare", "epicRare", "ultraRare", "legendary", "mythical", "elder", "exclusive"];

function getSortedInventoryIndices(inventory, filterMode) {
  // Build array of {index, item} for non-empty slots
  const items = [];
  const empties = [];
  for (let i = 0; i < 32; i++) {
    const item = inventory[i];
    if (item && typeof item === "object" && item.name) {
      items.push({ index: i, item });
    } else {
      empties.push(i);
    }
  }

  if (filterMode === "alphabetical") {
    items.sort((a, b) => (a.item.name || "").localeCompare(b.item.name || ""));
  } else if (filterMode === "type") {
    items.sort((a, b) => {
      const typeA = TYPE_ORDER.indexOf(a.item.type || "");
      const typeB = TYPE_ORDER.indexOf(b.item.type || "");
      if (typeA !== typeB) return typeA - typeB;
      // Within artifact: sort by level descending
      if (a.item.type === "artifact") {
        return (b.item.artifactLevel || 0) - (a.item.artifactLevel || 0);
      }
      return (a.item.name || "").localeCompare(b.item.name || "");
    });
  } else if (filterMode === "rarity") {
    items.sort((a, b) => {
      const rarA = a.item.type === "food" ? -1 : RARITY_ORDER.indexOf(a.item.rarity || "");
      const rarB = b.item.type === "food" ? -1 : RARITY_ORDER.indexOf(b.item.rarity || "");
      if (rarA !== rarB) return rarA - rarB;
      // Within exclusive: sort by power descending
      if (a.item.rarity === "exclusive" && b.item.rarity === "exclusive") {
        return (b.item.exclusivePower || 0) - (a.item.exclusivePower || 0);
      }
      return (a.item.name || "").localeCompare(b.item.name || "");
    });
  }

  // Return sorted item indices followed by empty indices
  return [...items.map(x => x.index), ...empties];
}

function renderInventory(inventory) {
  const grid = document.getElementById("inventory-grid");
  grid.innerHTML = "";
  const filterMode = document.getElementById("inventory-filter")?.value || "alphabetical";
  const sortedIndices = getSortedInventoryIndices(inventory, filterMode);

  for (const i of sortedIndices) {
    const cell = document.createElement("div");
    cell.className = "inv-cell";
    cell.dataset.index = i;
    const item = inventory[i] || "";

    // v1.2: items can be objects {name, emoji, type, rarity, count} or legacy strings
    if (item && typeof item === "object") {
      // Apply rarity border
      if (item.type === "food") {
        cell.classList.add("rarity-food");
      } else if (item.rarity) {
        cell.classList.add("rarity-" + item.rarity);
      }

      if (item.emoji) {
        // Has emoji(s): show up to 3 emojis + name below
        const emojis = extractEmojis(item.emoji);
        const emojiSpan = document.createElement("span");
        emojiSpan.className = "inv-emoji";
        emojiSpan.textContent = emojis.join("");
        if (emojis.length > 1) emojiSpan.style.fontSize = emojis.length === 3 ? "0.9rem" : "1.1rem";
        cell.appendChild(emojiSpan);
        if (item.name) {
          const nameSpan = document.createElement("span");
          nameSpan.className = "inv-name";
          nameSpan.textContent = item.name;
          cell.appendChild(nameSpan);
        }
      } else if (item.name) {
        // No emoji: name-only mode, show name larger and centered
        cell.classList.add("name-only");
        const nameSpan = document.createElement("span");
        nameSpan.className = "inv-name";
        nameSpan.textContent = item.name;
        cell.appendChild(nameSpan);
      }

      // Count
      if (item.count) {
        const countSpan = document.createElement("span");
        countSpan.className = "inv-count";
        countSpan.textContent = item.count;
        cell.appendChild(countSpan);
      }
      // Exclusive power badge (top-left)
      if (item.exclusivePower) {
        const powerSpan = document.createElement("span");
        powerSpan.className = "inv-power";
        powerSpan.textContent = item.exclusivePower;
        cell.appendChild(powerSpan);
      }
      // Artifact level badge (top-right)
      if (item.artifactLevel) {
        const levelSpan = document.createElement("span");
        levelSpan.className = "inv-level";
        levelSpan.textContent = "Lv." + item.artifactLevel;
        cell.appendChild(levelSpan);
      }
    } else if (item && typeof item === "string") {
      // Legacy string format - show with old logic
      const parsed = parseInventoryInput(item);
      if (parsed) {
        const emoji = getItemEmoji(parsed.text);
        const emojiSpan = document.createElement("span");
        emojiSpan.className = "inv-emoji";
        emojiSpan.textContent = emoji;
        cell.appendChild(emojiSpan);
        if (parsed.count !== null) {
          const countSpan = document.createElement("span");
          countSpan.className = "inv-count";
          countSpan.textContent = parsed.count;
          cell.appendChild(countSpan);
        }
      }
    }
    cell.addEventListener("click", () => openInventoryModal(i, item));
    grid.appendChild(cell);
  }
}

function openInventoryModal(index, currentItem) {
  if (viewingUser) return;
  inventoryEditIndex = index;
  selectedEmoji = null;

  const nameInput = document.getElementById("inv-name-input");
  const countInput = document.getElementById("inv-count-input");
  const typeInput = document.getElementById("inv-type-input");
  const rarityInput = document.getElementById("inv-rarity-input");
  const rarityRow = document.getElementById("inv-rarity-row");
  const emojiSearch = document.getElementById("inv-emoji-search");
  const emojiResults = document.getElementById("emoji-results");
  const emojiSelected = document.getElementById("emoji-selected");

  const emojiPaste = document.getElementById("inv-emoji-paste");

  const exclusivePowerRow = document.getElementById("inv-exclusive-power-row");
  const exclusivePowerInput = document.getElementById("inv-exclusive-power-input");
  const artifactLevelRow = document.getElementById("inv-artifact-level-row");
  const artifactLevelInput = document.getElementById("inv-artifact-level-input");

  // Reset
  nameInput.value = "";
  countInput.value = "";
  typeInput.value = "";
  rarityInput.value = "";
  rarityRow.style.display = "";
  exclusivePowerRow.classList.add("hidden");
  exclusivePowerInput.value = "";
  artifactLevelRow.classList.add("hidden");
  artifactLevelInput.value = "";
  emojiSearch.value = "";
  emojiPaste.value = "";
  emojiResults.innerHTML = "";
  emojiSelected.innerHTML = "";

  // Pre-fill if editing existing v1.2 object
  if (currentItem && typeof currentItem === "object") {
    nameInput.value = currentItem.name || "";
    countInput.value = currentItem.count || "";
    typeInput.value = currentItem.type || "";
    rarityInput.value = currentItem.rarity || "";
    if (currentItem.type === "food") {
      rarityRow.style.display = "none";
    }
    if (currentItem.rarity === "exclusive") {
      exclusivePowerRow.classList.remove("hidden");
      exclusivePowerInput.value = currentItem.exclusivePower || "";
    }
    if (currentItem.type === "artifact") {
      artifactLevelRow.classList.remove("hidden");
      artifactLevelInput.value = currentItem.artifactLevel || "";
    }
    if (currentItem.emoji) {
      selectedEmoji = currentItem.emoji;
      const emojiList = extractEmojis(currentItem.emoji);
      emojiSelected.innerHTML = `<span class="selected-emoji-display">${emojiList.join(" ")}</span> ${emojiList.length}/3 selected` +
        ` <span class="emoji-clear-btn" style="cursor:pointer;color:var(--danger);margin-left:8px;">Clear</span>`;
      emojiSelected.querySelector(".emoji-clear-btn").addEventListener("click", () => {
        selectedEmoji = null;
        emojiSelected.innerHTML = "";
      });
    }
  }

  document.getElementById("inventory-modal").classList.remove("hidden");
  nameInput.focus();
}

// Helper to update conditional rows
function updateInventoryConditionalRows() {
  const typeVal = document.getElementById("inv-type-input").value;
  const rarityVal = document.getElementById("inv-rarity-input").value;
  const rarityRow = document.getElementById("inv-rarity-row");
  const exclusivePowerRow = document.getElementById("inv-exclusive-power-row");
  const artifactLevelRow = document.getElementById("inv-artifact-level-row");

  // Food hides rarity
  if (typeVal === "food") {
    rarityRow.style.display = "none";
    document.getElementById("inv-rarity-input").value = "";
    exclusivePowerRow.classList.add("hidden");
  } else {
    rarityRow.style.display = "";
  }

  // Exclusive shows power selector
  if (rarityVal === "exclusive" && typeVal !== "food") {
    exclusivePowerRow.classList.remove("hidden");
  } else {
    exclusivePowerRow.classList.add("hidden");
    document.getElementById("inv-exclusive-power-input").value = "";
  }

  // Artifact shows level selector
  if (typeVal === "artifact") {
    artifactLevelRow.classList.remove("hidden");
  } else {
    artifactLevelRow.classList.add("hidden");
    document.getElementById("inv-artifact-level-input").value = "";
  }
}

// Type change
document.getElementById("inv-type-input").addEventListener("change", updateInventoryConditionalRows);

// Rarity change
document.getElementById("inv-rarity-input").addEventListener("change", updateInventoryConditionalRows);

// Inventory filter change — re-render with current data
document.getElementById("inventory-filter").addEventListener("change", async () => {
  const username = viewingUser || currentUser;
  if (!username) return;
  const doc = await db.collection("users").doc(username).get();
  if (doc.exists) {
    renderInventory(doc.data().inventory || new Array(32).fill(""));
  }
});

// Emoji search/picker
document.getElementById("inv-emoji-search").addEventListener("input", (e) => {
  const query = e.target.value.trim().toLowerCase();
  const results = document.getElementById("emoji-results");
  results.innerHTML = "";
  if (!query) return;

  const matches = [];
  const seenEmojis = new Set();
  for (const item of EMOJI_SEARCH_LIST) {
    if (item.keyword.includes(query) && !seenEmojis.has(item.emoji)) {
      seenEmojis.add(item.emoji);
      matches.push(item);
    }
  }
  // Also do partial match
  for (const item of EMOJI_SEARCH_LIST) {
    if (!seenEmojis.has(item.emoji) && item.keyword.startsWith(query)) {
      seenEmojis.add(item.emoji);
      matches.push(item);
    }
  }

  matches.slice(0, 40).forEach((item) => {
    const btn = document.createElement("div");
    btn.className = "emoji-option" + (selectedEmoji === item.emoji ? " selected" : "");
    btn.textContent = item.emoji;
    btn.title = item.keyword;
    btn.addEventListener("click", () => {
      // Multi-emoji: add to selectedEmoji string (up to 3)
      const currentEmojis = extractEmojis(selectedEmoji || "");
      if (currentEmojis.length < 3) {
        selectedEmoji = (selectedEmoji || "") + item.emoji;
      } else {
        // Replace last emoji
        selectedEmoji = currentEmojis.slice(0, 2).join("") + item.emoji;
      }
      const emojiList = extractEmojis(selectedEmoji);
      document.getElementById("emoji-selected").innerHTML =
        `<span class="selected-emoji-display">${emojiList.join(" ")}</span> ${emojiList.length}/3 selected` +
        ` <span class="emoji-clear-btn" style="cursor:pointer;color:var(--danger);margin-left:8px;">Clear</span>`;
      document.getElementById("emoji-selected").querySelector(".emoji-clear-btn").addEventListener("click", () => {
        selectedEmoji = null;
        document.getElementById("emoji-selected").innerHTML = "";
      });
      // Update selection visual
      results.querySelectorAll(".emoji-option").forEach((el) => el.classList.remove("selected"));
      btn.classList.add("selected");
    });
    results.appendChild(btn);
  });
});

// Paste emoji input — user can paste/type up to 3 emojis directly
document.getElementById("inv-emoji-paste").addEventListener("input", (e) => {
  const val = e.target.value.trim();
  if (val) {
    const emojis = extractEmojis(val).slice(0, 3);
    if (emojis.length > 0) {
      selectedEmoji = emojis.join("");
      document.getElementById("emoji-selected").innerHTML =
        `<span class="selected-emoji-display">${emojis.join(" ")}</span> ${emojis.length}/3 custom` +
        ` <span class="emoji-clear-btn" style="cursor:pointer;color:var(--danger);margin-left:8px;">Clear</span>`;
      document.getElementById("emoji-selected").querySelector(".emoji-clear-btn").addEventListener("click", () => {
        selectedEmoji = null;
        document.getElementById("emoji-selected").innerHTML = "";
        e.target.value = "";
      });
      document.getElementById("inv-emoji-search").value = "";
      document.getElementById("emoji-results").innerHTML = "";
    }
  }
});

document.getElementById("inv-cancel-btn").addEventListener("click", () => {
  document.getElementById("inventory-modal").classList.add("hidden");
});

document.getElementById("inv-clear-btn").addEventListener("click", async () => {
  if (inventoryEditIndex === null || !currentUser) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const inventory = doc.data().inventory || new Array(32).fill("");
  inventory[inventoryEditIndex] = "";
  await db.collection("users").doc(editTarget()).update({ inventory });
  renderInventory(inventory);
  document.getElementById("inventory-modal").classList.add("hidden");
});

document.getElementById("inv-save-btn").addEventListener("click", async () => {
  if (inventoryEditIndex === null || !currentUser) return;

  const name = document.getElementById("inv-name-input").value.trim();
  const countVal = document.getElementById("inv-count-input").value.trim();
  const type = document.getElementById("inv-type-input").value;
  const rarity = document.getElementById("inv-rarity-input").value;

  // Validation: need at least a name and type
  if (!name || !type) {
    alert("Please enter a name and select a type.");
    return;
  }
  // Food requires quantity
  if (type === "food" && !countVal) {
    alert("Food items require a quantity.");
    return;
  }
  // Non-food requires rarity
  if (type !== "food" && !rarity) {
    alert("Please select a rarity.");
    return;
  }
  // Exclusive requires power
  const exclusivePower = document.getElementById("inv-exclusive-power-input").value;
  if (rarity === "exclusive" && !exclusivePower) {
    alert("Exclusive items require a power level (1–8).");
    return;
  }
  // Artifact requires level
  const artifactLevel = document.getElementById("inv-artifact-level-input").value;
  if (type === "artifact" && !artifactLevel) {
    alert("Artifacts require a level (1–10).");
    return;
  }

  // Use selected emoji, or null if none picked (name-only mode)
  const emoji = selectedEmoji || null;

  const itemObj = {
    name: name,
    emoji: emoji,
    type: type,
    rarity: type === "food" ? "" : rarity,
    count: countVal ? parseIntOrInf(countVal) : null,
    exclusivePower: rarity === "exclusive" ? parseInt(exclusivePower) : null,
    artifactLevel: type === "artifact" ? parseInt(artifactLevel) : null
  };

  const doc = await db.collection("users").doc(editTarget()).get();
  const inventory = doc.data().inventory || new Array(32).fill("");
  inventory[inventoryEditIndex] = itemObj;
  await db.collection("users").doc(editTarget()).update({ inventory });
  renderInventory(inventory);
  document.getElementById("inventory-modal").classList.add("hidden");
});

// Keyboard shortcuts in inventory modal
document.getElementById("inv-name-input").addEventListener("keydown", (e) => {
  if (e.key === "Escape") document.getElementById("inv-cancel-btn").click();
});

// ============================================
// ABILITIES
// ============================================
function renderAbilities(abilities) {
  const container = document.getElementById("abilities-list");
  const countEl = document.getElementById("ability-count");
  const addArea = document.getElementById("ability-add-area");
  container.innerHTML = "";
  countEl.textContent = `(${abilities.length}/5)`;

  abilities.forEach((ab, i) => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `<div class="list-item-info"><span>${escapeHtml(ab.name)}</span><span class="list-item-sub">${escapeHtml(ab.level)}</span></div><button class="btn-remove" data-index="${i}">&times;</button>`;
    div.querySelector(".btn-remove").addEventListener("click", () => removeAbility(i));
    container.appendChild(div);
  });

  const canEdit = !viewingUser || isAdmin;
  if (abilities.length >= 5 && canEdit) {
    addArea.style.display = "none";
  } else if (canEdit) {
    addArea.style.display = "";
  } else {
    addArea.style.display = "none";
  }
}

document.getElementById("add-ability-btn").addEventListener("click", async () => {
  const nameInput = document.getElementById("ability-name-input");
  const levelInput = document.getElementById("ability-level-input");
  const name = nameInput.value.trim();
  const level = levelInput.value;
  if (!name || !level || !currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const abilities = doc.data().abilities || [];
  if (abilities.length >= 5) return;
  abilities.push({ name, level });
  await db.collection("users").doc(editTarget()).update({ abilities });
  nameInput.value = "";
  levelInput.value = "";
  renderAbilities(abilities);
});

async function removeAbility(index) {
  if (!currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const abilities = doc.data().abilities || [];
  abilities.splice(index, 1);
  await db.collection("users").doc(editTarget()).update({ abilities });
  renderAbilities(abilities);
}

// Back to own sheet
document.getElementById("back-to-own").addEventListener("click", () => {
  viewingUser = null;
  loadSheet(currentUser, true);
  // Update active state in user list
  document.querySelectorAll("#user-list li").forEach(li => {
    li.classList.toggle("active", li.textContent.includes(currentUser));
  });
});

// ============================================
// ENCHANTMENTS
// ============================================
function renderEnchantments(card, category, enchantments) {
  const container = card.querySelector(".enchant-list");
  container.innerHTML = "";
  enchantments.forEach((ench, i) => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `<div class="list-item-info"><span>${escapeHtml(ench.name)}</span><span class="list-item-sub">${escapeHtml(ench.level)}</span></div><button class="btn-remove" data-index="${i}">&times;</button>`;
    div.querySelector(".btn-remove").addEventListener("click", () => removeEnchantment(card, category, i));
    container.appendChild(div);
  });
}

// Set up enchantment add buttons for all equipment cards
document.querySelectorAll(".equip-card").forEach(card => {
  const cat = card.dataset.category;
  const addBtn = card.querySelector(".enchant-add-btn");
  if (!addBtn) return;

  addBtn.addEventListener("click", async () => {
    if (!currentUser || (viewingUser && !isAdmin)) return;
    const nameInput = card.querySelector(".enchant-name-input");
    const levelInput = card.querySelector(".enchant-level-input");
    const name = nameInput.value.trim();
    const level = levelInput.value;
    if (!name || !level) return;
    const doc = await db.collection("users").doc(editTarget()).get();
    const catData = doc.data()[cat] || {};
    const enchantments = catData.enchantments || [];
    enchantments.push({ name, level });
    await db.collection("users").doc(editTarget()).update({ [`${cat}.enchantments`]: enchantments });
    nameInput.value = "";
    levelInput.value = "";
    renderEnchantments(card, cat, enchantments);
  });
});

async function removeEnchantment(card, category, index) {
  if (!currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const catData = doc.data()[category] || {};
  const enchantments = catData.enchantments || [];
  enchantments.splice(index, 1);
  await db.collection("users").doc(editTarget()).update({ [`${category}.enchantments`]: enchantments });
  renderEnchantments(card, category, enchantments);
}

// ============================================
// TRANSPORTATION WEAPONS LIST
// ============================================
function renderTransportWeapons(weapons) {
  const container = document.getElementById("transport-weapons-list");
  container.innerHTML = "";
  // Handle legacy number format
  if (typeof weapons === "number" || !Array.isArray(weapons)) {
    weapons = [];
  }
  weapons.forEach((w, i) => {
    const div = document.createElement("div");
    div.className = "list-item";
    const ammoDisplay = w.maxAmmo != null ? `${w.ammo}/${w.maxAmmo}` : `${w.ammo}`;
    div.innerHTML = `<div class="list-item-info"><span>${escapeHtml(w.name)}</span><span class="list-item-sub">Ammo: ${ammoDisplay}</span></div><button class="btn-remove" data-index="${i}">&times;</button>`;
    div.querySelector(".btn-remove").addEventListener("click", () => removeTransportWeapon(i));
    container.appendChild(div);
  });
}

document.querySelector(".transport-weapon-add-btn").addEventListener("click", async () => {
  if (!currentUser || (viewingUser && !isAdmin)) return;
  const card = document.querySelector('.equip-card[data-category="transportation"]');
  const nameInput = card.querySelector(".transport-weapon-name-input");
  const ammoInput = card.querySelector(".transport-weapon-ammo-input");
  const maxAmmoInput = card.querySelector(".transport-weapon-maxammo-input");
  const name = nameInput.value.trim();
  const ammo = parseIntOrInf(ammoInput.value);
  const maxAmmo = parseIntOrInf(maxAmmoInput.value);
  if (!name || ammo === null || maxAmmo === null) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const catData = doc.data().transportation || {};
  let weapons = catData.weapons || [];
  if (!Array.isArray(weapons)) weapons = [];
  weapons.push({ name, ammo, maxAmmo });
  await db.collection("users").doc(editTarget()).update({ "transportation.weapons": weapons });
  nameInput.value = "";
  ammoInput.value = "";
  maxAmmoInput.value = "";
  renderTransportWeapons(weapons);
});

async function removeTransportWeapon(index) {
  if (!currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const catData = doc.data().transportation || {};
  let weapons = catData.weapons || [];
  if (!Array.isArray(weapons)) weapons = [];
  weapons.splice(index, 1);
  await db.collection("users").doc(editTarget()).update({ "transportation.weapons": weapons });
  renderTransportWeapons(weapons);
}

// ============================================
// MEGA GEMS
// ============================================
const MEGA_GEM_COLORS = {
  "Black Mega Gem": "#aaaaaa",
  "Blue Mega Gem": "#4488ff",
  "Yellow Mega Gem": "#ffcc00",
  "Purple Mega Gem": "#aa66dd"
};

const MEGA_OUTLINE_COLORS = {
  "Red": "#e84057",
  "Light blue": "#66ccff",
  "Green": "#44cc66",
  "Yellow": "#ffcc00"
};

function renderMegaGems(megaGems) {
  const container = document.getElementById("gems-mega-list");
  container.innerHTML = "";
  megaGems.forEach((mg, i) => {
    const div = document.createElement("div");
    div.className = "list-item";
    const gemColor = MEGA_GEM_COLORS[mg.type] || "#666";
    const primeText = mg.prime ? ` (Prime - ${mg.outline} outline)` : "";
    const outlineStyle = mg.prime && mg.outline ? `border: 2px solid ${MEGA_OUTLINE_COLORS[mg.outline] || '#fff'}; border-radius: 4px; padding: 2px 4px;` : "";
    div.innerHTML = `<div class="list-item-info" style="${outlineStyle}"><span style="color:${gemColor}">${escapeHtml(mg.type)}</span><span class="list-item-sub">&times;${mg.quantity}${escapeHtml(primeText)}</span></div><button class="btn-remove" data-index="${i}">&times;</button>`;
    div.querySelector(".btn-remove").addEventListener("click", () => removeMegaGem(i));
    container.appendChild(div);
  });
}

// Prime checkbox toggle
document.getElementById("mega-gem-prime-input").addEventListener("change", function () {
  const outlineSelect = document.getElementById("mega-gem-outline-input");
  if (this.checked) {
    outlineSelect.classList.remove("hidden");
  } else {
    outlineSelect.classList.add("hidden");
    outlineSelect.value = "";
  }
});

const megaGemBtn = document.getElementById("add-mega-gem-btn");
if (megaGemBtn) {
  megaGemBtn.addEventListener("click", async () => {
    try {
      if (!currentUser || (viewingUser && !isAdmin)) return;
      const typeInput = document.getElementById("mega-gem-type-input");
      const qtyInput = document.getElementById("mega-gem-qty-input");
      const primeInput = document.getElementById("mega-gem-prime-input");
      const outlineInput = document.getElementById("mega-gem-outline-input");

      const type = typeInput.value;
      const qtyVal = qtyInput.value.trim();
      const quantity = qtyVal === "∞" ? "∞" : parseInt(qtyVal, 10);
      const prime = primeInput.checked;
      const outline = outlineInput.value;

      if (!type) { alert("Please select a mega gem type."); return; }
      if (qtyVal === "" || (quantity !== "∞" && (isNaN(quantity) || quantity < 1))) { alert("Please enter a valid quantity."); return; }
      if (prime && !outline) { alert("Prime gems require an outline colour."); return; }

      const doc = await db.collection("users").doc(editTarget()).get();
      const megaGems = doc.data().megaGems || [];
      megaGems.push({ type, quantity, prime, outline: prime ? outline : "" });
      await db.collection("users").doc(editTarget()).update({ megaGems });
      typeInput.value = "";
      qtyInput.value = "";
      primeInput.checked = false;
      outlineInput.classList.add("hidden");
      outlineInput.value = "";
      renderMegaGems(megaGems);
    } catch (err) {
      console.error("Mega gem add error:", err);
      alert("Error adding mega gem: " + err.message);
    }
  });
} else {
  console.error("add-mega-gem-btn not found in DOM!");
}

async function removeMegaGem(index) {
  if (!currentUser || (viewingUser && !isAdmin)) return;
  const doc = await db.collection("users").doc(editTarget()).get();
  const megaGems = doc.data().megaGems || [];
  megaGems.splice(index, 1);
  await db.collection("users").doc(editTarget()).update({ megaGems });
  renderMegaGems(megaGems);
}

// --- Utility ---
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

// ============================================
// MAIN TAB SWITCHING
// ============================================
document.querySelectorAll(".main-tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".main-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".main-tab-content").forEach(c => c.classList.add("hidden"));
    btn.classList.add("active");
    document.getElementById("main-tab-" + btn.dataset.tab).classList.remove("hidden");
    if (btn.dataset.tab === "news") loadNews();
    if (btn.dataset.tab === "chat") {
      initChat();
      document.getElementById("chat-notification-badge").classList.add("hidden");
    }
  });
});

// ============================================
// NEWS
// ============================================
let isAdmin = false;
let editingNewsId = null;
let pendingDeleteId = null;
let newsImageFile = null;
let newsImageBase64 = null;

function checkAdmin() {
  isAdmin = currentUser === ADMIN_USERNAME;
  document.getElementById("add-news-btn").classList.toggle("hidden", !isAdmin);
}

function formatNewsTimestamp(ts) {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let h = d.getHours(), m = d.getMinutes(), ampm = "AM";
  if (h >= 12) { ampm = "PM"; if (h > 12) h -= 12; }
  if (h === 0) h = 12;
  const mm = m < 10 ? "0" + m : m;
  return `${months[d.getMonth()]} ${d.getDate()}, ${h}:${mm} ${ampm}`;
}

async function loadNews() {
  const feed = document.getElementById("news-feed");
  feed.innerHTML = `<p class="news-empty">Loading...</p>`;
  try {
    const snap = await db.collection("news").orderBy("createdAt", "desc").get();
    if (snap.empty) {
      feed.innerHTML = `<p class="news-empty">No news yet. Check back soon!</p>`;
      return;
    }
    feed.innerHTML = "";
    snap.forEach(docSnap => {
      feed.appendChild(buildNewsCard(docSnap.id, docSnap.data()));
    });
  } catch (e) {
    feed.innerHTML = `<p class="news-empty">Error loading news.</p>`;
  }
}

function buildNewsCard(id, data) {
  const card = document.createElement("div");
  card.className = "news-card";

  const header = document.createElement("div");
  header.className = "news-card-header";

  const titleEl = document.createElement("div");
  titleEl.className = "news-card-title";
  titleEl.textContent = data.title || "Untitled";
  header.appendChild(titleEl);

  if (isAdmin) {
    const actions = document.createElement("div");
    actions.className = "news-admin-actions";
    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-small";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => openNewsModal(id, data));
    const delBtn = document.createElement("button");
    delBtn.className = "btn btn-small btn-danger";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => openDeleteModal(id));
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    header.appendChild(actions);
  }

  card.appendChild(header);

  if (data.imageUrl) {
    const img = document.createElement("img");
    img.src = data.imageUrl;
    img.alt = data.title || "";
    img.style.maxWidth = "100%";
    img.style.maxHeight = "400px";
    img.style.objectFit = "cover";
    card.appendChild(img);
  }

  if (data.description) {
    const body = document.createElement("div");
    body.className = "news-card-body";
    body.textContent = data.description;
    card.appendChild(body);
  }

  const ts = document.createElement("div");
  ts.className = "news-card-timestamp";
  ts.textContent = formatNewsTimestamp(data.createdAt);
  card.appendChild(ts);

  return card;
}

// ---- News Modal ----
function openNewsModal(id = null, data = null) {
  editingNewsId = id;
  newsImageFile = null;
  newsImageBase64 = null;
  document.getElementById("news-modal-title").textContent = id ? "Edit Post" : "New Post";
  document.getElementById("news-post-title").value = data ? (data.title || "") : "";
  document.getElementById("news-post-desc").value = data ? (data.description || "") : "";
  document.getElementById("news-post-image").value = "";
  const preview = document.getElementById("news-image-preview");
  if (data && data.imageUrl) {
    preview.innerHTML = `<img src="${data.imageUrl}" alt="current image" style="max-width: 100%; max-height: 300px;">`;
  } else {
    preview.innerHTML = "";
  }
  document.getElementById("news-modal").classList.remove("hidden");
}

document.getElementById("add-news-btn").addEventListener("click", () => openNewsModal());

document.getElementById("news-modal-cancel").addEventListener("click", () => {
  document.getElementById("news-modal").classList.add("hidden");
});

document.getElementById("news-post-image").addEventListener("change", (e) => {
  newsImageFile = e.target.files[0] || null;
  const preview = document.getElementById("news-image-preview");
  if (newsImageFile) {
    const url = URL.createObjectURL(newsImageFile);
    preview.innerHTML = `<img src="${url}" alt="preview" style="max-width: 100%; max-height: 300px;">`;
  } else {
    preview.innerHTML = "";
  }
});

document.getElementById("news-modal-save").addEventListener("click", async () => {
  if (!isAdmin) return;
  const title = document.getElementById("news-post-title").value.trim();
  const desc = document.getElementById("news-post-desc").value.trim();
  if (!title) { alert("Please enter a title."); return; }

  const saveBtn = document.getElementById("news-modal-save");
  saveBtn.disabled = true;
  saveBtn.textContent = "Saving...";

  try {
    let imageUrl = null;
    // If editing, keep existing image unless new one uploaded
    if (editingNewsId) {
      const existing = await db.collection("news").doc(editingNewsId).get();
      imageUrl = existing.data().imageUrl || null;
    }

    // Upload new image to Firebase Storage if provided
    if (newsImageFile) {
      const ext = newsImageFile.name.split(".").pop();
      const ref = storage.ref(`news/${Date.now()}.${ext}`);
      await ref.put(newsImageFile);
      imageUrl = await ref.getDownloadURL();
    }

    const postData = {
      title,
      description: desc,
      imageUrl: imageUrl || null,
      createdAt: editingNewsId
        ? (await db.collection("news").doc(editingNewsId).get()).data().createdAt
        : firebase.firestore.Timestamp.now()
    };

    if (editingNewsId) {
      await db.collection("news").doc(editingNewsId).update(postData);
    } else {
      await db.collection("news").add(postData);
    }

    document.getElementById("news-modal").classList.add("hidden");
    loadNews();
  } catch (e) {
    alert("Error saving post: " + e.message);
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = "Post";
  }
});

// ---- Delete Modal ----
function openDeleteModal(id) {
  pendingDeleteId = id;
  document.getElementById("news-delete-modal").classList.remove("hidden");
}

document.getElementById("news-delete-cancel").addEventListener("click", () => {
  document.getElementById("news-delete-modal").classList.add("hidden");
  pendingDeleteId = null;
});

document.getElementById("news-delete-confirm").addEventListener("click", async () => {
  if (!pendingDeleteId || !isAdmin) return;
  try {
    // Delete image from Storage if it exists
    const docSnap = await db.collection("news").doc(pendingDeleteId).get();
    const imageUrl = docSnap.data()?.imageUrl;
    if (imageUrl) {
      try {
        await storage.refFromURL(imageUrl).delete();
      } catch (imgErr) {
        console.warn("Image delete failed (may already be gone):", imgErr.message);
      }
    }
    await db.collection("news").doc(pendingDeleteId).delete();
    document.getElementById("news-delete-modal").classList.add("hidden");
    pendingDeleteId = null;
    loadNews();
  } catch (e) {
    alert("Error deleting post: " + e.message);
  }
});

// ============================================
// CHAT
// ============================================
let chatUnsubscribe = null;
let replyingTo = null;       // { id, username, text }
let editingMsgId = null;

function formatChatTimestamp(ts) {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let h = d.getHours(), m = d.getMinutes(), ampm = "AM";
  if (h >= 12) { ampm = "PM"; if (h > 12) h -= 12; }
  if (h === 0) h = 12;
  const mm = m < 10 ? "0" + m : m;
  return `${months[d.getMonth()]} ${d.getDate()}, ${h}:${mm} ${ampm}`;
}

function buildChatBubble(id, data) {
  const isOwn = data.username === currentUser;
  const wrapper = document.createElement("div");
  const isMentioned = !isOwn && data.text && (
    data.text.includes(`@${currentUser}`) ||
    ((!data.recipient || data.recipient === "everyone") && data.text.includes("@everyone"))
  );
  wrapper.className = "chat-msg " + (isOwn ? "own" : "other") + (isMentioned ? " mentioned" : "");
  wrapper.dataset.id = id;

  // Username
  if (!isOwn) {
    const uname = document.createElement("div");
    uname.className = "chat-msg-username";
    uname.textContent = data.username;
    wrapper.appendChild(uname);
  }

  // Reply preview
  if (data.replyTo) {
    const rp = document.createElement("div");
    rp.className = "chat-msg-reply-preview";
    rp.textContent = `↩ ${data.replyTo.username}: ${data.replyTo.text}`;
    wrapper.appendChild(rp);
  }

  // Bubble
  const bubble = document.createElement("div");
  bubble.className = "chat-msg-bubble";
  bubble.innerHTML = renderMentionText(data.text);
  wrapper.appendChild(bubble);

  // Edited label
  if (data.editedAt) {
    const ed = document.createElement("div");
    ed.className = "chat-msg-edited";
    ed.textContent = "(edited)";
    wrapper.appendChild(ed);
  }

  // Private tag
  if (data.recipient && data.recipient !== "everyone") {
    const tag = document.createElement("div");
    tag.className = "chat-msg-private-tag";
    tag.textContent = isOwn
      ? `🔒 Private → ${data.recipient}`
      : `🔒 Private`;
    wrapper.appendChild(tag);
  }

  // Timestamp
  const ts = document.createElement("div");
  ts.className = "chat-msg-timestamp";
  ts.textContent = formatChatTimestamp(data.createdAt);
  wrapper.appendChild(ts);

  // Action buttons
  const actions = document.createElement("div");
  actions.className = "chat-msg-actions";

  // Reply button (everyone)
  const replyBtn = document.createElement("button");
  replyBtn.className = "chat-msg-action-btn";
  replyBtn.textContent = "↩ Reply";
  replyBtn.addEventListener("click", () => {
    replyingTo = { id, username: data.username, text: data.text.slice(0, 80) };
    const bar = document.getElementById("chat-reply-bar");
    bar.classList.remove("hidden");
    document.getElementById("chat-reply-preview").textContent =
      `Replying to ${data.username}: ${replyingTo.text}${data.text.length > 80 ? "…" : ""}`;
    document.getElementById("chat-input").focus();
  });
  actions.appendChild(replyBtn);

  // Edit + Delete (own messages only)
  if (isOwn) {
    const editBtn = document.createElement("button");
    editBtn.className = "chat-msg-action-btn";
    editBtn.textContent = "✏ Edit";
    editBtn.addEventListener("click", () => {
      editingMsgId = id;
      document.getElementById("chat-edit-input").value = data.text;
      document.getElementById("chat-edit-modal").classList.remove("hidden");
    });
    actions.appendChild(editBtn);

    const delBtn = document.createElement("button");
    delBtn.className = "chat-msg-action-btn danger";
    delBtn.textContent = "🗑 Delete";
    delBtn.addEventListener("click", async () => {
      if (!confirm("Delete this message?")) return;
      await db.collection("chat").doc(id).delete();
    });
    actions.appendChild(delBtn);
  }

  wrapper.appendChild(actions);
  return wrapper;
}

let chatUsersUnsubscribe = null;

function initChat() {
  if (chatUnsubscribe) return; // already listening
  const feed = document.getElementById("chat-messages");
  feed.innerHTML = `<div class="chat-empty">Loading...</div>`;

  // Populate + live-update recipient dropdown from users collection
  if (!chatUsersUnsubscribe) {
    chatUsersUnsubscribe = db.collection("users").onSnapshot(snap => {
      const select = document.getElementById("chat-recipient");
      const current = select.value;
      select.innerHTML = `<option value="everyone">Everyone</option>`;
      snap.forEach(doc => {
        if (doc.id !== currentUser) {
          const opt = document.createElement("option");
          opt.value = doc.id;
          opt.textContent = doc.id;
          select.appendChild(opt);
        }
      });
      // Restore previous selection if still valid
      if ([...select.options].some(o => o.value === current)) {
        select.value = current;
      }
    });
  }

  // Listen to messages, filter by visibility
  let firstLoad = true;
  chatUnsubscribe = db.collection("chat")
    .orderBy("createdAt", "asc")
    .onSnapshot(snap => {
      // Notification badge for new @mentions, @everyone, and private messages
      if (!firstLoad) {
        snap.docChanges().forEach(change => {
          if (change.type === "added") {
            const data = change.doc.data();
            const chatHidden = document.getElementById("main-tab-chat").classList.contains("hidden");
            if (chatHidden && data.username !== currentUser) {
              const isPublic = !data.recipient || data.recipient === "everyone";
              const mentionsMe = data.text && data.text.includes(`@${currentUser}`);
              const everyonePing = isPublic && data.text && data.text.includes("@everyone");
              const privateToMe = data.recipient === currentUser;
              if (mentionsMe || everyonePing || privateToMe) {
                document.getElementById("chat-notification-badge").classList.remove("hidden");
              }
            }
          }
        });
      }
      firstLoad = false;

      feed.innerHTML = "";
      let hasVisible = false;
      snap.forEach(doc => {
        const data = doc.data();
        // Show if: everyone message, or private between currentUser and other party
        const isPublic = !data.recipient || data.recipient === "everyone";
        const isForMe = data.recipient === currentUser;
        const isMine = data.username === currentUser;
        if (isPublic || isForMe || (isMine && data.recipient !== "everyone")) {
          feed.appendChild(buildChatBubble(doc.id, data));
          hasVisible = true;
        }
      });
      if (!hasVisible) {
        feed.innerHTML = `<div class="chat-empty">No messages yet. Say hello!</div>`;
      }
      feed.scrollTop = feed.scrollHeight;
    }, err => {
      feed.innerHTML = `<div class="chat-empty">Error loading chat.</div>`;
      console.error(err);
    });
}

// Auto-resize textarea + @mention autocomplete
document.getElementById("chat-input").addEventListener("input", function() {
  this.style.height = "auto";
  this.style.height = Math.min(this.scrollHeight, 120) + "px";

  // @mention autocomplete
  const val = this.value;
  const pos = this.selectionStart;
  const textBefore = val.substring(0, pos);
  const atMatch = textBefore.match(/@(\w*)$/);
  const dropdown = document.getElementById("mention-dropdown");

  if (atMatch) {
    const query = atMatch[1].toLowerCase();
    const recipient = document.getElementById("chat-recipient").value || "everyone";
    const userMatches = allUsernames.filter(u => u.toLowerCase().startsWith(query)).slice(0, 5);
    const includeEveryone = recipient === "everyone" && "everyone".startsWith(query);
    const matches = includeEveryone ? ["everyone", ...userMatches] : userMatches;
    if (matches.length > 0) {
      dropdown.innerHTML = "";
      matches.forEach(u => {
        const item = document.createElement("div");
        item.className = "mention-item" + (u === "everyone" ? " mention-item-everyone" : "");
        item.textContent = "@" + u;
        item.addEventListener("mousedown", (e) => {
          e.preventDefault();
          const before = val.substring(0, pos - atMatch[0].length);
          const after = val.substring(pos);
          this.value = before + "@" + u + " " + after;
          dropdown.classList.add("hidden");
          this.focus();
          this.style.height = "auto";
          this.style.height = Math.min(this.scrollHeight, 120) + "px";
        });
        dropdown.appendChild(item);
      });
      dropdown.classList.remove("hidden");
    } else {
      dropdown.classList.add("hidden");
    }
  } else {
    dropdown.classList.add("hidden");
  }
});

document.getElementById("chat-input").addEventListener("blur", () => {
  setTimeout(() => document.getElementById("mention-dropdown").classList.add("hidden"), 150);
});

// Send on Enter (Shift+Enter for newline)
document.getElementById("chat-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendChatMessage();
  }
});

document.getElementById("chat-send-btn").addEventListener("click", sendChatMessage);

async function sendChatMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text || !currentUser) return;

  const recipient = document.getElementById("chat-recipient").value || "everyone";

  // @everyone is only allowed in public messages
  if (text.includes("@everyone") && recipient !== "everyone") {
    alert("@everyone can only be used in messages sent to Everyone.");
    return;
  }
  const msgData = {
    username: currentUser,
    text,
    recipient,
    createdAt: firebase.firestore.Timestamp.now(),
    editedAt: null,
    replyTo: replyingTo || null
  };

  try {
    await db.collection("chat").add(msgData);
    input.value = "";
    input.style.height = "auto";
    replyingTo = null;
    document.getElementById("chat-reply-bar").classList.add("hidden");
    document.getElementById("chat-reply-preview").textContent = "";
  } catch (e) {
    alert("Error sending message: " + e.message);
  }
}

// Cancel reply
document.getElementById("chat-reply-cancel").addEventListener("click", () => {
  replyingTo = null;
  document.getElementById("chat-reply-bar").classList.add("hidden");
  document.getElementById("chat-reply-preview").textContent = "";
});

// Edit modal
document.getElementById("chat-edit-cancel").addEventListener("click", () => {
  document.getElementById("chat-edit-modal").classList.add("hidden");
  editingMsgId = null;
});

document.getElementById("chat-edit-save").addEventListener("click", async () => {
  const newText = document.getElementById("chat-edit-input").value.trim();
  if (!newText || !editingMsgId) return;
  try {
    await db.collection("chat").doc(editingMsgId).update({
      text: newText,
      editedAt: firebase.firestore.Timestamp.now()
    });
    document.getElementById("chat-edit-modal").classList.add("hidden");
    editingMsgId = null;
  } catch (e) {
    alert("Error editing message: " + e.message);
  }
});

// Clean up chat listener on logout
const _origLogout = document.getElementById("logout-btn").onclick;
document.getElementById("logout-btn").addEventListener("click", () => {
  if (chatUnsubscribe) { chatUnsubscribe(); chatUnsubscribe = null; }
  if (chatUsersUnsubscribe) { chatUsersUnsubscribe(); chatUsersUnsubscribe = null; }
  replyingTo = null;
  editingMsgId = null;
});

// ============================================
// DELETE ACCOUNT
// ============================================
document.getElementById("delete-account-btn").addEventListener("click", () => {
  document.getElementById("delete-account-password").value = "";
  document.getElementById("delete-account-error").textContent = "";
  document.getElementById("delete-account-modal").classList.remove("hidden");
  document.getElementById("delete-account-password").focus();
});

document.getElementById("delete-account-cancel").addEventListener("click", () => {
  document.getElementById("delete-account-modal").classList.add("hidden");
});

document.getElementById("delete-account-confirm").addEventListener("click", async () => {
  const pw = document.getElementById("delete-account-password").value;
  const errorEl = document.getElementById("delete-account-error");
  const confirmBtn = document.getElementById("delete-account-confirm");
  errorEl.textContent = "";

  if (!pw) { errorEl.textContent = "Please enter your password."; return; }

  confirmBtn.disabled = true;
  confirmBtn.textContent = "Deleting...";

  try {
    // Verify password
    const pwHash = await hashPassword(pw);
    const userDoc = await db.collection("users").doc(currentUser).get();
    if (!userDoc.exists || userDoc.data().passwordHash !== pwHash) {
      errorEl.textContent = "Incorrect password. Try again.";
      confirmBtn.disabled = false;
      confirmBtn.textContent = "Delete My Account";
      return;
    }

    // Delete user's chat messages
    const chatSnap = await db.collection("chat").where("username", "==", currentUser).get();
    const batch = db.batch();
    chatSnap.forEach(doc => batch.delete(doc.ref));

    // Delete user document
    batch.delete(db.collection("users").doc(currentUser));
    await batch.commit();

    // Clean up and log out
    document.getElementById("delete-account-modal").classList.add("hidden");
    if (chatUnsubscribe) { chatUnsubscribe(); chatUnsubscribe = null; }
    if (chatUsersUnsubscribe) { chatUsersUnsubscribe(); chatUsersUnsubscribe = null; }
    if (userListUnsubscribe) { userListUnsubscribe(); userListUnsubscribe = null; }
    clearInterval(statusHeartbeat); statusHeartbeat = null;
    userListData = {}; allUsernames = [];
    localStorage.removeItem("ewUser");
    currentUser = null;
    viewingUser = null;
    isAdmin = false;
    showScreen("auth-screen");
    document.getElementById("username-input").value = "";
    document.getElementById("password-input").value = "";
  } catch (e) {
    errorEl.textContent = "Error deleting account: " + e.message;
    confirmBtn.disabled = false;
    confirmBtn.textContent = "Delete My Account";
  }
});

// ============================================
// BEFOREUNLOAD — set user offline
// ============================================
window.addEventListener("beforeunload", () => {
  clearInterval(statusHeartbeat);
  if (currentUser) {
    db.collection("users").doc(currentUser).update({ online: false });
  }
});

// ============================================
// AUTO-LOGIN — restore session from localStorage
// ============================================
(async function tryAutoLogin() {
  const savedUser = localStorage.getItem("ewUser");
  if (!savedUser) return;
  try {
    const doc = await db.collection("users").doc(savedUser).get();
    if (doc.exists) {
      currentUser = savedUser;
      onLogin();
    } else {
      localStorage.removeItem("ewUser");
    }
  } catch (e) {
    console.error("Auto-login failed:", e);
    localStorage.removeItem("ewUser");
  }
})();
