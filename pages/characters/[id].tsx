import {PageWrapper} from "components/PageWrapper/PageWrapper";
import {API} from "assets/api/api";
import {CharacterType} from "assets/api/rick-and-morty-api";
import {CharacterCard} from "components/Card/CharacterCard/CharacterCard";
import {getLayout} from "components/Layout/BaseLayut/BaseLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from "next/router";
import styled from "styled-components";
import {InfoCard} from "../../components/Card/InfoCard";

export const getStaticPaths: GetStaticPaths = async () => {
    const {results} = await API.rickAndMorty.getCharacters()

    const paths = results.map(character => ({
        params: {id: String(character.id)}
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {id} = params || {}

    const character = await API.rickAndMorty.getCharacter(id as string)

    if (!character) return {notFound: true}

    return {
        props: {
            character
        }
    }
}

type PropsType = {
    character: CharacterType
}

const Character = (props: PropsType) => {
    const {character} = props

    const router = useRouter()
    const characterId = router.query.id // этот метод достает из нашего url id, так как файл называется [id] то и достать можно по названию. вместо useParams

    if (router.isFallback) return <h1>...Loading</h1>

    const goToCharacters = () => router.push('/characters')  // способ навигадии в nextJS

    return (
        <PageWrapper>
            <Main>
                <Box>
                    <CharacterCard character={character} key={character.id}/>
                    <InfoCard character={character} key={character.id}/>
                </Box>
                <Button onClick={goToCharacters}> GO TO LOCATIONS</Button>
            </Main>
        </PageWrapper>
    )
}
Character.getLayout = getLayout
export default Character;


const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const Box = styled.div`
  display: flex;
  gap: 100px;
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