export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
    author?: string;
    source: { name: string; id: string };
    publishedAt: string;
    title: string;
    urlToImage: string;
}

// export interface Article {
//     author: string;
//     publishedAt: string;
//     source: {
//         id: string;
//         name: string;
//     };
//     title: string;
//     url: string;
// }

export interface Article {
    id: string; 
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
    author: string;
    source: {
        id: string;
        name: string;
    };
    publishedAt: string;
    title: string;
    urlToImage: string;
}

export interface ApiResponse {
    status: string;
    sources: NewsSource[];
    articles: Article[];
}

export interface NewsData {
    articles?: Article[];
}

export interface SourcesData {
    sources?: NewsSource[];
}
