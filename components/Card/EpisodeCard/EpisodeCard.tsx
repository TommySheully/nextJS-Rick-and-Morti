import {Card} from "../Card";
import Link from "next/link";
import {EpisodeType} from '../../../assets/api/rick-and-morty-api';
import styled from "styled-components";


type PropsType = {
    episodes: EpisodeType
}

export const EpisodeCard = (props: PropsType) => {
  const { id, name } = props.episodes

  return (
      <Card name={name}>
          <Link href={`/episodes/${id}`}>
              <Button> more info...</Button>
          </Link>
      </Card>
  )
}

const Button = styled.button`
  width: 100%;
  height: 30px;
  border-radius: 4px;
  border: none;
  background: #d5e5f5;
  font-size: 18px;

  a {
    text-decoration: none;
    color: black;
  }

  &:hover {
    background: #2a2929;
    color: white;
  }
`


