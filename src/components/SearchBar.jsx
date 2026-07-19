import { FiSearch } from "react-icons/fi";

function SearchBar({ onSearch }) {
  return (
    <div className="flex items-center bg-white border border-slate-200 rounded-full px-4 py-2 w-full max-w-md">
      <FiSearch className="text-slate-400" />
      <input 
        type="text" 
        placeholder="Search posts..." 
        onChange={(e) => onSearch(e.target.value)}
        className="ml-2 w-full outline-none"
      />
    </div>
  );
}
export default SearchBar;