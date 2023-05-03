import React from 'react';
import {CharacterStatusType} from "../../../../assets/api/rick-and-morty-api";
import Image, {StaticImageData} from "next/image";

type PropsType = {
    status: CharacterStatusType
    src: StaticImageData
}

const Status = ({src}: PropsType) => {


    return (
        <>
            <Image src={src} alt={'Photo character'} width={20} height={20}/>
        </>
    );
};

export default Status;