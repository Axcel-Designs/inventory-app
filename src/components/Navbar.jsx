import { FiBell, FiMenu, FiSearch, FiUser } from "react-icons/fi";
import { auth } from "../firebase/firebase";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#d8d0c8]/60 bg-[#faf5ee]/90 px-4 shadow-sm backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[#605850] hover:bg-[#ece6dc] lg:hidden"
          aria-label="Open navigation"
        >
          <FiMenu className="h-5 w-5" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c2652a] text-sm font-bold text-white">
          AC
        </div>
        <span className="truncate text-base font-semibold text-[#3a302a]">
          {auth.currentUser.email}
        </span>
      </div>

      <div className="mx-6 hidden w-full max-w-md items-center gap-2 rounded-xl bg-[#f2ece4] px-3 py-2 md:flex">
        <FiSearch className="h-4 w-4 shrink-0 text-[#9a9088]" />
        <input
          aria-label="Search inventory"
          placeholder="Search inventory, SKUs, batches..."
          className="w-full bg-transparent text-sm text-[#3a302a] outline-none placeholder:text-[#9a9088]"
        />
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-5">
        
        <button
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-[#605850] hover:bg-[#ece6dc]"
        >
          <FiBell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#c0392b]" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c2652a] text-white">
            <img src={auth.currentUser.photoURL} alt="profileLogo"className="h-full w-full rounded-full" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-[#3a302a]">{auth.currentUser.displayName} </p>
            <p className="text-[11px] font-semibold text-[#c2652a]">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
