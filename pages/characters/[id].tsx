import {PageWrapper} from "components/PageWrapper/PageWrapper";
import {API} from "assets/api/api";
import {CharacterType} from "assets/api/rick-and-morty-api";
import {CharacterCard} from "components/Card/CharacterCard/CharacterCard";
import {getLayout} from "components/Layout/BaseLayut/BaseLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from "next/router";
import styled from "styled-components";

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

                <IdText>ID: {characterId}</IdText>
                <CharacterCard character={character} key={character.id}/>
                <Button onClick={goToCharacters}> GO TO CHARACTERS</Button>
            </Main>
        </PageWrapper>
    )
}
Character.getLayout = getLayout
export default Character;

const IdText = styled.div`
  font-size: 34px;
`

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
  background: #efaa74;
  font-size: 24px;

  &:hover {
    background: #d7772e;
    color: white;
  }
`