const colors = Object.freeze({
  primary: "#171717",
  header: "#111111",
  surface: "#ffffff",
  surfaceMuted: "#f5f5f5",
  section: "#3f3f3f",
  card: "#303030",
  text: "#171717",
  textMuted: "#64748b",
  textInverse: "#ffffff",
  border: "#d4d4d4",
  dot: "#cbd5e1",
  navHover: "#303030",
  actionHover: "#4b4b4b",
});

export const APP_THEME = Object.freeze({
  colors,
  antdToken: Object.freeze({
    colorPrimary: colors.primary,
    borderRadius: 12,
    controlHeightLG: 48,
    fontFamily: '"Be Vietnam Pro", ui-sans-serif, system-ui, sans-serif',
  }),
});

export function applyTheme(): void {
  const root = document.documentElement;

  Object.entries(colors).forEach(([name, value]) => {
    const cssName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    root.style.setProperty(`--color-${cssName}`, value);
  });
}
