import React, { useEffect, useState } from "react";
import MainLayout from "../../main-layout";
import { getApiHandler } from "../../api-handler";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import FileModal from "../form/upload-file";

const columns = ["Id", "Product Name", "Category Name", "Sub-category Name"];

const MyTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [contact, setContact] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const changePage = (e, pageNum) => {
    console.log("pageNum: ", pageNum);
    setPage(pageNum - 1);
  };
  const getProduct = async () => {
    console.log("akjsdjfkd: ", page);
    setOpen(true);
    const temp = await getApiHandler(
      `/product-api/get-product/${page * 5}/${pageSize}`
    );
    console.log("data: ", temp);
    if (temp.status === 200) {
      setContact(temp.data);
      setRowCount(temp.length);
    }
    setOpen(false);
  };
  useEffect(() => {
    getProduct();
  }, [page]);
  console.log("products: ", contact);

  return (
    <MainLayout>
      <div style={{ textAlign: "center" }}>
        <h1>Dollop Infotech Team</h1>
      </div>
      <div>
        <button className="bg-white py-2 px-3" onClick={() => setVisible(true)}>
          BULK UPLOAD
        </button>
      </div>
      <FileModal
        visible={visible}
        setVisible={setVisible}
        getProduct={getProduct}
      />

      <table
        className="table table-striped table-hover table-height"
        cellPadding={10}
        cellSpacing={0}
        border={2}
      >
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th scope="col" key={`col-${index}`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contact.map((row, index) => (
            <tr key={`row-${index}`}>
              <th>{page * pageSize + index + 1}</th>
              <td>{row["Product Name"]}</td>
              <td>{row["categoryName"]}</td>
              <td>{row["subCatgName"]}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <div className="">
                <Pagination
                  size="medium"
                  variant="outlined"
                  count={
                    rowCount % pageSize != 0
                      ? Math.floor(rowCount / pageSize) + 1
                      : Math.floor(rowCount / pageSize)
                  }
                  onChange={changePage}
                  shape="rounded"
                />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </MainLayout>
  );
};

export default MyTable;
