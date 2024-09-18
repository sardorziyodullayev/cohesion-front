import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { Root } from "@/app/Root.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
          <Root />
        </DevSupport>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
