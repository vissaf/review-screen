/* eslint-disable react/prop-types */
function Header({ toggleTheme, isDarkMode }) {
  return (
    <div className="header">
      Review Screen
      <button onClick={toggleTheme}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
}

export default Header;
