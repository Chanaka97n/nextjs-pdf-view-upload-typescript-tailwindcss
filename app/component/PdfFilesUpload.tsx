"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfFilesUpload(props: {
  control: any;

  name: string;
}) {
  const { control, name } = props;

  const [numPages, setNumPages] = useState(null);
  const [file, setFile] = useState<any>();
  const [scale, setscale] = useState<any>(1);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: any) {
    setNumPages(nextNumPages);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={` w-[800px] rounded-[20px] h-[600px]  bg-white  ${
          file ? "" : "border-lime-500 border-2 border-dashed"
        } flex flex-col items-center justify-centerv overflow-hidden`}
      >
        {!file && (
          <label className="outline-none relative cursor-pointer flex flex-col items-center justify-center h-full w-full">
            <>
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`icon icon-tabler icon-tabler-file-upload text-lime-500 w-16 h-20`}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                  <path d="M12 11v6" />
                  <path d="M9.5 13.5l2.5 -2.5l2.5 2.5" />
                </svg>
                <div className="font-medium text-lg text-black">
                  Drop your files here or{" "}
                  <span className="underline text-lime-500 cursor-pointer">
                    Browse
                  </span>
                </div>
                <div className="text-sm font-medium text-neutral-500">
                  only documents are allowed
                </div>
              </div>
            </>

            <div>
              <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange, ...field } }: any) => (
                  <input
                    onChange={(event) => {
                      //@ts-ignore
                      onChange(event.target.files[0]);
                      //@ts-ignore
                      setFile(event.target.files[0]);
                    }}
                    type="file"
                    accept=".pdf"
                    className="sr-only"
                  />
                )}
              />
            </div>
          </label>
        )}
        <div className="max-h-[45rem] overflow-y-auto overflow-x-auto  w-full overflow-hidden no-scrollbar">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            noData
            className={" space-y-4 w-full"}
          >
            {Array.apply(null, Array(numPages))
              .map((x, i) => i + 1)
              .map((page) => (
                <Page
                  key={page}
                  pageNumber={page}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className={"w-full "}
                  scale={scale}
                />
              ))}
          </Document>
        </div>
      </div>
      <div>
        <div className="bg-slate-100 w-full  shadow-md rounded-[20px] py-3 px-8 flex gap-6 mt-8">
          <button
            type="button"
            onClick={() => {
              setscale(scale + 0.1);
            }}
            className="text-black hover:border hover:border-lime-500 hover:bg-lime-50 cursor-pointer transition-all duration-300 w-10 h-10 rounded-md flex items-center justify-center "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`icon icon-tabler icon-tabler-zoom-in hover:text-lime-500`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M7 10l6 0" />
              <path d="M10 7l0 6" />
              <path d="M21 21l-6 -6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => {
              setscale(scale - 0.1);
            }}
            className="text-black hover:border hover:border-lime-500 hover:bg-lime-50 cursor-pointer transition-all duration-300 w-10 h-10 rounded-md flex items-center justify-center "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`icon icon-tabler icon-tabler-zoom-out hover:text-lime-500`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M7 10l6 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setFile(null)}
            className="hover:border hover:border-lime-500 hover:bg-lime-50 cursor-pointer transition-all duration-300 w-10 h-10 rounded-md flex items-center justify-center "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`icon icon-tabler icon-tabler-file-x hover:text-lime-500`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <path d="M10 12l4 4m0 -4l-4 4" />
            </svg>
          </button>{" "}
        </div>
      </div>
    </div>
  );
}
