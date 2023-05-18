import {PageWrapper} from "components/PageWrapper/PageWrapper";
import {API} from "assets/api/api";
import {EpisodeType, ResponseType} from "assets/api/rick-and-morty-api";
import {Card} from "components/Card/Card";
import {getLayout} from "components/Layout/BaseLayut/BaseLayout";
import {GetServerSideProps} from "next";
import Pagination from "../../components/Pagination/Pagination";
import {useRouter} from "next/router";


export const getServerSideProps: GetServerSideProps<any> = async ({query}) => {
    const {page = '1'} = query

    const episodes = await API.rickAndMorty.getEpisodes({page: Number(page)})

    if (!episodes) return {notFound: true}

    return {
        props: {
            episodes
        }
    }
}

type PropsType = {
    episodes: ResponseType<EpisodeType>
}

const Episodes = (props: PropsType) => {
    const {episodes} = props

    const router = useRouter()
    const queryPage = router.query.page

    const currentPage = Number(queryPage) || 1

    const episodesList = episodes.results.map(episodes => (
        <Card name={episodes.name} key={episodes.id}/>
    ))

    return (<>
            <PageWrapper>
                {episodesList}
            </PageWrapper>
            <Pagination currentPage={currentPage} totalPage={episodes.info.pages}/>
        </>
    )
}
Episodes.getLayout = getLayout

export default Episodes;
