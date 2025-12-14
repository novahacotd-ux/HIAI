import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div style={wrapper}>
      <button onClick={() => changeLang("vi")} style={btn}>🇻🇳 VI</button>
      <button onClick={() => changeLang("en")} style={btn}>🇺🇸 EN</button>
      <button onClick={() => changeLang("ru")} style={btn}>🇷🇺 RU</button>
    </div>
  );
}


/* ===== STYLE ===== */
const wrapper = {
  position: "fixed",
  top: 16,
  right: 16,
  display: "flex",
  gap: 6,
  zIndex: 9999
};

const btn = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600
};
