"use client";

import { useForm } from "react-hook-form";
import PdfFilesUpload from "./component/PdfFilesUpload";

export default function Home() {
  const {
    control,
    formState: { errors },
    setValue,
  } = useForm();
  return (
    <main className="">
      <div className=" pt-12">
        <PdfFilesUpload control={control} name="file" />
      </div>
    </main>
  );
}
