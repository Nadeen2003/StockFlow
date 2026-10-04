// StockFlow frontend preview: sample records and basic page/modal interactions only.
const categories = [
  {
    id: 1,
    name: "Electronics",
    icon: "⌁",
    color: "#f0edff",
    ink: "#7353df",
    count: 8,
  },
  {
    id: 2,
    name: "Accessories",
    icon: "◇",
    color: "#eaf6ff",
    ink: "#4294d7",
    count: 6,
  },
  {
    id: 3,
    name: "Office supplies",
    icon: "▤",
    color: "#eaf8f1",
    ink: "#29a477",
    count: 4,
  },
  {
    id: 4,
    name: "Furniture",
    icon: "⌂",
    color: "#fff4e6",
    ink: "#d39634",
    count: 3,
  },
  {
    id: 5,
    name: "Storage",
    icon: "▣",
    color: "#fff0f1",
    ink: "#d66c76",
    count: 2,
  },
  {
    id: 6,
    name: "Other",
    icon: "✳",
    color: "#eef1f6",
    ink: "#77849a",
    count: 1,
  },
];

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    sku: "WM-001",
    quantity: 25,
    price: 15,
    categoryId: 1,
    icon: "🖱️",
    color: "#f1edff",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    sku: "KB-001",
    quantity: 4,
    price: 45,
    categoryId: 1,
    icon: "⌨️",
    color: "#eaf5ff",
  },
  {
    id: 3,
    name: "USB-C Cable",
    sku: "UC-001",
    quantity: 50,
    price: 8,
    categoryId: 2,
    icon: "🔌",
    color: "#eaf8f1",
  },
  {
    id: 4,
    name: "Laptop Stand",
    sku: "LS-002",
    quantity: 3,
    price: 32,
    categoryId: 2,
    icon: "💻",
    color: "#fff4e5",
  },
  {
    id: 5,
    name: "Desk Lamp",
    sku: "DL-003",
    quantity: 18,
    price: 24,
    categoryId: 3,
    icon: "💡",
    color: "#fff1ec",
  },
  {
    id: 6,
    name: "Notebook Set",
    sku: "NS-014",
    quantity: 2,
    price: 12,
    categoryId: 3,
    icon: "📒",
    color: "#fceefa",
  },
];

const transactions = [
  {
    id: 1,
    productId: 3,
    type: "IN",
    quantity: 20,
    reason: "Purchase",
    date: "Oct 2, 2026",
    time: "10:42 AM",
  },
  {
    id: 2,
    productId: 1,
    type: "OUT",
    quantity: 2,
    reason: "Sale",
    date: "Oct 2, 2026",
    time: "09:18 AM",
  },
  {
    id: 3,
    productId: 5,
    type: "IN",
    quantity: 10,
    reason: "Purchase",
    date: "Oct 1, 2026",
    time: "04:35 PM",
  },
  {
    id: 4,
    productId: 2,
    type: "OUT",
    quantity: 1,
    reason: "Sale",
    date: "Oct 1, 2026",
    time: "02:10 PM",
  },
  {
    id: 5,
    productId: 4,
    type: "OUT",
    quantity: 2,
    reason: "Damaged",
    date: "Sep 30, 2026",
    time: "11:06 AM",
  },
  {
    id: 6,
    productId: 6,
    type: "IN",
    quantity: 5,
    reason: "Return",
    date: "Sep 29, 2026",
    time: "03:22 PM",
  },
];

const categoryFor = (id) =>
  categories.find((category) => category.id === id)?.name ?? "Uncategorized";
const productFor = (id) => products.find((product) => product.id === id);
const productCell = (product) =>
  `<div class="product-cell"><span class="product-thumb" style="background:${product.color || "#98d1e8"}">${product.icon || "📦"}</span><span><span class="product-name">${product.name}</span><span class="product-meta">${product.sku}</span></span></div>`;
const typePill = (type) =>
  `<span class="type-pill ${type === "IN" ? "type-in" : "type-out"}"><i class="type-dot"></i>Stock ${type === "IN" ? "in" : "out"}</span>`;

