import { IWordData } from './interfaces';

export async function fetchWordData(
  dataUrl: string,
): Promise<IWordData | undefined> {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const wordData = await response.json();
    console.log('Fetched data:', wordData);
    return wordData;
  } catch (error) {
    console.error('Error fetching word data:', error);
  }
}
