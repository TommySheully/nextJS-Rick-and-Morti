import React from 'react';
import {getLayout} from "../components/Layout/BaseLayut/BaseLayout";
import {PageWrapper} from "../components/PageWrapper/PageWrapper";
import Image from "next/image";
import NoFoundImg from "public/404.png";
import styled from "styled-components";

const NotFound = () => {
    return (
        <PageWrapper>
            <Container>
                <Image src={NoFoundImg} alt={'404'} width={200} height={200}/>
                NON FOUND
            </Container>
        </PageWrapper>
    );
};

NotFound.getLayout = getLayout
export default NotFound;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  width: 50%;
  margin: 5px;
  
  font-size: 30px;
`;




