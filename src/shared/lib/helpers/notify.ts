import { DefaultMantineColor } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

const notify = (message: string, color: DefaultMantineColor) => {
  showNotification({
    message,
    color,
  });
};

const notifyError = (error: unknown) => {
  if (error instanceof Error || typeof error === "string") {
    notify(error instanceof Error ? error.message : error, "red");
  }
};

export { notify, notifyError };
