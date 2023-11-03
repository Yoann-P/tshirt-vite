import { proxy } from "valtio";
let uploadFolder = 'upload/'
const state = proxy({
  intro: true,
  colors: ["#ccc", "#EFBD4E", "#80C670", "#726DE8", "#EF674E", "#353934"],
  decals: [uploadFolder + "__react", uploadFolder + "__three2", uploadFolder + "__pmndrs"],
  sizes: ["S", "M", "L", "XL", "XXL"],
  selectedColor: "#ccc",
  selectedDecal: uploadFolder + "__three2",
  selectedSize: "L",
});

export { state };
