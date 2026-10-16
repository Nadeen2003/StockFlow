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

const categoryFilter = document.querySelector("#productCategoryFilter");

categoryFilter.insertAdjacentHTML(
"beforeend",
  categories
    .map((category) => `<option value="${category.id}">${category.name}</option>`)
    .join("")
);

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

let sortDirection = 0;
let currentPage = 1;
const productsPerPage = 6;
let transactionCurrentPage = 1;
const transactionsPerPage = 6;

function renderDashboard() {
  document.querySelector("#todayLabel").textContent = new Date().toLocaleDateString(
    "en-US", 
    { weekday: "long", month: "long", day: "numeric" }
  );
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

document.querySelector("#dashboardGreeting").textContent = greeting;
  document.querySelector("#dashboardTotalProducts").textContent = products.length;
  const recentTransactions = transactions.slice(0, 4);
  const recentRows = document.querySelector("#recentRows");

  if (recentTransactions.length === 0) {
    recentRows.innerHTML =
      '<tr><td colspan="4">No transactions yet.</td></tr>';
  } else {
    recentRows.innerHTML = recentTransactions
      .map((transaction) => {
        const product = productFor(transaction.productId);
        return `<tr><td>${productCell(product)}</td><td>${typePill(transaction.type)}</td><td class="${transaction.type === "IN" ? "qty-in" : "qty-out"}">${transaction.type === "IN" ? "+" : "−"}${transaction.quantity} units</td><td class="date-cell">${transaction.date}</td></tr>`;
      })
      .join("");
  }
}
  
function renderLowStockList() {
  const lowStockProducts = products.filter(
    (product) => product.quantity <= 5
  );
  const lowStockList = document.querySelector("#lowStockList");

  if (lowStockProducts.length === 0) {
    lowStockList.innerHTML =
      '<div class="low-empty">No products need restocking.</div>';
    return;
  }

  lowStockList.innerHTML = lowStockProducts
    .map(
      (product) => `
      <div class="low-item"><span class="product-thumb" style="background:${product.color || "#98d1e8"}">${product.icon || "📦"}</span><div class="low-product"><strong>${product.name}</strong><span>${product.sku}</span><div class="stock-track"><i style="width:${Math.max(product.quantity * 8, 8)}%"></i></div></div><div class="low-qty"><strong>${product.quantity} left</strong><span>Low stock</span></div></div>`,
    )
    .join("");
}

