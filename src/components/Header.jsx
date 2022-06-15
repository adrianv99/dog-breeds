import ToggleColorTheme from "./ToggleColorTheme"

const Header = () => (
    <header className="px-10 py-5 flex justify-between">
        <h1 className="text-2xl font-bold">
            Guess the breed
        </h1>
        <ToggleColorTheme />
    </header>
)


export default Header;