import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {API} from "../../assets/api/api";
import {EpisodeType} from "../../assets/api/rick-and-morty-api";
import {getLayout} from "../../components/Layout/BaseLayut/BaseLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from "next/router";
import styled from "styled-components";

export const getStaticPaths: GetStaticPaths = async () => {
    const {results} = await API.rickAndMorty.getEpisodes()

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

    const episode = await API.rickAndMorty.getEpisode(id as string)

    if (!episode) return {notFound: true}

    return {
        props: {
            episode
        }
    }
}

type PropsType = {
    episode: EpisodeType
}

const Episode = (props: PropsType) => {
    const {name, episode, air_date } = props.episode

    const router = useRouter()

    if (router.isFallback) return <h1>...Loading</h1>

    const goToEpisode = async () => router.push('/episodes')  // способ навигадии в nextJS

    return (
        <PageWrapper>
            <Main>
                    <CardBlock>
                        <Name>
                            <p>Name episode: {name}</p>
                            <p>Number episode: {episode}</p>
                            <p>Air date episode: {air_date}</p>
                        </Name>
                    </CardBlock>
                <Button onClick={goToEpisode}> GO TO CHARACTERS</Button>
            </Main>
        </PageWrapper>
    )
}

Episode.getLayout = getLayout
export default Episode;


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