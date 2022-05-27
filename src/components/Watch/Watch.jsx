import { Watch } from 'react-loader-spinner';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: calc(20vh);
`;

const MainLoader = () => {
  return (
    <StyledDiv>
      <Watch color="#39C0ED" height="170" width="170" ariaLabel="loading" />
    </StyledDiv>
  );
};

export default MainLoader;