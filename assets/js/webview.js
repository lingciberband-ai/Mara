const CONFIG = {
  /**
   * Тип платформы, на которую происходит переход.
   * Возможные значения: "instagram", "onlyfans", "telegram", "custom"
   */
  PLATFORM: "custom",

  /**
   * Имя пользователя (username) для выбранной платформы.
   */
  USERNAME: "",

  /**
   * Своя кастомная ссылка. Используется только если PLATFORM = "custom".
   */
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
  const button = document.getElementById("continue-btn");

  if (button) {
    button.addEventListener("click", () => {
      const targetUrl = getRedirectUrl();
      const ua = navigator.userAgent || "";
      
      // Если это Android, пробуем принудительно открыть Chrome через Intent
      if (/Android/i.test(ua)) {
        // Убираем https:// чтобы собрать правильный intent
        const cleanUrl = targetUrl.replace(/^https?:\/\//, '');
        window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end;`;
      } else {
        // Для iOS (iPhone/iPad) и десктопов делаем обычный, надежный переход
        window.location.href = targetUrl;
      }
    });
  }
});