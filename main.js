
// Load products from localStorage and render them
(function loadProductsFromStorage() {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  if (products.length === 0) return; // Keep existing hardcoded products if no stored products

  const menuSection = document.querySelector('#menu .menu');
  const appetizersSection = document.querySelectorAll('#menu .menu')[1];
  
  if (!menuSection) return;

  // Clear existing content
  const menuProducts = products.filter(p => p.category === 'menu');
  const appetizerProducts = products.filter(p => p.category === 'appetizers');

  // Render menu products if any exist
  if (menuProducts.length > 0 && menuSection) {
    menuSection.innerHTML = '';
    menuProducts.forEach(product => {
      const defaultPrice = product.sizes && product.sizes.length > 0 ? product.sizes[0].price : 120;
      const sizesJson = JSON.stringify(product.sizes || []);
      const card = document.createElement('div');
      card.className = 'wishcard w-45 p-0 text-white';
      card.innerHTML = `
        <img class="w-full" src="${product.image}" alt="${product.name}">
        <div class="p-4">
          <h2 class="text-xl font-bold mt-2 text-center">${product.name}</h2>
          <div class="text-center mt-3 flex justify-between items-center">
            <button title="Add to Cart" class="add-to-cart group cursor-pointer outline-none hover:rotate-90 duration-300" data-name="${product.name}" data-price="${defaultPrice}" data-image="${product.image}" data-description="${product.description}" data-sizes='${sizesJson}'>
              <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" class="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300">
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke-width="1.5"></path>
                <path d="M8 12H16" stroke-width="1.5"></path>
                <path d="M12 16V8" stroke-width="1.5"></path>
              </svg>
            </button>
            <span class="text-lg font-semibold">${defaultPrice} L.E</span>
          </div>
        </div>
      `;
      menuSection.appendChild(card);
    });
  }

  // Render appetizer products if any exist
  if (appetizerProducts.length > 0 && appetizersSection) {
    appetizersSection.innerHTML = '';
    appetizerProducts.forEach(product => {
      const defaultPrice = product.sizes && product.sizes.length > 0 ? product.sizes[0].price : 120;
      const sizesJson = JSON.stringify(product.sizes || []);
      const card = document.createElement('div');
      card.className = 'wishcard w-45 p-0 text-white';
      card.innerHTML = `
        <img class="w-full" src="${product.image}" alt="${product.name}">
        <div class="p-4">
          <h2 class="text-xl font-bold mt-2 text-center">${product.name}</h2>
          <div class="text-center mt-3 flex justify-between items-center">
            <button title="Add to Cart" class="add-to-cart group cursor-pointer outline-none hover:rotate-90 duration-300" data-name="${product.name}" data-price="${defaultPrice}" data-image="${product.image}" data-description="${product.description}" data-sizes='${sizesJson}'>
              <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" class="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300">
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke-width="1.5"></path>
                <path d="M8 12H16" stroke-width="1.5"></path>
                <path d="M12 16V8" stroke-width="1.5"></path>
              </svg>
            </button>
            <span class="text-lg font-semibold">${defaultPrice} L.E</span>
          </div>
        </div>
      `;
      appetizersSection.appendChild(card);
    });
  }

})();

