import {PropsWithChildren} from "react";
import styled from "styled-components";
import Status from "./CharacterCard/Status/Status";
import {CharacterStatusType} from "../../assets/api/rick-and-morty-api";
import aliveStatus from 'public/statuses/alive.png'
import deadStatus from 'public/statuses/dead.png'
import unknownStatus from 'public/statuses/unknown.png'

type PropsType = {
    name: string;
    status?: CharacterStatusType
};

const statusImages = {
    Alive: aliveStatus,
    Dead: deadStatus,
    unknown: unknownStatus
}

export const Card = (props: PropsWithChildren<PropsType>) => {
    const {children, name, status} = props;

    return (
        <CardBlock>

            <Name>
                {name}
                {status && <Status status={status} src={statusImages[status]}/>}
            </Name>
            {children}
        </CardBlock>
    );
};

const CardBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 2px solid #f8c177;
  box-shadow: 0 2px 3px 1px #ef8d25;
  border-radius: 15px;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
`;

