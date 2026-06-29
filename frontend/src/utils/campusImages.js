// Vite imports all local visual assets so pages can use images without hard-coded filenames.
const imageModules = import.meta.glob("../assets/**/*.{png,jpg,jpeg,webp,avif,svg}", {
  eager: true,
  import: "default",
  query: "?url"
});

function formatImageName(path) {
  const fileName = path.split("/").pop() || "Campus image";
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export const campusImages = Object.entries(imageModules).map(([path, src], index) => ({
  id: path,
  src,
  title: formatImageName(path),
  alt: `UniClub Hub campus visual ${index + 1}`
}));

export function getCampusImage(index = 0) {
  if (campusImages.length === 0) {
    return null;
  }

  return campusImages[index % campusImages.length];
}
