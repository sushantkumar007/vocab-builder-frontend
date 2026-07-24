import { Link, NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutService } from "../services/auth.service.js";
import { logout } from "../store/userSlice.js";

// UI Components
import {
  GalleryVerticalEnd,
  MenuIcon,
  LogOutIcon,
  HouseIcon,
  BookmarkIcon,
  BookCheckIcon,
  UserKeyIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Navbar() {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutService();
      dispatch(logout());
      navigate("login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  console.log("Navbar user:", user);
  console.log("Navbar isLoggedIn:", isLoggedIn);
  return (
    <nav className="w-full h-16 flex items-center justify-between p-4 md:px-16">
      <div>
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Vocbank
        </Link>
      </div>
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="outline">
              <MenuIcon className="size-4" />
            </Button>
          }
        />
        <SheetContent className="">
          <SheetHeader className="pb-0">
            <SheetTitle className="">Vocbank</SheetTitle>
            <span className="border-[0.5px] mt-4"></span>
            {isLoggedIn && (
              <SheetDescription className="flex flex-col text-center">
                <span className="text-lg text-black font-semibold capitalize mt-2">
                  {user?.name}
                </span>
                <span className="text-xs">@{user?.username}</span>
                <span className="flex justify-center items-center">
                  <span className="w-16 h-16  bg-gray-800 text-white text-xl rounded-full mt-4">
                    <span className="h-full flex justify-center items-center">
                      0
                    </span>
                  </span>
                </span>
                <span className="text-center text-xs mt-2 text-black px-8">
                  Your total word in your vocabulary bank
                </span>
                <span className="border-[0.5px] mt-4"></span>
              </SheetDescription>
            )}
          </SheetHeader>
          {isLoggedIn && (
            <div className="px-4">
              <ul className="flex flex-col gap-2">
                <li className="flex">
                  <SheetClose
                    render={
                      <NavLink
                        to="/"
                        className="w-full flex items-center gap-1 px-4 py-2 rounded-lg hover:border"
                      >
                        <HouseIcon className="w-4 h-4" />
                        Home
                      </NavLink>
                    }
                  />
                </li>
                <li className="flex">
                  <SheetClose
                    render={
                      <NavLink
                        to="/"
                        className="w-full flex items-center gap-1 px-4 py-2 rounded-lg hover:border"
                      >
                        <UserIcon className="w-4 h-4" />
                        Profile
                      </NavLink>
                    }
                  />
                </li>
                <li className="flex">
                  <SheetClose
                    render={
                      <NavLink
                        to="/"
                        className="w-full flex items-center gap-1 px-4 py-2 rounded-lg hover:border"
                      >
                        <BookmarkIcon className="w-4 h-4" />
                        Watchlist
                      </NavLink>
                    }
                  />
                </li>
                <li className="flex">
                  <SheetClose
                    render={
                      <NavLink
                        to="/"
                        className="w-full flex items-center gap-1 px-4 py-2 rounded-lg hover:border"
                      >
                        <BookCheckIcon className="w-4 h-4" />
                        Saved words
                      </NavLink>
                    }
                  />
                </li>
                <li className="flex">
                  <SheetClose
                    render={
                      <NavLink
                        to="/"
                        className="w-full flex items-center gap-1 px-4 py-2 rounded-lg hover:border"
                      >
                        <UserKeyIcon className="w-4 h-4" />
                        Update password
                      </NavLink>
                    }
                  />
                </li>
              </ul>
            </div>
          )}
          <SheetFooter>
            {isLoggedIn && (
              <>
                <SheetClose
                  render={
                    <Button
                      type="button"
                      onClick={handleLogout}
                      className="py-5"
                    >
                      <LogOutIcon />
                      Logout
                    </Button>
                  }
                />
                <SheetClose
                  render={
                    <Button variant="outline" className="py-4.5">
                      Close
                    </Button>
                  }
                />
              </>
            )}
            {!isLoggedIn && (
              <>
                <SheetClose
                  render={
                    <Button type="button" className="w-full py-5">
                      <Link to="/signup" className="w-full">
                        Register
                      </Link>
                    </Button>
                  }
                />
                <SheetClose
                  render={
                    <Button variant="outline" className="w-full py-4.5">
                      <Link to="/login" className="w-full">
                        Login
                      </Link>
                    </Button>
                  }
                />
              </>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export default Navbar;
