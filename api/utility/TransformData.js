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
    (o1, o2) => ({
      ...o1,
      pictureURL: [o1.pictureURL, o2.pictureURL].flat(),
      tagText: [o1.tagText, o2.tagText].flat(),
    }),
    recipies
  );

  console.log(transformedDataArray);

  const transformedDataArrayWithUniqueValues = transformedDataArray.map(
    (recipie) => ({
      ...recipie,
      tagText: Array.from(new Set(recipie.tagText)),
    })
  );

  console.log("The transformed data is ", transformedDataArrayWithUniqueValues);
  return transformedDataArrayWithUniqueValues;
};