function renderProducts() {
  document.querySelector("#productNavCount").textContent = products.length;
  document.querySelector("#dashboardTotalProducts").textContent = products.length;
  const totalStock = products.reduce((sum , product) => sum + product.quantity, 0);
  document.querySelector("#dashboardTotalStock").textContent = totalStock;
  const lowStockCount = products.filter(
    (product) => product.quantity <= 5
  ).length;
  const statusMessage = document.querySelector("#dashboardInventoryStatus");
  const hintMessage = document.querySelector("#dashboardInventoryHint");

  if (lowStockCount === 0) {
    document.querySelector(".bottom-note").classList.remove("warning");
    document.querySelector(".note-check").textContent = "✓";
    statusMessage.textContent = "Your inventory is looking good.";
    hintMessage.textContent = "No items need restocking.";
  } else {
    document.querySelector(".bottom-note").classList.add("warning");
    document.querySelector(".note-check").textContent = "!";
    statusMessage.textContent = "Some products need restocking.";
    hintMessage.textContent = `${lowStockCount} ${
      lowStockCount === 1 ? "item needs" : "items need"
    } attention.`;
  }
  document.querySelector("#dashboardLowStockCount").textContent = lowStockCount;
  const totalInventoryValue = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const [wholeValue, centsValue] = totalInventoryValue.toFixed(2).split(".");
  document.querySelector("#dashboardInventoryWhole").textContent = Number(wholeValue).toLocaleString("en-US");
  document.querySelector("#dashboardInventoryCents").textContent = `.${centsValue}`;
  document.querySelector("#lowStockCountPill").textContent = `${lowStockCount} ${lowStockCount === 1 ? "item" : "items"}`;  renderLowStockList();
  const searchTerm = document.querySelector("#productSearch").value.trim().toLowerCase();
  const selectedCategoryId = document.querySelector("#productCategoryFilter").value;
  const filteredProducts = products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(searchTerm);
    const matchesSku = product.sku.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategoryId === "" || product.categoryId === Number(selectedCategoryId);
    return (matchesName || matchesSku) && matchesCategory;
  });
  filteredProducts.sort((productA, productB) => {
    return productA.name.localeCompare(productB.name) * sortDirection;
  });
  const totalPages = Math.max(1,Math.ceil(filteredProducts.length / productsPerPage));
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  renderPagination(totalPages);

  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const showingStart =filteredProducts.length === 0 ? 0 : startIndex + 1;
  const showingEnd = startIndex + visibleProducts.length;
  document.querySelector("#showingStart").textContent = showingStart;
  document.querySelector("#showingEnd").textContent = showingEnd;
  document.querySelector("#totalProducts").textContent = filteredProducts.length;

  const productRows = document.querySelector("#productRows");
  if (visibleProducts.length === 0) {
    productRows.innerHTML = '<tr><td colspan="6">No products found.</td></tr>';
    return;
  }

  productRows.innerHTML = visibleProducts
    .map(
      (product) => `
    <tr><td>${productCell(product)}</td><td>${product.sku}</td><td>${categoryFor(product.categoryId)}</td><td><span class="stock-cell"><i class="stock-indicator ${product.quantity <= 2 ? "out" : product.quantity <= 5 ? "low" : ""}"></i><span class="stock-number">${product.quantity}</span> units</span></td><td>$${product.price.toFixed(2)}</td><td><div class="product-actions"><button class="row-actions" aria-label="Product actions" data-toggle-actions="${product.id}">···</button>
    <div class="actions-menu" hidden><button data-edit-product="${product.id}">Edit</button><button data-delete-product="${product.id}">Delete</button></div></div>
    </td></tr>`,
  )
    .join("");

  document.querySelectorAll("[data-toggle-actions]").forEach((button) => {
    button.addEventListener("click", () => {
      const menu = button.nextElementSibling;
      menu.hidden = !menu.hidden;
    });
  });
  document.querySelectorAll("[data-delete-product]").forEach((button) => {
    button.addEventListener("click", () => {
      deletingProductId = Number(button.dataset.deleteProduct);
      activeFormType = "deleteProduct";

      document.querySelector("#modalTitle").textContent = "Delete product?";
      document.querySelector("#modalIntro").textContent =
        "Are you sure you want to delete this product?";
      document.querySelector("#modalFields").innerHTML =
        "<p>This action cannot be undone.</p>";

      const formMessage = document.querySelector(".form-message");
      formMessage.textContent = "";
      formMessage.classList.remove("error");
      formMessage.style.display = "none";

      document.querySelector(
        '#previewForm button[type="submit"]'
      ).innerHTML = 'Delete <span>→</span>';

      backdrop.classList.add("open");
      backdrop.setAttribute("aria-hidden", "false");
    });
  });

  document.querySelectorAll("[data-edit-product]").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.editProduct);
      editingProductId = productId;
      const product = products.find((product) => product.id === productId);
      activeFormType = "editProduct";
      document.querySelector("#modalTitle").textContent = "Edit product";
      document.querySelector("#modalIntro").textContent = "Update the product details.";
      document.querySelector("#modalFields").innerHTML = modalContent.product.fields;
      const categorySelect = document.querySelector("#productCategory");
      categorySelect.innerHTML = `
        <option value="">Select category</option>
        ${categories
          .map((category) => `<option value="${category.id}">${category.name}</option>`)
          .join("")}
      `;
      document.querySelector('#previewForm button[type="submit"]').innerHTML = 'Save <span>→</span>';
      document.querySelector("#productName").value = product.name;
      document.querySelector("#productSku").value = product.sku;  
      document.querySelector("#productCategory").value = product.categoryId;
      document.querySelector("#productPrice").value = product.price;
      document.querySelector("#productQuantity").value = product.quantity;
      document.querySelector("#productDescription").value = product.description ?? "";
      backdrop.classList.add("open");
      backdrop.setAttribute("aria-hidden", "false");
    });
  });
}

