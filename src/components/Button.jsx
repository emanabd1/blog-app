function Button({ children, onClick, variant = "primary", className = "" }) {
  const base = "px-6 py-2 rounded-xl font-semibold transition";
  const styles = variant === "primary" 
    ? "bg-blue-600 text-white hover:bg-blue-700" 
    : "bg-slate-200 text-slate-700 hover:bg-slate-300";
  
  return <button onClick={onClick} className={`${base} ${styles} ${className}`}>{children}</button>;
}
export default Button;