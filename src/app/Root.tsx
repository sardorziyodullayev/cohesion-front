import { RouterProvider } from "react-router-dom";
import { Router } from "./app-router";
import { withProviders } from "./prooviders";

/**
 * Initializes the root component of the application.
 *
 * Adds an event listener for the "wheel" event to the document.
 * If the active element is an input of type "number", it will lose focus
 * upon detecting the wheel event. This behavior prevents accidental
 * value changes due to mouse wheel scrolling.
 *
 * Returns the RouterProvider component with configuration from Router().
 *
 * @returns {JSX.Element} The RouterProvider component configured with the application's routes.
 */
const _Root = (): JSX.Element => {
  document.addEventListener("wheel", () => {
    const activeElement = document.activeElement as HTMLInputElement;
    if (activeElement && activeElement.type === "number") {
      activeElement.blur();
    }
  });

  return <RouterProvider router={Router()} />;
};

/**
 * A high-level component wrapped with additional providers.
 * This modified Root component includes various context or state providers
 * that are necessary for the entire application.
 */
export const Root = withProviders(_Root);
