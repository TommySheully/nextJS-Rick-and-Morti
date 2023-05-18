import styled from "styled-components";
import {CharacterType} from "../../assets/api/rick-and-morty-api";


type PropsType = {
    character: CharacterType;
};


export const InfoCard = (props: PropsType) => {
    const { species, gender, origin, location} = props.character;

    return (
        <CardBlock>
            <Name>
                <p>Species: {species}</p>
                <p>Gender: {gender}</p>
                <p>Origin: {origin.name}</p>
                <p>Location: {location.name}</p>
              </Name>
        </CardBlock>
    );
};

const CardBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 2px solid #6e6c6c;
  box-shadow: 0 2px 3px 1px #000000;
  border-radius: 15px;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

