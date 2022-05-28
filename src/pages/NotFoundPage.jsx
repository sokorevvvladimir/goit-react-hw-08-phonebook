import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

const StyledP = styled.p`
  font-weight: 500;
`;

const NotFoundPage = () => {
  return (
    <StyledDiv>
      <StyledP>Page Not Found 404</StyledP>
      <StyledP>
        Go <Link to="/">HOME</Link>
      </StyledP>
    </StyledDiv>
  );
};

export default NotFoundPage;