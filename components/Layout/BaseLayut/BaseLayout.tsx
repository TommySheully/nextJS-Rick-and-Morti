import {NextPage} from "next";
import {PropsWithChildren, ReactElement} from "react";

import styled from "styled-components";
import {Header} from "../../Header/Header";
import {Layout} from "../Layout";

export const BaseLayout: NextPage<PropsWithChildren> = (props) => {
    const {children} = props

    return <Layout>{children}</Layout>
}

export const getLayout = (page: ReactElement) =>  <BaseLayout>{page}</BaseLayout>

