import News from './news/news';
import Sources from './sources/sources';
import { NewsData, SourcesData } from 'types/index';

// interface NewsData {
//     articles?: NewsSource[];
// }

// interface SourcesData {
//     sources?: NewsSource[];
// }

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsData): void {
        console.log('Drawing news with data:', data); // Добавляем   логирование
        const values = data?.articles || [];
        this.news.draw(values);
    }

    drawSources(data: SourcesData): void {
        console.log('Drawing sources with data:', data); // Добавляем   логирование
        const values = data?.sources || [];
        this.sources.draw(values);
    }
}

export default AppView;
