const CONFIG = {
  PLATFORM: "custom",
  USERNAME: "",
  CUSTOM_LINK: "https://fansly.com/hikkimyra/t7",
};

function getRedirectUrl() {
  const { PLATFORM, USERNAME, CUSTOM_LINK } = CONFIG;

  switch (PLATFORM.toLowerCase()) {
    case "instagram":
      return `https://www.instagram.com/${USERNAME}/`;
    case "onlyfans":
      return `https://onlyfans.com/${USERNAME}`;
    case "telegram":
      return `https://t.me/${USERNAME}`;
    case "custom":
      return CUSTOM_LINK;
    default:
      return CUSTOM_LINK;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const targetUrl = getRedirectUrl();
  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);

  // 1. Попытка открыть Chrome СРАЗУ при загрузке (только для Android)
  if (isAndroid) {
    const cleanUrl = targetUrl.replace(/^https?:\/\//, '');
    window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end;`;
  }

  // 2. Обработчик для кнопки (для iOS или если авто-переход не сработал)
  const button = document.getElementById("continue-btn");
  if (button) {
    button.addEventListener("click", () => {
      if (isAndroid) {
        const cleanUrl = targetUrl.replace(/^https?:\/\//, '');
        window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end;`;
      } else {
        window.location.href = targetUrl;
      }
    });
  }
});