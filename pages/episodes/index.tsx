import {PageWrapper} from "components/PageWrapper/PageWrapper";
import {API} from "assets/api/api";
import {EpisodeType, ResponseType} from "assets/api/rick-and-morty-api";
import {Card} from "components/Card/Card";
import {getLayout} from "components/Layout/BaseLayut/BaseLayout";


export const getStaticProps = async () => {
    const episodes = await API.rickAndMorty.getEpisodes()

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

    const episodesList = episodes.results.map(episodes => (
        <Card name={episodes.name} key={episodes.id}/>
    ))

    return (
        <PageWrapper>
            {episodesList}
        </PageWrapper>
    )
}
Episodes.getLayout = getLayout

export default Episodes;
