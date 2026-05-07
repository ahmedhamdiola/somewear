import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../components/ui/pagination"

interface Props {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

const AppPagination = ({ page, totalPages, onPageChange }: Props) => {
    if (totalPages <= 1) return null

    return (
        <div className="flex justify-center mb-10">
            <Pagination>
                <PaginationContent className="flex items-center gap-1">

                    {/* PREVIOUS */}
                    <PaginationItem>
                        <PaginationPrevious
                            className={`cursor-pointer ${page === 1
                                ? "pointer-events-none opacity-50"
                                : "hover:bg-gray-100"
                                }`}
                            onClick={() =>
                                onPageChange(Math.max(page - 1, 1))
                            }
                        />
                    </PaginationItem>

                    {/* NUMBERS */}
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={page === i + 1}
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => onPageChange(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* NEXT */}
                    <PaginationItem>
                        <PaginationNext
                            className={`cursor-pointer ${page === totalPages
                                ? "pointer-events-none opacity-50"
                                : "hover:bg-gray-100"
                                }`}
                            onClick={() =>
                                onPageChange(Math.min(page + 1, totalPages))
                            }
                        />
                    </PaginationItem>

                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default AppPagination