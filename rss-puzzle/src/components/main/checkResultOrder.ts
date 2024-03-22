export function checkResultOrder(originalSentence: string) {
    const resultBlock = document.getElementById('result-block');
    if (!resultBlock) {
      console.error('Element with ID "result-block" not found');
      return false;
    }
  
    const wordsInResult = Array.from(resultBlock.children).map(
      (child) => child.textContent,
    );
    const wordsInOriginal = originalSentence.split(' ');
  
    if (wordsInResult.length !== wordsInOriginal.length) {
      console.log('Количество слов не совпадает');
      return false;
    }
  
    for (let i = 0; i < wordsInResult.length; i++) {
      if (wordsInResult[i] !== wordsInOriginal[i]) {
        console.log('Порядок слов не совпадает');
        return false;
      }
    }
  
    console.log('Порядок слов совпадает');
    return true;
  }
  