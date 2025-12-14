
import { useRef, useState } from "react";
import "./App.css";
import { artStyles, historyRoles, groupModes } from "./data/styles.js";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";


export default function App() {
  const { t } = useTranslation();
  // ===== MAIN STATE =====
  const [image, setImage] = useState(null);
  const [mode, setMode] = useState(null);
  const [style, setStyle] = useState(null);
  const [ready, setReady] = useState(false);
  const [paid, setPaid] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const fileInputRef = useRef(null);
  const [hoverStyle, setHoverStyle] = useState(null);
  const currentStyles =
  mode === "art"
    ? artStyles
    : mode === "history"
    ? historyRoles
    : mode === "group"
    ? groupModes
    : [];
  // ===== GALLERY STATE =====
const [filter, setFilter] = useState("all");
const [selectedImage, setSelectedImage] = useState(null);

// ===== GALLERY DATA =====
const galleryData = [
  { id: 1, src: "/public/album/biemhoa.png", type: "dongho" },
  { id: 2, src: "/public/album/dongho.png", type: "dongjho" },
  { id: 3, src: "/public/album/lua.png", type: "histkory" },
  { id: 4, src: "/public/album/khacgo.png", type: "history" },
  { id: 5, src: "/public/album/sinhhue.png", type: "couple" },
  { id: 6, src: "/public/album/dantocthieuso.png", type: "couple" },
  { id: 7, src: "/public/album/hangtrong.png", type: "dongho" },
  { id: 8, src: "/public/album/sonmai.png", type: "histlory" },
];


  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  

  /* ===== CAMERA ===== */
  async function startCamera() {
    setShowCamera(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  }
  function regenerateImage() {
  setReady(false);   // ẩn kết quả cũ
  setPaid(false);    // khóa lại download
  setTimeout(() => {
    setReady(true);  // giả lập AI tạo lại
  }, 800);
}
  function clearImage() {
    setImage(null);
    setReady(false);
    setPaid(false);

    // ✅ reset tên file trong input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }
  {/* ===== LANGUAGE SWITCH ===== */}


  function capturePhoto() {
  const video = videoRef.current;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.save();

  // 🔑 FIX LẬT ẢNH: UN-MIRROR CANVAS
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  ctx.restore();

  setImage(canvas.toDataURL("image/png"));
  stopCamera();
}


  function stopCamera() {
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach(t => t.stop());
    setShowCamera(false);
  }

  function handleUpload(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    setReady(false);
    setPaid(false);
  }

  function generateImage() {
    if (!image || !style) {
      alert("Vui lòng upload/chụp ảnh và chọn nội dung");
      return;
    }
    setReady(true);
  }

  function handlePayment() {
    if (!paymentMethod) {
      alert("Vui lòng chọn cổng thanh toán");
      return;
    }
  async function handlePayment() {
  if (!paymentMethod) {
    alert("Vui lòng chọn cổng thanh toán");
    return;
  }

  try {
    const res = await fetch("http://localhost:3001/api/payment/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 5000,
        method: paymentMethod.toLowerCase() // QUAN TRỌNG
      })
    });

    if (!res.ok) {
      throw new Error("Payment API error");
    }

    const data = await res.json();
    console.log("Payment OK:", data);

    // DEMO: mở link thanh toán
    window.open(data.payUrl, "_blank");

    // DEMO: giả lập thanh toán thành công
    setTimeout(() => {
      setPaid(true);
    }, 2000);

  } catch (err) {
    console.error(err);
    alert("❌ Không kết nối được backend thanh toán");
  }
}
  }

  return (
  <div className="page-layout">
    <LanguageSwitcher />

    {/* ================= LEFT CONTENT ================= */}
    <div className="left-content">

      {/* ====== NỘI DUNG GỐC – KHÔNG SỬA ====== */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24, fontFamily: "system-ui" }}>

        {/* HEADER */}
        <header style={{ textAlign: "center", marginBottom: 40 }}>
          <h1>{t("title")}</h1>
            <p>{t("subtitle")}</p>
            <h2>{t("header")}</h2>
        </header>
        {/* UPLOAD / CAMERA */}
            <section>
              <h2>📸{t("input_image")}</h2>

              <div className="input-actions">
                {/* Upload button */}
                <button
                  className="btn-ai"
                  onClick={() => fileInputRef.current.click()}
                >
                  📁 {t("upload_image")}
                </button>

                {/* Take photo button */}
                <button
                  className="btn-ai"
                  onClick={startCamera}
                >
                  📸 {t("take_photo")}
                </button>

                {/* Hidden input */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  ref={fileInputRef}
                  hidden
                />
              </div>

              {showCamera && (
                <div style={{ marginTop: 16 }}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{
                      width: 300,
                      borderRadius: 12,
                      transform: "scaleX(-1)"
                    }}
                  />

                  <div>
                    <button onClick={capturePhoto} style={btn}>
                      📸 {t("capture")}
                    </button>
                    <button onClick={stopCamera} style={btn}>
                      ❌ {t("close")}
                    </button>
                  </div>

                  <canvas ref={canvasRef} hidden />
                </div>
              )}

              {/* IMAGE PREVIEW + DELETE */}
              {image && (
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 12
                  }}
                >
                  <img
                    src={image}
                    style={{
                      maxWidth: 320,
                      borderRadius: 12
                    }}
                  />

                  <button
                    onClick={clearImage}
                    title={t("delete")}
                    style={{
                      height: 44,
                      padding: "0 14px",
                      borderRadius: 10,
                      border: "1px solid #ef4444",
                      background: "#fee2e2",
                      color: "#991b1b",
                      cursor: "pointer",
                      fontWeight: 600
                    }}
                  >
                    🗑️
                  </button>
                </div>
              )}
            </section>


                {/* MODE */}
