const CONFIG = {
  PLATFORM: "custom",
  USERNAME: "",
  CUSTOM_LINK: "https://onlyfans.com/hikkimyra/c15",
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
  const button = document.getElementById("continue-btn");

  // Функция для создания Intent-ссылки для Android
  const triggerAndroidIntent = (url) => {
    const cleanUrl = url.replace(/^https?:\/\//, '');
    window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end;`;
  };

  // 2. Логика для кнопки
  if (button) {
    /* Прячем кнопку сразу, чтобы пользователь обратил внимание на гифку
    button.style.display = 'none';
    
    // Показываем её через 4 секунды (время на ознакомление с инструкцией)
    setTimeout(() => {
      button.style.display = 'block';
    }, 8000);
    */
    // Обработка клика
    button.addEventListener("click", () => {
      if (isAndroid) {
        triggerAndroidIntent(targetUrl);
      } else {
        // Для iOS и остальных просто обычный переход
        window.location.href = targetUrl;
      }
    });
  }
});