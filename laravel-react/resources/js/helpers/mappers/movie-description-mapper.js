export const descriptionMapper = (htmlAsText) => {
  if (!htmlAsText || !htmlAsText.length) return '';  
  
  let newHtmlText = htmlAsText.replaceAll('</a>', '');

  while (newHtmlText.includes('<a href=')) {
    let idx = 9;
    const position = newHtmlText.indexOf('<a href="');

    while (newHtmlText[position + idx] !== '>') {
      idx++;
    }

    const link = newHtmlText.slice(position, position + idx + 1);
    newHtmlText = newHtmlText.replaceAll(link, '');
  }

  return newHtmlText;
};
