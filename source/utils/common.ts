export const formatExtractLinev2 = (ingredientExtract: any[], currentPosition: number) => {
  const body: any[] = ingredientExtract.map((itemLine, index) => {
    return {
      parsedQuery: itemLine.parsed_query,
      position: currentPosition + index,
      rawQuantity: itemLine.quantity,
      suggestion: itemLine.name,
      type: itemLine.type,
      unit: itemLine.unit,
      yieldDescription: itemLine.preparation_note,
      recipeLineParserId: itemLine.recipe_line_parser_id
    };
  });

  return body;
};

export function getNumberFromString(inputString: string) {
  const match = inputString.match(/\d+/); // Tìm chuỗi số trong chuỗi
  if (match) {
    const number = parseInt(match[0], 10); // Chuyển kết quả thành số nguyên
    return number;
  } else {
    return null; // Trả về null nếu không tìm thấy số trong chuỗi
  }
}

export function changeArrayMethodToStringMethod(arr: string[]) {
  const newArr: string[] = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(`<p>${arr[i]}</p> `);
  }
  return newArr.join('');
}