function renderPagination(totalPages) {
  const pagination = document.querySelector("#productPagination");

  let buttons = `
    <button data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""}>←</button>
  `;

  for (let page = 1; page <= totalPages; page++) {
    buttons += `
      <button
        data-page="${page}"
        class="${page === currentPage ? "current" : ""}"
      >${page}</button>
    `;
  }

  buttons += `
    <button data-page="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""}>→</button>
  `;

  pagination.innerHTML = buttons;

  pagination.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => {
      currentPage = Number(button.dataset.page);
      renderProducts();
    });
  });
}

document.querySelector("#productSearch").addEventListener("input", renderProducts);
document.querySelector("#transactionSearch").addEventListener("input", () => {
  transactionCurrentPage = 1;
  renderTransactions();
});

document.querySelector("#transactionTypeFilter").addEventListener("change", () => {
  transactionCurrentPage = 1;
  renderTransactions();
});

document.querySelector("#transactionDateRangeButton").addEventListener("click", () => {
  const dateFilters = document.querySelector("#transactionDateFilters");
  dateFilters.hidden = !dateFilters.hidden;
});

document.querySelector("#transactionDateFrom").addEventListener("change", () => {
  transactionCurrentPage = 1;
  renderTransactions();
});

document.querySelector("#transactionDateTo").addEventListener("change", () => {
  transactionCurrentPage = 1;
  renderTransactions();
});

document.querySelector("#clearTransactionDateFilter").addEventListener("click", () => {
  document.querySelector("#transactionDateFrom").value = "";
  document.querySelector("#transactionDateTo").value = "";
  transactionCurrentPage = 1;
  renderTransactions();
});

categoryFilter.addEventListener("change", renderProducts);

document.querySelector("#productSortButton").addEventListener("click", () => {
  if(sortDirection === 1) {
    sortDirection = -1;
  }else{
    sortDirection = 1;
  }
  renderProducts();
});

function renderTransactions() {
  const searchTerm = document.querySelector("#transactionSearch").value.trim().toLowerCase();
  const selectedType = document.querySelector("#transactionTypeFilter").value;
  const fromValue = document.querySelector("#transactionDateFrom").value;
  const toValue = document.querySelector("#transactionDateTo").value;

  const startDate = fromValue ? new Date(`${fromValue}T00:00:00`) : null;
  const endDate = toValue ? new Date(`${toValue}T23:59:59.999`) : null;
  const filteredTransactions = transactions.filter((transaction) => { 
    const product = productFor(transaction.productId);
    const transactionDate = new Date(transaction.date);
    return (
      (product.name.toLowerCase().includes(searchTerm) ||
        product.sku.toLowerCase().includes(searchTerm)) &&
      (selectedType === "" || transaction.type === selectedType) &&
      (!startDate || transactionDate >= startDate) &&
      (!endDate || transactionDate <= endDate)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / transactionsPerPage));

  if (transactionCurrentPage > totalPages) {
    transactionCurrentPage = totalPages;
  }

  const startIndex = (transactionCurrentPage - 1) * transactionsPerPage;
  const visibleTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + transactionsPerPage
  );

  document.querySelector("#transactionsShown").textContent = visibleTransactions.length;
  document.querySelector("#transactionsTotal").textContent = filteredTransactions.length;

  document.querySelector("#transactionRows").innerHTML =
    visibleTransactions.length === 0
      ? '<tr><td colspan="5">No transactions found.</td></tr>'
      : visibleTransactions
          .map((transaction) => {
            const product = productFor(transaction.productId);
            return `<tr><td>${productCell(product)}</td><td>${typePill(transaction.type)}</td><td class="${transaction.type === "IN" ? "qty-in" : "qty-out"}">${transaction.type === "IN" ? "+" : "−"}${transaction.quantity} units</td><td>${transaction.reason}</td><td class="date-cell">${transaction.date} <span class="product-meta">${transaction.time}</span></td></tr>`;
          })
          .join("");
  
  const pagination = document.querySelector("#transactionPagination");

  let buttons = `
    <button data-transaction-page="${transactionCurrentPage - 1}"
      ${transactionCurrentPage === 1 ? "disabled" : ""}>←</button>
  `;

  for (let page = 1; page <= totalPages; page++) {
    buttons += `
      <button
        data-transaction-page="${page}"
        class="${page === transactionCurrentPage ? "current" : ""}"
      >${page}</button>
    `;
  }

  buttons += `
    <button data-transaction-page="${transactionCurrentPage + 1}"
      ${transactionCurrentPage === totalPages ? "disabled" : ""}>→</button>
  `;

  pagination.innerHTML = buttons;

  pagination.querySelectorAll("[data-transaction-page]").forEach((button) => {
    button.addEventListener("click", () => {
      transactionCurrentPage = Number(button.dataset.transactionPage);
      renderTransactions();
    });
  });
}

