
import { useEffect, useState } from "react";

export const LIMIT = 10;

interface Pagination {
    currentPage: number, 
    totalResults: number, 
    setCurrentPage: any
}

export const usePagination = ( {currentPage, totalResults, setCurrentPage}: Pagination ) => {

    const [totalPages, setTotalPages] = useState<number>(0)
    const [pages, setPages] = useState<number[]>([])


    useEffect(() => {
        let tPages = Math.trunc( totalResults / LIMIT );
        if ( ( totalResults % LIMIT) != 0 ) {
            tPages =  tPages + 1;
        }
        setTotalPages(tPages)
    }, [])


    useEffect(() => {
        setPages([])
        for (let i = 1; i <= totalPages; i++) {
            setPages( prev => [...prev, i])
        }
    }, [totalPages])



    const  nextPage = () => {
        if ( currentPage >= totalPages ) return;
        setCurrentPage( currentPage + 1 )
    }

    const prevPage = () => {
        if ( currentPage === 1 ) return;
        setCurrentPage( currentPage - 1 );
    }

    const lastPage = () => {
        setCurrentPage(totalPages);
    }

    const firstPage = () => {
        setCurrentPage(1);
    }

    const changePage = ( page: number ) => {
        setCurrentPage( page );
    }


    return {
        totalPages,
        pages,

        nextPage,
        prevPage,
        lastPage,
        firstPage,
        changePage
    }

}