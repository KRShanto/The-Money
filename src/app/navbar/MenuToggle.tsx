"use client";

import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { usePathname, useSearchParams } from "next/navigation";
import { useMediaQuery } from "react-responsive";

export default function MenuToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const search = useSearchParams();

  // check if the screen is on 1250px or less
  const isRespnosive = useMediaQuery({
    query: "(max-width: 1250px)",
  });

  useEffect(() => {
    // if the screen is not on 1250px or less, do nothing
    if (!isRespnosive) return;

    // set the style of #nav-links
    // if isOpen is true, set the right to 0
    // if isOpen is false, set the right to -20rem
    const navLinks = document.getElementById("nav-links");
    const navLinksContainer = document.getElementById("nav-links-container");

    if (navLinks && navLinksContainer) {
      if (isOpen) {
        // set the z-index of #nav-links-container to 1000 (to make it on top of the other elements)
        navLinksContainer.style.zIndex = "1000";
        navLinks.style.right = "0";
      } else {
        navLinks.style.right = "-20rem";

        setTimeout(() => {
          navLinksContainer.style.zIndex = "-1";
        }, 100);
      }
    }

    // listen to the click event on the document
    // if the click is outside the #nav-links-container, close the navbar
    const handleClick = (e: MouseEvent) => {
      if (navLinksContainer && !navLinksContainer.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    // remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  useEffect(() => setIsOpen(false), [pathname, search]);

  return (
    <button
      className="hidden text-xl max-[1250px]:block"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {isOpen ? (
        <FaTimes title="Close navbar" />
      ) : (
        <GiHamburgerMenu title="Open navbar" />
      )}
    </button>
  );
}