function renderDashboard() {
  document.querySelector("#recentRows").innerHTML = transactions
    .slice(0, 4)
    .map((transaction) => {
      const product = productFor(transaction.productId);
      return `<tr><td>${productCell(product)}</td><td>${typePill(transaction.type)}</td><td class="${transaction.type === "IN" ? "qty-in" : "qty-out"}">${transaction.type === "IN" ? "+" : "−"}${transaction.quantity} units</td><td class="date-cell">${transaction.date}</td></tr>`;
    })
    .join("");

  document.querySelector("#lowStockList").innerHTML = products
    .filter((product) => product.quantity <= 5)
    .map(
      (product) => `
    <div class="low-item"><span class="product-thumb" style="background:${product.color}">${product.icon}</span><div class="low-product"><strong>${product.name}</strong><span>${product.sku}</span><div class="stock-track"><i style="width:${Math.max(product.quantity * 8, 8)}%"></i></div></div><div class="low-qty"><strong>${product.quantity} left</strong><span>Low stock</span></div></div>`,
    )
    .join("");
}

function renderProducts() {
  document.querySelector("#productRows").innerHTML = products
    .map(
      (product) => `
    <tr><td>${productCell(product)}</td><td>${product.sku}</td><td>${categoryFor(product.categoryId)}</td><td><span class="stock-cell"><i class="stock-indicator ${product.quantity <= 2 ? "out" : product.quantity <= 5 ? "low" : ""}"></i><span class="stock-number">${product.quantity}</span> units</span></td><td>$${product.price.toFixed(2)}</td><td><button class="row-actions" aria-label="Product actions">···</button></td></tr>`,
    )
    .join("");
}

function renderTransactions() {
  document.querySelector("#transactionRows").innerHTML = transactions
    .map((transaction) => {
      const product = productFor(transaction.productId);
      return `<tr><td>${productCell(product)}</td><td>${typePill(transaction.type)}</td><td class="${transaction.type === "IN" ? "qty-in" : "qty-out"}">${transaction.type === "IN" ? "+" : "−"}${transaction.quantity} units</td><td>${transaction.reason}</td><td class="date-cell">${transaction.date} <span class="product-meta">${transaction.time}</span></td></tr>`;
    })
    .join("");
}

function renderCategories() {
  document.querySelector("#categoryGrid").innerHTML = categories
    .map(
      (category) => `
    <article class="category-card"><div class="category-top"><span class="category-symbol" style="color:${category.ink};background:${category.color}">${category.icon}</span><button class="category-actions" aria-label="Category actions">···</button></div><h3>${category.name}</h3><p>${category.count} products</p></article>`,
    )
    .join("");
}

renderDashboard();
renderProducts();
renderTransactions();
renderCategories();

const pageNames = {
  dashboard: "Dashboard",
  products: "Products",
  categories: "Categories",
  transactions: "Transactions",
};
function showPage(pageName) {
  document
    .querySelectorAll(".page")
    .forEach((page) =>
      page.classList.toggle("active", page.id === `page-${pageName}`),
    );
  document
    .querySelectorAll(".nav-link")
    .forEach((link) =>
      link.classList.toggle("active", link.dataset.page === pageName),
    );
  document.querySelector("#breadcrumbCurrent").textContent =
    pageNames[pageName];
  document.querySelector("#sidebar").classList.remove("open");
  history.replaceState(null, "", `#${pageName}`);
}

document
  .querySelectorAll(".nav-link")
  .forEach((link) =>
    link.addEventListener("click", () => showPage(link.dataset.page)),
  );
document
  .querySelectorAll("[data-go]")
  .forEach((button) =>
    button.addEventListener("click", () => showPage(button.dataset.go)),
  );
document
  .querySelector("#menuToggle")
  .addEventListener("click", () =>
    document.querySelector("#sidebar").classList.toggle("open"),
  );