function renderCategories() {
  const categoryWord = categories.length === 1 ? "category" : "categories";
  document.querySelector("#categoryCount").textContent = `${categories.length} ${categoryWord} in your catalog`;
  document.querySelector("#categoryGrid").innerHTML = categories
    .map(
      (category) => `
    <article class="category-card"><div class="category-top"><span class="category-symbol" style="color:${category.ink};background:${category.color}">${category.icon}</span><div class="product-actions"><button class="category-actions" aria-label="Category actions" data-toggle-category-actions="${category.id}">···</button><div class="actions-menu" hidden><button data-edit-category="${category.id}">Edit</button><button data-delete-category="${category.id}">Delete</button></div></div></div><h3>${category.name}</h3><p>${products.filter((product) => product.categoryId === category.id).length} products</p></article>`,
    )
    .join("");

  document.querySelectorAll("[data-toggle-category-actions]").forEach((button) => {
    button.addEventListener("click", () => {
      const menu = button.nextElementSibling;
      menu.hidden = !menu.hidden;
    });
  });

  document.querySelectorAll("[data-edit-category]").forEach((button) => {
    button.addEventListener("click", () => {
      const categoryId = Number(button.dataset.editCategory);
      const category = categories.find(
        (category) => category.id === categoryId
      );

      editingCategoryId = category.id;
      activeFormType = "editCategory";

      document.querySelector("#modalTitle").textContent = "Edit category";
      document.querySelector("#modalIntro").textContent = "Update the category details.";
      document.querySelector("#modalFields").innerHTML = modalContent.category.fields;
      document.querySelector("#categoryName").value = category.name;
      document.querySelector("#categoryDescription").value = category.description ?? "";
      document.querySelector('#previewForm button[type="submit"]').innerHTML = 'Save <span>→</span>';

      const formMessage = document.querySelector(".form-message");
      formMessage.textContent = "";
      formMessage.classList.remove("error");
      formMessage.style.display = "none";

      backdrop.classList.add("open");
      backdrop.setAttribute("aria-hidden", "false");
    });
  });

  document.querySelectorAll("[data-delete-category]").forEach((button) => {
    button.addEventListener("click", () => {
      deletingCategoryId = Number(button.dataset.deleteCategory);

      const category = categories.find(
        (category) => category.id === deletingCategoryId
      );

      activeFormType = "deleteCategory";
      document.querySelector("#modalTitle").textContent = "Delete category?";
      document.querySelector("#modalIntro").textContent = `Are you sure you want to delete ${category.name}?`;
      document.querySelector("#modalFields").innerHTML = "<p>This action cannot be undone.</p>";

      document.querySelector('#previewForm button[type="submit"]').innerHTML = 'Delete <span>→</span>';

      const formMessage = document.querySelector(".form-message");
      formMessage.textContent = "";
      formMessage.classList.remove("error");
      formMessage.style.display = "none";

      backdrop.classList.add("open");
      backdrop.setAttribute("aria-hidden", "false");
    });
  });
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
    fields: `<div class="field-grid"><div class="field"><label for="transactionType">Movement type</label><select id="transactionType"><option value="IN">Stock in</option><option value="OUT">Stock out</option></select></div><div class="field"><label for="transactionProduct">Product</label><select id="transactionProduct"><option value="">Select a product</option>${products.map((product) => 
      `<option value="${product.id}">${product.name} · ${product.sku}</option>`).join("")}</select></div><div class="field"><label for="transactionQuantity">Quantity</label><input id="transactionQuantity" type="number" placeholder="Enter quantity"></div><div class="field"><label for="transactionReason">Reason</label><select id="transactionReason"><option value="">Select a reason</option><option>Purchase</option><option>Return</option><option>Sale</option><option>Damaged</option><option>Adjustment</option></select></div><div class="field full"><label for="transactionNote">Note <span style="font-weight:400;color:#9ba5b4">(optional)</span></label><textarea id="transactionNote" placeholder="Add context for this movement"></textarea></div></div>`,
  },
};