<section>
  <h2>🎭 {t("convert_type")}</h2>

  <div style={{ marginBottom: 12 }}>
    <button
      className={`btn-ai ${mode === "art" ? "active" : ""}`}
      onClick={() => setMode(mode === "art" ? null : "art")}
    >
      🎨 {t("mode.art")}
    </button>

    <button
      className={`btn-ai ${mode === "history" ? "active" : ""}`}
      onClick={() => setMode(mode === "history" ? null : "history")}
    >
      👑 {t("mode.history")}
    </button>

    <button
      className={`btn-ai ${mode === "group" ? "active" : ""}`}
      onClick={() => setMode(mode === "group" ? null : "group")}
    >
      👥 {t("mode.group")}
    </button>
  </div>
        {/* STYLE SELECTION */}

          {/* STYLE SELECT */}
          <div>
    {!mode && (
      <p style={{ color: "#888", fontStyle: "italic" }}>
        👉 {t("select_mode")}
      </p>
    )}

    {mode &&
      currentStyles.map(s => (
        <div
          key={s.key}
          style={{ position: "relative", display: "inline-block" }}
          onMouseEnter={() => setHoverStyle(s)}
          onMouseLeave={() => setHoverStyle(null)}
        >
          <button
            className={`btn-ai ${style === s.key ? "active" : ""}`}
            onClick={() => setStyle(s.key)}
          >
            {mode === "art" && "🎨 "}
            {mode === "history" && "👑 "}
            {mode === "group" && "👥 "}
            {t(`style.${s.key}`)}
          </button>

    {/* PREVIEW CARD */}
    {hoverStyle?.key === s.key && (
      <div style={previewCard}>
        <img
          src={s.preview}
          alt={s.name}
          style={{
            width: 160,
            height: 120,
            objectFit: "cover",
            borderRadius: 10
          }}
        />
        <p style={{ marginTop: 6, fontSize: 13, fontWeight: 600 }}>
          {s.name}
        </p>
        <p style={{ fontSize: 12, color: "#666" }}>
          {s.desc}
        </p>
      </div>
    )}
  </div>
))}
</div>
        </section>
        {/* GENERATE */}
<section>
  <button onClick={generateImage} style={mainBtn}>
    ✨ {t("generate_ai")}
  </button>
