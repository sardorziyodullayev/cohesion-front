import { LoadingOverlay } from "@mantine/core";

export const TLoaderOverlay = () => {
  return <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ type: "bars" }} />;
};
