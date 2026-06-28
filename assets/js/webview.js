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
  REDIRECT_IN_APP: false,


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

  const isInstagram = 
    /Instagram/i.test(ua) ||
    /FBAN|FBAV/i.test(ua) ||
    /Instagram.*WebView/i.test(ua);

  const isAndroidWV =
    /Android/i.test(ua) && 
    (/wv/i.test(ua) || !/Chrome/i.test(ua));

  const isIOSWV =
    /iPhone|iPad|iPod/i.test(ua) &&
    /AppleWebKit/i.test(ua) &&
    !/Safari/i.test(ua);

  return isInstagram || isAndroidWV || isIOSWV;
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
    appUrl: "",
    webUrl: CUSTOM_LINK
  };
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
  const { FALLBACK_TIMEOUT, WEBVIEW_MESSAGE, ENABLE_WEBVIEW_CHECK, DISABLE_REDIRECT } = CONFIG;
  const { webUrl } = getLinks();

  if (DISABLE_REDIRECT) return;


  if (ENABLE_WEBVIEW_CHECK && isWebView()) {
    showWebViewWarning();
    return;
  }


  setTimeout(() => {
    window.location.replace(webUrl);
  }, 100);
}


document.addEventListener("DOMContentLoaded", () => {

  console.log("UA:", navigator.userAgent);
  console.log("WEBVIEW:", isWebView());

  redirectOrLoad();

  });
  const { webUrl } = getLinks();
  const button = document.querySelector(".button");

  if (button) {
    button.onclick = () => {
      window.location.href = webUrl;
    };
  }

  if (!CONFIG.DISABLE_REDIRECT) {
    redirectOrLoad();
  }
});