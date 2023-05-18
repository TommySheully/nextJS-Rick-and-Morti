import styled from 'styled-components';
import {LinkBlock} from './LinkBlock/LinkBlock';

export const Header = () => (
    <Navbar>
        <LinkBlock title={'Characters'}/>
        <LinkBlock title={'Locations'}/>
        <LinkBlock title={'Episodes'}/>
    </Navbar>
)

const Navbar = styled.div`

  height: 60px;
  width: 100%;

  margin: 0 auto;

  display: flex;
  justify-content: space-around;
  align-items: center;

  position: relative;

  :after {
    content: "";
    position: absolute;

    border-bottom: 3px solid #1c1b1b;
    width: 100%;

    bottom: -10px;
    left: 50%;
    transform: translate(-50%, 50%);
  }

  @media (max-width: 700px) {
    flex-direction: column;
    text-align: center;
  }
`
