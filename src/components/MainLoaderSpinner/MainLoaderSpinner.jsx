import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';

const Div = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  // @media (min-width: 769px) {
  //   width: 80%;
  // }
  // @media (min-width: 1024px) {
  //   width: 100%;
  }
`;

const MainLoaderSpinner = () => {
  return (
    <Div>
      <Spinner animation="grow" variant="info" />
    </Div>
  );
};

export default MainLoaderSpinner;
