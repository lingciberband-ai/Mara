const CONFIG = {
  
  /**
   * Тип платформы, на которую происходит переход.
   * Возможные значения:
   *  - "instagram" — откроет профиль в приложении Instagram или в браузере.
   *  - "onlyfans"  — откроет профиль на OnlyFans.
   *  - "telegram"  — откроет чат в Telegram.
   *  - "custom"    — позволяет указать свою произвольную ссылку в CUSTOM_LINK.
   */
  PLATFORM: "custom",


  /**
   * Имя пользователя (username) для выбранной платформы.
   * Примеры:
   *  - Instagram:     https://instagram.com/didenok
   *  - OnlyFans:      https://onlyfans.com/didenok
   *  - Telegram:      https://t.me/didenok
   */
  USERNAME: "",


  /**
   * Своя кастомная ссылка. Используется только если PLATFORM = "custom".
   * Например: "https://example.com/landing"
   */
  CUSTOM_LINK: "https://fansly.com/hikkimyra/t7",


  /**
   * Включает или отключает проверку на WebView (встроенный браузер приложений).
   * true  — если пользователь во встроенном браузере, покажется сообщение "Откройте в браузере".
   * false — проверка отключена, редирект произойдёт сразу.
   */
  ENABLE_WEBVIEW_CHECK: true,


  /**
   * Нужно ли пытаться открыть ссылку через приложение (если оно установлено).
   * true  — скрипт попытается открыть приложение (Instagram, Telegram и т.п.)
   * false — не будет пытаться открыть в приложении, сразу будет работать fallback на веб.
   */
  REDIRECT_IN_APP: true,


  /**
   * Нужно ли делать переход на веб-версию (если приложение не открылось).
   * true  — через указанное время произойдёт переход на web-версию.
   * false — ничего не произойдёт, если приложение не открылось.
   */
  FALLBACK_TO_WEB: true,


  /**
   * Показывать ли сообщение "Откройте в браузере", если пользователь в WebView.
   * true  — сообщение будет показано.
   * false — даже если пользователь в WebView, скрипт попытается редиректить (на свой страх и риск).
   */
  WEBVIEW_MESSAGE: true,


  /**
   * Время ожидания (в миллисекундах) перед переходом на web-версию, если приложение не открылось.
   * По умолчанию 2000 мс (2 секунды).
   */
  FALLBACK_TIMEOUT: 2000,

  /**
   * Полностью отключает редиректы (всё остаётся на текущей странице).
   * true  — редиректы отключены.
   * false — работает обычная логика переходов.
    */
  DISABLE_REDIRECT: false,
};

function isWebView() {
  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);

  // 1. ЗАЩИТА ОТ ПК: Встроенных WebView не бывает на компьютерах.
  // Если это не iOS и не Android, сразу возвращаем false.
  if (!isAndroid && !isIOS) {
    return false;
  }

  const isIOSWebView = isIOS && !ua.includes("Safari") && ua.includes("AppleWebKit");
  const isAndroidWebView = isAndroid && ua.includes("wv");

  const knownInApp = /(FBAN|FBAV|Instagram|Line|Twitter|LinkedIn|MicroMessenger|WebView|wv|Telegram|tiktok|TTWebView|musically|Viber|VK|Snapchat|Discord|YaApp)/i;
  const fromApp = knownInApp.test(ua) || /t\.me|telegram\.org|tiktok\.com|vk\.com|instagram\.com/i.test(document.referrer);

  return isIOSWebView || isAndroidWebView || fromApp;
}

