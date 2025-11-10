// Simple site-wide i18n
(function(){
  const TRANSLATIONS = {
    ar: {
      _meta: { dir: 'rtl', lang: 'ar', toggleLabel: 'EN' },
      nav_home: 'الرئيسية',
      nav_menu: 'القائمة',
      nav_about: 'حول',
      nav_contact: 'اتصل بنا',
      nav_login: 'تسجيل الدخول',
      nav_dashboard: 'لوحة التحكم',
      site_name: '3etra-عترة',
      footer_title: '3etra-عترة',
      footer_tagline: 'فاست فود بس مظبوط .',
      footer_phone_label: 'الهاتف:',
      footer_email_label: 'البريد:',
      footer_rights: 'جميع الحقوق محفوظة.',
      login_title: 'تسجيل الدخول',
      login_user_type: 'نوع المستخدم:',
      login_select_placeholder: 'اختر نوع المستخدم',
      login_admin: 'مدير',
      login_client: 'عميل',
      login_username: 'اسم المستخدم:',
      login_username_ph: 'أدخل اسم المستخدم',
      login_password: 'كلمة المرور:',
      login_password_ph: 'أدخل كلمة المرور',
      login_submit: 'تسجيل الدخول',
      login_skip: 'الدخول كزائر (بدون تسجيل دخول)'
    },
    en: {
      _meta: { dir: 'ltr', lang: 'en', toggleLabel: 'AR' },
      nav_home: 'Home',
      nav_menu: 'Menu',
      nav_about: 'About',
      nav_contact: 'Contact',
      nav_login: 'Login',
      nav_dashboard: 'Dashboard',
      site_name: '3etra',
      footer_title: '3etra',
      footer_tagline: 'Fast food, done right.',
      footer_phone_label: 'Phone:',
      footer_email_label: 'Email:',
      footer_rights: 'All rights reserved.',
      login_title: 'Sign In',
      login_user_type: 'User type:',
      login_select_placeholder: 'Select user type',
      login_admin: 'Admin',
      login_client: 'Client',
      login_username: 'Username:',
      login_username_ph: 'Enter username',
      login_password: 'Password:',
      login_password_ph: 'Enter password',
      login_submit: 'Sign In',
      login_skip: 'Continue as guest'
    }
  };

  function applyTranslations(dict){
    // Text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(key && dict[key] != null){ el.textContent = String(dict[key]); }
    });
    // Placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if(key && dict[key] != null){ el.setAttribute('placeholder', String(dict[key])); }
    });
    // Options text
    document.querySelectorAll('option[data-i18n]').forEach(op => {
      const key = op.getAttribute('data-i18n');
      if(key && dict[key] != null){ op.textContent = String(dict[key]); }
    });
    // Buttons value if needed
    document.querySelectorAll('button[data-i18n]').forEach(btn => {
      const key = btn.getAttribute('data-i18n');
      if(key && dict[key] != null){ btn.textContent = String(dict[key]); }
    });
  }

  function setLanguage(lang){
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.ar;
    const meta = dict._meta;
    const html = document.documentElement;
    html.lang = meta.lang;
    html.dir = meta.dir;
    applyTranslations(dict);
    const toggle = document.getElementById('lang-toggle');
    if(toggle) toggle.textContent = meta.toggleLabel;
    // Ensure mobile menu is closed after language change so it doesn't overlay content
    const links = document.getElementById('primary-nav');
    if (links && links.classList) links.classList.remove('show');
    localStorage.setItem('site_lang', lang);
  }

  function initI18n(){
    const saved = localStorage.getItem('site_lang');
    const lang = saved === 'en' ? 'en' : 'ar';
    setLanguage(lang);

    const toggle = document.getElementById('lang-toggle');
    if(toggle){
      toggle.addEventListener('click', () => {
        const current = localStorage.getItem('site_lang') === 'en' ? 'en' : 'ar';
        setLanguage(current === 'en' ? 'ar' : 'en');
      });
    }
  }

  window.i18n = { setLanguage };
  document.addEventListener('DOMContentLoaded', initI18n);
})();


