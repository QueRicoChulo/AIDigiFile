export interface File {
    id: string;
    name: string;
    size: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SearchResult {
    files: File[];
    totalResults: number;
    currentPage: number;
    totalPages: number;
}