import React from 'react';
import styles from 'styles/Home.module.css'
import styled from "styled-components";
import Link from "next/link";

type PaginationComponentType = {
    totalPage: number
    currentPage: number
}

const Pagination = ({totalPage, currentPage}: PaginationComponentType) => {
    if (totalPage === 1) return null

    const pages = Array.from({length: totalPage}, (_, i) => i + 1);

    return (
        <PaginationBlock>
            <ul className={styles.pagination}>
                <li className={styles.pageItem}>
                    <Link className={styles.pageLink} href={{query: {page: currentPage - 1}}}>
                        Prev
                    </Link>
                </li>
                {pages.map((page) => (
                    currentPage - page >= 5 || page - currentPage <= 5 &&
                    <li key={page} className={page === currentPage ? styles.pageItemActive : styles.pageItem}>
                        <Link className={styles.pageLink} href={{query: {page: page}}}>
                            {page}
                        </Link>
                    </li>
                ))}
                <li className={styles.pageItem}>
                    <Link className={styles.pageLink} href={{query: {page: currentPage + 1}}}>
                        Next
                    </Link>
                </li>
            </ul>
        </PaginationBlock>
    )
};

const PaginationBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`;

export default Pagination;