import * as XLSX from "xlsx";
export const downloadProductExcelTemplate = () => {
  const data = [
    {
      Product: "Product 1",
      Category: "Category 1",
      "Sub-category": "Sub-category 1",
    },
    {
      Product: "Product 2",
      Category: "Category 2",
      "Sub-category": "Sub-category 2",
    },
    {
      Product: "Product 3",
      Category: "Category 1",
      "Sub-category": "Sub-category 2",
    },
    {
      Product: "Product 4",
      Category: "Category 3",
      "Sub-category": "Sub-category 1",
    },
    {
      Product: "Product 5",
      Category: "Category 3",
      "Sub-category": "Sub-category 2",
    },
  ];
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet);

  // XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Email", "Age", "Contact"]], {
  //   origin: "A1",
  // });
  XLSX.writeFile(workbook, "template.xlsx");
};
