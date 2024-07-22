import Popup from "@/components/Popup";
import { usePopupStore } from "@/stores/popup";
import React from "react";
import { deleteTemplate } from "./deleteTemplate";
import { useRouter } from "next/navigation";

export default function DeleteTemplatePopup() {
  const { data, closePopup } = usePopupStore();
  const id = data.id as string;
  const router = useRouter();

  return (
    <Popup title="Delete Template">
      <h2 className="text-center text-xl font-bold">
        Are you sure you want to delete this template?
      </h2>
      <p className="mt-2 text-lg">
        The records you have created using this template, won&apos;t be deleted.
      </p>

      <div className="mt-5 flex justify-end space-x-3">
        <button className="btn bg-slate-700" onClick={closePopup}>
          Cancel
        </button>

        <button
          className="btn btn-red"
          onClick={async () => {
            await deleteTemplate(id);
            router.refresh();
            closePopup();
          }}
        >
          Delete
        </button>
      </div>
    </Popup>
  );
}
