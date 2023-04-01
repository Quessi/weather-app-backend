export default (originalObject: { [key: string]: any }) => {
    const filteredObject: { [key: string]: any } = {};
    for (const key in originalObject) {
      if (originalObject[key] !== '') {
        filteredObject[key] = originalObject[key];
      }
    }
    return filteredObject;
  };