const modalContent = {
  product: {
    title: "Add product",
    intro: "Add an item to your inventory catalog.",
    fields: `<div class="field-grid"><div class="field"><label for="productName">Product name</label><input id="productName" placeholder="e.g. Wireless Mouse"></div><div class="field"><label for="productSku">SKU</label><input id="productSku" placeholder="e.g. WM-001"></div><div class="field"><label for="productCategory">Category</label><select id="productCategory"><option value="">Select category</option>${categories.map((category) => `<option value="${category.id}">${category.name}</option>`).join("")}</select></div><div class="field"><label for="productPrice">Unit price</label><input id="productPrice" type="number" placeholder="0.00"></div><div class="field"><label for="productQuantity">Opening quantity</label><input id="productQuantity" type="number" placeholder="0"></div><div class="field full"><label for="productDescription">Description <span style="font-weight:400;color:#9ba5b4">(optional)</span></label><textarea id="productDescription" placeholder="A short product description"></textarea></div></div>`,
  },
  category: {
    title: "Add category",
    intro: "Create a category to organize your products.",
    fields: `<div class="field"><label for="categoryName">Category name</label><input id="categoryName" placeholder="e.g. Electronics"></div><div class="field"><label for="categoryDescription">Description <span style="font-weight:400;color:#9ba5b4">(optional)</span></label><textarea id="categoryDescription" placeholder="What belongs in this category?"></textarea></div>`,
  },
  transaction: {
    title: "Record a transaction",
    intro: "Record stock moving in or out of your inventory.",
    fields: `<div class="field-grid"><div class="field"><label for="transactionType">Movement type</label><select id="transactionType"><option>Stock in</option><option>Stock out</option></select></div><div class="field"><label for="transactionProduct">Product</label><select id="transactionProduct"><option>Select a product</option>${products.map((product) => `<option>${product.name} · ${product.sku}</option>`).join("")}</select></div><div class="field"><label for="transactionQuantity">Quantity</label><input id="transactionQuantity" type="number" placeholder="Enter quantity"></div><div class="field"><label for="transactionReason">Reason</label><select id="transactionReason"><option>Select a reason</option><option>Purchase</option><option>Return</option><option>Sale</option><option>Damaged</option><option>Adjustment</option></select></div><div class="field full"><label for="transactionNote">Note <span style="font-weight:400;color:#9ba5b4">(optional)</span></label><textarea id="transactionNote" placeholder="Add context for this movement"></textarea></div></div>`,
  },
};

const backdrop = document.querySelector("#modalBackdrop");
function closeModal() {
  backdrop.classList.remove("open");
  backdrop.setAttribute("aria-hidden", "true");
}
let activeFormType;
document.querySelectorAll("[data-modal]").forEach((button) =>
  button.addEventListener("click", () => {
    const content = modalContent[button.dataset.modal];
    activeFormType = button.dataset.modal;
    document.querySelector("#modalTitle").textContent = content.title;
    document.querySelector("#modalIntro").textContent = content.intro;
    document.querySelector("#modalFields").innerHTML = content.fields;
    document.querySelector('.form-message').classList.remove('error');
    document.querySelector('.form-message').style.display = 'none';
    backdrop.classList.add("open");
    backdrop.setAttribute("aria-hidden", "false");
  }),
);
document
  .querySelectorAll(".close-modal")
  .forEach((button) => button.addEventListener("click", closeModal));
backdrop.addEventListener("click", (event) => {
  if (event.target === backdrop) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

let toastTimer;
document.querySelector("#previewForm").addEventListener("submit", (event) => {
  event.preventDefault();
  switch (activeFormType) {
    case "product":
      const data = {
        id : products.length + 1,
        name : document.querySelector("#productName").value,
        sku : document.querySelector("#productSku").value,
        categoryId : Number(document.querySelector("#productCategory").value),
        price : Number(document.querySelector("#productPrice").value),
        quantity : Number(document.querySelector("#productQuantity").value),
        description : document.querySelector("#productDescription").value,
      }
      const errors = [];
      if(data.name.trim() === ''){
        errors.push("Product name is required.");
        // document.querySelector('.form-message').classList.add('error');
        // document.querySelector('.form-message').style.display = 'block';
        // document.querySelector('.form-message').textContent = "Product name is required.";
        // return;
      } 
      if(data.sku.trim() === ''){
        errors.push("SKU is required.");
      } 
      if(document.querySelector("#productCategory").value.trim() === ''){
        errors.push("Category is required.");
      } 
      if(document.querySelector("#productPrice").value.trim() === ''){
        errors.push("Price is required.");
      } 
      if(document.querySelector("#productQuantity").value.trim() === ''){
        errors.push("Quantity is required.");
      } 
      if (errors.length > 0) {
        document.querySelector('.form-message').classList.add('error');
        document.querySelector('.form-message').style.display = 'block';
        document.querySelector('.form-message').textContent = errors.join(' ');
        return;
      }
      else{
        products.push(data);
        renderProducts();
        break;
      }
  }
  closeModal();
  const toast = document.querySelector("#toast");
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
});

const startingPage = location.hash.slice(1);
if (pageNames[startingPage]) showPage(startingPage);
