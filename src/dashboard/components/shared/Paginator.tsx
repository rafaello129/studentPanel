




import { FC } from 'react'
import { usePagination } from '../../hooks'

interface Props {
    currentPage: number, 
    totalResults: number, 
    setCurrentPage: any
}

export const Paginator: FC<Props> = ({ currentPage, totalResults, setCurrentPage }) => {
    const { totalPages, 
            pages, 
            prevPage, 
            nextPage, 
            changePage,
             } = usePagination( { currentPage, totalResults, setCurrentPage } )


    return (
        <div className="pagination">
           { (currentPage  === 1) ? <a className='pagItem d-none'  onClick={prevPage}><i className="fas fa-chevron-left"></i></a> : <a className='pagItem'  onClick={prevPage}><i className="fas fa-chevron-left"></i></a>}
            {
                (( currentPage <= 2 ) ? pages.slice( 0, currentPage+4 ) : pages.slice( currentPage-3, currentPage+2 )).map( i => (
                    <div 
                        key={i} 
                        onClick={ () => changePage( i ) }
                        className={ (currentPage == i) ? 'active pagItem' : 'pagItem' }
                    >{ i }</div>
                ))
            }
            {(currentPage < totalPages) ? <a className='pagItem' onClick={nextPage}><i className="fas fa-chevron-right"></i></a> : null}
        </div>
    )

 
}