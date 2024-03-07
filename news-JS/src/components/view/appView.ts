import News from './news/news';
import Sources from './sources/sources';
import { INewsData, ISourcesData } from 'types/index';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: INewsData): void {
        console.log('Drawing news with data:', data);
        const values = data?.articles || [];
        this.news.draw(values);
    }

    drawSources(data: ISourcesData): void {
        console.log('Drawing sources with data:', data);
        const values = data?.sources || [];
        this.sources.draw(values);
    }
}

export default AppView;
