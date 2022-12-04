export const TransformData = (recipies) => {
  const transformData = (keyFunc, mergeFunc, array) =>
    Array.from(
      array
        .reduce((acc, o) => {
          const key = keyFunc(o);
          if (!acc.has(key)) return acc.set(key, o);

          return acc.set(key, mergeFunc(acc.get(key), o));
        }, new Map())
        .values()
    );

  const transformedDataArray = transformData(
    (x) => x.recipeID,
    (o1, o2) => ({ ...o1, pictureURL: [o1.pictureURL, o2.pictureURL].flat() }),
    recipies
  );

  console.log(transformedDataArray);
  return transformedDataArray;
};
