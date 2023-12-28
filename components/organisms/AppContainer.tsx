import { PropsWithChildren } from "react";
import styled from "styled-components";

const AppContainerWrapper = styled.div`
  margin: 0 auto;
  ${({ theme }) => theme.breakpoints.xs} {
    max-width: 100%;
  }
  ${({ theme }) => theme.breakpoints.md} {
    max-width: 85vw;
  }
  ${({ theme }) => theme.breakpoints.lg} {
    max-width: 1200px;
  }
`;

type AppContainerProps = PropsWithChildren<{ className?: string }>;

function AppContainer({ children, className }: AppContainerProps) {
  return (
    <div>
      <AppContainerWrapper className={className}>
        {children}
      </AppContainerWrapper>
    </div>
  );
}

export default AppContainer;
