export const THEMES = {
  cherry: {
    id: "cherry",
    name: "Warm Ivory & Cherry",

    background: "#F8F0E5",
    surface: "#FFF9F1",
    primary: "#720000",
    secondary: "#A64B4B",
    text: "#4A1717",
    muted: "#8B6A6A",
    heart: "#B76E79",
    border: "#DFC8B8",
    buttonText: "#FFFFFF"
  },

  rose: {
    id: "rose",
    name: "Blush Rose",

    background: "#FBE7EA",
    surface: "#FFF5F6",
    primary: "#B83B5E",
    secondary: "#D66A85",
    text: "#641E35",
    muted: "#9A6575",
    heart: "#D95C7A",
    border: "#E9BBC7",
    buttonText: "#FFFFFF"
  },

  lavender: {
    id: "lavender",
    name: "Lavender Dream",

    background: "#EEE8FA",
    surface: "#F8F4FF",
    primary: "#67429A",
    secondary: "#9270C4",
    text: "#39265D",
    muted: "#806B99",
    heart: "#9A78C4",
    border: "#D1C0E8",
    buttonText: "#FFFFFF"
  },

  sage: {
    id: "sage",
    name: "Sage Garden",

    background: "#EAF1E8",
    surface: "#F7FAF5",
    primary: "#54735B",
    secondary: "#78957E",
    text: "#304936",
    muted: "#718075",
    heart: "#789A80",
    border: "#C6D5C5",
    buttonText: "#FFFFFF"
  },

  peach: {
    id: "peach",
    name: "Peach Sunset",

    background: "#FFF0E5",
    surface: "#FFF9F4",
    primary: "#C65F45",
    secondary: "#DD8067",
    text: "#653124",
    muted: "#967267",
    heart: "#D77C63",
    border: "#EBC8BA",
    buttonText: "#FFFFFF"
  },

  midnight: {
    id: "midnight",
    name: "Midnight Romance",

    background: "#171522",
    surface: "#242033",
    primary: "#E46B91",
    secondary: "#A987C9",
    text: "#FFF4F8",
    muted: "#B9A9B5",
    heart: "#E46B91",
    border: "#4A4055",
    buttonText: "#FFFFFF"
  }
};

export function getTheme(themeId) {
  return THEMES[themeId] || THEMES.cherry;
}