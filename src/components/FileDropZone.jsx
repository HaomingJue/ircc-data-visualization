import React from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ onDrop, open }) {
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
      useDropzone({
        onDrop,
      });
    const files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
    return (
      <div>
        <div {...getRootProps({ className: "dropzone" })}>
          <input className="input-zone" {...getInputProps()} />
          <div className="text-center">
            {isDragActive ? (
              <p className="dropzone-content">
                Release to drop the files here
              </p>
            ) : (
              <p className="dropzone-content">
                Drag & drop some files here, or click to select files
              </p>
            )}
            <button type="button" onClick={open} className="btn">
              Click to select files
            </button>
          </div>
        </div>
        <aside>
          <ul>{files}</ul>
        </aside>
      </div>
    );
  }
  export default Dropzone;