</section>


       {/* RESULT */}
{ready && (
  <section>
    <h2>🖼️ {t("result")}</h2>

    <div style={{ position: "relative", display: "inline-block" }}>
      <img src={image} style={{ maxWidth: 360, borderRadius: 12 }} />

      <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        <button
          onClick={regenerateImage}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "1px solid #ccc",
            background: "#f1f5f9",
            cursor: "pointer"
          }}
        >
          🔄 {t("regenerate")}
        </button>
      </div>

      {!paid && (
        <div style={watermark}>
          <div style={watermarkInner}>
            AI ART VIETNAM
          </div>
        </div>
      )}
    </div>
    {!paid ? (
      <div style={{ marginTop: 24 }}>

        <p style={{ fontWeight: 600 }}>
          🔒 {t("pay_to_download", { price: "5.000đ" })}
        </p>

        {/* CHỌN PHƯƠNG THỨC */}
        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <button
            onClick={() => setPaymentMethod("MoMo")}
            style={{
              ...qrMethodBtn,
              borderColor: paymentMethod === "MoMo" ? "#d82d8b" : "#ddd"
            }}
          >
            <img src="/public/MoMoLogo.png" height={32} />
            
          </button>

          <button
            onClick={() => setPaymentMethod("ZaloPay")}
            style={{
              ...qrMethodBtn,
              borderColor: paymentMethod === "ZaloPay" ? "#0068ff" : "#ddd"
            }}
          >
            <img src="/public/logozalopay.png" height={32} />
            
          </button>
        </div>

        {/* QR CODE */}
        {paymentMethod && (
          <div style={qrBox}>
            <img
              src={
                paymentMethod === "MoMo"
                  ? "/public/momo.jpg"
                  : "/public/zalopay.jpg"
              }
              alt="QR Payment"
              style={{ width: 220, borderRadius: 12 }}
            />

            <p style={{ marginTop: 12, fontSize: 14, color: "#555" }}>
              {t("scan_qr")} <b>{paymentMethod}</b>
            </p>

            <button
              onClick={() => setPaid(true)}
              style={{
                marginTop: 14,
                padding: "10px 20px",
                background: "#16a34a",
                color: "#fff",
                borderRadius: 8,
                border: "none",
                cursor: "pointer"
              }}
            >
              ✅ {t("confirm_paid")}
            </button>
          </div>
        )}
      </div>
    ) : (
      <a href={image} download style={downloadBtn}>
        📥 {t("download_hd")}
      </a>
    )}
  </section>
)}
{/* ================= GALLERY ================= */}
<section style={{ marginTop: 60 }}>
  <h2 style={{ marginBottom: 12 }}>🌟 {t("community_title")}</h2>

  <p style={{ color: "#666", marginBottom: 20 }}>
    {t("community_desc")}
  </p>

  {/* FILTER */}
  <div style={{ marginBottom: 24 }}>
    <button
      style={filterBtn(filter === "all")}
      onClick={() => setFilter("all")}
    >
      {t("filter.all")}
    </button>

    <button
      style={filterBtn(filter === "dongho")}
      onClick={() => setFilter("dongho")}
    >
      {t("filter.dongho")}
    </button>

    <button
      style={filterBtn(filter === "history")}
      onClick={() => setFilter("history")}
    >
      {t("filter.history")}
    </button>

    <button
      style={filterBtn(filter === "couple")}
      onClick={() => setFilter("couple")}
    >
      {t("filter.couple")}
    </button>
  </div>

          {/* MASONRY GRID */}
          <div style={{ columnCount: 4, columnGap: 20 }}>
            {galleryData
              .filter(img => filter === "all" || img.type === filter)
              .map(img => (
                <img
                  key={img.id}
                  src={img.src}
                  loading="lazy"
                  onClick={() => setSelectedImage(img.src)}
                  style={{
                    width: "100%",
                    marginBottom: 20,
                    borderRadius: 14,
                    cursor: "pointer",
                    transition: "transform 0.3s ease"
                  }}
                  onMouseOver={e => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
                />
              ))}
          </div>
        </section>

        {/* ===== IMAGE MODAL ===== */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999
            }}
          >
            <img
              src={selectedImage}
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                borderRadius: 16,
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
              }}
            />
          </div>
        )}

      </div>
    </div>

    {/* ================= RIGHT BACKGROUND ================= */}
    <div className="right-visual">
      <div className="visual-glow" />
      <div className="visual-image" />
    </div>

  </div>
);

}

/* ===== STYLE ===== */
const btn = { margin: 6, padding: "8px 14px", borderRadius: 8, border: "1px solid #ccc" };
const activeBtn = { ...btn, background: "#000", color: "#fff" };
const mainBtn = { padding: "14px 28px", background: "#000", color: "#fff", borderRadius: 10 };
const payBtn = { marginTop: 12, padding: "10px 20px", background: "#16a34a", color: "#fff", borderRadius: 8 };
const downloadBtn = { display: "inline-block", marginTop: 16, padding: "10px 20px", background: "#2563eb", color: "#fff" };
const watermark = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  overflow: "hidden"
};

const watermarkInner = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%) rotate(-30deg)",
  fontSize: 36,
  fontWeight: 900,
  color: "rgba(255,255,255,0.85)",
  letterSpacing: 2,
  textAlign: "center",
  whiteSpace: "nowrap"
};

const filterBtn = (active) => ({
  marginRight: 10,
  padding: "8px 18px",
  borderRadius: 20,
  border: "1px solid #ccc",
  background: active ? "#000" : "#fff",
  color: active ? "#fff" : "#000",
  cursor: "pointer",
  fontSize: 14
});
const qrMethodBtn = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 14px",
  borderRadius: 10,
  border: "2px solid #ddd",
  background: "#fff",
  cursor: "pointer"
};

const qrBox = {
  display: "inline-block",
  padding: 20,
  borderRadius: 16,
  background: "#ffffff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  textAlign: "center"
};
const previewCard = {
  position: "absolute",
  bottom: "120%",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#ffffff",
  padding: 10,
  borderRadius: 12,
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  zIndex: 999,
  width: 180,
  textAlign: "center"
};