const backdrop = document.querySelector("#modalBackdrop");
function closeModal() {
  backdrop.classList.remove("open");
  backdrop.setAttribute("aria-hidden", "true");
}
let activeFormType;
let editingProductId;
let deletingProductId;
let editingCategoryId;
let deletingCategoryId;

document.querySelectorAll("[data-modal]").forEach((button) =>
  button.addEventListener("click", () => {
    const content = modalContent[button.dataset.modal];
    activeFormType = button.dataset.modal;
    document.querySelector("#modalTitle").textContent = content.title;
    document.querySelector("#modalIntro").textContent = content.intro;
    document.querySelector("#modalFields").innerHTML = content.fields;
    if (button.dataset.modal === "product") {
    const categorySelect = document.querySelector("#productCategory");
    categorySelect.innerHTML = `
      <option value="">Select category</option>
      ${categories
        .map((category) => `<option value="${category.id}">${category.name}</option>`)
        .join("")}
    `;
    }
    document.querySelector('#previewForm button[type="submit"]').innerHTML = 'Save <span>→</span>';
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
    case "editProduct":
    case "product": {
      const data = {
        id:
          activeFormType === "editProduct"
            ? editingProductId
            : products.length + 1,
        name: document.querySelector("#productName").value,
        sku: document.querySelector("#productSku").value,
        categoryId: Number(
          document.querySelector("#productCategory").value
        ),
        price: Number(document.querySelector("#productPrice").value),
        quantity: Number(document.querySelector("#productQuantity").value),
        description: document.querySelector("#productDescription").value,
      };

      const errors = [];

      if (data.name.trim() === "") {
        errors.push("Product name is required.");
      }

      if (data.sku.trim() === "") {
        errors.push("SKU is required.");
      }

      if (document.querySelector("#productCategory").value.trim() === "") {
        errors.push("Category is required.");
      }

      if (document.querySelector("#productPrice").value.trim() === "") {
        errors.push("Price is required.");
      }

      if (document.querySelector("#productQuantity").value.trim() === "") {
        errors.push("Quantity is required.");
      }

      if (data.quantity < 0) {
        errors.push("Quantity should be greater than or equal to 0.");
      }

      if (data.price < 0) {
        errors.push("Price should be greater than or equal to 0.");
      }

      if (!Number.isInteger(data.quantity)) {
        errors.push("Quantity should be an integer.");
      }

      const skuAlreadyExists = products.some((product) => {
        if (activeFormType === "editProduct" && product.id === editingProductId) {
          return false;
        }

        return (product.sku.trim().toLowerCase() === data.sku.trim().toLowerCase());
      });

      if (skuAlreadyExists) {
        errors.push("SKU should be unique.");
      }

      if (errors.length > 0) {
        const formMessage = document.querySelector(".form-message");
        formMessage.classList.add("error");
        formMessage.style.display = "block";
        formMessage.textContent = errors.join(" ");
        return;
      }

      data.name = data.name.trim();
      data.sku = data.sku.trim();

      if (activeFormType === "editProduct") {
        const productIndex = products.findIndex(
          (product) => product.id === editingProductId
        );
        products[productIndex] = data;
      } else {
        products.push(data);
      }

      renderProducts();
      renderCategories();
      break;
    } 
    
    case "deleteProduct": {
      const productIndex = products.findIndex(
        (product) => product.id === deletingProductId
      );
      if (productIndex !== -1) {
        products.splice(productIndex, 1);
      }
      renderProducts();
      renderCategories();
      break;
    }

    case "deleteCategory": {
      const categoryHasProducts = products.some(
        (product) => product.categoryId === deletingCategoryId
      );

      if (categoryHasProducts) {
        const formMessage = document.querySelector(".form-message");
        formMessage.classList.add("error");
        formMessage.style.display = "block";
        formMessage.textContent =
          "Move this category's products before deleting it.";
        return;
      }

      const categoryIndex = categories.findIndex(
        (category) => category.id === deletingCategoryId
      );

      if (categoryIndex !== -1) {
        categories.splice(categoryIndex, 1);
      }

      const categoryOption = categoryFilter.querySelector(
        `option[value="${deletingCategoryId}"]`
      );

      if (categoryOption) {
        categoryOption.remove();
      }

      renderCategories();
      break;
    }

    case "editCategory": {
      const categoryIndex = categories.findIndex(
        (category) => category.id === editingCategoryId
      );

      const updatedCategory = {
        ...categories[categoryIndex],
        name: document.querySelector("#categoryName").value.trim(),
        description: document.querySelector("#categoryDescription").value.trim(),
      };

      const errors = [];

      if (updatedCategory.name === "") {
        errors.push("Category name is required.");
      }

      const categoryNameAlreadyExists = categories.some(
        (category) =>
          category.id !== editingCategoryId &&
          category.name.trim().toLowerCase() ===
            updatedCategory.name.toLowerCase()
      );

      if (categoryNameAlreadyExists) {
        errors.push("Category name already exists.");
      }

      if (errors.length > 0) {
        const formMessage = document.querySelector(".form-message");
        formMessage.classList.add("error");
        formMessage.style.display = "block";
        formMessage.textContent = errors.join(" ");
        return;
      }

      categories[categoryIndex] = updatedCategory;

      const categoryOption = categoryFilter.querySelector(
        `option[value="${updatedCategory.id}"]`
      );
      if (categoryOption) {
        categoryOption.textContent = updatedCategory.name;
      }

      renderCategories();
      renderProducts();
      break;
    }

    case "category": {
      const newCategory = {
        id: categories.length + 1,
        name: document.querySelector("#categoryName").value.trim(),
        description: document.querySelector("#categoryDescription").value.trim(),
        icon: "✳",
        color: "#eef1f6",
        ink: "#77849a",
        count: 0,
      }; 
      const errors = [];

      if (newCategory.name === "") {
        errors.push("Category name is required.");
      }

      const categoryAlreadyExists = categories.some(
        (category) =>
          category.name.trim().toLowerCase() === newCategory.name.toLowerCase()
      );

      if (categoryAlreadyExists) {
        errors.push("Category name already exists.");
      }

      if (errors.length > 0) {
        const formMessage = document.querySelector(".form-message");
        formMessage.classList.add("error");
        formMessage.style.display = "block";
        formMessage.textContent = errors.join(" ");
        return;
      }

      categories.push(newCategory);
      categoryFilter.add(new Option(newCategory.name, newCategory.id));
      renderCategories();
      break;
    }

    case "transaction": {
      const productIdInput = document.querySelector("#transactionProduct").value;
      const quantityInput = document.querySelector("#transactionQuantity").value;
      const reasonInput = document.querySelector("#transactionReason").value;
      const now = new Date();

      const newTransaction = {
        id: transactions.length + 1,
        productId: Number(productIdInput),
        type: document.querySelector("#transactionType").value,
        quantity: Number(quantityInput),
        reason: reasonInput.trim(),
        note: document.querySelector("#transactionNote").value.trim(),
        date: now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      };

      const selectedProduct = products.find(
        (product) => product.id === newTransaction.productId
      );

      const errors = [];

      if (!selectedProduct) {
        errors.push("Please select a product.");
      }

      if (quantityInput.trim() === "") {
        errors.push("Quantity is required.");
      } else if (newTransaction.quantity <= 0) {
        errors.push("Quantity must be greater than 0.");
      } else if (!Number.isInteger(newTransaction.quantity)) {
        errors.push("Quantity must be a whole number.");
      }

      if (reasonInput.trim() === "") {
        errors.push("Reason is required.");
      }

      if (
        selectedProduct &&
        newTransaction.type === "OUT" &&
        newTransaction.quantity > selectedProduct.quantity
      ) {
        errors.push("Not enough stock available.");
      }

      if (errors.length > 0) {
        const formMessage = document.querySelector(".form-message");
        formMessage.classList.add("error");
        formMessage.style.display = "block";
        formMessage.textContent = errors.join(" ");
        return;
      }

      if (newTransaction.type === "IN") {
        selectedProduct.quantity += newTransaction.quantity;
      } else if (newTransaction.type === "OUT") {
        selectedProduct.quantity -= newTransaction.quantity;
      }

      transactions.unshift(newTransaction);

      renderTransactions();
      renderDashboard();
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
