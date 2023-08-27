import Link from "next/link";
import React from "react";
import { getAuthSession } from "@/lib/auth";
import ToggleTheme from "./ToggleTheme";
import { UserType } from "@/types/user";
import { AiFillHome } from "react-icons/ai";
import { RiArticleFill } from "react-icons/ri";
import { BiSolidFilePdf } from "react-icons/bi";
import { HiLightBulb } from "react-icons/hi";
import { AiFillPhone } from "react-icons/ai";
import { AiFillQuestionCircle } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import MenuToggle from "./MenuToggle";
import { SITE_NAME } from "@/lib/constants";
import NavLink from "./NavLink";

export default async function Navbar() {
  const session = (await getAuthSession()) as { user: UserType } | null;

  return (
    <nav className="flex items-center justify-between bg-bgColorLight px-20 py-4 shadow-lg max-[1450px]:px-8 max-[1250px]:px-4 ">
      {/* Title */}
      <Link
        href="/"
        className="text-golden-gradient text-2xl font-bold max-[1250px]:text-lg"
      >
        {SITE_NAME}
      </Link>

      {/* search */}
      <div className="search"></div>

      <div className="flex flex-row gap-2">
        <MenuToggle />
      </div>

      <div
        id="nav-links-container"
        className="overflow-x-hidden max-[1250px]:absolute max-[1250px]:right-2 max-[1250px]:top-16 max-[1250px]:-z-10"
      >
        {/* Links */}
        <div
          id="nav-links"
          className="relative z-10 flex items-center gap-8 font-bold transition-all duration-300 ease-in-out max-[1250px]:-right-80 max-[1250px]:flex-col max-[1250px]:items-start max-[1250px]:gap-0 max-[1250px]:rounded-md max-[1250px]:bg-bgColorLight"
        >
          <NavLink href="/">
            <AiFillHome />
            Home
          </NavLink>

          <NavLink href="/post/blog">
            <RiArticleFill />
            Blogs
          </NavLink>

          <NavLink href="/post/pdf">
            <BiSolidFilePdf />
            PDF
          </NavLink>

          <NavLink href="/post/tip">
            <HiLightBulb />
            Tips
          </NavLink>

          <NavLink href="/contact">
            <AiFillPhone />
            Contact Us
          </NavLink>

          <NavLink href="/about">
            <AiFillQuestionCircle />
            About
          </NavLink>

          {session && session.user?.role === "admin" && (
            <NavLink href="/admin">
              <MdAdminPanelSettings />
              Dashboard
            </NavLink>
          )}

          <ToggleTheme />
        </div>
      </div>
    </nav>
  );
}
