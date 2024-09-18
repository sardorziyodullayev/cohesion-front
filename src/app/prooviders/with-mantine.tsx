import { Button, createTheme, MantineProvider, Textarea, TextInput, Title } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/dates/styles.css";
import { ComponentType, createElement } from "react";
import { Notifications } from "@mantine/notifications";

export const withMantine = (component: ComponentType) => () => {
  const theme = createTheme({
    colors: {
      "light-dark": ["#7AD1DD", "#5FCCDB", "#44CADC", "#2AC9DE", "#1AC2D9", "#11B7CD", "#09ADC3", "#0E99AC", "#128797", "#147885"],
    },
    components: {
      TextInput: TextInput.extend({
        defaultProps: {
          radius: 7,
        },
      }),

      Textarea: Textarea.extend({
        defaultProps: {
          radius: 7,
        },
      }),

      Title: Title.extend({
        defaultProps: {
          ff: "Montserrat, sans-serif",
        },
      }),

      Button: Button.extend({
        defaultProps: {
          variant: "filled",
          radius: 7,
        },
        styles: {
          root: { transition: "all 300ms" },
        },
      }),
    },
  });

  return (
    <MantineProvider stylesTransform={emotionTransform} withCssVariables theme={theme} defaultColorScheme="light">
      <MantineEmotionProvider>
        <Notifications limit={3} position="bottom-center" zIndex={100000} />
        {createElement(component)}
      </MantineEmotionProvider>
    </MantineProvider>
  );
};
