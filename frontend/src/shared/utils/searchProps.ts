interface SearchList {
  [key: string]: string | SearchList;
}

export const getTranslationFromId = (id: string, searchList: SearchList): string => {
  if (id) {
    const keys = id.split('.');
    let currentObject: any = searchList;

    for (const key of keys) {
      if (currentObject && typeof currentObject === 'object' && key in currentObject) {
        currentObject = currentObject[key];
      } else {
        return '';
      }
    }

    return currentObject;
  } else {
    return '';
  }
};
