export const shortDescriptionMapper = (htmlAsText) => {
  if (!htmlAsText || !htmlAsText.length) return '';  
  
  const regex = new RegExp('(\<a.{0,}\>)|(\<.{0,10}\>)|(\&#.{3,5};\s?)', 'g');

  const shortDescription = '<p>' + htmlAsText.slice(0, 230).replace(regex, '') + '...</p>';  

  return shortDescription;
};
