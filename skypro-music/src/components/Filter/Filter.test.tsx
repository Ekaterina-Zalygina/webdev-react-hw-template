import { Filter } from "./Filter"
import renderer from "react-test-renderer"

it("renders correctly", () => {
    const tree = renderer.create(<Filter tracks={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
})
