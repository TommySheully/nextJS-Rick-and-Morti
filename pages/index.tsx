import Image from 'next/image';
import {NextPageWithLayout} from './_app';
import {PageWrapper} from 'components/PageWrapper/PageWrapper';
import {getLayout} from "components/Layout/BaseLayut/BaseLayout";
import styled from "styled-components";

const Home: NextPageWithLayout = () => (
    <PageWrapper>
        <CardBlock>
            <Name>
                <h1>Rick and Morty - Encyclopedia</h1>
            </Name>
            <Image
                src="/family.jpg"
                alt="family Tick and Morty"
                width={1080}
                height={640}
                priority
            />
        </CardBlock>
    </PageWrapper>
);

Home.getLayout = getLayout
export default Home;

const CardBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 24px;
  display: flex;
  justify-content: center;
`;