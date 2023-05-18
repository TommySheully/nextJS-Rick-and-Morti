import {PageWrapper} from "components/PageWrapper/PageWrapper";
import {API} from "assets/api/api";
import {CharacterType, ResponseType} from "assets/api/rick-and-morty-api";
import {CharacterCard} from "components/Card/CharacterCard/CharacterCard";
import {getLayout} from "components/Layout/BaseLayut/BaseLayout";
import Pagination from "../../components/Pagination/Pagination";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";


export const getServerSideProps: GetServerSideProps<any> = async ({query}) => {
    const {page = '1'} = query

    const characters = await API.rickAndMorty.getCharacters({page: Number(page)})

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

    const router = useRouter()
    const queryPage = router.query.page

    const currentPage = Number(queryPage) || 1


    const charactersList = characters.results.map(characters => (
        <CharacterCard character={characters} key={characters.id}/>
    ))

    return (
        <>
            <PageWrapper>
                {charactersList}
            </PageWrapper>
            <Pagination currentPage={currentPage} totalPage={characters.info.pages}/>
        </>
    )
}

Characters.getLayout = getLayout

export default Characters;
