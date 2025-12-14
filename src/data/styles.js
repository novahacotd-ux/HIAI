/* ===== DATA (WITH PREVIEW) ===== */

// ===== ART STYLES =====
export const artStyles = [
  {
    key: "dongho",
    name: "Đông Hồ",
    preview: "/preview/art/dongho.png",
    desc: "Tranh dân gian khắc gỗ truyền thống"
  },
  {
    key: "hangtrong",
    name: "Hàng Trống",
    preview: "/preview/art/hangtrong.png",
    desc: "Nét vẽ thanh thoát, màu sắc tươi"
  },
  {
    key: "sonmai",
    name: "Sơn mài",
    preview: "/preview/art/sonmai.png",
    desc: "Chất liệu truyền thống cao cấp"
  },
  {
    key: "luaviet",
    name: "Lụa Việt",
    preview: "/preview/art/lua.png",
    desc: "Mềm mại, nhẹ nhàng, tinh tế"
  },
  {
    key: "biemhoa",
    name: "Biếm họa",
    preview: "/preview/art/biemhoa.png",
    desc: "Phong cách vui nhộn, cách điệu"
  },
  {
    key: "dantocthieuso",
    name: "Dân tộc thiểu số",
    preview: "/preview/art/dantocthieuso.png",
    desc: "Mạnh mẽ, màu sắc tương phản"
  },
  {
    key: "sinhhue",
    name: "Sình Huế",
    preview: "/preview/art/sinhhue.png",
    desc: "Làng quê – núi non – di tích"
  },
  {
    key: "khacgo",
    name: "Khắc gỗ",
    preview: "/preview/art/khacgo.png",
    desc: "Biến tấu từ tranh truyền thống"
  }
];

// ===== HISTORY ROLES =====
export const historyRoles = [
  {
    key: "king",
    name: "Vua",
    preview: "/preview/history/vua.jpg",
    desc: "Hoàng bào – long bào"
  },
  {
    key: "civil",
    name: "Quan văn",
    preview: "/preview/history/quanvan.jpg",
    desc: "Trang phục triều đình"
  },
  {
    key: "military",
    name: "Quan võ",
    preview: "/preview/history/quanvo.jpg",
    desc: "Giáp trụ – uy nghiêm"
  },
  {
    key: "general",
    name: "Tướng quân",
    preview: "/preview/history/tuongquan.jpg",
    desc: "Hình tượng anh hùng"
  },
  {
    key: "princess",
    name: "Công chúa",
    preview: "/preview/history/congchua.jpg",
    desc: "Trang phục cung đình"
  },
  {
    key: "queen",
    name: "Hoàng hậu",
    preview: "/preview/history/hoanghau.jpg",
    desc: "Quyền uy – cao quý"
  }
];

// ===== GROUP MODES =====
export const groupModes = [
  {
    key: "couple",
    name: "Cặp đôi cưới xưa",
    preview: "/preview/group/couple.jpg",
    desc: "Trang phục cưới truyền thống"
  },
  {
    key: "group3",
    name: "Nhóm 3 người",
    preview: "/preview/group/3people.jpg",
    desc: "Gia đình – bạn bè"
  },
  {
    key: "group4",
    name: "Nhóm 4 người",
    preview: "/preview/group/4people.jpg",
    desc: "Nhóm nhỏ – đồng đều"
  },
  {
    key: "group5",
    name: "Nhóm 5 người",
    preview: "/preview/group/5people.jpg",
    desc: "Tập thể – lễ hội"
  }
];

// ===== GALLERY MOCK (CỘNG ĐỒNG) =====
export const galleryMock = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `https://picsum.photos/300/400?random=${i + 1}`,
  type: ["dongho", "history", "couple"][i % 3]
}));
