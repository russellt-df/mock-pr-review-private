import type { ReactNode, ReactElement } from 'react';

// Stand-ins for react-native primitives.
export function View({ children }: { children?: ReactNode }): ReactElement {
  return <div>{children}</div>;
}
export function Text({ children }: { children?: ReactNode }): ReactElement {
  return <span>{children}</span>;
}
