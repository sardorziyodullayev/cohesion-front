import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Announcement({ children }: Props) {
  return <>{children}</>;
}
