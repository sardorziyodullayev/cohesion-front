import { Fragment } from "react";
import { Category, Component, Variant, Palette } from "@react-buddy/ide-toolbox";
import { MantineProvider } from "@mantine/core";

export const PaletteTree = () => (
  <Palette>
    <Category name="App">
      <Component name="Loader">
        <Variant>
          <ExampleLoaderComponent />
        </Variant>
      </Component>
    </Category>
    <Category name="Mantine">
      <MantineProvider>
        <Component name="Button">
          <Variant>
            <button>Click me</button>
          </Variant>
          <Variant>
            <button>Click me</button>
          </Variant>
          <Variant>
            <button>Click me</button>
          </Variant>
        </Component>
      </MantineProvider>
    </Category>
  </Palette>
);

export function ExampleLoaderComponent() {
  return <Fragment>Loading...</Fragment>;
}
