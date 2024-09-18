import compose from "compose-function";
import { withMantine } from "./with-mantine";
import { withQueryOptions } from "./with-query-options";

export const withProviders = compose(withMantine, withQueryOptions);