(function initSlider(){
  const slider = document.querySelector('.hero-slider');
  if(!slider) {
    // Retry after a short delay if slider not found
    setTimeout(initSlider, 100);
    return;
  }
  const track = slider.querySelector('.slider-track');
  if(!track) {
    setTimeout(initSlider, 100);
    return;
  }
  
  let slides = Array.from(track.querySelectorAll('.slide'));
  
  // Wait for slides to be loaded if they don't exist yet
  if(slides.length === 0) {
    setTimeout(initSlider, 100);
    return;
  }
  
  const btnPrev = slider.querySelector('.slider-btn.prev');
  const btnNext = slider.querySelector('.slider-btn.next');
  const dotsContainer = slider.querySelector('.slider-dots');
  let index = 0;
  let timer;
  let total = slides.length;

  function initSliderControls() {
    // ensure track/slides have correct widths
    if(total > 0) {
      track.style.width = `${total * 100}%`;
      slides.forEach(s => { 
        s.style.width = `${100 / total}%`; 
        s.style.flexShrink = '0';
        s.style.display = 'block';
      });
    }

    // create dots
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', 'الانتقال إلى الشريحة ' + (i+1));
      dot.className = 'dot';
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  function updateUI(){
    // Refresh slides list in case it changed
    slides = Array.from(track.querySelectorAll('.slide'));
    total = slides.length;
    if(total === 0) return;
    
    // Ensure slider track always uses LTR direction for proper image display
    if (track) {
      track.style.direction = 'ltr';
    }
    const offset = index * (100 / total); // move by one slide width
    // Always use negative translateX since track is forced to LTR
    track.style.transform = `translateX(-${offset}%)`;
    dotsContainer.querySelectorAll('.dot').forEach((d, i)=>{
      d.classList.toggle('active', i === index);
    });
  }

  function goTo(i){
    if(total === 0) return;
    index = (i + total) % total;
    updateUI();
    restart();
  }

  function next(){ goTo(index + 1); }
  function prev(){ goTo(index - 1); }

  function start(){ 
    if(total > 0) {
      timer = setInterval(next, 4000); 
    }
  }
  function stop(){ clearInterval(timer); }
  function restart(){ stop(); start(); }

  // Ensure all slides and images use LTR direction to prevent RTL issues
  function enforceLTR() {
    if (track) track.style.direction = 'ltr';
    slides.forEach(slide => {
      if (slide) {
        slide.style.direction = 'ltr';
        const img = slide.querySelector('img');
        if (img) img.style.direction = 'ltr';
      }
    });
  }
  
  // Initialize slider controls
  initSliderControls();
  enforceLTR();
  
  // Set up event listeners
  if(btnNext) btnNext.addEventListener('click', next);
  if(btnPrev) btnPrev.addEventListener('click', prev);
  if(slider) {
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
  }
  
  // Reinitialize slider when language/direction changes or when slides are added/removed
  const observer = new MutationObserver(() => {
    const newSlides = Array.from(track.querySelectorAll('.slide'));
    if(newSlides.length !== total) {
      // Slides changed, reinitialize
      slides = newSlides;
      total = slides.length;
      if(total > 0) {
        initSliderControls();
        index = Math.min(index, total - 1);
      }
    }
    enforceLTR();
    updateUI();
  });
  observer.observe(track, {
    childList: true,
    subtree: true
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['dir', 'lang']
  });

  updateUI();
  start();
})();

(function(){
  // Mobile nav toggle
  const toggleBtn = document.getElementById('menu-toggle');
  const links = document.getElementById('primary-nav');
  if (toggleBtn && links) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = links.classList.toggle('show');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking on a link
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('show');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!links.contains(e.target) && !toggleBtn.contains(e.target)) {
        links.classList.remove('show');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const cartBtn = document.getElementById('cart-button');
  const cartCount = document.getElementById('cart-count');
  const cartModal = document.getElementById('cart-modal');
  const cartOverlay = cartModal ? cartModal.querySelector('.cart-overlay') : null;
  const cartCloseBtn = document.getElementById('cart-close');
  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const clearBtn = document.getElementById('cart-clear');
  const checkoutBtn = document.getElementById('cart-checkout');

  const prodModal = document.getElementById('product-modal');
  const prodOverlay = prodModal ? prodModal.querySelector('.product-overlay') : null;
  const prodCloseBtn = document.getElementById('product-close');
  const prodImg = document.getElementById('product-image');
  const prodName = document.getElementById('product-name');
  const prodDesc = document.getElementById('product-desc');
  const prodSizes = document.getElementById('product-sizes');
  const prodPrice = document.getElementById('product-price');
  const prodConfirm = document.getElementById('product-confirm');
  const prodQuantity = document.getElementById('product-quantity');
  const qtyIncrease = document.getElementById('quantity-increase');
  const qtyDecrease = document.getElementById('quantity-decrease');

  // Checkout modal elements
  const chkModal = document.getElementById('checkout-modal');
  const chkOverlay = chkModal ? chkModal.querySelector('.checkout-overlay') : null;
  const chkClose = document.getElementById('checkout-close');
  const chkForm = document.getElementById('checkout-form');
  const chkErrors = document.getElementById('checkout-errors');
  const chkConfirm = document.getElementById('checkout-confirm');

  // Invoice modal elements
  const invModal = document.getElementById('invoice-modal');
  const invOverlay = invModal ? invModal.querySelector('.invoice-overlay') : null;
  const invClose = document.getElementById('invoice-close');
  const invName = document.getElementById('inv-name');
  const invPhone = document.getElementById('inv-phone');
  const invAddress = document.getElementById('inv-address');
  const invPayment = document.getElementById('inv-payment');
  const invRows = document.getElementById('inv-rows');
  const invTotal = document.getElementById('inv-total');
  const invPrint = document.getElementById('invoice-print');
  const invDone = document.getElementById('invoice-done');

  const cart = [];
  let appliedDiscount = null;
  let assignedBranch = null;
  let customerLocation = null;

  // Branch coordinates (latitude, longitude)
  const branches = [
    { name: 'فرع سموحة', lat: 31.200000, lng: 29.950000, id: 'branch-3' },
    { name: 'فرع سبورتنج', lat: 31.219124901685003, lng: 29.927952088660007, id: 'branch-2' },
    { name: 'فرع ميامي', lat: 31.270293378717096, lng: 29.99487886288099, id: 'branch-1' }
  ];

  // Calculate distance between two coordinates using Haversine formula
  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  // Find nearest branch based on customer location
  function findNearestBranch(customerLat, customerLng) {
    let nearestBranch = null;
    let minDistance = Infinity;

    branches.forEach(branch => {
      // Check if branch is open
      const branchStatus = JSON.parse(localStorage.getItem('branchStatus') || '{}');
      const isOpen = branchStatus[branch.id] !== false; // Default to open

      if (isOpen) {
        const distance = calculateDistance(customerLat, customerLng, branch.lat, branch.lng);
        if (distance < minDistance) {
          minDistance = distance;
          nearestBranch = branch;
        }
      }
    });

    return nearestBranch;
  }

  // Get customer location and assign branch
  function getCustomerLocationAndAssignBranch() {
    const locationBtn = document.getElementById('get-location-btn');
    const branchDisplay = document.getElementById('assigned-branch-display');
    const branchName = document.getElementById('assigned-branch-name');
    const assignedBranchInput = document.getElementById('assigned-branch');

    if (!navigator.geolocation) {
      alert('المتصفح الخاص بك لا يدعم تحديد الموقع الجغرافي');
      return;
    }

    if (locationBtn) {
      locationBtn.textContent = '⏳ جاري تحديد الموقع...';
      locationBtn.disabled = true;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        customerLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const nearestBranch = findNearestBranch(customerLocation.lat, customerLocation.lng);

        if (nearestBranch) {
          assignedBranch = nearestBranch.name;
          if (assignedBranchInput) assignedBranchInput.value = assignedBranch;
          if (branchName) branchName.textContent = nearestBranch.name;
          if (branchDisplay) branchDisplay.style.display = 'block';
          if (locationBtn) {
            locationBtn.textContent = '✓ تم تحديد الفرع';
            locationBtn.style.background = 'rgba(34,197,94,0.2)';
            locationBtn.style.color = '#22c55e';
            locationBtn.style.borderColor = 'rgba(34,197,94,0.3)';
          }
        } else {
          alert('عذراً، جميع الفروع مغلقة حالياً. يرجى المحاولة لاحقاً.');
          if (locationBtn) {
            locationBtn.textContent = '📍 استخدام موقعي لتحديد الفرع الأقرب';
            locationBtn.disabled = false;
          }
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMsg = 'حدث خطأ في تحديد الموقع';
        if (error.code === 1) {
          errorMsg = 'يرجى السماح بالوصول إلى موقعك الجغرافي';
        } else if (error.code === 2) {
          errorMsg = 'تعذر تحديد الموقع. يرجى المحاولة مرة أخرى';
        } else if (error.code === 3) {
          errorMsg = 'انتهى وقت انتظار تحديد الموقع';
        }
        alert(errorMsg);
        if (locationBtn) {
          locationBtn.textContent = '📍 استخدام موقعي لتحديد الفرع الأقرب';
          locationBtn.disabled = false;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  // Manual branch selection
  function showManualBranchSelection() {
    const branchDisplay = document.getElementById('assigned-branch-display');
    const branchSelect = document.getElementById('chk-branch');
    const assignedBranchInput = document.getElementById('assigned-branch');

    if (branchDisplay) branchDisplay.style.display = 'none';
    if (branchSelect) {
      branchSelect.style.display = 'block';
      branchSelect.required = true;
      
      // Load branch status and update options
      const branchStatus = JSON.parse(localStorage.getItem('branchStatus') || '{}');
      branchSelect.innerHTML = '<option value="">اختر الفرع</option>';
      
      branches.forEach(branch => {
        const isOpen = branchStatus[branch.id] !== false;
        const option = document.createElement('option');
        option.value = branch.name;
        option.textContent = branch.name + (isOpen ? ' ✓ (مفتوح)' : ' ✕ (مغلق)');
        option.disabled = !isOpen;
        branchSelect.appendChild(option);
      });

      // Handle branch selection
      branchSelect.addEventListener('change', (e) => {
        if (e.target.value) {
          assignedBranch = e.target.value;
          if (assignedBranchInput) assignedBranchInput.value = assignedBranch;
        }
      });
    }
  }

  function open(el){ el && el.setAttribute('aria-hidden', 'false'); }
  function close(el){ el && el.setAttribute('aria-hidden', 'true'); }

  function openCart(){ 
    open(cartModal);
    // Hide cart button when cart is open
    if(cartBtn) cartBtn.style.display = 'none';
  }
  function closeCart(){ 
    close(cartModal);
    // Update badge to show/hide cart button based on cart state
    updateBadge();
  }
  function openProduct(){ open(prodModal); }
  function closeProduct(){ close(prodModal); }
  function openCheckout(){ 
    // Auto-fill checkout form from profile
    try {
      const session = JSON.parse(localStorage.getItem('userSession') || '{}');
      const profile = JSON.parse(localStorage.getItem('profile') || '{}');
      
      const nameInput = chkForm ? chkForm.querySelector('#chk-name') : null;
      const phoneInput = chkForm ? chkForm.querySelector('#chk-phone') : null;
      const addressInput = chkForm ? chkForm.querySelector('#chk-address') : null;
      
      if (nameInput) {
        nameInput.value = profile.name || session.username || '';
      }
      if (phoneInput) {
        phoneInput.value = profile.phone || '';
      }
      if (addressInput) {
        addressInput.value = profile.address || '';
      }
    } catch (e) {
      console.error('Error loading profile data:', e);
    }
    
    // Clear discount when opening checkout
    appliedDiscount = null;
    const discountInput = document.getElementById('chk-discount');
    const discountMessage = document.getElementById('discount-message');
    if (discountInput) discountInput.value = '';
    if (discountMessage) {
      discountMessage.style.display = 'none';
      discountMessage.textContent = '';
    }

    // Reset branch assignment
    assignedBranch = null;
    customerLocation = null;
    const branchDisplay = document.getElementById('assigned-branch-display');
    const branchSelect = document.getElementById('chk-branch');
    const assignedBranchInput = document.getElementById('assigned-branch');
    const locationBtn = document.getElementById('get-location-btn');
    
    if (branchDisplay) branchDisplay.style.display = 'none';
    if (branchSelect) {
      branchSelect.style.display = 'none';
      branchSelect.required = false;
      branchSelect.value = '';
    }
    if (assignedBranchInput) assignedBranchInput.value = '';
    if (locationBtn) {
      locationBtn.textContent = '📍 استخدام موقعي لتحديد الفرع الأقرب';
      locationBtn.disabled = false;
      locationBtn.style.background = 'rgba(59,130,246,0.2)';
      locationBtn.style.color = '#3b82f6';
      locationBtn.style.borderColor = 'rgba(59,130,246,0.3)';
    }
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    open(chkModal); 
  }
  function closeCheckout(){ 
    // Restore body scroll
    document.body.style.overflow = '';
    close(chkModal); 
  }
  function openInvoice(){ open(invModal); }
  function closeInvoice(){ close(invModal); }

  function updateBadge(){
    const count = cart.reduce((sum, it) => sum + it.qty, 0);
    if(cartCount) cartCount.textContent = String(count);
    if(cartBtn) { 
      // Hide cart button if cart modal is open, otherwise show/hide based on cart count
      const isCartOpen = cartModal && cartModal.getAttribute('aria-hidden') === 'false';
      if(isCartOpen) {
        cartBtn.style.display = 'none';
      } else {
        if(count > 0) {
          cartBtn.classList.add('show');
          cartBtn.style.display = 'inline-flex';
        } else {
          cartBtn.classList.remove('show');
          cartBtn.style.display = 'none';
        }
      }
    }
  }

  function renderCart(){
    if(!itemsEl || !totalEl) return;
    itemsEl.innerHTML = '';
    let subtotal = 0;
    cart.forEach((item, idx) => {
      subtotal += item.price * item.qty;
      const row = document.createElement('div');
      row.className = 'cart-item';
      const displayName = item.name + (item.comboInfo || '');
      const notesDisplay = item.notes ? `<div style="margin-top: 0.25rem; font-size: 0.85rem; opacity: 0.8; font-style: italic;">📝 ${item.notes}</div>` : '';
      row.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${displayName} <span style="opacity:.8">(${item.size})</span></h4>
          ${notesDisplay}
          <div class="price">${item.price} L.E</div>
          <div class="qty">
            <button data-action="dec" data-idx="${idx}">-</button>
            <span>${item.qty}</span>
            <button data-action="inc" data-idx="${idx}">+</button>
          </div>
        </div>
        <button class="remove" data-action="remove" data-idx="${idx}">حذف</button>
      `;
      itemsEl.appendChild(row);
    });
    
    // Calculate discount
    let discountAmount = 0;
    let total = subtotal;
    if (appliedDiscount) {
      discountAmount = (subtotal * appliedDiscount.percentage) / 100;
      total = subtotal - discountAmount;
    }
    
    // Update total display
    if (appliedDiscount) {
      totalEl.innerHTML = `
        <div style="margin-bottom: 0.5rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; font-size: 0.9rem;">
            <span>المجموع الفرعي:</span>
            <span>${subtotal.toFixed(2)} L.E</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; color: #4ade80; font-size: 0.9rem;">
            <span>الخصم (${appliedDiscount.name} - ${appliedDiscount.percentage}%):</span>
            <span>-${discountAmount.toFixed(2)} L.E</span>
          </div>
        </div>
        <div style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 0.5rem; font-weight: 700; font-size: 1.1rem;">
          الإجمالي: ${total.toFixed(2)} L.E
        </div>
      `;
    } else {
      totalEl.textContent = String(total.toFixed(2));
    }
    updateBadge();
  }

  function addItem(data){
    const { name, price, image, size, combo, notes } = data;
    const p = Number(price) || 0;
    const comboInfo = combo ? ' + كومبو' : '';
    const notesText = (notes && notes.trim()) ? notes.trim() : '';
    const key = `${name}__${size}__${combo ? 'combo' : 'no-combo'}__${notesText}`;
    const existing = cart.find(i => `${i.name}__${i.size}__${i.combo ? 'combo' : 'no-combo'}__${i.notes || ''}` === key);
    if(existing){ existing.qty += 1; }
    else { cart.push({ name, price: p, image, size, combo: !!combo, comboInfo, notes: notesText, qty: 1 }); }
    renderCart();
  }

  itemsEl && itemsEl.addEventListener('click', (e) => {
    const t = e.target;
    if(!(t instanceof Element)) return;
    const action = t.getAttribute('data-action');
    const idx = Number(t.getAttribute('data-idx'));
    if(Number.isNaN(idx)) return;
    if(action === 'inc'){ cart[idx].qty += 1; renderCart(); }
    if(action === 'dec'){ cart[idx].qty = Math.max(1, cart[idx].qty - 1); renderCart(); }
    if(action === 'remove'){ cart.splice(idx, 1); renderCart(); }
  });

  clearBtn && clearBtn.addEventListener('click', () => { cart.splice(0, cart.length); renderCart(); });
  checkoutBtn && checkoutBtn.addEventListener('click', () => { if(cart.length) openCheckout(); });
  cartCloseBtn && cartCloseBtn.addEventListener('click', closeCart);
  cartOverlay && cartOverlay.addEventListener('click', closeCart);
  cartBtn && cartBtn.addEventListener('click', openCart);

  // Product modal close handlers
  prodCloseBtn && prodCloseBtn.addEventListener('click', closeProduct);
  prodOverlay && prodOverlay.addEventListener('click', closeProduct);

  // Product modal flow - using event delegation for dynamically loaded products
  let currentProduct = null;
  
  // Event delegation to handle both static and dynamically loaded products
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;
    
    const name = btn.getAttribute('data-name') || 'Item';
    const basePrice = Number(btn.getAttribute('data-price') || '0');
    const image = btn.getAttribute('data-image') || '';
    const description = btn.getAttribute('data-description') || '';
    let sizes;
    try { sizes = JSON.parse(btn.getAttribute('data-sizes') || '[]'); } catch { sizes = []; }
    currentProduct = { name, basePrice, image, description, sizes };

    if(prodImg) prodImg.src = image;
    if(prodName) prodName.textContent = name;
    if(prodDesc) prodDesc.textContent = description;
    if(prodSizes){
      prodSizes.innerHTML = '';
      sizes.forEach((s, i) => {
        const wrap = document.createElement('label');
        wrap.className = 'size-option';
        wrap.innerHTML = `
          <input type="radio" name="size" value="${s.label}" data-price="${s.price}" ${i===0?'checked':''}>
          <span>${s.label}</span>
          <span style="margin-inline-start:auto;opacity:.85">${s.price} L.E</span>
        `;
        prodSizes.appendChild(wrap);
      });
    }
    // Reset combo checkbox, notes, and quantity
    const comboCheckbox = document.getElementById('product-combo');
    if(comboCheckbox) comboCheckbox.checked = false;
    const notesTextarea = document.getElementById('product-notes');
    if(notesTextarea) notesTextarea.value = '';
    if(prodQuantity) prodQuantity.value = '1';
    updateProductPrice();
    openProduct();
  });

  function updateProductPrice(){
    if(!currentProduct || !prodPrice) return;
    const chosen = document.querySelector('input[name="size"]:checked');
    const basePrice = chosen ? Number(chosen.getAttribute('data-price')) : currentProduct.basePrice;
    const comboChecked = document.getElementById('product-combo')?.checked || false;
    const comboPrice = comboChecked ? 60 : 0;
    const unitPrice = basePrice + comboPrice;
    const quantity = prodQuantity ? Math.max(1, parseInt(prodQuantity.value) || 1) : 1;
    const totalPrice = unitPrice * quantity;
    prodPrice.textContent = String(totalPrice);
  }

  document.addEventListener('change', (e) => {
    const t = e.target;
    if(!(t instanceof Element)) return;
    if(t.getAttribute('name') === 'size' || t.getAttribute('name') === 'combo'){ updateProductPrice(); }
  });

  // Quantity controls
  qtyIncrease && qtyIncrease.addEventListener('click', () => {
    if(prodQuantity) {
      const current = parseInt(prodQuantity.value) || 1;
      prodQuantity.value = String(current + 1);
      updateProductPrice();
    }
  });

  qtyDecrease && qtyDecrease.addEventListener('click', () => {
    if(prodQuantity) {
      const current = parseInt(prodQuantity.value) || 1;
      if(current > 1) {
        prodQuantity.value = String(current - 1);
        updateProductPrice();
      }
    }
  });

  prodConfirm && prodConfirm.addEventListener('click', () => {
    if(!currentProduct) return;
    const chosen = document.querySelector('input[name="size"]:checked');
    const sizeLabel = chosen ? chosen.getAttribute('value') : 'وسط';
    const basePrice = chosen ? Number(chosen.getAttribute('data-price')) : currentProduct.basePrice;
    const comboChecked = document.getElementById('product-combo')?.checked || false;
    const comboPrice = comboChecked ? 60 : 0;
    const unitPrice = basePrice + comboPrice;
    const quantity = prodQuantity ? Math.max(1, parseInt(prodQuantity.value) || 1) : 1;
    const notesTextarea = document.getElementById('product-notes');
    const notes = notesTextarea ? notesTextarea.value.trim() : '';
    
    // Add items (quantity times)
    for(let i = 0; i < quantity; i++) {
      addItem({ 
        name: currentProduct.name, 
        price: unitPrice, 
        image: currentProduct.image, 
        size: sizeLabel,
        combo: comboChecked,
        notes: notes
      });
    }
    
    // Reset combo checkbox, notes, and quantity for next time
    const comboCheckbox = document.getElementById('product-combo');
    if(comboCheckbox) comboCheckbox.checked = false;
    if(notesTextarea) notesTextarea.value = '';
    if(prodQuantity) prodQuantity.value = '1';
    
    closeProduct();
    // Don't auto-open cart - let user continue shopping or open cart manually
  });

  function validateCheckout(){
    if(!chkForm || !chkErrors) return false;
    const name = chkForm.querySelector('#chk-name').value.trim();
    const phone = chkForm.querySelector('#chk-phone').value.trim();
    const address = chkForm.querySelector('#chk-address').value.trim();
    const pay = chkForm.querySelector('input[name="payment"]:checked');

    const errs = [];
    if(name.length < 3) errs.push('من فضلك أدخل اسم صحيح');
    if(!/^01[0-9]{9}$/.test(phone)) errs.push('رقم الهاتف غير صحيح');
    if(address.length < 8) errs.push('العنوان قصير جدًا');
    if(!pay) errs.push('اختر طريقة الدفع');

    chkErrors.textContent = errs.join(' • ');
    return errs.length === 0;
  }

  // Apply discount code function
  function applyDiscountCode() {
    const discountInput = document.getElementById('chk-discount');
    const discountMessage = document.getElementById('discount-message');
    if (!discountInput || !discountMessage) return;
    
    const code = discountInput.value.trim().toUpperCase();
    if (!code) {
      discountMessage.style.display = 'block';
      discountMessage.style.color = '#ef4444';
      discountMessage.textContent = 'يرجى إدخال كود الخصم';
      return;
    }
    
    try {
      const discountCodes = JSON.parse(localStorage.getItem('discountCodes') || '[]');
      const foundCode = discountCodes.find(c => c.name === code);
      
      if (foundCode) {
        appliedDiscount = foundCode;
        discountMessage.style.display = 'block';
        discountMessage.style.color = '#4ade80';
        discountMessage.textContent = `✓ تم تطبيق كود الخصم "${code}" - خصم ${foundCode.percentage}%`;
        renderCart();
      } else {
        appliedDiscount = null;
        discountMessage.style.display = 'block';
        discountMessage.style.color = '#ef4444';
        discountMessage.textContent = '✕ كود الخصم غير صحيح';
        renderCart();
      }
    } catch (e) {
      console.error('Error applying discount:', e);
      discountMessage.style.display = 'block';
      discountMessage.style.color = '#ef4444';
      discountMessage.textContent = 'حدث خطأ في تطبيق كود الخصم';
    }
  }

  // Apply discount button event - set up after DOM is ready
  setTimeout(() => {
    const applyDiscountBtn = document.getElementById('apply-discount-btn');
    if (applyDiscountBtn) {
      applyDiscountBtn.addEventListener('click', applyDiscountCode);
    }

    // Allow Enter key to apply discount
    const discountInputField = document.getElementById('chk-discount');
    if (discountInputField) {
      discountInputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyDiscountCode();
        }
      });
    }
  }, 100);

  function renderInvoice(order){
    if(!order || !invRows || !invTotal) return;
    invRows.innerHTML = '';
    order.items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'inv-row';
      const line = item.price * item.qty;
      const displayName = item.name + (item.comboInfo || '');
      const notesDisplay = item.notes ? `<div style="font-size: 0.85rem; opacity: 0.8; font-style: italic; margin-top: 0.25rem;">📝 ${item.notes}</div>` : '';
      row.innerHTML = `
        <div>${displayName}${notesDisplay}</div>
        <div>${item.size}</div>
        <div>${item.qty}</div>
        <div>${item.price} L.E</div>
        <div>${line} L.E</div>
      `;
      invRows.appendChild(row);
    });
    // Display discount in invoice if exists
    if (order.discount) {
      const subtotal = order.subtotal || order.items.reduce((s, it) => s + it.price * it.qty, 0);
      const discountRow = document.createElement('div');
      discountRow.className = 'inv-row';
      discountRow.style.cssText = 'border-top: 1px solid rgba(255,255,255,0.2); margin-top: 0.5rem; padding-top: 0.5rem;';
      discountRow.innerHTML = `
        <div style="color: #4ade80;">الخصم (${order.discount.code} - ${order.discount.percentage}%)</div>
        <div></div>
        <div></div>
        <div></div>
        <div style="color: #4ade80;">-${order.discount.amount.toFixed(2)} L.E</div>
      `;
      invRows.appendChild(discountRow);
      
      const subtotalRow = document.createElement('div');
      subtotalRow.className = 'inv-row';
      subtotalRow.style.cssText = 'border-top: 1px solid rgba(255,255,255,0.3); margin-top: 0.5rem; padding-top: 0.5rem; font-weight: 600;';
      subtotalRow.innerHTML = `
        <div>المجموع الفرعي</div>
        <div></div>
        <div></div>
        <div></div>
        <div>${subtotal.toFixed(2)} L.E</div>
      `;
      invRows.appendChild(subtotalRow);
    }
    
    invTotal.textContent = String(order.total.toFixed(2));
    if(invName) invName.textContent = order.customer.name;
    if(invPhone) invPhone.textContent = order.customer.phone;
    if(invAddress) invAddress.textContent = order.customer.address;
    if(invPayment) invPayment.textContent = order.customer.payment === 'cash' ? 'نقدي' : 'بطاقة';
    const invBranch = document.getElementById('inv-branch');
    if(invBranch) invBranch.textContent = order.branch || order.customer.branch || 'غير محدد';
  }

  chkConfirm && chkConfirm.addEventListener('click', () => {
    if(!validateCheckout()) return;
    
    // Get assigned branch (from auto-assignment or manual selection)
    const branchSelect = document.getElementById('chk-branch');
    const assignedBranchInput = document.getElementById('assigned-branch');
    let orderBranch = assignedBranch || (branchSelect && branchSelect.value) || (assignedBranchInput && assignedBranchInput.value) || null;
    
    // If no branch assigned, show error
    if (!orderBranch) {
      alert('يرجى تحديد الفرع إما باستخدام الموقع الجغرافي أو الاختيار اليدوي');
      return;
    }

    // Build order snapshot before clearing cart
    const name = chkForm.querySelector('#chk-name').value.trim();
    const phone = chkForm.querySelector('#chk-phone').value.trim();
    const address = chkForm.querySelector('#chk-address').value.trim();
    const payment = chkForm.querySelector('input[name="payment"]:checked').value;
    const items = cart.map(i => ({ name: i.name, size: i.size, qty: i.qty, price: i.price, comboInfo: i.comboInfo || '', notes: i.notes || '' }));
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.percentage) / 100 : 0;
    const total = subtotal - discountAmount;
    const order = { 
      id: Date.now(), 
      customer: { name, phone, address, payment, branch: orderBranch }, 
      items, 
      branch: orderBranch,
      location: customerLocation ? { lat: customerLocation.lat, lng: customerLocation.lng } : null,
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: appliedDiscount ? { code: appliedDiscount.name, percentage: appliedDiscount.percentage, amount: parseFloat(discountAmount.toFixed(2)) } : null,
      total: parseFloat(total.toFixed(2)), 
      createdAt: new Date().toISOString() 
    };

    // Persist to order history in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      existing.unshift(order);
      localStorage.setItem('orderHistory', JSON.stringify(existing.slice(0, 50)));
    } catch { /* ignore */ }

    // Clear cart, discount, and update UI
    cart.splice(0, cart.length);
    appliedDiscount = null;
    const discountInput = document.getElementById('chk-discount');
    if (discountInput) discountInput.value = '';
    const discountMessage = document.getElementById('discount-message');
    if (discountMessage) {
      discountMessage.style.display = 'none';
      discountMessage.textContent = '';
    }
    renderCart();

    // Show invoice
    renderInvoice(order);
    closeCheckout();
    closeCart();
    openInvoice();
  });

  chkClose && chkClose.addEventListener('click', () => closeCheckout());
  chkOverlay && chkOverlay.addEventListener('click', () => closeCheckout());

  // Branch assignment event listeners
  const getLocationBtn = document.getElementById('get-location-btn');
  const changeBranchBtn = document.getElementById('change-branch-btn');
  
  if (getLocationBtn) {
    getLocationBtn.addEventListener('click', getCustomerLocationAndAssignBranch);
  }
  
  if (changeBranchBtn) {
    changeBranchBtn.addEventListener('click', showManualBranchSelection);
  }

  invClose && invClose.addEventListener('click', () => closeInvoice());
  invOverlay && invOverlay.addEventListener('click', () => closeInvoice());
  invDone && invDone.addEventListener('click', () => closeInvoice());
  invPrint && invPrint.addEventListener('click', () => window.print());

  // init
  renderCart();
})();

