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
  const ref = document.referrer || "";

  // 1. Прямые признаки WebView (самые надежные)
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  
  const isAndroidWebView = isAndroid && (ua.includes("wv") || /Version\/.*Chrome/i.test(ua));
  const isIOSWebView = isIOS && !ua.includes("Safari") && ua.includes("AppleWebKit");

  // 2. Список "подозрительных" приложений
  const knownInApp = /(FBAN|FBAV|Instagram|Line|Twitter|LinkedIn|MicroMessenger|Telegram|tiktok|TTWebView|musically|WebView|wv)/i;
  
  // 3. Проверка реферера (только если нет признаков полноценного браузера)
  const isSocialReferrer = /t\.me|telegram\.org|tiktok\.com|vk\.com|instagram\.com|l\.instagram\.com/i.test(ref);
  
  // 4. Финальный вердикт:
  // Если это iOS/Android WebView ИЛИ (это "подозрительное" приложение ИЛИ есть реферер из соцсети)
  // НО при этом, если в UA есть слово "Safari" или "Chrome" и нет "wv" — это скорее всего браузер, а не WebView.
  
  const isLikelyWebView = isAndroidWebView || isIOSWebView || knownInApp.test(ua) || isSocialReferrer;
  const isRealBrowser = /Safari/i.test(ua) && /Chrome/i.test(ua) && !ua.includes("wv");

  return isLikelyWebView && !isRealBrowser;
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
  msg.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:white; z-index:9999; padding:20px; text-align:center; box-sizing:border-box;";
  msg.innerHTML = `
    <h2>Open in browser</h2>
    <p>Вы находитесь в приложении. Нажмите на три точки сверху и выберите "Открыть в браузере".</p>
    <div id="debug-info" style="margin-top:20px; font-size:12px; color:gray; text-align:left;"></div>
  `;
  document.body.appendChild(msg); // НЕ стираем body, а добавляем поверх
  
  // Отладка
  document.getElementById('debug-info').innerText = 
    "UA: " + navigator.userAgent.substring(0, 50) + "...\n" +
    "IsWebView: " + isWebView();
}

function redirectOrLoad() {
  const { ENABLE_WEBVIEW_CHECK, REDIRECT_IN_APP, FALLBACK_TO_WEB, FALLBACK_TIMEOUT, WEBVIEW_MESSAGE, DISABLE_REDIRECT } = CONFIG;
  const { appUrl, webUrl } = getLinks();

  if (DISABLE_REDIRECT) return;

  const inWebView = ENABLE_WEBVIEW_CHECK && isWebView();

  // Если определили, что это WebView
  if (inWebView && WEBVIEW_MESSAGE) {
    showWebViewWarning();
    return;
  }

  // Если это обычный браузер - делаем редирект
  if (REDIRECT_IN_APP) {
    window.location.replace(appUrl);
  }

  if (FALLBACK_TO_WEB) {
    setTimeout(() => {
      window.location.href = webUrl;
    }, FALLBACK_TIMEOUT);
  }
}

// Запуск
document.addEventListener("DOMContentLoaded", () => {
  if (!CONFIG.DISABLE_REDIRECT) {
    redirectOrLoad();
  }
  });