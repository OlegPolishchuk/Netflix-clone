type Props = {
  username: string;
}

const Navbar = ({username}: Props) => {
  return(
    <div>
      Navbar

      <ul>
        <li>Home</li>
        <li>My List</li>
      </ul>

      <nav>
        <div>
          <button>
            <p>{username}</p>
          </button>

          <div>
            <a>Sign out</a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;