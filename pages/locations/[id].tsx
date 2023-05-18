import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {API} from "../../assets/api/api";
import {CharacterType, LocationType, ParamsType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {getLayout} from "../../components/Layout/BaseLayut/BaseLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from "next/router";
import styled from "styled-components";
import {instance} from "../../assets/api/instances";
import {CharacterCard} from "../../components/Card/CharacterCard/CharacterCard";
import {InfoCard} from "../../components/Card/InfoCard";

export const getStaticPaths: GetStaticPaths = async () => {
    const {results} = await API.rickAndMorty.getLocations()

    const paths = results.map(location => ({
        params: {id: String(location.id)}
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {id} = params || {}

    const location = await API.rickAndMorty.getLocation(id as string)

    if (!location) return {notFound: true}

    return {
        props: {
            location
        }
    }
}

type PropsType = {
    location: LocationType
}

const Location = (props: PropsType) => {
    const {name, type, dimension, residents} = props.location

    const router = useRouter()

    if (router.isFallback) return <h1>...Loading</h1>

    const goToLocation = async () => router.push('/locations')  // способ навигадии в nextJS

    return (
        <PageWrapper>
            <Main>
                    <CardBlock>
                        <Name>
                            <p>Name location: {name}</p>
                            <p>Type location: {type}</p>
                            <p>Dimension location: {dimension}</p>
                        </Name>
                    </CardBlock>
                <Button onClick={goToLocation}> GO TO CHARACTERS</Button>
            </Main>
        </PageWrapper>
    )
}

Location.getLayout = getLayout
export default Location;


const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const Button = styled.button`
  width: 330px;
  height: 60px;
  border-radius: 4px;
  border: none;
  background: #736c6c;
  font-size: 24px;

  &:hover {
    background: #2a2929;
    color: white;
  }
`

const Box = styled.div`
  display: flex;
  gap: 100px;
`

const CardBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 2px solid #6e6c6c;
  box-shadow: 0 2px 3px 1px #000000;
  border-radius: 15px;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;