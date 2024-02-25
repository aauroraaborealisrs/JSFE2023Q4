export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
  }

export interface NewsItem {
    urlToImage: string;
    author: string | null;
    source: { name: string };
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    content: string;
}

export interface SourceItem {
  id: string;
  name: string;
}

export interface Data {
  articles?: NewsItem[];
  sources?: SourceItem[];
}
