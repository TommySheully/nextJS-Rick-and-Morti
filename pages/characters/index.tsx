import {PageWrapper} from "components/PageWrapper/PageWrapper";
import {API} from "assets/api/api";
import {CharacterType, ResponseType} from "assets/api/rick-and-morty-api";
import {CharacterCard} from "components/Card/CharacterCard/CharacterCard";
import {getLayout} from "components/Layout/BaseLayut/BaseLayout";
import Pagination from "../../components/Pagination/Pagination";
import styled from "styled-components";


export const getStaticProps = async () => {
    const characters = await API.rickAndMorty.getCharacters()

    if (!characters) return {notFound: true}

    return {
        props: {
            characters
        }
    }
}

type PropsType = {
    characters: ResponseType<CharacterType>
}

const Characters = (props: PropsType) => {
    const {characters} = props

    const charactersList = characters.results.map(characters => (
        <CharacterCard character={characters} key={characters.id}/>
    ))

    return (
        <>
            <PageWrapper>
                {charactersList}
            </PageWrapper>
            <PagenationBlock>
                <Pagination currentPage={1} totalCount={1}/>
            </PagenationBlock>
        </>
    )
}

Characters.getLayout = getLayout

const PagenationBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`;

export default Characters;
