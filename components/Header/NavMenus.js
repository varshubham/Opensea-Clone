const style = {
    list: `flex space-x-10`,
    element: `font-semibold text-gray-400 transition-all hover:text-white dark:text-gray-300 hover:white:text-white`,
  }
  
  const NavMenus = ({ menus }) => {
    return (
      <nav>
        <ul className={style.list}>
          {menus.map((menu, index) => (
            <li key={index}>
              <a href={menu.href} className={style.element}>
                {menu.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  export default NavMenus