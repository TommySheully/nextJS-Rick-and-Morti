import Image from 'next/image';
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {API} from "../../assets/api/api";
import {CharacterType, ResponseType} from "../../assets/api/rick-and-morty-api";


export const getStaticProps = async () => {
    const characters = await API.rickAndMorty.getCharacters()

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


    return (
        <PageWrapper>
            <Header/>
            <Image
                src="/next.svg"
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
            />
        </PageWrapper>
    )
}

export default Characters;
