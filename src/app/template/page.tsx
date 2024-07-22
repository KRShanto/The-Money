import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/cn";
import { getColor } from "@/lib/constants";
import { Template } from "@/models/template";
import Link from "next/link";
import React from "react";
import { FaEdit, FaInfo, FaPlus, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import DeleteTemplateButton from "./DeleteTemplateButton";

export default async function Page() {
  const session = (await getAuthSession()) as {
    user: {
      id: string;
    };
  } | null;

  const templates = await Template.find({ userId: session?.user.id });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-end gap-5 px-14 py-5">
        <Link
          href="/template/create"
          className="btn btn-green txt-shadow text-xl shadow-md"
        >
          + Create
        </Link>
      </div>

      {/* type, username, description, amount, options: edit, delete, use (+) */}
      <div className="my-5 flex flex-col items-center gap-3">
        {/* Heading */}
        <div className="flex w-[80%] items-center justify-between border-b  border-slate-700 p-1 px-3 text-lg">
          <div className="h-4 w-4 rounded-full bg-transparent"></div>
          <h3 className="w-[20%] font-bold">User Name</h3>
          <p className="w-[40%] font-bold">Description</p>
          <p className="w-[20%] font-bold">Amount</p>
          <p className="w-[10%] text-center font-bold">Options</p>
        </div>

        {/* Money List */}
        <div className="h-[70vh] w-[80%] overflow-y-scroll ">
          {templates.map((template, index) => (
            <div
              key={index}
              className="mt-2 flex w-full items-center justify-between rounded-md border border-slate-700 p-3"
            >
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: getColor(template.type) }}
              ></div>

              <h3 className="w-[20%]">{template.oppositeUser.name}</h3>

              <p className="w-[40%]">{template.description}</p>

              {/* Fetch the amount type (dollar/taka/euro) from settings */}
              <p className="w-[20%]">$ {template.amount}</p>

              <div className="flex w-[10%] items-center justify-evenly text-lg">
                <Link
                  href={`/template/edit?id=${template.id}`}
                  className="text-blue-400"
                >
                  <MdEdit />
                </Link>

                <DeleteTemplateButton id={template.id} />

                <Link
                  href={`/create?template=${template.id}`}
                  className="text-green-400"
                >
                  <FaPlus />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
