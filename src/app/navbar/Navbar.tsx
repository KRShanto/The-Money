import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import ToggleTheme from "./ToggleTheme";
import { UserType } from "@/types/user";
import { MdAdminPanelSettings } from "react-icons/md";
import MenuToggle from "./MenuToggle";
import { SITE_NAME } from "@/lib/constants";
import NavLink from "./NavLink";
import { AiFillBell } from "react-icons/ai";
import NavButton from "./NavButton";
import Image from "next/image";
import UserImage from "@/../public/user-image.png";

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

      {/* TODO: search */}
      <div className="search"></div>

      {/* menu bar */}
      <div className="flex flex-row gap-2">
        <MenuToggle />
      </div>

      {/* Links container */}
      <div
        id="nav-links-container"
        className="overflow-x-hidden max-[1250px]:absolute max-[1250px]:right-2 max-[1250px]:top-16 max-[1250px]:-z-10"
      >
        {/* Links */}
        <div
          id="nav-links"
          className="relative z-10 flex items-center gap-8 font-bold transition-all duration-300 ease-in-out max-[1250px]:-right-80 max-[1250px]:flex-col max-[1250px]:items-start max-[1250px]:gap-0 max-[1250px]:rounded-md max-[1250px]:bg-bgColorLight"
        >
          <NavButton>
            <AiFillBell className="text-3xl" />
          </NavButton>

          {session ? (
            <>
              <NavLink href="/profile">
                <Image
                  src={session.user?.image ? session.user?.image : UserImage}
                  alt="Profile picture"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </NavLink>

              {/* TODO: temporary. Use it in profile page */}
              <NavLink
                href="/api/auth/signout"
                className="btn btn-red hover:text-white"
              >
                Logout
              </NavLink>
            </>
          ) : (
            <NavLink href="/login" className="btn btn-main hover:text-white">
              Login
            </NavLink>
          )}

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
