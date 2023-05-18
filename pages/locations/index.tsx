import {PageWrapper} from "components/PageWrapper/PageWrapper";
import {LocationType, ResponseType} from "assets/api/rick-and-morty-api";
import {Card} from "components/Card/Card";
import {getLayout} from "components/Layout/BaseLayut/BaseLayout";
import {GetServerSideProps} from "next";
import Pagination from "../../components/Pagination/Pagination";
import {API} from "../../assets/api/api";
import {useRouter} from "next/router";
import {LocationCard} from "../../components/Card/LocationCard/LocationCard";

export const getServerSideProps: GetServerSideProps<any> = async ({query}) => {
    const {page = '1'} = query

    const locations = await API.rickAndMorty.getLocations({page: Number(page)})

    if (!locations) return {notFound: true}

    return {
        props: {
            locations
        }
    }
}

type PropsType = {
    locations: ResponseType<LocationType>
}

const Locations = (props: PropsType) => {
    const {locations} = props

    const router = useRouter()
    const queryPage = router.query.page

    const currentPage = Number(queryPage) || 1

    const locationsList = locations.results.map(locations => (
        <LocationCard locations={locations} key={locations.id}/>
    ))

    return (<>
            <PageWrapper>
                {locationsList}
            </PageWrapper>
            <Pagination currentPage={currentPage} totalPage={locations.info.pages}/>
        </>
    )
}

Locations.getLayout = getLayout

export default Locations;