function redirectOrLoad() {
  const { ENABLE_WEBVIEW_CHECK, REDIRECT_IN_APP, FALLBACK_TO_WEB, FALLBACK_TIMEOUT, WEBVIEW_MESSAGE, DISABLE_REDIRECT } = CONFIG;
  const { appUrl, webUrl } = getLinks();

  if (DISABLE_REDIRECT) return;

  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isMobile = isIOS || isAndroid; // Проверяем, с мобилки ли сидит пользователь

  const inWebView = ENABLE_WEBVIEW_CHECK && isWebView();

  // Если пользователь в WebView — показываем предупреждение и ОСТАНАВЛИВАЕМ скрипт
  if (inWebView && WEBVIEW_MESSAGE) {
    showWebViewWarning();
    return;
  }

  // === ЕСЛИ МЫ ЗДЕСЬ, ЗНАЧИТ ПОЛЬЗОВАТЕЛЬ В ОБЫЧНОМ БРАУЗЕРЕ ===

  // 2. Логика для Компьютеров (ПК)
  if (!isMobile) {
    // На десктопе нет смысла открывать мобильные приложения, сразу кидаем на веб-версию
    window.location.replace(webUrl);
    return; 
  }

  // 3. Логика для Мобильных браузеров (Safari, Chrome и т.д.)
  if (REDIRECT_IN_APP) {
    // Используем replace(), чтобы страница-прокладка не засоряла историю "Назад" в браузере
    window.location.replace(appUrl);
  }

  // Фолбэк: если приложение не установлено или ссылка не сработала, через 2 секунды кидаем на веб
  if (FALLBACK_TO_WEB) {
    setTimeout(() => {
      window.location.replace(webUrl);
    }, FALLBACK_TIMEOUT);
  }
}

function getLinks() {
  const { PLATFORM, USERNAME, CUSTOM_LINK } = CONFIG;

  switch (PLATFORM.toLowerCase()) {
    case "instagram":
      return {
        appUrl: `instagram://user?username=${USERNAME}`,
        webUrl: `https://www.instagram.com/${USERNAME}/`
      };
    case "onlyfans":
      return {
        appUrl: `https://onlyfans.com/${USERNAME}`,
        webUrl: `https://onlyfans.com/${USERNAME}`
      };
    case "telegram":
      return {
        appUrl: `tg://resolve?domain=${USERNAME}`,
        webUrl: `https://t.me/${USERNAME}`
      };
    case "custom":
      return {
        appUrl: CUSTOM_LINK,
        webUrl: CUSTOM_LINK
      };
    default:
      return { appUrl: "", webUrl: "" };
  }
}

function showWebViewWarning() {
  const msg = document.createElement("div");
  msg.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif; text-align: center;">
      <h2>Open in browser</h2>
      <p>You are inside an in-app browser.<br>Please tap <b>⋮</b> or <b>⋯</b> above and choose<br><b>"Open in browser"</b>.</p>
      <img class="gif" src="assets/gif/1.gif" alt="animation" style="width: 80%; max-width: 300px;" />
      <img class="arrow" src="assets/png/1.png" alt="arrow" style="position: absolute; top: 2vh; right: 2vw; width: 40px;" />
    </div>
  `;
  document.body.innerHTML = "";
  document.body.appendChild(msg);
}

function redirectOrLoad() {
  const { ENABLE_WEBVIEW_CHECK, REDIRECT_IN_APP, FALLBACK_TIMEOUT, WEBVIEW_MESSAGE, DISABLE_REDIRECT } = CONFIG;
  const { appUrl, webUrl } = getLinks();

  if (DISABLE_REDIRECT) return;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const inWebView = ENABLE_WEBVIEW_CHECK && isWebView();

  // 1. Если это WebView — показываем сообщение и выходим
  if (inWebView && WEBVIEW_MESSAGE) {
    showWebViewWarning();
    return;
  }

  // 2. Если мы здесь — это обычный браузер
  // Попробуем сделать редирект через создание невидимой ссылки (самый надежный способ для Android/iOS)
  if (REDIRECT_IN_APP && isMobile) {
    const link = document.createElement('a');
    link.href = appUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    
    // Запускаем таймер на случай, если приложение не открылось
    setTimeout(() => {
      window.location.href = webUrl;
    }, FALLBACK_TIMEOUT);
  } else {
    // Если не мобилка — просто переход
    window.location.href = webUrl;
  }
}

