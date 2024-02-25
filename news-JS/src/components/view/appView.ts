import News from './news/news';
import Sources from './sources/sources';

interface NewsItem {
    urlToImage: string;
    author: string | null;
    source: { name: string };
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    content: string;
}

interface SourceItem {
    id: string;
    name: string;
}

interface Data {
    articles?: NewsItem[];
    sources?: SourceItem[];
}

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Data) {
        const values = data?.articles || [];
        this.news.draw(values);
    }

    drawSources(data: Data) {
        const values = data?.sources || [];
        this.sources.draw(values);
    }
}

export default AppView;
