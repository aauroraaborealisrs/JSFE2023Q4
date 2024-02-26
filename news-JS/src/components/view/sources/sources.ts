import './sources.css';
import { NewsSource } from 'types/index';

class Sources {
    draw(data: NewsSource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesElement = document.querySelector('.sources') as HTMLElement;
        if (sourcesElement) {
            sourcesElement.append(fragment);
        }
    }
}

export default Sources;
