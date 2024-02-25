import News from './news/news';
import Sources from './sources/sources';
import { Data} from '../../types/index';


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
