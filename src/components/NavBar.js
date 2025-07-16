"use client";
import CartIcon from "@/icons/CartIcon";
import CollectionLink from "./CollectionLink";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import { useState ,useRef,useEffect} from "react";
import ProfileIcon from "@/icons/ProfileIcon";
export default function Navbar() {
  const { openModal, info, setInfo, setSidebarOpen,count,setCount} = useModal();
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef();
  const handleLogout = () => {
    // Clear localStorage or session
    localStorage.removeItem("user");
    setInfo(null)
    localStorage.setItem("cart", JSON.stringify({ count: 0 }));
    setCount(0)
    // Optional: trigger page reload or redirect
    window.location.reload();
  };

  // Click outside to close dropdown
  useEffect(() => {
    const parsedUser = JSON.parse(localStorage.getItem("user"));
    if (parsedUser?.user_id) {
      setInfo(parsedUser.user_id);
    }
    setCount(JSON.parse(localStorage.getItem("cart"))?.count || 0);
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="border-b">
      <div className="flex flex-col items-center py-4">
        <div className="text-5xl font-semibold tracking-widest">
          <Link href="/">PREETIZEN</Link>
        </div>
        <div className="mt-4 flex items-center gap-6 text-lg font-semibold text-gray-600">
          <span className="hover:text-black cursor-pointer">OUR STORY</span>
          <span className="border-l h-5" />
          <CollectionLink
            name="Wildflower Collection"
            slug="wildflower-collection"
          />
          <span className="border-l h-5" />
          <span className="hover:text-black cursor-pointer uppercase">
            T-Zen Collection
          </span>
          <span className="border-l h-5" />
          <span className="hover:text-black cursor-pointer">BE OUR MODEL</span>
          <span className="border-l h-5" />
          <span className="hover:text-black cursor-pointer">REVIEWS</span>
          <span className="border-l h-5" />
          <span className="hover:text-black cursor-pointer">JOIN US</span>
        </div>
        <div className="absolute top-4 right-10 flex items-center gap-2">
          <div className="relative" onClick={() => setSidebarOpen(true)}>
            <CartIcon count={count} />
          </div>
          {!info && (
            <span
              className="text-black text-md font-light cursor-pointer"
              onClick={() => openModal("login")}
            >
              Log In
            </span>
          )}
          {info && (
            <div className="relative" ref={dropdownRef}>
              <div
                className="cursor-pointer flex items-center gap-1"
                onClick={() => setOpenDropdown((prev) => !prev)}
              >
                <ProfileIcon />
              </div>

              {openDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-10">
                  <ul className="text-sm text-black">
                    <li className="px-4 py-2 cursor-pointer hover:text-red-600">
                      Profile
                    </li>
                    <hr className="my-1" />
                    <li
                      className="px-4 py-2 cursor-pointer hover:text-red-600"
                      onClick={handleLogout}
                    >
                      Log Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-100 text-center py-2 text-lg tracking-wide font-medium">
        NEW COLLECTION DROP INCOMING!
      </div>
    </nav>
  );
}
