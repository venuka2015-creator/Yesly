import { useEffect } from "react";
import { getTheme } from "../theme/themes";

export default function ThemePage({
  themeId = "cherry",
  children,
  className = ""
}) {
  const theme = getTheme(themeId);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-background",
      theme.background
    );

    document.documentElement.style.setProperty(
      "--theme-surface",
      theme.surface
    );

    document.documentElement.style.setProperty(
      "--theme-primary",
      theme.primary
    );

    document.documentElement.style.setProperty(
      "--theme-secondary",
      theme.secondary
    );

    document.documentElement.style.setProperty(
      "--theme-text",
      theme.text
    );

    document.documentElement.style.setProperty(
      "--theme-muted",
      theme.muted
    );

    document.documentElement.style.setProperty(
      "--theme-heart",
      theme.heart
    );

    document.documentElement.style.setProperty(
      "--theme-border",
      theme.border
    );

    document.documentElement.style.setProperty(
      "--theme-button-text",
      theme.buttonText
    );

    document.body.style.background = theme.background;
    document.body.style.color = theme.text;

    return () => {
      document.body.style.background = "";
      document.body.style.color = "";
    };
  }, [themeId, theme]);

  return (
    <div
      className={`theme-page ${className}`}
      style={{
        background: theme.background,
        color: theme.text
      }}
    >
      {children}
    </div>
  );
}