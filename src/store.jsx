import { proxy } from "valtio";

const state = proxy({
  intro: true,
  colors: ["#ccc", "#EFBD4E", "#80C670", "#726DE8", "#EF674E", "#353934"],
  decals: ["react", "three2", "pmndrs"],
  sizes: ["S", "M", "L", "XL", "XXL"],
  selectedColor: "#ccc",
  selectedDecal: "three2",
  selectedSize: "L",
});

export { state };
