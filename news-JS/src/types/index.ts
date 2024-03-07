export interface INewsSource {
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

export interface IApiResponse {
    status: string;
    sources: INewsSource[];
    articles: INewsSource[];
}

export interface INewsData {
    articles?: INewsSource[];
}

export interface ISourcesData {
    sources?: INewsSource[];
}
