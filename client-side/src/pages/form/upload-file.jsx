import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useRef, useState } from "react";
import { postApiHandler } from "../../api-handler";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DragDropFiles from "./drag-and-drop";
import swal from "sweetalert";
import { downloadProductExcelTemplate } from "../../utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function FileModal({ visible, setVisible, getProduct }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("file: ", selectedFile);
    const formData = new FormData();
    formData.append("file", selectedFile);
    const result = await postApiHandler("/product-api/bulk-post", formData);
    console.log("result: ", result);
    if (result.status === 200) {
      await swal("Success!", "Data Added Successfully!", "success");
    } else {
      await swal("Error", result.message, "error");
    }
    console.log("result: ", result);
    setSelectedFile(null);
    setVisible(false);
    await getProduct();
  };

  const handleClose = async () => {
    setSelectedFile(null);
    setVisible(false);
  };
  console.log("selected file: ", selectedFile);
  return (
    <React.Fragment>
      <Modal
        open={visible}
        onClose={() => {
          setSelectedFile(null);
          setVisible(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit} sx={style}>
          <header>
            <span
              className="close-button topright rounded-circle "
              onClick={() => handleClose()}
            >
              <CloseIcon />
            </span>
          </header>
          <DragDropFiles
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
          <div className="text-center text-secondary">OR</div>
          <Grid container>
            <Grid item xs={4} className="text-center text-warning item-center">
              {selectedFile?.name}
            </Grid>

            <Grid item xs={4}>
              <div className="text-center">
                <label
                  // role="button"
                  htmlFor="bulk-upload"
                  className="btn rounded border p-2 bg-success text-white"
                >
                  Select File...
                </label>
                <input
                  id="bulk-upload"
                  // className="d-none"
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="text-center">
                {selectedFile && (
                  <button type="submit" className="rounded-pill file-btn">
                    Upload
                  </button>
                )}
              </div>
            </Grid>
          </Grid>

          <div className="text-center">
            <span className="small-text text-secondary">
              We only support Excel formate here. Here's a sample of
              <br /> how it should look like
              <br />
              <a
                className="link-primary btn"
                // href="http://localhost:3000/assets/sample/sample-excel.xlsx"
                // download="sample.xlsx"
                onClick={() => {
                  downloadProductExcelTemplate();
                }}
              >
                Download Template
              </a>
            </span>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

//  border border-3 rounded border-primary p-1
