import { Bar } from "../Bar/Bar"
import { Collection } from "../Collection/collection"
import { Favorites } from "./favorites"
import { Filter } from "../Filter/Filter"
import { RegUserName } from "../Register/Register"
import renderer from "react-test-renderer"
import { Provider } from "react-redux"
import { makeStore } from "@/store/store"
import { PageLogin } from "../Login/SignIn"
import { Playlist } from "../Playlist/Playlist"

it("renders correctly", () => {
    const tree = renderer.create(<Favorites />).toJSON()
    expect(tree).toMatchSnapshot()
})
